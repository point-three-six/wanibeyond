/*
  Warnings:

  - Added the required column `characters` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `en` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` ADD COLUMN `characters` VARCHAR(191) NOT NULL,
    ADD COLUMN `en` VARCHAR(191) NOT NULL;
