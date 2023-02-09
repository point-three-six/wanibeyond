/*
  Warnings:

  - You are about to drop the `assignment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `assignment` DROP FOREIGN KEY `Assignment_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `assignment` DROP FOREIGN KEY `Assignment_userId_fkey`;

-- DropTable
DROP TABLE `assignment`;

-- CreateTable
CREATE TABLE `assignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `stage` INTEGER NOT NULL DEFAULT 1,
    `wasCorrect` BOOLEAN NOT NULL,
    `completedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `assignments_userId_itemId_idx`(`userId`, `itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assignments` ADD CONSTRAINT `assignments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignments` ADD CONSTRAINT `assignments_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
