/*
  Warnings:

  - You are about to drop the column `lastProgress` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `srsLevel` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_userId_fkey`;

-- AlterTable
ALTER TABLE `deck` ADD COLUMN `threadUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `lastProgress`,
    DROP COLUMN `srsLevel`,
    DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `Assignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `srsLevel` INTEGER NOT NULL DEFAULT 0,
    `lastAdvance` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Assignment_userId_itemId_idx`(`userId`, `itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `item` RENAME INDEX `Item_deckId_fkey` TO `Item_deckId_idx`;
