/*
  Warnings:

  - Added the required column `threadUserId` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "threadUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_threadUserId_fkey" FOREIGN KEY ("threadUserId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
