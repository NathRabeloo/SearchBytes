"use client";

import { useState, useEffect } from "react";
import { FaPoll, FaTrashAlt, FaEdit } from "react-icons/fa"; // Importando o ícone de edição
import Sidebar from "../components/Sidebar";

interface Pergunta {
  pergunta: string;
  respostas: { resposta: string }[];
}

interface Enquete {
  id: number;
  titulo: string;
  disciplina: string;
  perguntas: Pergunta[];
}

interface FormData {
  titulo: string;
  disciplina: string;
  perguntas: Pergunta[];
}

export default function EnquetesPage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [enquetes, setEnquetes] = useState<Enquete[]>([]);
  const [formData, setFormData] = useState<FormData>({
    titulo: "",
    disciplina: "",
    perguntas: [{ pergunta: "", respostas: [{ resposta: "" }] }],
  });
  const [editMode, setEditMode] = useState<boolean>(false); // Flag para saber se estamos editando uma enquete

  useEffect(() => {
    fetchEnquetes();
  }, []);

  const fetchEnquetes = async () => {
    try {
      const response = await fetch("/api/enquete");
      if (!response.ok) {
        throw new Error("Erro ao buscar enquetes");
      }
      const data = await response.json();
      setEnquetes(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleCreate = () => {
    setModalOpen(true);
    setFormData({
      titulo: "",
      disciplina: "",
      perguntas: [{ pergunta: "", respostas: [{ resposta: "" }] }],
    });
    setEditMode(false); // Garantir que o modo de edição seja desligado
  };

  const handleEdit = (enquete: Enquete) => {
    setModalOpen(true);
    setFormData(enquete);
    setEditMode(true); // Ativar o modo de edição
  };

  const handleSubmit = async () => {
    try {
      const method = editMode ? "PUT" : "POST"; // Se estiver editando, usamos PUT, senão POST
      const response = await fetch("/api/enquete", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erro ao salvar a enquete");
      }
      setModalOpen(false);
      fetchEnquetes(); // Atualiza a lista de enquetes após criação ou edição
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handlePerguntaChange = (index: number, value: string) => {
    const novasPerguntas = [...formData.perguntas];
    novasPerguntas[index].pergunta = value;
    setFormData({ ...formData, perguntas: novasPerguntas });
  };

  const handleRespostaChange = (pIndex: number, rIndex: number, value: string) => {
    const novasPerguntas = [...formData.perguntas];
    novasPerguntas[pIndex].respostas[rIndex].resposta = value;
    setFormData({ ...formData, perguntas: novasPerguntas });
  };

  const addPergunta = () => {
    setFormData({
      ...formData,
      perguntas: [...formData.perguntas, { pergunta: "", respostas: [{ resposta: "" }] }],
    });
  };

  const addResposta = (pIndex: number) => {
    const novasPerguntas = [...formData.perguntas];
    novasPerguntas[pIndex].respostas.push({ resposta: "" });
    setFormData({ ...formData, perguntas: novasPerguntas });
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/enquete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar a enquete");
      }
      fetchEnquetes(); // Atualiza a lista de enquetes após exclusão
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#EFF6FF] text-gray-900">
      <Sidebar />
      <main className="flex-1 p-8">
        <section className="bg-[#60A5FA] text-white p-8 rounded-2xl flex justify-between items-center">
          <div>
            <p className="text-lg">16 janeiro de 2025</p>
            <h2 className="text-4xl font-bold">Enquetes</h2>
            <button
              onClick={handleCreate}
              className="mt-4 bg-white text-[#60A5FA] px-6 py-2 rounded-full flex items-center space-x-2 shadow-md"
            >
              <FaPoll />
              <span>Criar uma Enquete</span>
            </button>
          </div>
          <img src="/assets/professora_denilce.png" alt="Mulher escrevendo" className="h-80" />
        </section>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Enquetes Criadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enquetes.map((enquete) => (
              <div key={enquete.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h4 className="text-xl font-bold text-blue-700">{enquete.titulo}</h4>
                <p className="text-gray-600 font-medium">Disciplina: {enquete.disciplina}</p>
                <div className="mt-4">
                  {enquete.perguntas.map((pergunta, pIndex) => (
                    <div key={pIndex} className="mt-4 p-4 bg-gray-100 rounded-lg">
                      <p className="font-semibold text-gray-800">{pergunta.pergunta}</p>
                      <ul className="list-disc pl-5 mt-2 text-gray-700">
                        {pergunta.respostas.map((resposta, rIndex) => (
                          <li key={rIndex} className="bg-gray-200 p-2 rounded-md mt-1">{resposta.resposta}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleEdit(enquete)} // Chama a função de editar ao clicar
                  className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-full flex items-center space-x-2"
                >
                  <FaEdit />
                  <span>Editar Enquete</span>
                </button>
                <button
                  onClick={() => handleDelete(enquete.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-2"
                >
                  <FaTrashAlt />
                  <span>Deletar Enquete</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-bold mb-4">{editMode ? "Editar Enquete" : "Criar Enquete"}</h2>
              <div>
                <label className="block text-sm font-semibold">Título</label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full p-2 border rounded mt-2"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold">Disciplina</label>
                <input
                  type="text"
                  value={formData.disciplina}
                  onChange={(e) => setFormData({ ...formData, disciplina: e.target.value })}
                  className="w-full p-2 border rounded mt-2"
                />
              </div>
              {formData.perguntas.map((pergunta, pIndex) => (
                <div key={pIndex} className="mt-4">
                  <label className="block text-sm font-semibold">Pergunta {pIndex + 1}</label>
                  <input
                    type="text"
                    value={pergunta.pergunta}
                    onChange={(e) => handlePerguntaChange(pIndex, e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                  />
                  {pergunta.respostas.map((resposta, rIndex) => (
                    <div key={rIndex} className="mt-2">
                      <label className="block text-sm font-semibold">Resposta {rIndex + 1}</label>
                      <input
                        type="text"
                        value={resposta.resposta}
                        onChange={(e) => handleRespostaChange(pIndex, rIndex, e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => addResposta(pIndex)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Adicionar Resposta
                  </button>
                </div>
              ))}
              <button
                onClick={addPergunta}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Adicionar Pergunta
              </button>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {editMode ? "Atualizar" : "Criar"} Enquete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
