/*
  Warnings:

  - You are about to drop the `assignments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `assignments` DROP FOREIGN KEY `assignments_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `assignments` DROP FOREIGN KEY `assignments_userId_fkey`;

-- DropTable
DROP TABLE `assignments`;

-- CreateTable
CREATE TABLE `Assignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `stage` INTEGER NOT NULL DEFAULT 1,
    `wasCorrect` BOOLEAN NOT NULL,
    `completedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Assignment_userId_itemId_idx`(`userId`, `itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
