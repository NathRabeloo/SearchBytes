"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// Importando os componentes
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

const Relatorios = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Data atual formatada
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const userName = "Cris";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
  };
  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100 dark:bg-dark-primary">
      <div className="flex flex-1">
      <Sidebar /> {/* Sidebar fixa */}
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-1 gap-4 p-6">
          <div className="ml-0 md:ml-4 w-full mb-2">
              <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
            </div>

            {/* Cabeçalho com boas-vindas */}
            <div className="mb-2">
              <Header 
                date={currentDate}
                title="Relatorios" 
                buttonText="Adicionar relatorios →" 
                buttonLink="/relatorios"
                desktopImageLeft="/assets/professora_denilce.png"
                mobileImage="/assets/professora_denilce.png"
                showOnlyLeftImage={true}
              />
            </div>

          </div>
        </div>
      </div>
      {/* Rodapé */}
      <Footer/>
    </div>
  );
};

export default Relatorios;