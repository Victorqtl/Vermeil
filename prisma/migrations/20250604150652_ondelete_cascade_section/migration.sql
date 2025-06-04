-- DropForeignKey
ALTER TABLE "section" DROP CONSTRAINT "section_articleId_fkey";

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
