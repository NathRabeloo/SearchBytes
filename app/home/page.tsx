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
  FaClipboardList
} from "react-icons/fa";

// Importando os componentes
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FeatureGrid from "../components/FeatureGrid";
import Footer from "../components/Footer";

interface Item {
  name: string;
  icon: JSX.Element;
  route: string;
  description: string;
}

const Home = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Data atual formatada
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const userName = "Cris";

  const items: Item[] = [
    { name: "Quizzes", icon: <FaQuestionCircle size={24} />, route: "/quizzes", description: "Crie Quizzes para seus alunos" },
    { name: "Enquetes", icon: <FaPoll size={24} />, route: "/enquete", description: "Faça uma votação em sala de aula" },
    { name: "Relatórios", icon: <FaFileAlt size={24} />, route: "/relatorios", description: "Gerencie participação com relatórios" },
    { name: "Sorteador", icon: <FaRandom size={24} />, route: "/sorteador", description: "Sorteie grupos, alunos ou números" },
    { name: "Tutoriais", icon: <FaChalkboardTeacher size={24} />, route: "/tutoriais", description: "Veja tutoriais disponíveis" },
    { name: "Calendário", icon: <FaCalendarAlt size={24} />, route: "/calendario", description: "Gerencie compromissos" },
    { name: "Modelos", icon: <FaTable size={24} />, route: "/modelos", description: "Acesse modelos personalizados" },
    { name: "Bibliografia", icon: <FaBook size={24} />, route: "/bibliografia", description: "Adicione livros e sites" },
    { name: "Diário de Plano de aulas", icon: <FaClipboardList size={24} />, route: "/plano-aulas", description: "Gerencie seu plano de aulas" }
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleItemClick = (item: Item) => {
    if (item.route) {
      router.push(item.route);
    } else {
      alert(`Você clicou em ${item.name}`);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen h-screen max-h-screen font-sans bg-gray-100 dark:bg-dark-primary">
      <div className="flex flex-1">
        {/* Botão toggle para sidebar em telas menores */}
        <div className="md:hidden absolute top-4 left-4 z-10">
          <button 
            onClick={toggleSidebar}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>
        
        {/* Sidebar com visibilidade condicional em telas pequenas */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
          <Sidebar />
        </div>
        
        <div className="flex flex-col flex-1">
          <div className="flex flex-col h-full p-2 md:p-4">
            {/* Barra de pesquisa */}
            <div className="ml-0 md:ml-4 w-full mb-2">
              <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
            </div>
            
            {/* Cabeçalho com boas-vindas - altura reduzida */}
            <div className="mb-2">
              <Header 
                date={currentDate}
                title={`Bem-vindo, ${userName}!`}
                buttonText="Tutorial TeacherDesk →"
                buttonLink="/tutorial"
                desktopImageLeft="/assets/avatar_ruiva.png"
                desktopImageRight="/assets/mesa_professora_ruiva.png"
                mobileImage="/assets/avatar_ruiva.png"
              />
            </div>
            
            {/* Grid sem scroll */}
            <div className="flex-1 mb-2">
              <FeatureGrid items={filteredItems} onItemClick={handleItemClick} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Rodapé */}
      <Footer/>
    </div>
  );
};

export default Home;