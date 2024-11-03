// /app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Verifica se o usuário existe
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 401 });
  }

  // Verifica a senha
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ message: 'Senha inválida' }, { status: 401 });
  }

  // Autenticação bem-sucedida (implemente sessão ou JWT conforme necessário)
  return NextResponse.json({ message: 'Autenticação bem-sucedida' }, { status: 200 });
}
