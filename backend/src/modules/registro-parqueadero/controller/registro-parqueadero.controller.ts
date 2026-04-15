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
import { CreateRegistroParqueaderoDto } from '../dto/create-registro-parqueadero.dto';
import { UpdateRegistroParqueaderoDto } from '../dto/update-registro-parqueadero.dto';
import { RegistroParqueaderoService } from '../service/registro-parqueadero.service';

@Controller('registros-parqueadero')
export class RegistroParqueaderoController {
  constructor(
    private readonly registroParqueaderoService: RegistroParqueaderoService,
  ) {}

  @Get()
  findAll() {
    return this.registroParqueaderoService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.registroParqueaderoService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateRegistroParqueaderoDto) {
    return this.registroParqueaderoService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRegistroParqueaderoDto,
  ) {
    return this.registroParqueaderoService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.registroParqueaderoService.delete(id);
  }
}