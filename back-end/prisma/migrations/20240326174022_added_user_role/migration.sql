/*
  Warnings:

  - Made the column `localization` on table `Arena` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Arena" ALTER COLUMN "localization" SET NOT NULL;
