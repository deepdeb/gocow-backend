-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` VARCHAR(191) NOT NULL,
    `userUid` VARCHAR(191) NOT NULL,
    `product_list` JSON NOT NULL,
    `order_total` DECIMAL(65, 30) NOT NULL,
    `offers` JSON NOT NULL,
    `shipping_address` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `delivery_agent_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `orders_order_id_key`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
