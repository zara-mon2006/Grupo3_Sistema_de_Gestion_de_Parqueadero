import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AbonadoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.abonado.findMany({
      include: {
        vehiculo: {
          include: {
            tipoVehiculo: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  async findById(id: number) {
    return this.prisma.abonado.findUnique({
      where: { id },
      include: {
        vehiculo: {
          include: {
            tipoVehiculo: true,
          },
        },
      },
    });
  }

  async findByDocumento(documento: string) {
    return this.prisma.abonado.findUnique({
      where: { documento },
    });
  }

  async findByVehiculoId(vehiculoId: number) {
    return this.prisma.abonado.findUnique({
      where: { vehiculoId },
    });
  }

  async vehiculoExists(vehiculoId: number) {
    return this.prisma.vehiculo.findUnique({
      where: { id: vehiculoId },
      include: {
        tipoVehiculo: true,
      },
    });
  }

  async create(data: {
    nombre: string;
    documento: string;
    telefono?: string;
    fechaInicio: Date;
    fechaFin: Date;
    activo: boolean;
    vehiculoId: number;
  }) {
    return this.prisma.abonado.create({
      data,
      include: {
        vehiculo: {
          include: {
            tipoVehiculo: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    data: Partial<{
      nombre: string;
      documento: string;
      telefono?: string;
      fechaInicio: Date;
      fechaFin: Date;
      activo: boolean;
      vehiculoId: number;
    }>,
  ) {
    return this.prisma.abonado.update({
      where: { id },
      data,
      include: {
        vehiculo: {
          include: {
            tipoVehiculo: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return this.prisma.abonado.delete({
      where: { id },
    });
  }
}