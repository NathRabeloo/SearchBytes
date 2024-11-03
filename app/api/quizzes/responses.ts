// app/api/responses/responses.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { quizId, answers } = req.body;
    try {
      const response = await prisma.response.create({
        data: {
          quizId,
          answers: JSON.stringify(answers), // Armazenar respostas como JSON
        },
      });
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao salvar respostas' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
