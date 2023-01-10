-- CreateEnum
CREATE TYPE "ClientAccessLevel" AS ENUM ('OWNER', 'EDITOR');

-- CreateTable
CREATE TABLE "ClientsOnDevelopers" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
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
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "oidcId" TEXT NOT NULL,
    "oidcType" INTEGER NOT NULL DEFAULT 7,
    "externalTransfer" BOOLEAN NOT NULL,
    "collectionId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Oidc_uid_key" ON "Oidc"("uid");

-- AddForeignKey
ALTER TABLE "ClientsOnDevelopers" ADD CONSTRAINT "ClientsOnDevelopers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsOnDevelopers" ADD CONSTRAINT "ClientsOnDevelopers_oidcId_oidcType_fkey" FOREIGN KEY ("oidcId", "oidcType") REFERENCES "Oidc"("id", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_oidcId_oidcType_fkey" FOREIGN KEY ("oidcId", "oidcType") REFERENCES "Oidc"("id", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
