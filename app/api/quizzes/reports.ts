// app/api/reports/reports.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const reports = await prisma.quiz.findMany({
        include: {
          questions: true, // Incluindo as perguntas para que possamos calcular os resultados
          responses: {
            select: {
              answers: true,
            },
          },
        },
      });

      // Processar os dados de respostas para gerar o relatório
      const formattedReports = reports.map((quiz) => ({
        quizId: quiz.id,
        title: quiz.title,
        totalResponses: quiz.responses.length,
        correctCount: quiz.responses.reduce((total, response) => {
          const answers = JSON.parse(response.answers);
          // Contar as respostas corretas
          return total + quiz.questions.reduce((correctTotal, question, index) => {
            return correctTotal + (answers[index] === question.correctOptionIndex ? 1 : 0);
          }, 0);
        }, 0),
      }));

      return res.status(200).json(formattedReports);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar relatórios' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
