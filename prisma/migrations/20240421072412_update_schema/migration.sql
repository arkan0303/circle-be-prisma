/*
  Warnings:

  - You are about to drop the column `threadUserId` on the `Thread` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_threadUserId_fkey";

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "threadUserId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profileUserId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
