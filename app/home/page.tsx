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
  FaFileAlt,
  FaCalendarAlt,
  FaClipboardList,
  FaSearch,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar"; 

const Home = () => {
  const router = useRouter();

  const items = [
    { name: "Relatórios", icon: <FaFileAlt size={40} />, route: "/relatorios", description:"Gerencie participação e desempenho com gráficos e relatórios de participação" },
    { name: "Calendário", icon: <FaCalendarAlt size={40} />, route: "/calendario",  description:"Gerencie seus compromissos em sala de aula com o Calendário" },
    { name: "Diário de Plano de aulas", icon: <FaClipboardList size={40} />, route: "/plano-aulas", description:"Gerencie seu plano de aulas, totalmente personalizável"},
    { name: "Quizzes", icon: <FaQuestionCircle size={40} />, route: "/quiz", description:"Crie Quizzes para seus alunos" },
    { name: "Enquetes", icon: <FaPoll size={40} />, route: "/enquete", description:"Faça uma votação em sala de aula em conjunto com os alunos" },
    { name: "Sorteador", icon: <FaRandom size={40} />, route: "/sorteador", description:"Sorteie grupos, alunos ou números" },
    { name: "Tutoriais", icon: <FaChalkboardTeacher size={40} />, route: "/tutoriais",description:"Veja tutoriais disponíveis na nossa plataforma para facilitar o dia a dia" },
    { name: "Modelos", icon: <FaTable size={40} />, route: "/modelos", description:"Acesse modelos de planilha e de slides personalizados para a Fatec" },
    { name: "Bibliografia", icon: <FaBook size={40} />, route: "/bibliografia", description:"Adicione link de livros e sites para seus alunos"},
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
          <div className="w-full max-w-8xl h-96 bg-[#5A9BF6] p-10 rounded-2xl flex flex-col sm:flex-row items-center text-white shadow-lg relative">
            <div className="flex-1 text-left">
              <p className="text-sm">16 janeiro de 2025</p>
              <h1 className="text-5xl font-bold">Bem-vindo(a), Cris!</h1>
              <button className="mt-6 bg-[#4A86E8] px-10 py-2 rounded-full text-white flex items-center gap-2 hover:bg-[#3B76D4]">
             Saiba mais sobre o TeacherDesk →
              </button>
            </div>

            <img
              src="/assets/avatar_ruiva.png" 
              alt="Avatar Ruiva"
              className="absolute right-96 bottom-0 h-full object-cover" 
            />

            <img
              src="/assets/mesa_professora_ruiva.png" 
              alt="Mesa Teacher Desk"
              className="absolute right-0 bottom-0 h-full object-cover translate-y-24" 
            />
          </div>


          {/* Botões das opções */}
          <div className="grid grid-cols-3 gap-6 mt-10 w-full">
            {/* Verificando se há itens filtrados */}
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group bg-blue-200 p-6 rounded-lg text-center text-blue-800 cursor-pointer hover:bg-blue-300 transition transform hover:scale-105"
                  onClick={() => handleButtonClick(item)}
                >
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-sm bg-black text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </span>

                  {/* Ícone */}
                  <div className="mb-2 flex justify-center items-center h-12">
                    {item.icon}
                  </div>

                  {/* Nome do item */}
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
