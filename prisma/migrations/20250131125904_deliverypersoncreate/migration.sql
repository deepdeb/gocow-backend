-- CreateTable
CREATE TABLE `delivery_person_details` (
    `delivery_person_id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone_num` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `details` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `delivery_person_details_phone_num_key`(`phone_num`),
    PRIMARY KEY (`delivery_person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
