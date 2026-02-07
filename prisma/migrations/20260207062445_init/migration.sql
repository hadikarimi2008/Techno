-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('Phones', 'laptops', 'tablets', 'watches');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "colors" TEXT[],
    "category" "ProductCategory" NOT NULL,
    "quantity" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
