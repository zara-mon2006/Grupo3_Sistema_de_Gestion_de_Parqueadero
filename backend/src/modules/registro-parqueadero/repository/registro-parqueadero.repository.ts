import { EstadoEspacio, EstadoRegistro, ModalidadTarifa } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RegistroParqueaderoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.registroParqueo.findMany({
      include: {
        vehiculo: {
          include: {
            tipoVehiculo: true,
            abonado: true,
          },
        },
        espacio: {
          include: {
            tipoVehiculo: true,
          },
        },
        tarifa: true,
      },
      orderBy: { id: 'desc' },
    });
  }

  async findById(id: number) {
    return this.prisma.registroParqueo.findUnique({
      where: { id },
      include: {
        vehiculo: {
          include: {
            tipoVehiculo: true,
            abonado: true,
          },
        },
        espacio: {
          include: {
            tipoVehiculo: true,
          },
        },
        tarifa: true,
      },
    });
  }

  async vehiculoExists(vehiculoId: number) {
    return this.prisma.vehiculo.findUnique({
      where: { id: vehiculoId },
      include: {
        tipoVehiculo: true,
        abonado: true,
      },
    });
  }

  async espacioExists(espacioId: number) {
    return this.prisma.espacio.findUnique({
      where: { id: espacioId },
      include: {
        tipoVehiculo: true,
      },
    });
  }

  async tarifaExists(tarifaId: number) {
    return this.prisma.tarifa.findUnique({
      where: { id: tarifaId },
    });
  }

  async findOpenByVehiculoId(vehiculoId: number) {
    return this.prisma.registroParqueo.findFirst({
      where: {
        vehiculoId,
        estado: EstadoRegistro.ABIERTO,
      },
    });
  }

  async findOpenByEspacioId(espacioId: number) {
    return this.prisma.registroParqueo.findFirst({
      where: {
        espacioId,
        estado: EstadoRegistro.ABIERTO,
      },
    });
  }

  async findActiveTarifaByTipoVehiculoId(
    tipoVehiculoId: number,
    modalidad?: ModalidadTarifa,
  ) {
    return this.prisma.tarifa.findFirst({
      where: {
        tipoVehiculoId,
        activa: true,
        ...(modalidad ? { modalidad } : {}),
      },
      orderBy: { id: 'asc' },
    });
  }

  async create(data: {
    vehiculoId: number;
    espacioId: number;
    tarifaId?: number | null;
    horaEntrada: Date;
    esAbonado: boolean;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const registro = await tx.registroParqueo.create({
        data: {
          vehiculoId: data.vehiculoId,
          espacioId: data.espacioId,
          tarifaId: data.tarifaId ?? null,
          horaEntrada: data.horaEntrada,
          esAbonado: data.esAbonado,
          estado: EstadoRegistro.ABIERTO,
        },
        include: {
          vehiculo: {
            include: {
              tipoVehiculo: true,
              abonado: true,
            },
          },
          espacio: {
            include: {
              tipoVehiculo: true,
            },
          },
          tarifa: true,
        },
      });

      await tx.espacio.update({
        where: { id: data.espacioId },
        data: { estado: EstadoEspacio.OCUPADO },
      });

      return registro;
    });
  }

  async close(
    id: number,
    data: {
      horaSalida: Date;
      minutos: number;
      totalCobrado: number;
      tarifaId?: number | null;
      espacioId: number;
    },
  ) {
    return this.prisma.$transaction(async (tx) => {
      const registro = await tx.registroParqueo.update({
        where: { id },
        data: {
          horaSalida: data.horaSalida,
          minutos: data.minutos,
          totalCobrado: data.totalCobrado,
          tarifaId: data.tarifaId ?? null,
          estado: EstadoRegistro.CERRADO,
        },
        include: {
          vehiculo: {
            include: {
              tipoVehiculo: true,
              abonado: true,
            },
          },
          espacio: {
            include: {
              tipoVehiculo: true,
            },
          },
          tarifa: true,
        },
      });

      await tx.espacio.update({
        where: { id: data.espacioId },
        data: { estado: EstadoEspacio.DISPONIBLE },
      });

      return registro;
    });
  }

  async delete(id: number) {
    return this.prisma.registroParqueo.delete({
      where: { id },
    });
  }
}