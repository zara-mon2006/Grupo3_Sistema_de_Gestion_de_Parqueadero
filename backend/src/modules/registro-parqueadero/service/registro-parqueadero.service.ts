import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EstadoEspacio, ModalidadTarifa } from '@prisma/client';
import { CreateRegistroParqueaderoDto } from '../dto/create-registro-parqueadero.dto';
import { UpdateRegistroParqueaderoDto } from '../dto/update-registro-parqueadero.dto';
import { RegistroParqueaderoRepository } from '../repository/registro-parqueadero.repository';

@Injectable()
export class RegistroParqueaderoService {
  constructor(
    private readonly registroParqueaderoRepository: RegistroParqueaderoRepository,
  ) {}

  async findAll() {
    return this.registroParqueaderoRepository.findAll();
  }

  async findById(id: number) {
    const registro = await this.registroParqueaderoRepository.findById(id);

    if (!registro) {
      throw new NotFoundException(`Registro con id ${id} no encontrado`);
    }

    return registro;
  }

  async create(dto: CreateRegistroParqueaderoDto) {
    const vehiculo = await this.registroParqueaderoRepository.vehiculoExists(
      dto.vehiculoId,
    );

    if (!vehiculo) {
      throw new NotFoundException(
        `Vehículo con id ${dto.vehiculoId} no encontrado`,
      );
    }

    const espacio = await this.registroParqueaderoRepository.espacioExists(
      dto.espacioId,
    );

    if (!espacio) {
      throw new NotFoundException(
        `Espacio con id ${dto.espacioId} no encontrado`,
      );
    }

    const openVehiculo =
      await this.registroParqueaderoRepository.findOpenByVehiculoId(
        dto.vehiculoId,
      );

    if (openVehiculo) {
      throw new BadRequestException(
        `El vehículo con id ${dto.vehiculoId} ya tiene un registro abierto`,
      );
    }

    const openEspacio =
      await this.registroParqueaderoRepository.findOpenByEspacioId(
        dto.espacioId,
      );

    if (openEspacio) {
      throw new BadRequestException(
        `El espacio con id ${dto.espacioId} ya está ocupado`,
      );
    }

    if (espacio.estado !== EstadoEspacio.DISPONIBLE) {
      throw new BadRequestException(
        `El espacio con id ${dto.espacioId} no está disponible`,
      );
    }

    if (vehiculo.tipoVehiculoId !== espacio.tipoVehiculoId) {
      throw new BadRequestException(
        'El tipo de vehículo no coincide con el tipo permitido por el espacio',
      );
    }

    let tarifaId: number | null = dto.tarifaId ?? null;

    if (dto.tarifaId) {
      const tarifa = await this.registroParqueaderoRepository.tarifaExists(
        dto.tarifaId,
      );

      if (!tarifa) {
        throw new NotFoundException(
          `Tarifa con id ${dto.tarifaId} no encontrada`,
        );
      }
    }

    const ahora = new Date();
    const abonado = vehiculo.abonado;
    const esAbonado =
      !!abonado &&
      abonado.activo &&
      ahora >= new Date(abonado.fechaInicio) &&
      ahora <= new Date(abonado.fechaFin);

    if (!esAbonado && !tarifaId) {
      const tarifaDefault =
        await this.registroParqueaderoRepository.findActiveTarifaByTipoVehiculoId(
          vehiculo.tipoVehiculoId,
          ModalidadTarifa.HORA,
        );

      tarifaId = tarifaDefault?.id ?? null;
    }

    return this.registroParqueaderoRepository.create({
      vehiculoId: dto.vehiculoId,
      espacioId: dto.espacioId,
      tarifaId,
      horaEntrada: dto.horaEntrada ? new Date(dto.horaEntrada) : new Date(),
      esAbonado,
    });
  }

  async update(id: number, dto: UpdateRegistroParqueaderoDto) {
    const registro = await this.findById(id);

    if (registro.estado === 'CERRADO') {
      throw new BadRequestException(`El registro con id ${id} ya está cerrado`);
    }

    const horaSalida = dto.horaSalida ? new Date(dto.horaSalida) : new Date();

    if (horaSalida <= new Date(registro.horaEntrada)) {
      throw new BadRequestException(
        'horaSalida debe ser mayor que horaEntrada',
      );
    }

    const minutos = Math.ceil(
      (horaSalida.getTime() - new Date(registro.horaEntrada).getTime()) / 60000,
    );

    let tarifa = registro.tarifa;
    let tarifaId = registro.tarifaId ?? null;
    let totalCobrado = 0;

    if (!registro.esAbonado) {
      if (dto.tarifaId) {
        tarifa = await this.registroParqueaderoRepository.tarifaExists(
          dto.tarifaId,
        );

        if (!tarifa) {
          throw new NotFoundException(
            `Tarifa con id ${dto.tarifaId} no encontrada`,
          );
        }

        tarifaId = tarifa.id;
      }

      if (!tarifa) {
        tarifa =
          await this.registroParqueaderoRepository.findActiveTarifaByTipoVehiculoId(
            registro.vehiculo.tipoVehiculoId,
          );

        if (!tarifa) {
          throw new NotFoundException(
            `No existe tarifa activa para el tipo de vehículo ${registro.vehiculo.tipoVehiculoId}`,
          );
        }

        tarifaId = tarifa.id;
      }

      if (tarifa.modalidad === ModalidadTarifa.HORA) {
        totalCobrado = Math.ceil(minutos / 60) * Number(tarifa.valor);
      }

      if (tarifa.modalidad === ModalidadTarifa.FRACCION) {
        if (!tarifa.fraccionMinutos) {
          throw new BadRequestException(
            'La tarifa por fracción requiere fraccionMinutos',
          );
        }

        totalCobrado =
          Math.ceil(minutos / tarifa.fraccionMinutos) * Number(tarifa.valor);
      }

      if (tarifa.modalidad === ModalidadTarifa.PLANA) {
        totalCobrado = Number(tarifa.valor);
      }
    }

    return this.registroParqueaderoRepository.close(id, {
      horaSalida,
      minutos,
      totalCobrado,
      tarifaId,
      espacioId: registro.espacioId,
    });
  }

  async delete(id: number) {
    await this.findById(id);
    return this.registroParqueaderoRepository.delete(id);
  }
}