"use client";

import { useRouter } from "next/navigation"; 
import { 
  FaHome, 
  FaUser, 
  FaCog, 
  FaBell, 
  FaSignOutAlt,
  FaMoon,
  FaSun
} from "react-icons/fa";
import { useState, useEffect } from "react";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  route: string;
}

const Sidebar: React.FC = () => {
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        return savedMode === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

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

  const menuItems: MenuItem[] = [
    { name: "Página Principal", icon: <FaHome size={20} />, route: "/home" },
    { name: "Meu Perfil", icon: <FaUser size={20} />, route: "/profile" },
    { name: "Configurações", icon: <FaCog size={20} />, route: "/settings" },
    { name: "Notificações", icon: <FaBell size={20} />, route: "/notifications" },
  ];

  const handleMenuClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="h-[90vh] w-56 bg-blue-400 dark:bg-dark-secondary text-white border border-blue-300 dark:border-dark-border rounded-3xl flex flex-col pt-12 pb-4 px-4 shadow-lg ml-4 mt-6 mb-4">
      <h1 className="mt-2 mb-2">
        <img src="/assets/teacher_desk_logo.png" alt="Teacher Desk Logo" className="w-40 h-auto" />
      </h1>
      
      <hr className="w-full border-gray-300 mb-4 dark:border-gray-600" />
      
      <nav className="w-full">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleMenuClick(item.route)}
            className="flex items-center w-full text-left p-3 hover:bg-blue-500 dark:hover:bg-dark-hover rounded-lg mb-2"
          >
            <div className="w-8 h-8 mr-3 flex items-center justify-center">
              {item.icon}
            </div>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
      
      <div className="mt-auto w-full">
        <hr className="w-full border-gray-300 my-4 dark:border-gray-600" />
        
        <button 
          onClick={toggleDarkMode}
          className="flex items-center w-full text-left p-3 hover:bg-blue-500 dark:hover:bg-dark-hover rounded-lg mb-2"
        >
          <div className="w-8 h-8 mr-3 flex items-center justify-center">
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </div>
          <span>Dark Mode</span>
          <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
            isDarkMode 
              ? "bg-blue-500 text-white" 
              : "bg-gray-200 text-gray-700"
          }`}>
            {isDarkMode ? "ON" : "OFF"}
          </span>
        </button>
        
        <button 
          onClick={() => handleMenuClick("/logout")}
          className="flex items-center w-full text-left p-3 hover:bg-blue-500 dark:hover:bg-dark-hover rounded-lg"
        >
          <div className="w-8 h-8 mr-3 flex items-center justify-center">
            <FaSignOutAlt size={20} />
          </div>
          <span>Sair Da Conta</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
