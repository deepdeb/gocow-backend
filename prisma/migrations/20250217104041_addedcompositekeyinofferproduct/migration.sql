/*
  Warnings:

  - A unique constraint covering the columns `[offer_id,product_id]` on the table `offer_product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `offer_product_offer_id_product_id_key` ON `offer_product`(`offer_id`, `product_id`);
