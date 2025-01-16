/*
  Warnings:

  - A unique constraint covering the columns `[userUid,address_type]` on the table `address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `address_userUid_address_type_key` ON `address`(`userUid`, `address_type`);
