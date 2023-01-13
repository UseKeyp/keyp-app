-- DropForeignKey
ALTER TABLE "OAuth" DROP CONSTRAINT "OAuth_userId_userProvider_fkey";

-- AlterTable
ALTER TABLE "OAuth" ALTER COLUMN "userProvider" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_userId_userProvider_fkey" FOREIGN KEY ("userId", "userProvider") REFERENCES "User"("id", "provider") ON DELETE SET NULL ON UPDATE CASCADE;
