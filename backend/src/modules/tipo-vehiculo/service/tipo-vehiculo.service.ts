import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TipoVehiculoRepository } from '../repository/tipo-vehiculo.repository';
import { CreateTipoVehiculoDto } from '../dto/create-tipo-vehiculo.dto';
import { UpdateTipoVehiculoDto } from '../dto/update-tipo-vehiculo.dto';

@Injectable()
export class TipoVehiculoService {
  constructor(
    private readonly tipoVehiculoRepository: TipoVehiculoRepository,
  ) {}

  async findAll() {
    return this.tipoVehiculoRepository.findAll();
  }

  async findById(id: number) {
    const tipoVehiculo = await this.tipoVehiculoRepository.findById(id);

    if (!tipoVehiculo) {
      throw new NotFoundException(
        `Tipo de vehículo con id ${id} no encontrado`,
      );
    }

    return tipoVehiculo;
  }

  async create(dto: CreateTipoVehiculoDto) {
    const existing = await this.tipoVehiculoRepository.findByNombre(dto.nombre);

    if (existing) {
      throw new ConflictException(
        `Ya existe un tipo de vehículo con nombre ${dto.nombre}`,
      );
    }

    return this.tipoVehiculoRepository.create(dto);
  }

  async update(id: number, dto: UpdateTipoVehiculoDto) {
    await this.findById(id);

    if (dto.nombre) {
      const existing = await this.tipoVehiculoRepository.findByNombre(dto.nombre);

      if (existing && existing.id !== id) {
        throw new ConflictException(
          `Ya existe un tipo de vehículo con nombre ${dto.nombre}`,
        );
      }
    }

    return this.tipoVehiculoRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.tipoVehiculoRepository.delete(id);
  }
}