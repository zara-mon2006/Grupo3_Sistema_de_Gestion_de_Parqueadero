import { IsInt, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class CreateVehiculoDto {
  @IsOptional()
  @IsString()
  @Length(1, 10)
  placa?: string;

  @IsInt()
  @IsPositive()
  tipoVehiculoId!: number;
}