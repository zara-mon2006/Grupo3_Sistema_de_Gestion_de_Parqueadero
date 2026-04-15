export class VehiculoEntity {
  id!: number;
  placa?: string | null;
  identificadorInterno!: string;
  tipoVehiculoId!: number;
  createdAt!: Date;
  updatedAt!: Date;
}