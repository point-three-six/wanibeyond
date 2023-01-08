/*
  Warnings:

  - You are about to drop the column `srsLevel` on the `assignment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `assignment` DROP COLUMN `srsLevel`,
    ADD COLUMN `stage` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `Item_deckId_en_characters_idx` ON `Item`(`deckId`, `en`, `characters`);

-- CreateIndex
CREATE INDEX `WkItem_en_characters_idx` ON `WkItem`(`en`, `characters`);
