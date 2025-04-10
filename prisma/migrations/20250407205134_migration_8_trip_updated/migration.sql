/*
  Warnings:

  - You are about to drop the column `CaptainId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `CaptainId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `CaptainId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `CaptainId` on the `Rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[captainId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `captainId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Made the column `orderId` on table `OrderService` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `captainId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'ARRIVED', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_CaptainId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_CaptainId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_CaptainId_fkey";

-- DropForeignKey
ALTER TABLE "OrderService" DROP CONSTRAINT "OrderService_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_CaptainId_fkey";

-- DropIndex
DROP INDEX "Location_CaptainId_key";

-- DropIndex
DROP INDEX "OrderService_orderId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "CaptainId",
ADD COLUMN     "captainId" TEXT;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "CaptainId",
ADD COLUMN     "captainId" TEXT NOT NULL,
ADD COLUMN     "city" TEXT;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "CaptainId",
ADD COLUMN     "captainId" TEXT;

-- AlterTable
ALTER TABLE "OrderService" ALTER COLUMN "orderId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "CaptainId",
ADD COLUMN     "captainId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT;

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "captainId" TEXT,
    "status" "TripStatus" NOT NULL DEFAULT 'PENDING',
    "captainLatitude" DOUBLE PRECISION,
    "captainLongitude" DOUBLE PRECISION,
    "distanceToUser" DOUBLE PRECISION,
    "lastLocationUpdate" TIMESTAMP(3),
    "pickupAddress" TEXT,
    "dropoffAddress" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "orderId" TEXT,
    "bookingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationTracking" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "distanceToUser" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LocationTracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trip_orderId_key" ON "Trip"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_bookingId_key" ON "Trip"("bookingId");

-- CreateIndex
CREATE INDEX "Trip_userId_idx" ON "Trip"("userId");

-- CreateIndex
CREATE INDEX "Trip_captainId_idx" ON "Trip"("captainId");

-- CreateIndex
CREATE INDEX "Trip_status_idx" ON "Trip"("status");

-- CreateIndex
CREATE INDEX "LocationTracking_tripId_idx" ON "LocationTracking"("tripId");

-- CreateIndex
CREATE INDEX "LocationTracking_userId_idx" ON "LocationTracking"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_captainId_key" ON "Location"("captainId");

-- AddForeignKey
ALTER TABLE "OrderService" ADD CONSTRAINT "OrderService_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "Captain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "Captain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "Captain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationTracking" ADD CONSTRAINT "LocationTracking_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationTracking" ADD CONSTRAINT "LocationTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "Captain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
