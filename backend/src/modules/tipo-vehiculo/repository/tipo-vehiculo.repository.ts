import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTipoVehiculoDto } from '../dto/create-tipo-vehiculo.dto';
import { UpdateTipoVehiculoDto } from '../dto/update-tipo-vehiculo.dto';

@Injectable()
export class TipoVehiculoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tipoVehiculo.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findById(id: number) {
    return this.prisma.tipoVehiculo.findUnique({
      where: { id },
    });
  }

  async findByNombre(nombre: string) {
    return this.prisma.tipoVehiculo.findUnique({
      where: { nombre },
    });
  }

  async create(data: CreateTipoVehiculoDto) {
    return this.prisma.tipoVehiculo.create({
      data,
    });
  }

  async update(id: number, data: UpdateTipoVehiculoDto) {
    return this.prisma.tipoVehiculo.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.tipoVehiculo.delete({
      where: { id },
    });
  }
}