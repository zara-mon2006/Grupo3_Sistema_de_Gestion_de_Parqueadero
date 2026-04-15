import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateVehiculoDto {
  @IsOptional()
  @IsString()
  @Length(1, 10)
  placa?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  identificadorInterno!: string;

  @IsInt()
  @IsPositive()
  tipoVehiculoId!: number;
}