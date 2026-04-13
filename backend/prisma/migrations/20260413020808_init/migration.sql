-- CreateEnum
CREATE TYPE "EstadoEspacio" AS ENUM ('DISPONIBLE', 'OCUPADO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "EstadoRegistro" AS ENUM ('ABIERTO', 'CERRADO');

-- CreateEnum
CREATE TYPE "ModalidadTarifa" AS ENUM ('HORA', 'FRACCION', 'PLANA', 'MENSUAL');

-- CreateTable
CREATE TABLE "TipoVehiculo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "requierePlaca" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipoVehiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehiculo" (
    "id" SERIAL NOT NULL,
    "placa" TEXT,
    "identificadorInterno" TEXT,
    "tipoVehiculoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarifa" (
    "id" SERIAL NOT NULL,
    "tipoVehiculoId" INTEGER NOT NULL,
    "modalidad" "ModalidadTarifa" NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "fraccionMinutos" INTEGER,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarifa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Espacio" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "tipoVehiculoId" INTEGER NOT NULL,
    "estado" "EstadoEspacio" NOT NULL DEFAULT 'DISPONIBLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Espacio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abonado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "telefono" TEXT,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "vehiculoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Abonado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroParqueo" (
    "id" SERIAL NOT NULL,
    "vehiculoId" INTEGER NOT NULL,
    "espacioId" INTEGER NOT NULL,
    "tarifaId" INTEGER,
    "horaEntrada" TIMESTAMP(3) NOT NULL,
    "horaSalida" TIMESTAMP(3),
    "minutos" INTEGER,
    "totalCobrado" DECIMAL(10,2),
    "esAbonado" BOOLEAN NOT NULL DEFAULT false,
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'ABIERTO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegistroParqueo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TipoVehiculo_nombre_key" ON "TipoVehiculo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_placa_key" ON "Vehiculo"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_identificadorInterno_key" ON "Vehiculo"("identificadorInterno");

-- CreateIndex
CREATE UNIQUE INDEX "Espacio_codigo_key" ON "Espacio"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Abonado_documento_key" ON "Abonado"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "Abonado_vehiculoId_key" ON "Abonado"("vehiculoId");

-- AddForeignKey
ALTER TABLE "Vehiculo" ADD CONSTRAINT "Vehiculo_tipoVehiculoId_fkey" FOREIGN KEY ("tipoVehiculoId") REFERENCES "TipoVehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarifa" ADD CONSTRAINT "Tarifa_tipoVehiculoId_fkey" FOREIGN KEY ("tipoVehiculoId") REFERENCES "TipoVehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Espacio" ADD CONSTRAINT "Espacio_tipoVehiculoId_fkey" FOREIGN KEY ("tipoVehiculoId") REFERENCES "TipoVehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abonado" ADD CONSTRAINT "Abonado_vehiculoId_fkey" FOREIGN KEY ("vehiculoId") REFERENCES "Vehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroParqueo" ADD CONSTRAINT "RegistroParqueo_vehiculoId_fkey" FOREIGN KEY ("vehiculoId") REFERENCES "Vehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroParqueo" ADD CONSTRAINT "RegistroParqueo_espacioId_fkey" FOREIGN KEY ("espacioId") REFERENCES "Espacio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroParqueo" ADD CONSTRAINT "RegistroParqueo_tarifaId_fkey" FOREIGN KEY ("tarifaId") REFERENCES "Tarifa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
