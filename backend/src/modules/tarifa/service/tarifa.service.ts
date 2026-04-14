import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TarifaRepository } from '../repository/tarifa.repository';
import { CreateTarifaDto } from '../dto/create-tarifa.dto';
import { UpdateTarifaDto } from '../dto/update-tarifa.dto';

@Injectable()
export class TarifaService {
  constructor(private readonly tarifaRepository: TarifaRepository) {}

  async findAll() {
    return this.tarifaRepository.findAll();
  }

  async findById(id: number) {
    const tarifa = await this.tarifaRepository.findById(id);

    if (!tarifa) {
      throw new NotFoundException(`Tarifa con id ${id} no encontrada`);
    }

    return tarifa;
  }

  async create(dto: CreateTarifaDto) {
    const tipoVehiculo = await this.tarifaRepository.tipoVehiculoExists(
      dto.tipoVehiculoId,
    );

    if (!tipoVehiculo) {
      throw new NotFoundException(
        `Tipo de vehículo con id ${dto.tipoVehiculoId} no encontrado`,
      );
    }

    if (dto.modalidad === 'FRACCION' && !dto.fraccionMinutos) {
      throw new BadRequestException(
        'fraccionMinutos es obligatorio cuando la modalidad es FRACCION',
      );
    }

    if (dto.activa) {
      const existing = await this.tarifaRepository.findActiveByTipoAndModalidad(
        dto.tipoVehiculoId,
        dto.modalidad,
      );

      if (existing) {
        throw new ConflictException(
          `Ya existe una tarifa activa para el tipoVehiculoId ${dto.tipoVehiculoId} y modalidad ${dto.modalidad}`,
        );
      }
    }

    return this.tarifaRepository.create(dto);
  }

  async update(id: number, dto: UpdateTarifaDto) {
    const tarifaActual = await this.findById(id);

    const tipoVehiculoId = dto.tipoVehiculoId ?? tarifaActual.tipoVehiculoId;
    const modalidad = dto.modalidad ?? tarifaActual.modalidad;
    const activa = dto.activa ?? tarifaActual.activa;
    const fraccionMinutos = dto.fraccionMinutos ?? tarifaActual.fraccionMinutos;

    const tipoVehiculo =
      await this.tarifaRepository.tipoVehiculoExists(tipoVehiculoId);

    if (!tipoVehiculo) {
      throw new NotFoundException(
        `Tipo de vehículo con id ${tipoVehiculoId} no encontrado`,
      );
    }

    if (modalidad === 'FRACCION' && !fraccionMinutos) {
      throw new BadRequestException(
        'fraccionMinutos es obligatorio cuando la modalidad es FRACCION',
      );
    }

    if (activa) {
      const existing = await this.tarifaRepository.findActiveByTipoAndModalidad(
        tipoVehiculoId,
        modalidad,
      );

      if (existing && existing.id !== id) {
        throw new ConflictException(
          `Ya existe una tarifa activa para el tipoVehiculoId ${tipoVehiculoId} y modalidad ${modalidad}`,
        );
      }
    }

    return this.tarifaRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.tarifaRepository.delete(id);
  }
}