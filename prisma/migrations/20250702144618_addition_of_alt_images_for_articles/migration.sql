/*
  Warnings:

  - Added the required column `heroImageAlt` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "article" ADD COLUMN     "heroImageAlt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "section" ADD COLUMN     "imageAlt" TEXT;
