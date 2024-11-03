'use client';

import { useState } from 'react';
import Link from 'next/link';
import '../../globals.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');  // Adicionando o campo name
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples para garantir que as senhas coincidem
    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    // Limpar qualquer erro anterior
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),  // Enviando o campo name
      });

      if (response.ok) {
        alert('Conta criada com sucesso!');
        window.location.href = '/auth/login';
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <div className="flex min-h-screen"
    style={{ backgroundImage: 'url(/fatec-sorocaba.jpeg)' }}
    >
      <div className="flex-1 relative bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 flex flex-col  items-start p-10 text-white h-full">
          <h1 className="text-5xl font-bold mb-4">Bem-vindo!</h1>
          <p className="text-xl">Crie sua conta</p>
          <p className="text-xl">para acessar todas</p>
          <p className="text-xl">as funcionalidades.</p>
        </div>
      </div>

      <div className="w-full max-w-md flex-none bg-blue-900 bg-opacity-80 flex flex-col backdrop-blur justify-center items-center p-5">
      <div className="flex justify-center mb-4">
            <img src="\escrita_preta_logo1.png" alt="Teacher Web Logo" className="w-56" />
          </div>
        <div className="p-6 rounded-lg  w-full max-w-md">


          <form onSubmit={handleRegister}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            <div className="mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 bg-transparent border-b-2 border-white rounded-none text-white focus:outline-none focus:border-blue-500 placeholder-white"
                placeholder="Nome"
              />
            </div>

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

            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 bg-transparent border-b-2 border-white rounded-none text-white  focus:outline-none focus:border-blue-500 placeholder-white"
                placeholder="Senha"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-2 bg-transparent border-b-2 border-white rounded-none text-white  focus:outline-none focus:border-blue-500 placeholder-white"
                placeholder="Confirme a Senha"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black p-2 rounded-full hover:bg-gray-300 transition"
            >
              Criar Conta
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white">Já tem uma conta? <Link href="/auth/login" className="underline">Faça login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
