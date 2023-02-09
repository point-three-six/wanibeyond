-- RenameIndex
ALTER TABLE `assignment` RENAME INDEX `Assignment_itemId_fkey` TO `Assignment_itemId_idx`;

-- RenameIndex
ALTER TABLE `deck` RENAME INDEX `Deck_userId_fkey` TO `Deck_userId_idx`;
