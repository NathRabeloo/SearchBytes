-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Enquete" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "disciplina" TEXT NOT NULL,

    CONSTRAINT "Enquete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pergunta" (
    "id" SERIAL NOT NULL,
    "pergunta" TEXT NOT NULL,
    "enqueteId" INTEGER NOT NULL,

    CONSTRAINT "Pergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resposta" (
    "id" SERIAL NOT NULL,
    "resposta" TEXT NOT NULL,
    "perguntaId" INTEGER NOT NULL,

    CONSTRAINT "Resposta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pergunta" ADD CONSTRAINT "Pergunta_enqueteId_fkey" FOREIGN KEY ("enqueteId") REFERENCES "Enquete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_perguntaId_fkey" FOREIGN KEY ("perguntaId") REFERENCES "Pergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
