import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VehiculoRepository } from '../repository/vehiculo.repository';
import { CreateVehiculoDto } from '../dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from '../dto/update-vehiculo.dto';

@Injectable()
export class VehiculoService {
  constructor(private readonly vehiculoRepository: VehiculoRepository) {}

  async findAll() {
    return this.vehiculoRepository.findAll();
  }

  async findById(id: number) {
    const vehiculo = await this.vehiculoRepository.findById(id);

    if (!vehiculo) {
      throw new NotFoundException(`Vehículo con id ${id} no encontrado`);
    }

    return vehiculo;
  }

  async create(dto: CreateVehiculoDto) {
    const tipoVehiculo = await this.vehiculoRepository.tipoVehiculoExists(
      dto.tipoVehiculoId,
    );

    if (!tipoVehiculo) {
      throw new NotFoundException(
        `Tipo de vehículo con id ${dto.tipoVehiculoId} no encontrado`,
      );
    }

    if (tipoVehiculo.requierePlaca && !dto.placa) {
      throw new BadRequestException(
        'La placa es obligatoria para este tipo de vehículo',
      );
    }

    if (!tipoVehiculo.requierePlaca && dto.placa) {
      throw new BadRequestException(
        'Este tipo de vehículo no debe tener placa',
      );
    }

    if (dto.placa) {
      const existingPlaca = await this.vehiculoRepository.findByPlaca(
        dto.placa.toUpperCase(),
      );

      if (existingPlaca) {
        throw new ConflictException(
          `Ya existe un vehículo con placa ${dto.placa.toUpperCase()}`,
        );
      }
    }

    const existingIdentificador =
      await this.vehiculoRepository.findByIdentificadorInterno(
        dto.identificadorInterno.toUpperCase(),
      );

    if (existingIdentificador) {
      throw new ConflictException(
        `Ya existe un vehículo con identificador interno ${dto.identificadorInterno.toUpperCase()}`,
      );
    }

    return this.vehiculoRepository.create(dto);
  }

  async update(id: number, dto: UpdateVehiculoDto) {
    const vehiculoActual = await this.findById(id);

    const tipoVehiculoId = dto.tipoVehiculoId ?? vehiculoActual.tipoVehiculoId;
    const placa = dto.placa ?? vehiculoActual.placa ?? undefined;
    const identificadorInterno =
      dto.identificadorInterno ?? vehiculoActual.identificadorInterno;

    const tipoVehiculo = await this.vehiculoRepository.tipoVehiculoExists(
      tipoVehiculoId,
    );

    if (!tipoVehiculo) {
      throw new NotFoundException(
        `Tipo de vehículo con id ${tipoVehiculoId} no encontrado`,
      );
    }

    if (tipoVehiculo.requierePlaca && !placa) {
      throw new BadRequestException(
        'La placa es obligatoria para este tipo de vehículo',
      );
    }

    if (!tipoVehiculo.requierePlaca && dto.placa) {
      throw new BadRequestException(
        'Este tipo de vehículo no debe tener placa',
      );
    }

    if (placa) {
      const existingPlaca = await this.vehiculoRepository.findByPlaca(
        placa.toUpperCase(),
      );

      if (existingPlaca && existingPlaca.id !== id) {
        throw new ConflictException(
          `Ya existe un vehículo con placa ${placa.toUpperCase()}`,
        );
      }
    }

    const existingIdentificador =
      await this.vehiculoRepository.findByIdentificadorInterno(
        identificadorInterno.toUpperCase(),
      );

    if (existingIdentificador && existingIdentificador.id !== id) {
      throw new ConflictException(
        `Ya existe un vehículo con identificador interno ${identificadorInterno.toUpperCase()}`,
      );
    }

    return this.vehiculoRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.vehiculoRepository.delete(id);
  }
}