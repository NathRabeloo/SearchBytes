-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_quizId_fkey";

-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
