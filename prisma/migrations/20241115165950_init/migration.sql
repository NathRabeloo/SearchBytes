/*
  Warnings:

  - You are about to drop the column `isCorrect` on the `Option` table. All the data in the column will be lost.
  - Added the required column `required` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Quiz` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "isCorrect";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "required" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
