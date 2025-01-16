/*
  Warnings:

  - Added the required column `userUid` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` ADD COLUMN `address_type` VARCHAR(191) NULL,
    ADD COLUMN `userUid` VARCHAR(191) NOT NULL;
