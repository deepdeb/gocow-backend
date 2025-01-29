-- AlterTable
ALTER TABLE `product` ADD COLUMN `updated_at` DATETIME(3) NULL,
    ADD COLUMN `updated_by` VARCHAR(191) NULL;
