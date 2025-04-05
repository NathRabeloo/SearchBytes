"use client";

import React from "react";

interface FeatureCardProps {
  name: string;
  icon: JSX.Element;
  description: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ name, icon, description, onClick }) => {
  return (
    <div
      className="relative group bg-blue-200 dark:bg-dark-card py-2 px-4 rounded-lg text-center text-blue-800 dark:text-dark-text cursor-pointer hover:bg-blue-300 dark:hover:bg-dark-hover transition transform hover:scale-105 flex flex-col items-center justify-center h-full"
      onClick={onClick}
    >
      {/* Tooltip não clicável */}
      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-sm bg-black text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
        {description}
      </span>

      <div className="mb-1 flex justify-center items-center h-8 md:h-10 dark:text-dark-accent">
        {icon}
      </div>

      <p className="font-semibold text-sm md:text-base">{name}</p>
    </div>
  );
};

export default FeatureCard;