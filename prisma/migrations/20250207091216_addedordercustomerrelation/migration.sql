-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_userUid_fkey` FOREIGN KEY (`userUid`) REFERENCES `customer`(`userUid`) ON DELETE RESTRICT ON UPDATE CASCADE;
