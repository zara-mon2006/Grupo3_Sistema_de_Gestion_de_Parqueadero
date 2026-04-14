import { IsEnum, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { EstadoEspacio } from '@prisma/client';

export class CreateEspacioDto {
  @IsString()
  @IsNotEmpty()
  codigo!: string;

  @IsInt()
  @IsPositive()
  tipoVehiculoId!: number;

  @IsEnum(EstadoEspacio)
  estado!: EstadoEspacio;
}