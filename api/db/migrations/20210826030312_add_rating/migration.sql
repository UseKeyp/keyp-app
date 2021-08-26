/*
  Warnings:

  - Added the required column `country` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSrc` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blackMasterTitle` to the `Treasure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whiteMasterTitle` to the `Treasure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "imageSrc" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Treasure" ADD COLUMN     "blackMasterTitle" TEXT NOT NULL,
ADD COLUMN     "whiteMasterTitle" TEXT NOT NULL;
