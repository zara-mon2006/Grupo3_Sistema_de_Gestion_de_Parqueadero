import { Module } from '@nestjs/common';
import { TarifaController } from './controller/tarifa.controller';
import { TarifaService } from './service/tarifa.service';
import { TarifaRepository } from './repository/tarifa.repository';

@Module({
  controllers: [TarifaController],
  providers: [TarifaService, TarifaRepository],
  exports: [TarifaService],
})
export class TarifaModule {}

