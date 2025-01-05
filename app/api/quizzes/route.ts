import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Retrieve all quizzes
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const quizId = searchParams.get('id');  // Obtém o 'id' da URL (por exemplo, /edit-quiz?id=1)

  if (!quizId) {
    return NextResponse.json({ message: 'Quiz ID is required' }, { status: 400 });
  }

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(quizId) },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json({ message: 'Error fetching quiz' }, { status: 500 });
  }
}

// POST: Create a new quiz
export async function POST(req: NextRequest) {
  try {
    const { title, description, questions } = await req.json();

    if (!questions) {
      return NextResponse.json({ message: 'Questions are required' }, { status: 400 });
    }

    const createdQuiz = await prisma.quiz.create({
      data: {
        title,
        description,
        questions: {
          create: questions.map((question: { text: string; type: string; required: boolean; options: { text: string }[] }) => ({
            text: question.text,
            type: question.type,
            required: question.required,
            options: {
              create: question.options.map((option) => ({ text: option.text })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json(createdQuiz, { status: 201 });
  } catch (error) {
    console.error('Error creating quiz:', error); // Log do erro
    return NextResponse.json({ message: 'Error creating quiz' }, { status: 500 });
  }
}

// PUT: Update an existing quiz
// PUT: Update an existing quiz
export async function PUT(req: NextRequest) {
  try {
    const { id, title, description, questions } = await req.json(); // Pega o ID do corpo
    console.log('Recebido:', { id, title, description, questions });

    if (!id) {
      return NextResponse.json({ message: 'Quiz ID is required' }, { status: 400 });
    }

    // Excluir todas as perguntas e opções relacionadas ao quiz
    await prisma.option.deleteMany({
      where: { question: { quizId: id } },
    });

    // Atualiza o quiz
    const updatedQuiz = await prisma.quiz.update({
      where: { id: Number(id) },  // Usar o ID do corpo da requisição
      data: {
        title,
        description,
        questions: {
          deleteMany: {}, // Excluir as perguntas antigas
          create: questions.map((question: { text: string; type: string; required: boolean; options: { text: string }[] }) => ({
            text: question.text,
            type: question.type,
            required: question.required,
            options: {
              create: question.options.map((option) => ({ text: option.text })),
            },
          })),
        },
      },
    });

    return NextResponse.json(updatedQuiz, { status: 200 });
  } catch (error) {
    console.error('Error updating quiz:', error);
    return NextResponse.json({ message: 'Error updating quiz' }, { status: 500 });
  }
}

// DELETE: Delete a quiz
export async function DELETE(req: NextRequest) {
  try {
    // Obtém o 'id' a partir dos parâmetros de consulta usando get()
    const id = req.nextUrl.searchParams.get('id');

    if (id) {
      // Deleta o quiz no banco de dados
      await prisma.quiz.delete({
        where: { id: parseInt(id) },
      });

      // Retorna uma resposta de sucesso
      return NextResponse.json({ message: 'Quiz deleted' }, { status: 200 });
    } else {
      // Caso o 'id' não seja encontrado
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error deleting quiz:', error); // Log do erro
    // Caso ocorra um erro durante a exclusão
    return NextResponse.json({ message: 'Error deleting quiz' }, { status: 500 });
  }
}
