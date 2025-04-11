"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardTitle,
} from "components/ui/card";

interface FeatureCardProps {
  name: string;
  icon: JSX.Element;
  description: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  name,
  icon,
  description,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      role="button"
      aria-label={description}
      className="group cursor-pointer hover:scale-[1.03] transition-transform ease-in-out duration-200 
      bg-blue-100  dark:bg-slate-700
      border border-blue-200 dark:border-zinc-700 
      text-blue-900 dark:text-white 
      hover:bg-blue-200 dark:hover:bg-blue-900/70 
      h-full flex items-center justify-center shadow-md dark:shadow-none"
    >
      <CardContent className="flex flex-col items-center justify-center text-center p-4 relative">
        {/* Tooltip com dark mode */}
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs 
          bg-black dark:bg-white 
          text-white dark:text-black 
          py-1 px-2 rounded opacity-0 group-hover:opacity-100 
          transition-opacity duration-200 z-50 pointer-events-none whitespace-nowrap">
          {description}
        </span>

        <div className="text-xl md:text-2xl mb-2 text-blue-700 dark:text-blue-300">
          {icon}
        </div>

        <CardTitle className="text-sm md:text-base font-semibold dark:text-white">
          {name}
        </CardTitle>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
