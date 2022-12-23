-- AlterTable
ALTER TABLE `deck` MODIFY `allowForks` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `isPrivate` BOOLEAN NOT NULL DEFAULT false;
