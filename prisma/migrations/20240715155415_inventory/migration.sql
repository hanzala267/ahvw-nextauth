-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "partName" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "costPrice" DOUBLE PRECISION NOT NULL,
    "sellPrice" DOUBLE PRECISION NOT NULL,
    "totalStock" INTEGER NOT NULL,
    "partDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);
