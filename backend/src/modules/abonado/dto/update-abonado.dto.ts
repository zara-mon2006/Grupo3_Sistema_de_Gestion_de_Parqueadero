import { PartialType } from '@nestjs/mapped-types';
import { CreateAbonadoDto } from './create-abonado.dto';

export class UpdateAbonadoDto extends PartialType(CreateAbonadoDto) {}