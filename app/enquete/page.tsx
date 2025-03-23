"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar"; 
import {
  FaPoll,
  FaTrash,
  FaEdit,
  FaQrcode,
} from "react-icons/fa";

export default function EnquetesPage() {
  const [darkMode, setDarkMode] = useState(false);

  const enquetes = [
    { id: 1, titulo: "Votação de dia para apresentar trabalho", disciplina: "Lógica de Programação" },
    { id: 2, titulo: "Votação de tema para o trabalho", disciplina: "Lógica de Programação" },
    { id: 3, titulo: "Votação de dia para reposição de aula", disciplina: "" },
    { id: 4, titulo: "Votação de melhor apresentação do trabalho", disciplina: "" },
    { id: 5, titulo: "Feedback de compreensão de 1 a 5", disciplina: "" },
  ];

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-white" : "bg-[#EFF6FF] text-gray-900"}`}>
      {/* Sidebar importado */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Banner */}
        <section className="bg-[#60A5FA] text-white p-8 rounded-2xl flex justify-between items-center">
          <div>
            <p className="text-lg">16 janeiro de 2025</p>
            <h2 className="text-4xl font-bold">Enquetes</h2>
            <button className="mt-4 bg-white text-[#60A5FA] px-6 py-2 rounded-full flex items-center space-x-2 shadow-md">
              <FaPoll />
              <span>Criar uma Enquete</span>
            </button>
          </div>
          <img src="/assets/professora_denilce.png" alt="Mulher escrevendo" className="h-80" />
        </section>

        {/* Lista de Enquetes */}
        <section className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Minhas Enquetes</h3>
          <p className="text-gray-500">Selecione as enquetes para visualizar, editar ou gerar um QR Code.</p>

          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-[#DAE6F4]">
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Enquete</th>
                <th className="p-2 text-left">Disciplina</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {enquetes.map((enquete, index) => (
                <tr key={enquete.id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{enquete.titulo}</td>
                  <td className="p-2">{enquete.disciplina || "—"}</td>
                  <td className="p-2 flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                    <button className="bg-[#60A5FA] text-white px-2 py-1 rounded-md text-sm flex items-center">
                      <FaQrcode className="mr-1" /> QR Code
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
