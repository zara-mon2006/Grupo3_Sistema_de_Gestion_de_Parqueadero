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
import { AbonadoService } from '../service/abonado.service';
import { CreateAbonadoDto } from '../dto/create-abonado.dto';
import { UpdateAbonadoDto } from '../dto/update-abonado.dto';

@Controller('abonados')
export class AbonadoController {
  constructor(private readonly abonadoService: AbonadoService) {}

  @Get()
  findAll() {
    return this.abonadoService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.abonadoService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateAbonadoDto) {
    return this.abonadoService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAbonadoDto,
  ) {
    return this.abonadoService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.abonadoService.delete(id);
  }
}