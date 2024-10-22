// /auth/login
'use client';

import { useState } from 'react';
import Link from 'next/link';
import '../../globals.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Envia uma solicitação POST para a rota de login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Envia e-mail e senha
      });

      const data = await response.json();

      // Verifica o status da resposta
      if (response.ok) {
        window.location.href = '/home'; // Redireciona para a página home
      } else {
        alert(data.message); // Mensagem de erro recebida da API
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      alert('Ocorreu um erro ao tentar fazer login.');
    }
  };

  return (
    <div className="flex min-h-screen"
      style={{ backgroundImage: 'url(/fatec-sorocaba.jpeg)' }}
    >
      {/* Texto que fica na esquerda */}
      <div className="flex-1 relative bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 flex flex-col items-start p-10 text-white h-full">
          <h1 className="text-5xl font-bold mb-4">Olá, professor!</h1>
          <p className="text-xl">Faça seu login ou cadastro</p>
          <p className="text-xl">para acessar todas</p>
          <p className="text-xl">as funcionalidades.</p>
        </div>
      </div>

      {/* Formulário de login */}
      <div className="w-full max-w-md flex-none bg-blue-900 bg-opacity-80 flex flex-col backdrop-blur justify-center items-center p-5">
        <div className="p-6 rounded-lg w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src="\escrita_preta_logo1.png" alt="Teacher Web Logo" className="w-56" />
          </div>

          {/* Formulário com os campos */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 bg-transparent border-b-2 border-white rounded-none text-white focus:outline-none focus:border-blue-500 placeholder-white"
                placeholder="E-mail"
              />
            </div>

            <div className="mb-10 relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 bg-transparent border-b-2 border-white rounded-none text-white focus:outline-none focus:border-blue-500 placeholder-white"
                placeholder="Senha"
              />
              {/* Botão para ir para a área de esqueci a senha */}
              <Link href="/auth/recover" className="absolute right-0 top-full mt-2 text-sm text-white">Esqueci minha senha</Link>
            </div>
            {/* Botão para entrar */}
            <button
              type="submit" // O tipo do botão é "submit" para disparar o handleLogin
              className="w-full bg-white text-black p-2 rounded-full hover:bg-gray-300 transition"
            >
              Entrar
            </button>
          </form>

          {/* Botão para ir para a área de registro */}
          <div className="mt-6 flex flex-col space-y-4">
            <Link href="/auth/register">
              <button className="w-full bg-white rounded-full text-black p-2 hover:bg-gray-300 transition">
                Criar Conta
              </button>
            </Link>
            {/* Botão para entrar com o Google (opcional) */}
            {/* 
            <button className="w-full flex items-center rounded-full justify-center bg-black text-white p-2 hover:bg-gray-300 transition">
              <img src="/google-logo.png" alt="Google Logo" className="w-5 h-5 mr-2" />
              ENTRAR COM GOOGLE
            </button>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}
