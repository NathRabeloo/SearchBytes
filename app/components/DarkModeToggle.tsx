"use client";

import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

interface DarkModeToggleProps {
  className?: string;
  compact?: boolean;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ 
  className = "", 
  compact = false 
}) => {
  // Verifica se há preferência salva, senão usa a preferência do sistema
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      // Checa localStorage primeiro
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        return savedMode === 'true';
      }
      
      // Se não houver preferência salva, usa preferência do sistema
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Aplica o tema quando o componente monta e quando o estado muda
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  // Detecta mudanças na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('darkMode') === null) {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Versão compacta (para uso em dispositivos móveis ou espaços limitados)
  if (compact) {
    return (
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-full ${isDarkMode ? 'bg-dark-card text-yellow-300' : 'bg-blue-100 text-blue-800'} ${className}`}
        aria-label={`Alternar para modo ${isDarkMode ? 'claro' : 'escuro'}`}
      >
        {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>
    );
  }

  // Versão completa com texto e estilo mais elaborado
  return (
    <button 
      onClick={toggleDarkMode}
      className={`flex items-center p-3 rounded-lg transition-colors ${
        isDarkMode 
          ? 'bg-dark-card text-white hover:bg-dark-hover' 
          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      } ${className}`}
    >
      <div className="w-8 h-8 mr-3 flex items-center justify-center">
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </div>
      <span>Dark Mode</span>
      <span className={`ml-auto px-3 py-1 rounded-full text-xs ${
        isDarkMode 
          ? "bg-blue-500 text-white" 
          : "bg-gray-200 text-gray-700"
      }`}>
        {isDarkMode ? "ON" : "OFF"}
      </span>
    </button>
  );
};

export default DarkModeToggle;