/*
  Warnings:

  - You are about to drop the column `categories` on the `Event` table. All the data in the column will be lost.
  - Made the column `cover` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "categories",
ADD COLUMN     "category" TEXT,
ALTER COLUMN "endData" SET DATA TYPE TEXT,
ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "cover" SET NOT NULL;
