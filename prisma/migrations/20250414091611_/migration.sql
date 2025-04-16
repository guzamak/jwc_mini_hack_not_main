-- CreateEnum
CREATE TYPE "Prefix" AS ENUM ('นาย', 'นาง', 'นางสาว');

-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('ม_4', 'ม_5', 'ม_6', 'ปวช');

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "imageData" TEXT,
    "prefix" "Prefix",
    "firstname" TEXT,
    "surname" TEXT,
    "nickname" TEXT,
    "date" TIMESTAMP(3),
    "email" TEXT,
    "phone" TEXT,
    "province" TEXT,
    "grade" "Grade",
    "school" TEXT,
    "etc" TEXT,
    "ans" TEXT[],
    "checkbox" BOOLEAN,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_userId_key" ON "Form"("userId");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
