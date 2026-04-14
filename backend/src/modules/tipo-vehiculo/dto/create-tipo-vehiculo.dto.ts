import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoVehiculoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsBoolean()
  requierePlaca!: boolean;
}
