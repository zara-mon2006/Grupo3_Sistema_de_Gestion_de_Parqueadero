export class AbonadoEntity {
  id!: number;
  nombre!: string;
  documento!: string;
  telefono?: string | null;
  fechaInicio!: Date;
  fechaFin!: Date;
  activo!: boolean;
  vehiculoId!: number;
  createdAt!: Date;
  updatedAt!: Date;
}