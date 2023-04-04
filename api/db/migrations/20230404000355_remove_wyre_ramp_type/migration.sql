/*
  Warnings:

  - The values [WYRE] on the enum `RampType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `destCurrency` on the `DepositOrder` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `DepositOrder` table. All the data in the column will be lost.
  - You are about to drop the column `orderType` on the `DepositOrder` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `DepositOrder` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseAmount` on the `DepositOrder` table. All the data in the column will be lost.
  - You are about to drop the column `reservation` on the `DepositOrder` table. All the data in the column will be lost.
  - You are about to drop the column `sourceAmount` on the `DepositOrder` table. All the data in the column will be lost.
  - You are about to drop the column `sourceCurrency` on the `DepositOrder` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `MintPurchase` table. All the data in the column will be lost.
  - You are about to drop the column `reservation` on the `MintPurchase` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethodId` on the `Ramp` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProviderType" ADD VALUE 'TWITCH';
ALTER TYPE "ProviderType" ADD VALUE 'EPIC_GAMES';

-- AlterEnum
BEGIN;
CREATE TYPE "RampType_new" AS ENUM ('COINBASE');
ALTER TABLE "Ramp" ALTER COLUMN "type" TYPE "RampType_new" USING ("type"::text::"RampType_new");
ALTER TABLE "DepositOrder" ALTER COLUMN "paymentType" TYPE "RampType_new" USING ("paymentType"::text::"RampType_new");
ALTER TYPE "RampType" RENAME TO "RampType_old";
ALTER TYPE "RampType_new" RENAME TO "RampType";
DROP TYPE "RampType_old";
COMMIT;

-- DropIndex
DROP INDEX "DepositOrder_orderId_key";

-- DropIndex
DROP INDEX "DepositOrder_reservation_key";

-- DropIndex
DROP INDEX "MintPurchase_orderId_key";

-- DropIndex
DROP INDEX "MintPurchase_reservation_key";

-- AlterTable
ALTER TABLE "DepositOrder" DROP COLUMN "destCurrency",
DROP COLUMN "orderId",
DROP COLUMN "orderType",
DROP COLUMN "paymentMethod",
DROP COLUMN "purchaseAmount",
DROP COLUMN "reservation",
DROP COLUMN "sourceAmount",
DROP COLUMN "sourceCurrency";

-- AlterTable
ALTER TABLE "MintPurchase" DROP COLUMN "orderId",
DROP COLUMN "reservation",
ALTER COLUMN "paymentType" SET DEFAULT 'MINTCREDIT';

-- AlterTable
ALTER TABLE "Ramp" DROP COLUMN "paymentMethodId";
