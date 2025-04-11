"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "components/ui/button";

interface HeaderProps {
  date: string;
  title?: string;
  buttonText?: string;
  buttonLink?: string;
  desktopImageLeft?: string;
  desktopImageRight?: string;
  mobileImage?: string;
  showOnlyLeftImage?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  date,
  title,
  buttonText,
  buttonLink,
  desktopImageLeft,
  desktopImageRight,
  mobileImage,
  showOnlyLeftImage = false,
}) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Usuário");

  /*useEffect(() => {
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
*/
  const handleButtonClick = () => {
    if (buttonLink) {
      router.push(buttonLink);
    }
  };

  return (
    <div className="w-full max-w-8xl min-h-[150px] md:min-h-[180px] bg-[#5A9BF6]  dark:bg-slate-800 text-white dark:text-white p-4 md:p-6 rounded-2xl flex flex-col sm:flex-row items-center shadow-lg relative overflow-hidden">
      <div className="w-[60%] text-left space-y-1 md:space-y-2 z-10">
        <p className="text-xs md:text-sm opacity-90">{date}</p>
        <h1 className="text-xl md:text-2xl font-bold">
        {title ? title.replace("{userName}", userName) : `Bem-vindo, ${userName}!`}
        </h1>

        {buttonText && (
          <Button
            size="sm"
            variant="default"
            className="mt-1 md:mt-2 bg-[#4A86E8]  dark:bg-slate-700 hover:bg-[#3B76D4] dark:hover:bg-blue-900 text-white text-xs md:text-sm transition-all"
            onClick={handleButtonClick}
          >
            {buttonText}
          </Button>
        )}
      </div>

      {/* Imagem mobile/tablet */}
      <div className="block sm:block lg:hidden absolute inset-0 pointer-events-none">
        {mobileImage && (
          <img
            src={mobileImage}
            alt="Imagem mobile"
            className="absolute right-2 bottom-0 max-h-[140px] object-contain w-auto"
          />
        )}
      </div>

      {/* Imagens desktop */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {desktopImageLeft ? (
          <img
            src={desktopImageLeft}
            alt="Imagem à esquerda"
            className={`absolute ${
              showOnlyLeftImage ? "right-10" : "left-1/2 -translate-x-1/2"
            } bottom-0 max-h-[180px] object-contain w-auto`}
          />
        ) : title !== "Bibliografia" && (
          <img
            src="/assets/avatar_ruiva.png"
            alt="Avatar Ruiva"
            className={`absolute ${
              showOnlyLeftImage ? "right-10" : "left-1/2 -translate-x-1/2"
            } bottom-0 max-h-[180px] object-contain w-auto`}
          />
        )}

        {!showOnlyLeftImage && desktopImageRight ? (
          <img
            src={desktopImageRight}
            alt="Imagem à direita"
            className="absolute right-10 bottom-[-10px] max-h-[180px] object-contain w-auto"
          />
        ) : !showOnlyLeftImage && title !== "Bibliografia" && (
          <img
            src="/assets/mesa_professora_ruiva.png"
            alt="Mesa Teacher Desk"
            className="absolute right-10 bottom-[-10px] max-h-[180px] object-contain w-auto"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
