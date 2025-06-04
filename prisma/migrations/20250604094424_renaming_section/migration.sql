/*
  Warnings:

  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_articleId_fkey";

-- DropTable
DROP TABLE "product";

-- CreateTable
CREATE TABLE "section" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
