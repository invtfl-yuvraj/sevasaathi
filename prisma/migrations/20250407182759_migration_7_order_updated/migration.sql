/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `OrderService` will be added. If there are existing duplicate values, this will fail.
  - Made the column `orderId` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderService" DROP CONSTRAINT "OrderService_orderId_fkey";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "orderId" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderService" ALTER COLUMN "orderId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrderService_orderId_key" ON "OrderService"("orderId");

-- AddForeignKey
ALTER TABLE "OrderService" ADD CONSTRAINT "OrderService_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
