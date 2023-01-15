-- CreateEnum
CREATE TYPE "ClientAccessLevel" AS ENUM ('OWNER', 'EDITOR');

-- CreateEnum
CREATE TYPE "RampType" AS ENUM ('COINBASE', 'WYRE');

-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('CHESS', 'GOOGLE', 'DISCORD', 'TWITTER', 'APPLE', 'NATIVE', 'ETHEREUM');

-- CreateEnum
CREATE TYPE "OAuthConnectionType" AS ENUM ('TWITCH', 'COINBASE', 'DISCORD');

-- CreateEnum
CREATE TYPE "RampStatus" AS ENUM ('PENDING', 'COMPLETE', 'FAILED');

-- CreateEnum
CREATE TYPE "TxStatus" AS ENUM ('UNSUBMITTED', 'SUBMITTED', 'COMPLETE', 'FAILED');

-- CreateEnum
CREATE TYPE "MintPurchaseOrderStatus" AS ENUM ('RESERVATION', 'COMPLETE');

-- CreateEnum
CREATE TYPE "PromotionRewardType" AS ENUM ('MINT_CREDIT');

-- CreateEnum
CREATE TYPE "PromotionType" AS ENUM ('TWITCH_CONNECTION');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "provider" "ProviderType" NOT NULL,
    "username" TEXT,
    "address" TEXT,
    "locale" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mfa_enabled" BOOLEAN,
    "imageSrc" TEXT,
    "country" TEXT,
    "mintCredits" INTEGER NOT NULL DEFAULT 3,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "blocked" BOOLEAN,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "betaAccess" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("provider","id")
);

-- CreateTable
CREATE TABLE "Ramp" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userProvider" "ProviderType" NOT NULL,
    "userId" TEXT,
    "type" "RampType" NOT NULL,
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

-- CreateTable
CREATE TABLE "DepositOrder" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userProvider" "ProviderType" NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "paymentType" "RampType" NOT NULL,
    "status" "TxStatus" NOT NULL DEFAULT 'UNSUBMITTED',
    "sourceCurrency" TEXT,
    "sourceAmount" DOUBLE PRECISION,
    "purchaseAmount" DOUBLE PRECISION,
    "destCurrency" TEXT,
    "paymentMethod" TEXT,
    "orderType" TEXT,
    "orderId" TEXT,
    "reservation" TEXT,

    CONSTRAINT "DepositOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MintPurchase" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userProvider" "ProviderType" NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "gameEndTime" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL DEFAULT 'WYRE',
    "status" "RampStatus" NOT NULL DEFAULT 'PENDING',
    "orderStatus" "MintPurchaseOrderStatus",
    "orderId" TEXT,
    "reservation" TEXT,
    "transactionId" TEXT,

    CONSTRAINT "MintPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuth" (
    "state" TEXT NOT NULL,
    "codeChallenge" TEXT NOT NULL,
    "codeVerifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userProvider" "ProviderType" NOT NULL,
    "userId" TEXT,

    CONSTRAINT "OAuth_pkey" PRIMARY KEY ("state")
);

-- CreateTable
CREATE TABLE "ClientsOnDevelopers" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userProvider" "ProviderType" NOT NULL,
    "userId" TEXT NOT NULL,
    "oidcId" TEXT NOT NULL,
    "oidcType" INTEGER NOT NULL DEFAULT 7,
    "accessLevel" "ClientAccessLevel" NOT NULL,

    CONSTRAINT "ClientsOnDevelopers_pkey" PRIMARY KEY ("userId","oidcId")
);

-- CreateTable
CREATE TABLE "Oidc" (
    "id" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "grantId" TEXT,
    "userCode" TEXT,
    "uid" TEXT,
    "expiresAt" TIMESTAMP(3),
    "payload" JSONB NOT NULL,
    "disabled" BOOLEAN,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Oidc_pkey" PRIMARY KEY ("id","type")
);

