import { Module } from '@nestjs/common';
import { VehiculoController } from './controller/vehiculo.controller';
import { VehiculoService } from './service/vehiculo.service';
import { VehiculoRepository } from './repository/vehiculo.repository';

@Module({
  controllers: [VehiculoController],
  providers: [VehiculoService, VehiculoRepository],
  exports: [VehiculoService],
})
export class VehiculoModule {}