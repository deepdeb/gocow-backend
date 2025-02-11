-- AlterTable
ALTER TABLE `delivery_person_details` ADD COLUMN `aadhar` VARCHAR(191) NULL,
    ADD COLUMN `driving_license` VARCHAR(191) NULL,
    ADD COLUMN `pan` VARCHAR(191) NULL,
    ADD COLUMN `photo` VARCHAR(191) NULL,
    ADD COLUMN `vehicle_image` VARCHAR(191) NULL,
    ADD COLUMN `vehicle_number` VARCHAR(191) NULL;