-- CreateTable
CREATE TABLE "OAuthConnection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userProvider" "ProviderType" NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "OAuthConnectionType" NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "refreshToken" TEXT,
    "accessToken" TEXT NOT NULL,
    "expiration" TIMESTAMP(3),

    CONSTRAINT "OAuthConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RampWithdraw" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "RampStatus" NOT NULL DEFAULT 'PENDING',
    "toAddress" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionId" TEXT NOT NULL,
    "userProvider" "ProviderType" NOT NULL,
    "userId" TEXT,
    "rampId" TEXT NOT NULL,

    CONSTRAINT "RampWithdraw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "TxStatus" NOT NULL DEFAULT 'SUBMITTED',
    "gasLimit" INTEGER NOT NULL DEFAULT 0,
    "maxPriorityFeePerGas" INTEGER NOT NULL DEFAULT 0,
    "maxFeePerGas" INTEGER NOT NULL DEFAULT 0,
    "mintPurchaseId" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "oidcId" TEXT NOT NULL,
    "oidcType" INTEGER NOT NULL DEFAULT 7,
    "externalTransfer" BOOLEAN NOT NULL,
    "fromUserProvider" "ProviderType" NOT NULL,
    "toUserProvider" "ProviderType" NOT NULL,
    "collectionId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rewardType" "PromotionRewardType" NOT NULL DEFAULT 'MINT_CREDIT',
    "type" "PromotionType" NOT NULL,
    "mintCredits" INTEGER,
    "enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionsOnUsers" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userProvider" "ProviderType" NOT NULL,
    "userId" TEXT NOT NULL,
    "promotionId" INTEGER NOT NULL,

    CONSTRAINT "PromotionsOnUsers_pkey" PRIMARY KEY ("userId","promotionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DepositOrder_orderId_key" ON "DepositOrder"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "DepositOrder_reservation_key" ON "DepositOrder"("reservation");

-- CreateIndex
CREATE UNIQUE INDEX "MintPurchase_orderId_key" ON "MintPurchase"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "MintPurchase_reservation_key" ON "MintPurchase"("reservation");

-- CreateIndex
CREATE UNIQUE INDEX "MintPurchase_transactionId_key" ON "MintPurchase"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Oidc_uid_key" ON "Oidc"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "RampWithdraw_transactionId_key" ON "RampWithdraw"("transactionId");

-- AddForeignKey
ALTER TABLE "Ramp" ADD CONSTRAINT "Ramp_userId_userProvider_fkey" FOREIGN KEY ("userId", "userProvider") REFERENCES "User"("id", "provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepositOrder" ADD CONSTRAINT "DepositOrder_userId_userProvider_fkey" FOREIGN KEY ("userId", "userProvider") REFERENCES "User"("id", "provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MintPurchase" ADD CONSTRAINT "MintPurchase_userId_userProvider_fkey" FOREIGN KEY ("userId", "userProvider") REFERENCES "User"("id", "provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MintPurchase" ADD CONSTRAINT "MintPurchase_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_userId_userProvider_fkey" FOREIGN KEY ("userId", "userProvider") REFERENCES "User"("id", "provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsOnDevelopers" ADD CONSTRAINT "ClientsOnDevelopers_userId_userProvider_fkey" FOREIGN KEY ("userId", "userProvider") REFERENCES "User"("id", "provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsOnDevelopers" ADD CONSTRAINT "ClientsOnDevelopers_oidcId_oidcType_fkey" FOREIGN KEY ("oidcId", "oidcType") REFERENCES "Oidc"("id", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthConnection" ADD CONSTRAINT "OAuthConnection_userId_userProvider_fkey" FOREIGN KEY ("userId", "userProvider") REFERENCES "User"("id", "provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RampWithdraw" ADD CONSTRAINT "RampWithdraw_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RampWithdraw" ADD CONSTRAINT "RampWithdraw_userId_userProvider_fkey" FOREIGN KEY ("userId", "userProvider") REFERENCES "User"("id", "provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RampWithdraw" ADD CONSTRAINT "RampWithdraw_rampId_fkey" FOREIGN KEY ("rampId") REFERENCES "Ramp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_mintPurchaseId_fkey" FOREIGN KEY ("mintPurchaseId") REFERENCES "MintPurchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_oidcId_oidcType_fkey" FOREIGN KEY ("oidcId", "oidcType") REFERENCES "Oidc"("id", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_fromUserId_fromUserProvider_fkey" FOREIGN KEY ("fromUserId", "fromUserProvider") REFERENCES "User"("id", "provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_toUserId_toUserProvider_fkey" FOREIGN KEY ("toUserId", "toUserProvider") REFERENCES "User"("id", "provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionsOnUsers" ADD CONSTRAINT "PromotionsOnUsers_userId_userProvider_fkey" FOREIGN KEY ("userId", "userProvider") REFERENCES "User"("id", "provider") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionsOnUsers" ADD CONSTRAINT "PromotionsOnUsers_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
