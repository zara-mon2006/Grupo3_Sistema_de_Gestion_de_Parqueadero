import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AbonadoRepository } from '../repository/abonado.repository';
import { CreateAbonadoDto } from '../dto/create-abonado.dto';
import { UpdateAbonadoDto } from '../dto/update-abonado.dto';

@Injectable()
export class AbonadoService {
  constructor(private readonly abonadoRepository: AbonadoRepository) {}

  async findAll() {
    return this.abonadoRepository.findAll();
  }

  async findById(id: number) {
    const abonado = await this.abonadoRepository.findById(id);

    if (!abonado) {
      throw new NotFoundException(`Abonado con id ${id} no encontrado`);
    }

    return abonado;
  }

  async create(dto: CreateAbonadoDto) {
    const existingDocumento = await this.abonadoRepository.findByDocumento(
      dto.documento,
    );

    if (existingDocumento) {
      throw new ConflictException(
        `Ya existe un abonado con documento ${dto.documento}`,
      );
    }

    const vehiculo = await this.abonadoRepository.vehiculoExists(dto.vehiculoId);

    if (!vehiculo) {
      throw new NotFoundException(
        `Vehículo con id ${dto.vehiculoId} no encontrado`,
      );
    }

    const existingVehiculo = await this.abonadoRepository.findByVehiculoId(
      dto.vehiculoId,
    );

    if (existingVehiculo) {
      throw new ConflictException(
        `El vehículo con id ${dto.vehiculoId} ya está asociado a un abonado`,
      );
    }

    const fechaInicio = new Date(dto.fechaInicio);
    const fechaFin = new Date(dto.fechaFin);

    if (fechaFin <= fechaInicio) {
      throw new BadRequestException(
        'fechaFin debe ser mayor que fechaInicio',
      );
    }

    return this.abonadoRepository.create({
      nombre: dto.nombre,
      documento: dto.documento,
      telefono: dto.telefono,
      fechaInicio,
      fechaFin,
      activo: dto.activo,
      vehiculoId: dto.vehiculoId,
    });
  }

  async update(id: number, dto: UpdateAbonadoDto) {
    const abonadoActual = await this.findById(id);

    const documento = dto.documento ?? abonadoActual.documento;
    const vehiculoId = dto.vehiculoId ?? abonadoActual.vehiculoId;
    const fechaInicio = new Date(dto.fechaInicio ?? abonadoActual.fechaInicio);
    const fechaFin = new Date(dto.fechaFin ?? abonadoActual.fechaFin);

    if (documento !== abonadoActual.documento) {
      const existingDocumento = await this.abonadoRepository.findByDocumento(
        documento,
      );

      if (existingDocumento && existingDocumento.id !== id) {
        throw new ConflictException(
          `Ya existe un abonado con documento ${documento}`,
        );
      }
    }

    if (vehiculoId !== abonadoActual.vehiculoId) {
      const vehiculo = await this.abonadoRepository.vehiculoExists(vehiculoId);

      if (!vehiculo) {
        throw new NotFoundException(
          `Vehículo con id ${vehiculoId} no encontrado`,
        );
      }

      const existingVehiculo = await this.abonadoRepository.findByVehiculoId(
        vehiculoId,
      );

      if (existingVehiculo && existingVehiculo.id !== id) {
        throw new ConflictException(
          `El vehículo con id ${vehiculoId} ya está asociado a otro abonado`,
        );
      }
    }

    if (fechaFin <= fechaInicio) {
      throw new BadRequestException(
        'fechaFin debe ser mayor que fechaInicio',
      );
    }

    return this.abonadoRepository.update(id, {
      nombre: dto.nombre,
      documento: dto.documento,
      telefono: dto.telefono,
      fechaInicio,
      fechaFin,
      activo: dto.activo,
      vehiculoId: dto.vehiculoId,
    });
  }

  async delete(id: number) {
    await this.findById(id);
    return this.abonadoRepository.delete(id);
  }
}