/*
  Warnings:

  - You are about to drop the column `alreadySumbit` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "alreadySumbit",
ADD COLUMN     "alreadySubmit" BOOLEAN;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmation" BOOLEAN;
