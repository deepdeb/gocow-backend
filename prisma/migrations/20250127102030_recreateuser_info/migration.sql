-- CreateTable
CREATE TABLE `user_info` (
    `user_info_id` INTEGER NOT NULL AUTO_INCREMENT,
    `userUid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `alternate_number` VARCHAR(191) NOT NULL,
    `eggetarian` BOOLEAN NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `family_member_count` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_info_userUid_key`(`userUid`),
    PRIMARY KEY (`user_info_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_info` ADD CONSTRAINT `user_info_userUid_fkey` FOREIGN KEY (`userUid`) REFERENCES `customer`(`userUid`) ON DELETE RESTRICT ON UPDATE CASCADE;
