/*
  Warnings:

  - Added the required column `allowForks` to the `Deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateUpdated` to the `Deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPrivate` to the `Deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `deck` ADD COLUMN `allowForks` BOOLEAN NOT NULL,
    ADD COLUMN `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dateUpdated` DATETIME(3) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `isPrivate` BOOLEAN NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Deck_name_userId_idx` ON `Deck`(`name`, `userId`);

-- AddForeignKey
ALTER TABLE `Deck` ADD CONSTRAINT `Deck_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
