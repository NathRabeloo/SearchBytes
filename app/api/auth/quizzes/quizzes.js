// pages/api/quizzes.js

import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get all quizzes
    const quizzes = await prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
    return res.status(200).json(quizzes);
  }

  if (req.method === 'POST') {
    // Create a new quiz
    const { title, description, questions } = req.body;

    const createdQuiz = await prisma.quiz.create({
      data: {
        title,
        description,
        questions: {
          create: questions.map((question) => ({
            text: question.text,
            type: question.type,
            required: question.required,
            options: {
              create: question.options.map((option) => ({
                text: option.text,
              })),
            },
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return res.status(201).json(createdQuiz);
  }

  if (req.method === 'PUT') {
    // Update an existing quiz
    const { id, title, description, questions } = req.body;

    const updatedQuiz = await prisma.quiz.update({
      where: { id },
      data: {
        title,
        description,
        questions: {
          deleteMany: {},  // Clear old questions first
          create: questions.map((question) => ({
            text: question.text,
            type: question.type,
            required: question.required,
            options: {
              create: question.options.map((option) => ({
                text: option.text,
              })),
            },
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return res.status(200).json(updatedQuiz);
  }

  if (req.method === 'DELETE') {
    // Delete a quiz
    const { id } = req.query;

    await prisma.quiz.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: 'Quiz deleted' });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
