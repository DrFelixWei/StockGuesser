/*
  Warnings:

  - You are about to drop the `StockSnapshot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "StockSnapshot";

-- CreateTable
CREATE TABLE "stocksnapshot" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateGenerated" TIMESTAMP(3) NOT NULL,
    "prices" JSONB NOT NULL,

    CONSTRAINT "stocksnapshot_pkey" PRIMARY KEY ("id")
);
