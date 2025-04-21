"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Mock de enquetes
const mockEnquetes = [
  {
    id: 1,
    pergunta: "Você gostou da aula de hoje?",
    opcoes: ["Sim", "Mais ou menos", "Não"],
  },
  {
    id: 2,
    pergunta: "A explicação foi clara?",
    opcoes: ["Sim", "Parcialmente", "Não entendi"],
  },
  {
    id: 3,
    pergunta: "Você gostaria de mais exercícios em sala?",
    opcoes: ["Sim", "Tanto faz", "Não"],
  },
];

export default function EnquetePage() {
  const [respostas, setRespostas] = useState<{ [key: number]: string }>({});
  const [nome, setNome] = useState("");
  const [ra, setRa] = useState("");
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const router = useRouter();

  const handleChange = (id: number, resposta: string) => {
    setRespostas((prev) => ({ ...prev, [id]: resposta }));
  };

  const handleSubmit = () => {
    if (!nome || !ra) {
      alert("Por favor, preencha seu nome e RA antes de enviar.");
      return;
    }

    console.log("Enquete respondida:", respostas);
    console.log("Aluno:", nome, "RA:", ra);
    alert("Enquete enviada com sucesso!");
    router.push("/"); // Redireciona após envio
  };

  const handleStart = () => {
    if (!nome || !ra) {
      alert("Por favor, preencha seu nome e RA.");
    } else {
      setIsFormCompleted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-purple-100 via-blue-500 to-blue-300 text-black p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
        {/* Cabeçalho com Avatar e Título */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">            {/* Avatar com uma imagem mais gamificada */}

            <h1 className="text-3xl font-extrabold text-blue-800">
              Enquete de Satisfação Banco de dados
            </h1>
          </div>
          <div className="text-sm text-gray-600">Vamos começar!</div>
        </div>

        {/* Formulário para inserir Nome e RA */}
        {!isFormCompleted ? (
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">Por favor, insira seu nome e RA:</p>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nome Completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="px-4 py-2 border-2 rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="RA"
                value={ra}
                onChange={(e) => setRa(e.target.value)}
                className="px-4 py-2 border-2 rounded-lg w-full"
              />
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-blue-900 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-200 transform hover:scale-110 shadow-lg mt-4"
              >
                Iniciar Enquete
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Enquetes */}
            {mockEnquetes.map((enquete) => (
              <div key={enquete.id} className="mb-6">
                <p className="text-lg font-semibold mb-2 text-gray-800">{enquete.pergunta}</p>
                <div className="flex flex-wrap gap-4">
                  {enquete.opcoes.map((opcao) => (
                    <button
                      key={opcao}
                      onClick={() => handleChange(enquete.id, opcao)}
                      className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 ${
                        respostas[enquete.id] === opcao
                          ? "bg-pink-600 text-white border-pink-600 scale-105"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-purple-100"
                      } hover:scale-105`}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Botão de Enviar */}
            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-200 transform hover:scale-110 shadow-lg"
              >
                Enviar Respostas
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
