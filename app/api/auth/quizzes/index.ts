import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';  // Assuming prisma client is exported from lib/prisma.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const quizzes = await prisma.quiz.findMany({
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      });
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching quizzes' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description, questions } = req.body;
      const newQuiz = await prisma.quiz.create({
        data: {
          title,
          description,
          questions: {
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
      res.status(201).json(newQuiz);
    } catch (error) {
      res.status(500).json({ message: 'Error creating quiz' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
