/*
  Warnings:

  - You are about to drop the column `dateGenerated` on the `stocksnapshot` table. All the data in the column will be lost.
  - Added the required column `dategenerated` to the `stocksnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stocksnapshot" DROP COLUMN "dateGenerated",
ADD COLUMN     "dategenerated" TIMESTAMP(3) NOT NULL;
