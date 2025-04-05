"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  date: string;
  title?: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string; // Nova propriedade para imagem personalizada
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
    <div className="w-full max-w-8xl h-48 bg-[#5A9BF6] dark:bg-dark-primary p-10 rounded-2xl flex flex-col sm:flex-row items-center text-white shadow-lg relative">
      <div className="flex-1 text-left space-y-4">
        <p className="text-lg">{date}</p>
        <h1 className="text-4xl font-bold">
          {title ? title.replace("{userName}", userName) : `Bem-vinde, ${userName}!`}
        </h1>

        <button
          className="mt-4 bg-[#4A86E8] dark:bg-dark-accent px-10 py-3 rounded-xl text-white flex items-center gap-3 hover:bg-[#3B76D4] dark:hover:bg-blue-600"
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>
      </div>

      {/* Exibir imagem personalizada se existir */}
    {/* Exibir imagem personalizada se existir, ou nada se imageSrc for null/undefined */}
{imageSrc ? (
  <img
    src={imageSrc}
    alt="Imagem personalizada"
    className="absolute right-1/2 translate-x-1/2 bottom-0 h-full object-cover"
  />
) : title !== "Bibliografia" && (
  // Imagens padrão do Header, exceto na página Bibliografia
  <>
    <img
      src="/assets/avatar_ruiva.png"
      alt="Avatar Ruiva"
      className="absolute right-80 bottom-0 h-full object-cover"
    />
    <img
      src="/assets/mesa_professora_ruiva.png"
      alt="Mesa Teacher Desk"
      className="absolute right-10 bottom-0 h-full object-cover translate-y-8"
    />
  </>
)}

    </div>
  );
};

export default Header;
