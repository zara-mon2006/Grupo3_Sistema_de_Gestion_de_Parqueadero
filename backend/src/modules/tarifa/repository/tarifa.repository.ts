import { Injectable } from '@nestjs/common';
import { ModalidadTarifa } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTarifaDto } from '../dto/create-tarifa.dto';
import { UpdateTarifaDto } from '../dto/update-tarifa.dto';

@Injectable()
export class TarifaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tarifa.findMany({
      include: {
        tipoVehiculo: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async findById(id: number) {
    return this.prisma.tarifa.findUnique({
      where: { id },
      include: {
        tipoVehiculo: true,
      },
    });
  }

  async tipoVehiculoExists(tipoVehiculoId: number) {
    return this.prisma.tipoVehiculo.findUnique({
      where: { id: tipoVehiculoId },
    });
  }

  async findActiveByTipoAndModalidad(
    tipoVehiculoId: number,
    modalidad: ModalidadTarifa,
  ) {
    return this.prisma.tarifa.findFirst({
      where: {
        tipoVehiculoId,
        modalidad,
        activa: true,
      },
    });
  }

  async create(data: CreateTarifaDto) {
    return this.prisma.tarifa.create({
      data,
      include: {
        tipoVehiculo: true,
      },
    });
  }

  async update(id: number, data: UpdateTarifaDto) {
    return this.prisma.tarifa.update({
      where: { id },
      data,
      include: {
        tipoVehiculo: true,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.tarifa.delete({
      where: { id },
    });
  }
}