import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST(req: Request) {
  try {
    const { titulo, disciplina, perguntas } = await req.json();

    if (!perguntas || !Array.isArray(perguntas)) {
      return NextResponse.json({ error: "Formato de perguntas inválido" }, { status: 400 });
    }

    const enquete = await prisma.enquete.create({
      data: {
        titulo,
        disciplina,
        perguntas: {
          create: perguntas.map((pergunta: any) => ({
            pergunta: pergunta.pergunta,
            respostas: {
              create: pergunta.respostas.map((resposta: any) => ({
                resposta: resposta.resposta,
              })),
            },
          })),
        },
      },
      include: {
        perguntas: {
          include: { respostas: true },
        },
      },
    });

    return NextResponse.json(enquete, { status: 200 });
  } catch (error) {
    console.error("Erro ao criar a enquete:", error);
    return NextResponse.json({ error: "Erro ao criar a enquete" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const enquetes = await prisma.enquete.findMany({
      include: {
        perguntas: {
          include: { respostas: true },
        },
      },
    });
    return NextResponse.json(enquetes, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar enquetes:", error);
    return NextResponse.json({ error: "Erro ao buscar enquetes" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();  // Espera-se um ID no corpo da requisição

    if (!id) {
      return NextResponse.json({ error: "ID da enquete é necessário" }, { status: 400 });
    }

    // Primeiro, deleta os votos associados às respostas
    await prisma.voto.deleteMany({
      where: {
        respostaId: {
          in: await prisma.resposta.findMany({
            where: {
              pergunta: {
                enqueteId: id,
              },
            },
            select: {
              id: true,
            },
          }).then(respostas => respostas.map(resposta => resposta.id)),
        },
      },
    });

    // Depois, deleta as respostas associadas às perguntas da enquete
    await prisma.resposta.deleteMany({
      where: {
        perguntaId: {
          in: await prisma.pergunta.findMany({
            where: { enqueteId: id },
            select: { id: true },
          }).then(perguntas => perguntas.map(pergunta => pergunta.id)),
        },
      },
    });

    // Depois, deleta as perguntas associadas à enquete
    await prisma.pergunta.deleteMany({
      where: { enqueteId: id },
    });

    // Finalmente, deleta a enquete
    const deletedEnquete = await prisma.enquete.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedEnquete, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar a enquete:", error);
    return NextResponse.json({ error: "Erro ao deletar a enquete" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, titulo, disciplina, perguntas } = await req.json();  // Espera-se que o corpo da requisição contenha o ID da enquete, título, disciplina e perguntas

    if (!id || !titulo || !disciplina || !perguntas) {
      return NextResponse.json({ error: "Todos os campos são necessários" }, { status: 400 });
    }

    // Atualizando a enquete
    const updatedEnquete = await prisma.enquete.update({
      where: { id },
      data: {
        titulo,
        disciplina,
        perguntas: {
          // Atualizar ou criar perguntas
          upsert: perguntas.map((pergunta: { id?: number, pergunta: string, respostas: { id?: number, resposta: string }[] }) => ({
            where: { id: pergunta.id || -1 }, // Se o ID da pergunta não for fornecido, cria uma nova
            update: {
              pergunta: pergunta.pergunta,
              respostas: {
                upsert: pergunta.respostas.map((resposta: { id?: number, resposta: string }) => ({
                  where: { id: resposta.id || -1 },  // Se o ID da resposta não for fornecido, cria uma nova
                  update: { resposta: resposta.resposta },
                  create: { resposta: resposta.resposta },
                }))
              }
            },
            create: {
              pergunta: pergunta.pergunta,
              respostas: {
                create: pergunta.respostas.map((resposta: { resposta: string }) => ({
                  resposta: resposta.resposta
                }))
              }
            }
          }))
        }
      },
      include: {
        perguntas: {
          include: {
            respostas: true
          }
        }
      }
    });

    return NextResponse.json(updatedEnquete, { status: 200 });
  } catch (error) {
    console.error("Erro ao editar a enquete:", error);
    return NextResponse.json({ error: "Erro ao editar a enquete" }, { status: 500 });
  }
}