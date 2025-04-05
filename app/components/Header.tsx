"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  date: string;
  title?: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
}

const Header: React.FC<HeaderProps> = ({ date, title, buttonText, buttonLink, imageSrc }) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Usuário");

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        if (data?.name) {
          setUserName(data.name);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }

    fetchUser();
  }, []);

  const handleButtonClick = () => {
    if (buttonLink) {
      router.push(buttonLink);
    }
  };

  return (
    <div className="w-full max-w-8xl h-auto min-h-[120px] md:min-h-[140px] bg-[#5A9BF6] dark:bg-dark-primary p-3 md:p-6 rounded-2xl flex flex-col sm:flex-row items-center text-white shadow-lg relative overflow-hidden">
      
      <div className="w-[60%] text-left space-y-1 md:space-y-2 z-10">
        <p className="text-xs md:text-sm">{date}</p>
        <h1 className="text-xl md:text-2xl font-bold">
          {title ? title.replace("{userName}", userName) : `Bem-vinde, ${userName}!`}
        </h1>

        <button
          className="mt-1 md:mt-2 bg-[#4A86E8] dark:bg-dark-accent px-3 md:px-6 py-1 md:py-2 rounded-lg text-white flex items-center gap-1 md:gap-2 hover:bg-[#3B76D4] dark:hover:bg-blue-600 text-xs md:text-sm"
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>
      </div>

      {/* Imagens apenas para desktop */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Imagem personalizada"
            className="absolute right-10 bottom-[-20px] max-h-[160px] object-contain"
          />
        ) : title !== "Bibliografia" && (
          <>
            {/* Avatar centralizado */}
            <img
              src="/assets/avatar_ruiva.png"
              alt="Avatar Ruiva"
              className="absolute left-1/2 -translate-x-1/2 bottom-[-0px] max-h-[160px] object-contain"
            />

            {/* Mesa à direita */}
            <img
              src="/assets/mesa_professora_ruiva.png"
              alt="Mesa Teacher Desk"
              className="absolute right-10 bottom-[-10px] max-h-[160px] object-contain"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
