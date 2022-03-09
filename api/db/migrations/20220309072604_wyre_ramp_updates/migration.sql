/*
  Warnings:

  - You are about to drop the column `accessTokenCoinbase` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `coinbaseWithdrawAddress` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `emailCoinbase` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `emailWyre` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenCoinbase` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `wyreWithdrawAddress` on the `Member` table. All the data in the column will be lost.
  - Changed the type of `ramp` on the `RampWithdraw` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RampType" AS ENUM ('COINBASE', 'WYRE');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "accessTokenCoinbase",
DROP COLUMN "coinbaseWithdrawAddress",
DROP COLUMN "emailCoinbase",
DROP COLUMN "emailWyre",
DROP COLUMN "refreshTokenCoinbase",
DROP COLUMN "wyreWithdrawAddress";

-- AlterTable
ALTER TABLE "RampWithdraw" DROP COLUMN "ramp",
ADD COLUMN     "ramp" "RampType" NOT NULL;

-- DropEnum
DROP TYPE "Ramp";

-- CreateTable
CREATE TABLE "Ramp" (
    "id" TEXT NOT NULL,
    "memberId" TEXT,
    "email" TEXT,
    "address" TEXT,
    "accountId" TEXT,
    "accountNickname" TEXT,
    "mask" TEXT,
    "isoCurrencyCode" TEXT,
    "itemId" TEXT,
    "verificationStatus" TEXT,
    "paymentMethodId" TEXT,
    "accessToken" TEXT,
    "refreshToken" TEXT,

    CONSTRAINT "Ramp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ramp" ADD CONSTRAINT "Ramp_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
