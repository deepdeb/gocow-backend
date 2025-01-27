/*
  Warnings:

  - You are about to drop the `user_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_info` DROP FOREIGN KEY `user_info_userUid_fkey`;

-- DropTable
DROP TABLE `user_info`;
