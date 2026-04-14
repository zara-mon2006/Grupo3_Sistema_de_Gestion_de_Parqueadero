import { ModalidadTarifa } from '@prisma/client';

export class TarifaEntity {
  id!: number;
  tipoVehiculoId!: number;
  modalidad!: ModalidadTarifa;
  valor!: number;
  fraccionMinutos?: number | null;
  activa!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}