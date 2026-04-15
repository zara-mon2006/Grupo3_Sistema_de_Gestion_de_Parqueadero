import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';

export class CreateRegistroParqueaderoDto {
  @IsInt()
  @IsPositive()
  vehiculoId!: number;

  @IsInt()
  @IsPositive()
  espacioId!: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  tarifaId?: number;

  @IsOptional()
  @IsDateString()
  horaEntrada?: string;
}