/*
  Warnings:

  - A unique constraint covering the columns `[userUid,address_type]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userUid]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `address_userUid_address_type_key` ON `address`(`userUid`, `address_type`);

-- CreateIndex
CREATE UNIQUE INDEX `customer_userUid_key` ON `customer`(`userUid`);
