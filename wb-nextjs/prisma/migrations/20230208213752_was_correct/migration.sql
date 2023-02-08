/*
  Warnings:

  - Added the required column `wasCorrect` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assignment` ADD COLUMN `wasCorrect` BOOLEAN NOT NULL;
