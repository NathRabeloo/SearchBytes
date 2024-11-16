// app/api/quizzes/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const quizData: Prisma.QuizCreateInput = await req.json();

    // Validate the incoming data
    if (!quizData.title || !quizData.description || !quizData.questions) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, or questions' },
        { status: 400 }
      );
    }

    // Create the quiz with nested questions and options
    const quiz = await prisma.quiz.create({
      data: quizData,
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create quiz' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...quizData }: Prisma.QuizUpdateInput & { id: number } = await req.json();

    // Validate the incoming data
    if (!id || typeof id !== 'number' || !quizData) {
      return NextResponse.json(
        { error: 'Missing required fields: id or quiz data' },
        { status: 400 }
      );
    }

    // Update the quiz with nested questions and options
    const quiz = await prisma.quiz.update({
      where: { id },
      data: quizData,
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error updating quiz:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update quiz' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Fetch all quizzes with nested questions and options
    const quizzes = await prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}