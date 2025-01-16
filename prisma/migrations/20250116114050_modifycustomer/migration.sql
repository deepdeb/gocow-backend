/*
  Warnings:

  - A unique constraint covering the columns `[userUid]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `customer_userUid_key` ON `customer`(`userUid`);
