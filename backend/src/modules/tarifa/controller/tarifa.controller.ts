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
import { TarifaService } from '../service/tarifa.service';
import { CreateTarifaDto } from '../dto/create-tarifa.dto';
import { UpdateTarifaDto } from '../dto/update-tarifa.dto';

@Controller('tarifas')
export class TarifaController {
  constructor(private readonly tarifaService: TarifaService) {}

  @Get()
  findAll() {
    return this.tarifaService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.tarifaService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateTarifaDto) {
    return this.tarifaService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTarifaDto,
  ) {
    return this.tarifaService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tarifaService.delete(id);
  }
}