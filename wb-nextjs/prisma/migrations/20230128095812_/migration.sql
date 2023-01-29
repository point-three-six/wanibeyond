/*
  Warnings:

  - Added the required column `levelSystem` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `deck` ADD COLUMN `levelSystem` VARCHAR(191) NOT NULL;
