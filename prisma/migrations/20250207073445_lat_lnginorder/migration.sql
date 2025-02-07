/*
  Warnings:

  - You are about to alter the column `shipping_address` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `shipping_address` JSON NOT NULL;
