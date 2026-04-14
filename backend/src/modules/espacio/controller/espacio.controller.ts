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
import { EspacioService } from '../service/espacio.service';
import { CreateEspacioDto } from '../dto/create-espacio.dto';
import { UpdateEspacioDto } from '../dto/update-espacio.dto';

@Controller('espacios')
export class EspacioController {
  constructor(private readonly espacioService: EspacioService) {}

  @Get()
  findAll() {
    return this.espacioService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.espacioService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateEspacioDto) {
    return this.espacioService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEspacioDto,
  ) {
    return this.espacioService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.espacioService.delete(id);
  }
}