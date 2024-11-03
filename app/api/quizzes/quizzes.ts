// app/api/quizzes/quizzes.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Obter todos os quizzes
  if (req.method === 'GET') {
    try {
      const quizzes = await prisma.quiz.findMany({
        include: {
          questions: true,
        },
      });
      return res.status(200).json(quizzes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar quizzes' });
    }
  }

  // Criar um novo quiz
  else if (req.method === 'POST') {
    const { title, createdBy, questions } = req.body;
    try {
      const quiz = await prisma.quiz.create({
        data: {
          title,
          createdBy,
          questions: {
            create: questions.map((question: any) => ({
              question: question.question,
              options: question.options,
              correctOptionIndex: question.correctOptionIndex,
            })),
          },
        },
      });
      return res.status(201).json(quiz);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar quiz' });
    }
  }

  // Atualizar um quiz existente
  else if (req.method === 'PUT') {
    const { id, title, questions } = req.body;
    try {
      const quiz = await prisma.quiz.update({
        where: { id },
        data: {
          title,
          questions: {
            deleteMany: {}, // Deletar perguntas antigas (ajuste conforme necessário)
            create: questions.map((question: any) => ({
              question: question.question,
              options: question.options,
              correctOptionIndex: question.correctOptionIndex,
            })),
          },
        },
      });
      return res.status(200).json(quiz);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar quiz' });
    }
  }

  // Deletar um quiz
  else if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      await prisma.quiz.delete({
        where: { id },
      });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar quiz' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
