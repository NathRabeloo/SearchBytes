"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

const Enquete = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [enqueteEditandoId, setEnqueteEditandoId] = useState<number | null>(null);
  const [enquetes, setEnquetes] = useState([
    {
      id: 1,
      titulo: "Dia da Reava",
      usuario: "Cris",
      disciplina: "Banco de Dados",
      opcoes: ["Esse Sábado", "Esse Domingo", "Próxima Sexta", "Próxima Terça"],  
    },
    {
      id: 2,
      titulo: "Feedback da plataforma",
      usuario: "Cris",
      disciplina: "Português",
      opcoes: ["Excelente", "Bom", "Precisa melhorar"],
    },
  ]);

  const [novaEnquete, setNovaEnquete] = useState({
    titulo: "",
    usuario: "Cris",
    disciplina: "Simulado",
    opcoes: [""],
  });

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const abrirModalCriar = () => {
    setModoEdicao(false);
    setNovaEnquete({ titulo: "", usuario: "Cris", disciplina: "Simulado", opcoes: [""] });
    setModalOpen(true);
  };

  const abrirModalEditar = (enqueteId: number) => {
    const enqueteSelecionada = enquetes.find((e) => e.id === enqueteId);
    if (enqueteSelecionada) {
      setNovaEnquete({
        titulo: enqueteSelecionada.titulo,
        usuario: enqueteSelecionada.usuario,
        disciplina: enqueteSelecionada.disciplina,
        opcoes: [...enqueteSelecionada.opcoes],
      });
      setModoEdicao(true);
      setEnqueteEditandoId(enqueteId);
      setModalOpen(true);
    }
  };

  const salvarEnquete = () => {
    if (modoEdicao && enqueteEditandoId !== null) {
      setEnquetes(
        enquetes.map((e) =>
          e.id === enqueteEditandoId ? { ...e, ...novaEnquete } : e
        )
      );
    } else {
      setEnquetes([...enquetes, { ...novaEnquete, id: Date.now() }]);
    }

    setModalOpen(false);
    setModoEdicao(false);
    setEnqueteEditandoId(null);
    setNovaEnquete({ titulo: "", usuario: "Cris", disciplina: "Simulado", opcoes: [""] });
  };

  const excluirEnquete = (id: number) => {
    setEnquetes(enquetes.filter((e) => e.id !== id));
  };

  const handleOpcaoChange = (index: number, value: string) => {
    const novasOpcoes = [...novaEnquete.opcoes];
    novasOpcoes[index] = value;
    setNovaEnquete({ ...novaEnquete, opcoes: novasOpcoes });
  };

  const adicionarOpcao = () => {
    setNovaEnquete({ ...novaEnquete, opcoes: [...novaEnquete.opcoes, ""] });
  };

  const removerOpcao = (index: number) => {
    const novasOpcoes = novaEnquete.opcoes.filter((_, i) => i !== index);
    setNovaEnquete({ ...novaEnquete, opcoes: novasOpcoes });
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100 text-black">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-1 gap-4 p-6">
            <div className="ml-0 md:ml-4 w-full mb-2">
              <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
            </div>

            <Header
              date={currentDate}
              title="Enquete"
              buttonText="Criar uma Enquete →"
              buttonLink=""
              desktopImageLeft="/assets/professora_denilce.png"
              mobileImage="/assets/professora_denilce.png"
              showOnlyLeftImage={true}
            />

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={abrirModalCriar}
            >
              Criar uma Enquete
            </button>

            {/* Tabela */}
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white rounded shadow text-black">
                <thead>
                  <tr className="bg-blue-100 text-left">
                    <th className="py-2 px-4">Título</th>
                    <th className="py-2 px-4">Usuário</th>
                    <th className="py-2 px-4">Disciplina</th>
                    <th className="py-2 px-4">Opções</th>
                    <th className="py-2 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {enquetes.map((enquete) => (
                    <tr key={enquete.id} className="border-b">
                      <td className="py-2 px-4">{enquete.titulo}</td>
                      <td className="py-2 px-4">{enquete.usuario}</td>
                      <td className="py-2 px-4">{enquete.disciplina}</td>
                      <td className="py-2 px-4">{enquete.opcoes.join(", ")}</td>
                      <td className="py-2 px-4 space-x-2">
                        <button
                          className="bg-yellow-400 text-white px-3 py-1 rounded"
                          onClick={() => abrirModalEditar(enquete.id)}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() => excluirEnquete(enquete.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal */}
            {modalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl text-black">
                  <h2 className="text-lg font-bold mb-4">
                    {modoEdicao ? "Editar Enquete" : "Nova Enquete"}
                  </h2>
                  <input
                    type="text"
                    placeholder="Título da enquete"
                    value={novaEnquete.titulo}
                    onChange={(e) =>
                      setNovaEnquete({ ...novaEnquete, titulo: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded mb-4 text-black"
                  />
                  <select
                    value={novaEnquete.disciplina}
                    onChange={(e) =>
                      setNovaEnquete({ ...novaEnquete, disciplina: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded mb-4 text-black"
                  >
                    <option value="Matemática">Matemática</option>
                    <option value="Português">Português</option>
                    <option value="Simulado">Simulado</option>
                  </select>
                  <div className="mb-4">
                    <h3 className="font-bold mb-2">Opções:</h3>
                    {novaEnquete.opcoes.map((opcao, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={opcao}
                          onChange={(e) => handleOpcaoChange(index, e.target.value)}
                          className="w-full border border-gray-300 p-2 rounded text-black"
                        />
                        <button
                          onClick={() => removerOpcao(index)}
                          className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={adicionarOpcao}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Adicionar Opção
                    </button>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={salvarEnquete}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
              
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Enquete;
