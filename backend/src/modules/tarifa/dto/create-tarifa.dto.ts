import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ModalidadTarifa } from '@prisma/client';

export class CreateTarifaDto {
  @IsInt()
  @IsPositive()
  tipoVehiculoId!: number;

  @IsEnum(ModalidadTarifa)
  modalidad!: ModalidadTarifa;

  @IsNumber()
  @IsPositive()
  valor!: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  fraccionMinutos?: number;

  @IsBoolean()
  activa!: boolean;
}