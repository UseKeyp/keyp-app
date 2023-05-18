-- AlterEnum
ALTER TYPE "ProviderType" ADD VALUE 'SPOTIFY';

-- DropForeignKey
ALTER TABLE "ClientsOnDevelopers" DROP CONSTRAINT "ClientsOnDevelopers_oidcId_oidcType_fkey";

-- DropForeignKey
ALTER TABLE "ClientsOnDevelopers" DROP CONSTRAINT "ClientsOnDevelopers_userId_userProvider_fkey";

-- AddForeignKey
ALTER TABLE "ClientsOnDevelopers" ADD CONSTRAINT "ClientsOnDevelopers_userId_userProvider_fkey" FOREIGN KEY ("userId", "userProvider") REFERENCES "User"("id", "provider") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsOnDevelopers" ADD CONSTRAINT "ClientsOnDevelopers_oidcId_oidcType_fkey" FOREIGN KEY ("oidcId", "oidcType") REFERENCES "Oidc"("id", "type") ON DELETE CASCADE ON UPDATE CASCADE;
