import { Module } from '@nestjs/common';
import { EspacioController } from './controller/espacio.controller';
import { EspacioService } from './service/espacio.service';
import { EspacioRepository } from './repository/espacio.repository';

@Module({
  controllers: [EspacioController],
  providers: [EspacioService, EspacioRepository],
  exports: [EspacioService],
})
export class EspacioModule {}