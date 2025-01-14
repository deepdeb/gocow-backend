-- AlterTable
ALTER TABLE `customer` MODIFY `customer_name` VARCHAR(191) NULL,
    MODIFY `customer_type` VARCHAR(191) NULL,
    MODIFY `wallet_balance` DECIMAL(65, 30) NOT NULL DEFAULT 0.00;
