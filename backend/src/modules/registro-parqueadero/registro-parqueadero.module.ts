import { Module } from '@nestjs/common';
import { RegistroParqueaderoController } from './controller/registro-parqueadero.controller';
import { RegistroParqueaderoService } from './service/registro-parqueadero.service';
import { RegistroParqueaderoRepository } from './repository/registro-parqueadero.repository';

@Module({
  controllers: [RegistroParqueaderoController],
  providers: [RegistroParqueaderoService, RegistroParqueaderoRepository],
  exports: [RegistroParqueaderoService],
})
export class RegistroParqueaderoModule {}