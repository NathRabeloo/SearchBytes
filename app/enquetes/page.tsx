"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// Importando os componentes
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";


const Enquete = () => {
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
    <div className="flex flex-col h-screen font-sans  bg-slate-100 dark:bg-gray-900">
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
  title="Enquetes" 
  buttonText="Criar uma Enquete →" 
  buttonLink="/enquetes"
  imageSrc="/assets/professora_denilce.png" // Nova imagem
/>

          </div>
        </div>
      </div>
      {/* Rodapé */}
      <Footer/>
    </div>
  );
};

export default Enquete;