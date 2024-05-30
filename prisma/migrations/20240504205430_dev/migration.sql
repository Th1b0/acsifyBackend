/*
  Warnings:

  - Changed the type of `tickets` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "tickets",
ADD COLUMN     "tickets" INTEGER NOT NULL;
