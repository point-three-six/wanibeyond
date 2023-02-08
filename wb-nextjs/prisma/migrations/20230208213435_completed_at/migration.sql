/*
  Warnings:

  - You are about to drop the column `lastAdvance` on the `assignment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `assignment` DROP COLUMN `lastAdvance`,
    ADD COLUMN `completedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
