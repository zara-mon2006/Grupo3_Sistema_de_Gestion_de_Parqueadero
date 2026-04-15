import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateRegistroParqueaderoDto {
  @IsOptional()
  @IsDateString()
  horaSalida?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  tarifaId?: number;
}