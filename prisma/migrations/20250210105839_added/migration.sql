/*
  Warnings:

  - Made the column `delivery_agent_id` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `delivery_agent_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_delivery_agent_id_fkey` FOREIGN KEY (`delivery_agent_id`) REFERENCES `delivery_person_details`(`delivery_person_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
