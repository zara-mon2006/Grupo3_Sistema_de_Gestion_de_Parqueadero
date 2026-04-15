import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TipoVehiculoModule } from './modules/tipo-vehiculo/tipo-vehiculo.module';
import { TarifaModule } from './modules/tarifa/tarifa.module';
import { EspacioModule } from './modules/espacio/espacio.module';
import { AbonadoModule } from './modules/abonado/abonado.module';
import { VehiculoModule } from './modules/vehiculo/vehiculo.module';
import { RegistroParqueaderoModule } from './modules/registro-parqueadero/registro-parqueadero.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    TipoVehiculoModule,
    TarifaModule,
    EspacioModule,
    VehiculoModule,
    AbonadoModule,
    RegistroParqueaderoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

