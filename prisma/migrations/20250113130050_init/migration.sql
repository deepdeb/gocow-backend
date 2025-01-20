-- CreateTable
CREATE TABLE `customer` (
    `userUid` VARCHAR(191) NOT NULL,
    `phone_num` VARCHAR(191) NOT NULL,
    `customer_name` VARCHAR(191) NULL,
    `customer_type` VARCHAR(191) NULL,
    `wallet_balance` DECIMAL(65, 30) NOT NULL DEFAULT 0.000,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `customer_phone_num_key`(`phone_num`),
    PRIMARY KEY (`userUid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(191) NULL,
    `product_image` VARCHAR(191) NULL,
    `availability` VARCHAR(191) NULL,
    `product_description` VARCHAR(191) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `unit` VARCHAR(191) NULL,
    `package` VARCHAR(191) NULL,
    `catch_phrase` VARCHAR(191) NULL,
    `price` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales` (
    `sales_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sale_date` DATETIME(3) NOT NULL,
    `product_id` INTEGER NOT NULL,
    `sold_price` DECIMAL(65, 30) NULL,
    `sold_quantity` DECIMAL(65, 30) NULL,
    `customer_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`sales_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offers` (
    `offer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `offer_amount` DECIMAL(65, 30) NULL,
    `offer_type` VARCHAR(191) NULL,
    `offer_code` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`offer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dailyWaste` (
    `daily_waste_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `waste_date` DATETIME(3) NULL,
    `waste_price` DECIMAL(65, 30) NULL,
    `waste_quantity` DECIMAL(65, 30) NULL,
    `waste_reason` VARCHAR(191) NULL,

    PRIMARY KEY (`daily_waste_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dailyInventory` (
    `daily_inventory_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `inventory_price` DECIMAL(65, 30) NULL,
    `quantity` DECIMAL(65, 30) NULL,
    `date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`daily_inventory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `address_id` INTEGER NOT NULL AUTO_INCREMENT,
    `flat` VARCHAR(191) NULL,
    `house` VARCHAR(191) NULL,
    `apartment` VARCHAR(191) NULL,
    `locality` VARCHAR(191) NULL,
    `area` VARCHAR(191) NULL,
    `landmark` VARCHAR(191) NULL,
    `coordinate` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`address_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
