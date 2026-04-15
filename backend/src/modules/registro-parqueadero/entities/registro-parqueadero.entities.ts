import { EstadoRegistro } from '@prisma/client';

export class RegistroParqueaderoEntity {
  id!: number;
  vehiculoId!: number;
  espacioId!: number;
  tarifaId?: number | null;
  horaEntrada!: Date;
  horaSalida?: Date | null;
  minutos?: number | null;
  totalCobrado?: string | null;
  esAbonado!: boolean;
  estado!: EstadoRegistro;
  createdAt!: Date;
  updatedAt!: Date;
}