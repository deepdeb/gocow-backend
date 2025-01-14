-- AlterTable
ALTER TABLE `address` MODIFY `coordinate` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `dailyinventory` MODIFY `inventory_price` DECIMAL(65, 30) NULL,
    MODIFY `quantity` DECIMAL(65, 30) NULL,
    MODIFY `date` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `dailywaste` MODIFY `waste_date` DATETIME(3) NULL,
    MODIFY `waste_price` DECIMAL(65, 30) NULL,
    MODIFY `waste_quantity` DECIMAL(65, 30) NULL,
    MODIFY `waste_reason` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `offers` MODIFY `offer_amount` DECIMAL(65, 30) NULL,
    MODIFY `offer_type` VARCHAR(191) NULL,
    MODIFY `offer_code` VARCHAR(191) NULL,
    MODIFY `is_active` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `is_deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `product` MODIFY `product_name` VARCHAR(191) NULL,
    MODIFY `product_image` VARCHAR(191) NULL,
    MODIFY `availability` VARCHAR(191) NULL,
    MODIFY `product_description` VARCHAR(191) NULL,
    MODIFY `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `unit` VARCHAR(191) NULL,
    MODIFY `package` VARCHAR(191) NULL,
    MODIFY `catch_phrase` VARCHAR(191) NULL,
    MODIFY `price` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `sales` MODIFY `sold_price` DECIMAL(65, 30) NULL,
    MODIFY `sold_quantity` DECIMAL(65, 30) NULL,
    MODIFY `customer_id` VARCHAR(191) NULL;

-- RenameIndex
ALTER TABLE `customer` RENAME INDEX `Customer_phone_num_key` TO `customer_phone_num_key`;
