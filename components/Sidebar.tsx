"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaHome,
  FaUser,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Button } from "components/ui/button";
import { Separator } from "components/ui/separator";
import { cn } from "lib/utils";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  route: string;
}

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode !== null) {
        return savedMode === "true";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile && !localStorage.getItem("sidebarState")) {
        setIsExpanded(false);
      } else if (!mobile) {
        setIsExpanded(true);
      }
    };

    const savedState = localStorage.getItem("sidebarState");
    if (savedState && window.innerWidth < 1024) {
      setIsExpanded(savedState === "expanded");
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("darkMode") === null) {
        setIsDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    localStorage.setItem("sidebarState", newState ? "expanded" : "collapsed");
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const menuItems: MenuItem[] = [
    { name: "Página Principal", icon: <FaHome size={18} />, route: "/home" },
    { name: "Meu Perfil", icon: <FaUser size={18} />, route: "/perfil" },
    { name: "Configurações", icon: <FaCog size={18} />, route: "/configuracoes" },
    { name: "Notificações", icon: <FaBell size={18} />, route: "/notificacoes" },
  ];

  const handleMenuClick = (route: string) => {
    router.push(route);
    if (isMobile) {
      setIsExpanded(false);
      localStorage.setItem("sidebarState", "collapsed");
    }
  };

  return (
    <aside
      className={cn(
        "h-[90vh] bg-blue-400 dark:bg-slate-800 text-white rounded-3xl flex flex-col pt-4 pb-4 px-4 shadow-lg ml-4 mt-6 mb-4 transition-all duration-300",
        isExpanded ? "w-56" : "w-20"
      )}
    >
      {/* TOPO DA SIDEBAR */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-white hover:bg-blue-500 dark:hover:bg-slate-700"
        >
          <FaBars />
        </Button>

        {isExpanded && !isMobile && (
          <img
            src="/assets/teacher_desk_logo.png"
            alt="Teacher Desk Logo"
            className="w-32 h-auto transition-all duration-300"
          />
        )}
      </div>

      <Separator className="bg-white/30 dark:bg-white/20 mb-4" />

      {/* NAVEGAÇÃO */}
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => handleMenuClick(item.route)}
            className="w-full flex items-center justify-start gap-3 text-white hover:bg-blue-500 dark:hover:bg-slate-700 mb-1 px-3 py-2"
          >
            <div className={cn("w-6", !isExpanded && "mx-auto")}>{item.icon}</div>
            {isExpanded && <span>{item.name}</span>}
          </Button>
        ))}
      </nav>

      {/* RODAPÉ */}
      <div className="mt-auto">
        <Separator className="bg-white/30 dark:bg-white/20 my-4" />

        <Button
          variant="ghost"
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-start gap-3 text-white hover:bg-blue-500 dark:hover:bg-slate-700 mb-2 px-3 py-2"
        >
          <div className={cn("w-6", !isExpanded && "mx-auto")}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </div>
          {isExpanded && (
            <>
              <span>Dark Mode</span>
              <span
                className={cn(
                  "ml-auto text-xs px-2 py-1 rounded-full",
                  isDarkMode
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                )}
              >
                {isDarkMode ? "ON" : "OFF"}
              </span>
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          onClick={() => handleMenuClick("/logout")}
          className="w-full flex items-center justify-start gap-3 text-white hover:bg-blue-500 dark:hover:bg-slate-700 px-3 py-2"
        >
          <div className={cn("w-6", !isExpanded && "mx-auto")}>
            <FaSignOutAlt />
          </div>
          {isExpanded && <span>Sair Da Conta</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
