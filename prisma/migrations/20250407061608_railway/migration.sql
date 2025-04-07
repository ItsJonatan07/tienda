/*
  Warnings:

  - Added the required column `actualizadoEn` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Producto` ADD COLUMN `actualizadoEn` DATETIME(3) NOT NULL;
