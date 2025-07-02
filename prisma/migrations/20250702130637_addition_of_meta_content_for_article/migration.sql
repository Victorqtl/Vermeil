/*
  Warnings:

  - Added the required column `metaDescription` to the `article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaTitle` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "article" ADD COLUMN     "metaDescription" TEXT NOT NULL,
ADD COLUMN     "metaTitle" TEXT NOT NULL;
