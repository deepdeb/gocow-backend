/*
  Warnings:

  - A unique constraint covering the columns `[admin_id]` on the table `admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `active_area` (
    `active_area_id` INTEGER NOT NULL AUTO_INCREMENT,
    `locality_name` VARCHAR(191) NOT NULL,
    `pincode` VARCHAR(191) NOT NULL,
    `added_by` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `active_area_pincode_key`(`pincode`),
    PRIMARY KEY (`active_area_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `admin_admin_id_key` ON `admin`(`admin_id`);

-- AddForeignKey
ALTER TABLE `active_area` ADD CONSTRAINT `active_area_added_by_fkey` FOREIGN KEY (`added_by`) REFERENCES `admin`(`admin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
