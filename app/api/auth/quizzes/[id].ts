import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';  // Assuming prisma client is exported from lib/prisma.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { title, description, questions } = req.body;
      const updatedQuiz = await prisma.quiz.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          questions: {
            deleteMany: {},  // Clear existing questions
            create: questions.map((question: any) => ({
              text: question.text,
              type: question.type,
              required: question.required,
              options: {
                create: question.options.map((option: any) => ({ text: option.text })),
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
      res.status(200).json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ message: 'Error updating quiz' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.quiz.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting quiz' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
