import { EstadoEspacio } from '@prisma/client';

export class EspacioEntity {
  id!: number;
  codigo!: string;
  tipoVehiculoId!: number;
  estado!: EstadoEspacio;
  createdAt!: Date;
  updatedAt!: Date;
}