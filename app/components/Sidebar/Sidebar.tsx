// components/Sidebar.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  route: string;
}

const Sidebar: React.FC = () => {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    { name: "Home", icon: "🏠", route: "/home" },
    { name: "Perfil", icon: "👤", route: "/perfil" },
    { name: "Relatórios", icon: "📊", route: "/relatorios" },
    { name: "Configurações", icon: "🛠", route: "/configuracoes" },
  ];

  const handleMenuClick = (route: string) => {
    router.push(route);
  };

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#0084FF",
        color: "#F0F4F8",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#60A5FA",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "24px", color: "#fff" }}>👤</span>
          </div>
          <p style={{ marginTop: "10px" }}>Meu Perfil</p>
        </div>

        <nav>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {menuItems.map((item, index) => (
              <li key={index} style={{ marginBottom: "20px" }}>
                <button
                  onClick={() => handleMenuClick(item.route)}
                  style={{
                    color: "#F0F4F8",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "18px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>{item.icon}</span>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <button
          onClick={() => handleMenuClick("/sair")}
          style={{
            color: "#F0F4F8",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span style={{ marginRight: "10px" }}>🚪</span>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
