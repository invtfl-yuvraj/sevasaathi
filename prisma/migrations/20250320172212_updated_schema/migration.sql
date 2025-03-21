/*
  Warnings:

  - The values [WORKER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `workerId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `workerId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `workerId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `workerId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Worker` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[CaptainId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CaptainId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CaptainId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'CAPTAIN', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_workerId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_workerId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_workerId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_workerId_fkey";

-- DropForeignKey
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_userId_fkey";

-- DropIndex
DROP INDEX "Location_workerId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "workerId",
ADD COLUMN     "CaptainId" TEXT;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "workerId",
ADD COLUMN     "CaptainId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "workerId",
ADD COLUMN     "CaptainId" TEXT;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "workerId",
ADD COLUMN     "CaptainId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "verifyCode" TEXT,
ADD COLUMN     "verifyCodeExpiry" TEXT,
ADD COLUMN     "zipcode" TEXT;

-- DropTable
DROP TABLE "Worker";

-- CreateTable
CREATE TABLE "Captain" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT,
    "availability" BOOLEAN NOT NULL DEFAULT false,
    "experience" INTEGER NOT NULL,
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Captain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Captain_userId_key" ON "Captain"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_CaptainId_key" ON "Location"("CaptainId");

-- AddForeignKey
ALTER TABLE "Captain" ADD CONSTRAINT "Captain_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Captain" ADD CONSTRAINT "Captain_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_CaptainId_fkey" FOREIGN KEY ("CaptainId") REFERENCES "Captain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_CaptainId_fkey" FOREIGN KEY ("CaptainId") REFERENCES "Captain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_CaptainId_fkey" FOREIGN KEY ("CaptainId") REFERENCES "Captain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_CaptainId_fkey" FOREIGN KEY ("CaptainId") REFERENCES "Captain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
