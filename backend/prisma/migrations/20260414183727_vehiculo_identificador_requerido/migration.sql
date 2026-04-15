/*
  Warnings:

  - Made the column `identificadorInterno` on table `Vehiculo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vehiculo" ALTER COLUMN "identificadorInterno" SET NOT NULL;
