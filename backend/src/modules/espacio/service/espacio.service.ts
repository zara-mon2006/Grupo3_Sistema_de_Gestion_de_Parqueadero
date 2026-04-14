import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EspacioRepository } from '../repository/espacio.repository';
import { CreateEspacioDto } from '../dto/create-espacio.dto';
import { UpdateEspacioDto } from '../dto/update-espacio.dto';

@Injectable()
export class EspacioService {
  constructor(private readonly espacioRepository: EspacioRepository) {}

  async findAll() {
    return this.espacioRepository.findAll();
  }

  async findById(id: number) {
    const espacio = await this.espacioRepository.findById(id);

    if (!espacio) {
      throw new NotFoundException(`Espacio con id ${id} no encontrado`);
    }

    return espacio;
  }

  async create(dto: CreateEspacioDto) {
    const existing = await this.espacioRepository.findByCodigo(dto.codigo);

    if (existing) {
      throw new ConflictException(
        `Ya existe un espacio con código ${dto.codigo}`,
      );
    }

    const tipoVehiculo = await this.espacioRepository.tipoVehiculoExists(
      dto.tipoVehiculoId,
    );

    if (!tipoVehiculo) {
      throw new NotFoundException(
        `Tipo de vehículo con id ${dto.tipoVehiculoId} no encontrado`,
      );
    }

    return this.espacioRepository.create(dto);
  }

  async update(id: number, dto: UpdateEspacioDto) {
    await this.findById(id);

    if (dto.codigo) {
      const existing = await this.espacioRepository.findByCodigo(dto.codigo);

      if (existing && existing.id !== id) {
        throw new ConflictException(
          `Ya existe un espacio con código ${dto.codigo}`,
        );
      }
    }

    if (dto.tipoVehiculoId) {
      const tipoVehiculo = await this.espacioRepository.tipoVehiculoExists(
        dto.tipoVehiculoId,
      );

      if (!tipoVehiculo) {
        throw new NotFoundException(
          `Tipo de vehículo con id ${dto.tipoVehiculoId} no encontrado`,
        );
      }
    }

    return this.espacioRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.espacioRepository.delete(id);
  }
}