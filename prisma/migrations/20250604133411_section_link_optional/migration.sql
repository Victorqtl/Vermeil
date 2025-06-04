/*
  Warnings:

  - Made the column `excerpt` on table `article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "article" ALTER COLUMN "excerpt" SET NOT NULL;

-- AlterTable
ALTER TABLE "section" ALTER COLUMN "link" DROP NOT NULL;
