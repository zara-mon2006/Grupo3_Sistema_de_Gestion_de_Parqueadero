import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEspacioDto } from '../dto/create-espacio.dto';
import { UpdateEspacioDto } from '../dto/update-espacio.dto';

@Injectable()
export class EspacioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.espacio.findMany({
      include: {
        tipoVehiculo: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async findById(id: number) {
    return this.prisma.espacio.findUnique({
      where: { id },
      include: {
        tipoVehiculo: true,
      },
    });
  }

  async findByCodigo(codigo: string) {
    return this.prisma.espacio.findUnique({
      where: { codigo },
    });
  }

  async tipoVehiculoExists(tipoVehiculoId: number) {
    return this.prisma.tipoVehiculo.findUnique({
      where: { id: tipoVehiculoId },
    });
  }

  async create(data: CreateEspacioDto) {
    return this.prisma.espacio.create({
      data,
      include: {
        tipoVehiculo: true,
      },
    });
  }

  async update(id: number, data: UpdateEspacioDto) {
    return this.prisma.espacio.update({
      where: { id },
      data,
      include: {
        tipoVehiculo: true,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.espacio.delete({
      where: { id },
    });
  }
}