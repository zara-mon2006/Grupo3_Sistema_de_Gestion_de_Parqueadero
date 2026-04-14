import { Module } from '@nestjs/common';
import { TipoVehiculoController } from './controller/tipo-vehiculo.controller';
import { TipoVehiculoService } from './service/tipo-vehiculo.service';
import { TipoVehiculoRepository } from './repository/tipo-vehiculo.repository';

@Module({
  controllers: [TipoVehiculoController],
  providers: [TipoVehiculoService, TipoVehiculoRepository],
  exports: [TipoVehiculoService],
})
export class TipoVehiculoModule {}
