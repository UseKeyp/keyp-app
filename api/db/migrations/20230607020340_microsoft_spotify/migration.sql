-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProviderType" ADD VALUE 'FACEBOOK';
ALTER TYPE "ProviderType" ADD VALUE 'SPOTIFY';
ALTER TYPE "ProviderType" ADD VALUE 'MICROSOFT';

-- DropForeignKey
ALTER TABLE "ClientsOnDevelopers" DROP CONSTRAINT "ClientsOnDevelopers_oidcId_oidcType_fkey";

-- DropForeignKey
ALTER TABLE "ClientsOnDevelopers" DROP CONSTRAINT "ClientsOnDevelopers_userId_userProvider_fkey";

-- AddForeignKey
ALTER TABLE "ClientsOnDevelopers" ADD CONSTRAINT "ClientsOnDevelopers_userId_userProvider_fkey" FOREIGN KEY ("userId", "userProvider") REFERENCES "User"("id", "provider") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsOnDevelopers" ADD CONSTRAINT "ClientsOnDevelopers_oidcId_oidcType_fkey" FOREIGN KEY ("oidcId", "oidcType") REFERENCES "Oidc"("id", "type") ON DELETE CASCADE ON UPDATE CASCADE;
