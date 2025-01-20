-- CreateTable
CREATE TABLE `address` (
    `address_id` INTEGER NOT NULL AUTO_INCREMENT,
    `userUid` VARCHAR(191) NOT NULL,
    `flat_house_apartment` VARCHAR(191) NULL,
    `locality_area_landmark` VARCHAR(191) NULL,
    `coordinate` VARCHAR(191) NULL,
    `address_type` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`address_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
