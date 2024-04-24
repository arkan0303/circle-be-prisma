/*
  Warnings:

  - You are about to drop the column `image` on the `Thread` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "ThreadImage" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "threadId" INTEGER NOT NULL,

    CONSTRAINT "ThreadImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThreadImage" ADD CONSTRAINT "ThreadImage_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
