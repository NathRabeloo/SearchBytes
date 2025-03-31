-- CreateTable
CREATE TABLE "Voto" (
    "id" SERIAL NOT NULL,
    "respostaId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Voto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voto_respostaId_criadoEm_key" ON "Voto"("respostaId", "criadoEm");

-- AddForeignKey
ALTER TABLE "Voto" ADD CONSTRAINT "Voto_respostaId_fkey" FOREIGN KEY ("respostaId") REFERENCES "Resposta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
