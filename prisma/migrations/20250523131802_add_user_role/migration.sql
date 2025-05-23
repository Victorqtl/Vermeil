/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "isAdmin",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
