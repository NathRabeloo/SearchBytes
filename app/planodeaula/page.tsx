"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { v4 as uuidv4 } from "uuid";

// Tipos
interface AulaRealizada {
  data: string;
  concluida: boolean;
}

interface PlanoDeAula {
  id: string;
  nome: string;
  disciplina: string;
  turma: string;
  descricao: string;
  aulas: AulaRealizada[];
}

const PlanoAula = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [planos, setPlanos] = useState<PlanoDeAula[]>([]);
  const [novoPlano, setNovoPlano] = useState({
    nome: "",
    disciplina: "",
    turma: "",
    descricao: "",
    dataAula: ""
  });
  const [editando, setEditando] = useState<string | null>(null);

  useEffect(() => {
    const dadosMockados: PlanoDeAula[] = [
      {
        id: "1",
        nome: "Lógica de Programação",
        disciplina: "Algoritmos",
        turma: "1º ADS",
        descricao: "Introdução a variáveis.",
        aulas: [
          { data: "2025-04-20", concluida: true },
          { data: "2025-04-22", concluida: false },
        ]
      },
      {
        id: "2",
        nome: "Modelagem de Dados",
        disciplina: "Banco de Dados",
        turma: "2º ADS",
        descricao: "Normalização e DER.",
        aulas: [
          { data: "2025-04-19", concluida: true },
          { data: "2025-04-21", concluida: true },
        ]
      },
    ];
    setPlanos(dadosMockados);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const planosFiltrados = planos.filter((p) =>
    p.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    const novo: PlanoDeAula = {
      id: uuidv4(),
      nome: novoPlano.nome,
      disciplina: novoPlano.disciplina,
      turma: novoPlano.turma,
      descricao: novoPlano.descricao,
      aulas: [
        { data: novoPlano.dataAula, concluida: false }
      ]
    };
    setPlanos([...planos, novo]);
    setNovoPlano({ nome: "", disciplina: "", turma: "", descricao: "", dataAula: "" });
  };

  const handleEdit = (plano: PlanoDeAula) => {
    setNovoPlano({
      nome: plano.nome,
      disciplina: plano.disciplina,
      turma: plano.turma,
      descricao: plano.descricao,
      dataAula: plano.aulas[0]?.data || ""
    });
    setEditando(plano.id);
  };

  const handleUpdate = () => {
    setPlanos((prev) =>
      prev.map((p) =>
        p.id === editando
          ? {
              ...p,
              nome: novoPlano.nome,
              disciplina: novoPlano.disciplina,
              turma: novoPlano.turma,
              descricao: novoPlano.descricao,
              aulas: [{ data: novoPlano.dataAula, concluida: false }],
            }
          : p
      )
    );
    setEditando(null);
    setNovoPlano({ nome: "", disciplina: "", turma: "", descricao: "", dataAula: "" });
  };

  const handleDelete = (id: string) => {
    setPlanos(planos.filter((p) => p.id !== id));
  };

  const toggleAulaConcluida = (id: string, data: string) => {
    setPlanos((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              aulas: p.aulas.map((aula) =>
                aula.data === data ? { ...aula, concluida: !aula.concluida } : aula
              )
            }
          : p
      )
    );
  };

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100 dark:bg-dark-primary text-black">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-1 gap-4 p-6">
            <div className="ml-0 md:ml-4 w-full mb-2">
              <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
            </div>

            <Header 
              date={currentDate}
              title="Plano de Aula" 
              buttonText="Adicionar plano de aula →" 
              buttonLink="#form"
              desktopImageLeft="/assets/professora_denilce.png"
              mobileImage="/assets/professora_denilce.png"
              showOnlyLeftImage={true}
            />

            <div id="form" className="bg-white rounded-xl shadow p-4 space-y-2">
              <input type="text" placeholder="Nome" value={novoPlano.nome} onChange={(e) => setNovoPlano({ ...novoPlano, nome: e.target.value })} className="w-full border p-2 rounded" />
              <input type="text" placeholder="Disciplina" value={novoPlano.disciplina} onChange={(e) => setNovoPlano({ ...novoPlano, disciplina: e.target.value })} className="w-full border p-2 rounded" />
              <input type="text" placeholder="Turma" value={novoPlano.turma} onChange={(e) => setNovoPlano({ ...novoPlano, turma: e.target.value })} className="w-full border p-2 rounded" />
              <input type="text" placeholder="Descrição" value={novoPlano.descricao} onChange={(e) => setNovoPlano({ ...novoPlano, descricao: e.target.value })} className="w-full border p-2 rounded" />
              <input type="date" placeholder="Data da aula" value={novoPlano.dataAula} onChange={(e) => setNovoPlano({ ...novoPlano, dataAula: e.target.value })} className="w-full border p-2 rounded" />
              {editando ? (
                <button onClick={handleUpdate} className="bg-yellow-500 text-white px-4 py-2 rounded">Atualizar</button>
              ) : (
                <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded">Criar Plano</button>
              )}
            </div>

            <div className="space-y-4">
              {planosFiltrados.map((plano) => (
                <div key={plano.id} className="bg-white p-4 rounded shadow">
                  <h3 className="text-xl font-bold">{plano.nome}</h3>
                  <p><strong>Disciplina:</strong> {plano.disciplina}</p>
                  <p><strong>Turma:</strong> {plano.turma}</p>
                  <p><strong>Descrição:</strong> {plano.descricao}</p>
                  <div className="mt-2 space-y-1">
                    {plano.aulas.map((aula) => (
                      <label key={aula.data} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={aula.concluida}
                          onChange={() => toggleAulaConcluida(plano.id, aula.data)}
                        />
                        <span>
                          Aula do dia {new Date(aula.data).toLocaleDateString("pt-BR")} {aula.concluida ? "✅ Concluída" : "⏳ Pendente"}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => handleEdit(plano)} className="bg-yellow-400 text-white px-3 py-1 rounded">Editar</button>
                    <button onClick={() => handleDelete(plano.id)} className="bg-red-500 text-white px-3 py-1 rounded">Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlanoAula;