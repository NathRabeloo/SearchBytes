"use client"; // Indica que este componente deve ser renderizado no cliente (Client Component)

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Ícones usados nas funcionalidades principais
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
  FaBars,
} from "react-icons/fa";

// Componentes reutilizáveis da interface
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";

// Tipo dos itens exibidos no grid principal
interface Item {
  name: string;
  icon: JSX.Element;
  route: string;
  description: string;
}

const Home = () => {
  const router = useRouter();

  // Estado para armazenar o texto digitado na barra de pesquisa
  const [searchQuery, setSearchQuery] = useState("");

  // Estado que define se é mobile ou não (com base no tamanho da tela)
  const [isMobile, setIsMobile] = useState(false);

  // Estado para mostrar ou ocultar o sidebar em dispositivos móveis
  const [showSidebar, setShowSidebar] = useState(false);

  // Efeito que detecta quando a tela é pequena e atualiza isMobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // sm: breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Gera a data atual no formato brasileiro
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const userName = "Cris"; // Nome do usuário logado (poderia vir de autenticação)

  // Lista de funcionalidades da plataforma (exibidas no grid)
  const items: Item[] = [
    { name: "Quizzes", icon: <FaQuestionCircle size={24} />, route: "/quizzes", description: "Crie Quizzes para seus alunos" },
    { name: "Enquetes", icon: <FaPoll size={24} />, route: "/enquetes", description: "Faça uma votação em sala de aula" },
    { name: "Relatórios", icon: <FaFileAlt size={24} />, route: "/relatorio", description: "Gerencie participação com relatórios" },
    { name: "Sorteador", icon: <FaRandom size={24} />, route: "/sorteador", description: "Sorteie grupos, alunos ou números" },
    { name: "Tutoriais", icon: <FaChalkboardTeacher size={24} />, route: "/tutoriais", description: "Veja tutoriais disponíveis" },
    { name: "Calendário", icon: <FaCalendarAlt size={24} />, route: "/calendario", description: "Gerencie compromissos" },
    { name: "Modelos", icon: <FaTable size={24} />, route: "/modelos", description: "Acesse modelos personalizados" },
    { name: "Bibliografia", icon: <FaBook size={24} />, route: "/bibliografia", description: "Adicione livros e sites" },
    { name: "Diário de Plano de aulas", icon: <FaClipboardList size={24} />, route: "/plano-aulas", description: "Gerencie seu plano de aulas" }
  ];

  // Atualiza o valor do input da barra de busca
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Navega para a rota do item clicado
  const handleItemClick = (item: Item) => {
    router.push(item.route);
  };

  // Filtra os itens de acordo com o texto digitado
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-100 dark:bg-gray-900">
      {/* Container principal com Sidebar e conteúdo */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Se não for mobile, mostra a sidebar padrão */}
        {!isMobile ? (
          <Sidebar />
        ) : (
          <>
            {/* Sidebar flutuante em mobile */}
            {showSidebar && (
              <div className="fixed inset-0 z-50 bg-black/40">
                <div className="absolute left-0 top-0 h-full">
                  <Sidebar />
                </div>
                {/* Clique fora da sidebar para fechar */}
                <div
                  className="absolute inset-0 z-40"
                  onClick={() => setShowSidebar(false)}
                />
              </div>
            )}
            {/* Botão hambúrguer para abrir sidebar */}
            <button
              className="fixed z-50 top-4 left-4 bg-white/10 dark:bg-black/30 text-white backdrop-blur-md p-2 rounded-full shadow-md lg:hidden"
              onClick={() => setShowSidebar(true)}
            >
              <FaBars size={20} />
            </button>
          </>
        )}

        {/* Conteúdo principal da página */}
        <div className="flex flex-col flex-1 h-screen overflow-y-auto">
          <div className="flex flex-col h-full px-2 md:px-4 pb-4">
            
            {/* Barra de pesquisa centralizada */}
            <div className="w-full flex justify-center mb-4 mt-2">
              <div className={`w-full ${isMobile ? "max-w-xs" : "max-w-md"}`}>
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={handleSearch}
                  placeholder={isMobile ? "" : "Digite o que deseja..."}
                />
              </div>
            </div>

            {/* Cabeçalho com boas-vindas, imagem e botão de tutorial */}
            <Header 
              date={currentDate}
              title={`Bem-vindo, ${userName}!`}
              buttonText="Tutorial TeacherDesk →"
              buttonLink="/tutorial"
              desktopImageLeft="/assets/avatar_ruiva.png"
              desktopImageRight="/assets/mesa_professora_ruiva.png"
              mobileImage="/assets/avatar_ruiva.png"
            />

            {/* Grade de funcionalidades (ícones clicáveis) */}
            <div className="flex-1 mt-4">
              <FeatureGrid items={filteredItems} onItemClick={handleItemClick} />
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé da página */}
      <Footer />
    </div>
  );
};

export default Home;
