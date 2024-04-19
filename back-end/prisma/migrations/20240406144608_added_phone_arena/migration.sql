/*
  Warnings:

  - Added the required column `phone` to the `Arena` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Arena" ADD COLUMN     "phone" TEXT NOT NULL;
