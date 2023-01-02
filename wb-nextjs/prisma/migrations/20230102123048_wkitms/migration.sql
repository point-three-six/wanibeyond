/*
  Warnings:

  - Added the required column `characters` to the `WkItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wkitem` ADD COLUMN `characters` VARCHAR(191) NOT NULL;
