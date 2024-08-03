-- CreateTable
CREATE TABLE "StockSnapshot" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateGenerated" TIMESTAMPTZ NOT NULL,
    "prices" JSONB NOT NULL,

    CONSTRAINT "StockSnapshot_pkey" PRIMARY KEY ("id")
);
