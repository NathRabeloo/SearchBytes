"use client";

import React, { useState, useEffect } from "react";
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
} from "react-icons/fa";

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

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const userName = "Cris";

  const items: Item[] = [
    { name: "Quiz", icon: <FaQuestionCircle size={24} />, route: "/quiz", description: "Crie Quiz para seus alunos" },
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
    router.push(item.route);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen h-screen max-h-screen font-sans bg-gray-100 dark:bg-dark-primary">
      <div className="flex flex-1">
        {/* Sidebar unificada responsiva */}
        <Sidebar />

        <div className="flex flex-col flex-1">
          <div className="flex flex-col h-full p-2 md:p-4">
            <div className="ml-0 md:ml-4 w-full mb-2">
              <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
            </div>

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

            <div className="flex-1 mb-2">
              <FeatureGrid items={filteredItems} onItemClick={handleItemClick} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;