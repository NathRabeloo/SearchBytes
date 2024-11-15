/*
  Warnings:

  - You are about to drop the column `correct` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answerType` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correct",
ADD COLUMN     "answerType" TEXT NOT NULL,
ADD COLUMN     "correctAnswer" INTEGER;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "theme" TEXT NOT NULL;

-- DropTable
DROP TABLE "Option";

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
