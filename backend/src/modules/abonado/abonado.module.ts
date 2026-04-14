import { Module } from '@nestjs/common';
import { AbonadoController } from './controller/abonado.controller';
import { AbonadoService } from './service/abonado.service';
import { AbonadoRepository } from './repository/abonado.repository';

@Module({
  controllers: [AbonadoController],
  providers: [AbonadoService, AbonadoRepository],
  exports: [AbonadoService],
})
export class AbonadoModule {}