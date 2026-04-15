import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateVehiculoDto } from '../dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from '../dto/update-vehiculo.dto';

@Injectable()
export class VehiculoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.vehiculo.findMany({
      include: {
        tipoVehiculo: true,
        abonado: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async findById(id: number) {
    return this.prisma.vehiculo.findUnique({
      where: { id },
      include: {
        tipoVehiculo: true,
        abonado: true,
      },
    });
  }

  async findByPlaca(placa: string) {
    return this.prisma.vehiculo.findUnique({
      where: { placa },
    });
  }

  async findByIdentificadorInterno(identificadorInterno: string) {
    return this.prisma.vehiculo.findUnique({
      where: { identificadorInterno },
    });
  }

  async tipoVehiculoExists(tipoVehiculoId: number) {
    return this.prisma.tipoVehiculo.findUnique({
      where: { id: tipoVehiculoId },
    });
  }

  async create(data: CreateVehiculoDto) {
    return this.prisma.vehiculo.create({
      data: {
        placa: data.placa ? data.placa.toUpperCase() : null,
        identificadorInterno: data.identificadorInterno.toUpperCase(),
        tipoVehiculoId: data.tipoVehiculoId,
      },
      include: {
        tipoVehiculo: true,
        abonado: true,
      },
    });
  }

  async update(id: number, data: UpdateVehiculoDto) {
    return this.prisma.vehiculo.update({
      where: { id },
      data: {
        ...(data.placa !== undefined
          ? { placa: data.placa ? data.placa.toUpperCase() : null }
          : {}),
        ...(data.identificadorInterno !== undefined
          ? { identificadorInterno: data.identificadorInterno.toUpperCase() }
          : {}),
        ...(data.tipoVehiculoId !== undefined
          ? { tipoVehiculoId: data.tipoVehiculoId }
          : {}),
      },
      include: {
        tipoVehiculo: true,
        abonado: true,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.vehiculo.delete({
      where: { id },
    });
  }
}