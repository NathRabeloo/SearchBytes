"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaQuestionCircle,
  FaPoll,
  FaRandom,
  FaChalkboardTeacher,
  FaTable,
  FaBook,
  FaTachometerAlt,
  FaCalendarAlt,
  FaClipboardList,
  FaSearch,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar/Sidebar"; // Ajuste o caminho conforme necessário

const Home = () => {
  const router = useRouter();

  const items = [
    { name: "Dashboard", icon: <FaTachometerAlt size={40} />, route: "/dashboard" },
    { name: "Calendário", icon: <FaCalendarAlt size={40} />, route: "/calendario" },
    { name: "Plano de aulas", icon: <FaClipboardList size={40} />, route: "/plano-aulas" },
    { name: "Quizzes", icon: <FaQuestionCircle size={40} />, route: "/quiz" },
    { name: "Enquetes", icon: <FaPoll size={40} />, route: "/enquete" },
    { name: "Sorteador", icon: <FaRandom size={40} />, route: "/sorteador" },
    { name: "Tutoriais", icon: <FaChalkboardTeacher size={40} />, route: "/tutoriais" },
    { name: "Modelos de Planilhas", icon: <FaTable size={40} />, route: "/modelos" },
    { name: "Bibliografia", icon: <FaBook size={40} />, route: "/bibliografia" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Atualiza o valor da pesquisa
  };

  const handleButtonClick = (item) => {
    if (item.route) {
      router.push(item.route);
    } else {
      alert(`Você clicou em ${item.name}`);
    }
  };

  // Filtra os itens com base na pesquisa
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Debug: Log para verificar se filteredItems está sendo corretamente filtrado
  console.log("Filtered Items: ", filteredItems);

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      <Sidebar />

      <div className="flex-1 bg-blue-50 p-10 text-gray-900">
        {/* Seção de Boas-Vindas */}
        <div className="flex flex-col items-center gap-6 p-6 bg-[#E8F0FE] min-h-screen">
          {/* Barra de pesquisa */}
          <div className="relative w-full max-w-md mb-10">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5A9BF6]" size={20} />
            <input
              type="text"
              placeholder="Digite que deseja..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-[#E2EAF8] text-[#5A9BF6] placeholder-[#5A9BF6] focus:outline-none"
              value={searchQuery}
              onChange={handleSearch} // Chama a função de pesquisa
            />
          </div>

          {/* Seção de boas-vindas com tamanho maior */}
          <div className="w-full max-w-7xl h-96 bg-[#5A9BF6] p-10 rounded-2xl flex flex-col sm:flex-row items-center text-white shadow-lg relative">
            <div className="flex-1 text-left">
              <p className="text-sm">16 janeiro de 2025</p>
              <h1 className="text-5xl font-bold">Bem-vindo(a), Cris!</h1>
              <button className="mt-6 bg-[#4A86E8] px-10 py-2 rounded-full text-white flex items-center gap-2 hover:bg-[#3B76D4]">
                Tutorial TeacherDesk →
              </button>
            </div>

            {/* A imagem do usuário agora ocupa toda a altura da seção e está alinhada à direita */}
            <img
              src="/avatar_ruiva.png" // Ajuste o nome do arquivo conforme necessário
              alt="Avatar Ruiva"
              className="absolute right-0 bottom-0 h-full object-cover" // Classe para fazer a imagem ocupar a altura e ficar à direita
            />
          </div>


          {/* Botões das opções */}
          <div className="grid grid-cols-3 gap-6 mt-10 w-full"> {/* Ajuste da largura e ocupação */}
            {/* Verificando se há itens filtrados */}
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-200 p-6 rounded-lg text-center text-blue-800 cursor-pointer hover:bg-blue-300 transition transform hover:scale-105"
                  onClick={() => handleButtonClick(item)}
                >
                  <div className="mb-2 flex justify-center items-center h-12">
                    {item.icon}
                  </div>
                  <p className="font-semibold">{item.name}</p>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">Nenhum item encontrado.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
