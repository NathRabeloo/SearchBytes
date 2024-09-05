// /app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  // Verifica se o email já está cadastrado
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: 'Email já cadastrado' }, { status: 400 });
  }

  // Cria o hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria o usuário
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return NextResponse.json({ message: 'Usuário criado com sucesso' }, { status: 201 });
}
