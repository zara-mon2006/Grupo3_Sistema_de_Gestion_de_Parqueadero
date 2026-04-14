import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TipoVehiculoService } from '../service/tipo-vehiculo.service';
import { CreateTipoVehiculoDto } from '../dto/create-tipo-vehiculo.dto';
import { UpdateTipoVehiculoDto } from '../dto/update-tipo-vehiculo.dto';

@Controller('tipos-vehiculo')
export class TipoVehiculoController {
  constructor(private readonly tipoVehiculoService: TipoVehiculoService) {}

  @Get()
  findAll() {
    return this.tipoVehiculoService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.tipoVehiculoService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateTipoVehiculoDto) {
    return this.tipoVehiculoService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTipoVehiculoDto,
  ) {
    return this.tipoVehiculoService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tipoVehiculoService.delete(id);
  }
}
