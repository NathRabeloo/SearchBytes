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

  // Data atual formatada
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const userName = "Cris";

  const items: Item[] = [
    { name: "Quizzes", icon: <FaQuestionCircle size={30} />, route: "/quiz", description: "Crie Quizzes para seus alunos" },
    { name: "Enquetes", icon: <FaPoll size={30} />, route: "/enquete", description: "Faça uma votação em sala de aula" },
    { name: "Relatórios", icon: <FaFileAlt size={30} />, route: "/relatorios", description: "Gerencie participação com relatórios" },
    { name: "Sorteador", icon: <FaRandom size={30} />, route: "/sorteador", description: "Sorteie grupos, alunos ou números" },
    { name: "Tutoriais", icon: <FaChalkboardTeacher size={30} />, route: "/tutoriais", description: "Veja tutoriais disponíveis" },
    { name: "Calendário", icon: <FaCalendarAlt size={30} />, route: "/calendario", description: "Gerencie compromissos" },
    { name: "Modelos", icon: <FaTable size={30} />, route: "/modelos", description: "Acesse modelos personalizados" },
    { name: "Bibliografia", icon: <FaBook size={30} />, route: "/bibliografia", description: "Adicione livros e sites" },
    { name: "Diário de Plano de aulas", icon: <FaClipboardList size={30} />, route: "/plano-aulas", description: "Gerencie seu plano de aulas" }
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

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100 dark:bg-dark-primary">
      <div className="flex flex-1">
      <Sidebar /> {/* Sidebar fixa */}
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-1 gap-4 p-6">
            {/* Barra de pesquisa */}
            <div className="ml-4">
            <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
            </div>
  
            {/* Cabeçalho com boas-vindas */}
            <Header 
  date={currentDate} 
  title="Bibliografia" 
  buttonText="Adicionar →" 
  buttonLink="/adicionar"
  imageSrc={undefined}
/>

          </div>
        </div>
      </div>
      {/* Rodapé */}
      <Footer/>
    </div>
  );
};

export default Home;