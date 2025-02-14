/*
  Warnings:

  - Added the required column `offer_label` to the `offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `offer` ADD COLUMN `offer_label` VARCHAR(191) NOT NULL,
    MODIFY `category` VARCHAR(191) NULL,
    MODIFY `discount_type` VARCHAR(191) NULL;
