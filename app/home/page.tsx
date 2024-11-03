"use client";

import React, { useState } from 'react';
import { FaQuestionCircle, FaPoll, FaRandom, FaChalkboardTeacher, FaTable, FaBook } from 'react-icons/fa';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const items = [
    { name: 'Quizzes', icon: <FaQuestionCircle size={40} /> },
    { name: 'Enquetes', icon: <FaPoll size={40} /> },
    { name: 'Sorteador', icon: <FaRandom size={40} /> },
    { name: 'Tutoriais', icon: <FaChalkboardTeacher size={40} /> },
    { name: 'Modelos de Planilhas', icon: <FaTable size={40} /> },
    { name: 'Bibliografia', icon: <FaBook size={40} /> },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredItems(filtered);
  };

  const handleButtonClick = (item) => {
    alert(`Você clicou em ${item.name}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#F0F4F8' }}>
      <div style={{ width: '250px', backgroundColor: '#0084FF', color: '#F0F4F8', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#60A5FA', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', color: '#fff' }}>👤</span>
            </div>
            <p style={{ marginTop: '10px' }}>Meu Perfil</p>
          </div>

          <nav>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              <li style={{ marginBottom: '20px' }}>
                <a href="#" style={{ color: '#F0F4F8', textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                  <span style={{ marginRight: '10px' }}>🏠</span>
                  Home
                </a>
              </li>
              <li style={{ marginBottom: '20px' }}>
                <a href="#" style={{ color: '#F0F4F8', textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                  <span style={{ marginRight: '10px' }}>👤</span>
                  Perfil
                </a>
              </li>
              <li style={{ marginBottom: '20px' }}>
                <a href="#" style={{ color: '#F0F4F8', textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                  <span style={{ marginRight: '10px' }}>📊</span>
                  Relatórios
                </a>
              </li>
              <li style={{ marginBottom: '20px' }}>
                <a href="#" style={{ color: '#F0F4F8', textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                  <span style={{ marginRight: '10px' }}>🛠</span>
                  Configurações
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <a href="#" style={{ color: '#F0F4F8', textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
            <span style={{ marginRight: '10px' }}>🚪</span>
            Sair
          </a>
        </div>
      </div>

      <div style={{ flex: 1, backgroundColor: '#EFF6FF', padding: '40px', color: '#1F2937' }}>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', color: '#0084FF' }}>Teacher Desk</h1>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#1F2937', marginBottom: '20px' }}>Como usar a plataforma?</h2>
            <p style={{ fontSize: '16px', color: '#374151' }}>
              Navegue facilmente pelo painel lateral para acessar suas ferramentas. Escolha "Quizzes", "Enquetes", ou qualquer outra opção para começar. Use o campo de busca para encontrar rapidamente o que precisa!
            </p>
          </div>

          <form onSubmit={handleSearch} style={{ marginBottom: '40px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '18px', color: '#1F2937' }}>Pesquisar</label>
            <input
              type="text"
              placeholder="Digite o que procura"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                marginBottom: '20px',
                fontSize: '16px',
                backgroundColor: '#F9FAFB'
              }}
            />

            <label style={{ display: 'block', marginBottom: '10px', fontSize: '18px', color: '#1F2937' }}>Filtrar por:</label>
            <select
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                marginBottom: '20px',
                fontSize: '16px',
                backgroundColor: '#F9FAFB'
              }}
            >
              <option>Quizzes</option>
              <option>Enquetes</option>
              <option>Sorteador</option>
              <option>Tutoriais</option>
              <option>Modelos de Planilhas</option>
              <option>Bibliografia</option>
            </select>

            <button
              type="submit"
              style={{
                padding: '12px 24px',
                backgroundColor: '#0084FF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s ease',
              }}
            >
              Buscar
            </button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginTop: '40px' }}>
            {(filteredItems.length > 0 ? filteredItems : items).map((item, index) => (
              <div key={index}
                style={{
                  backgroundColor: '#E5F0FF',
                  padding: '30px',
                  borderRadius: '12px',
                  width: 'calc(33% - 20px)',
                  color: '#0084FF',
                  textAlign: 'center',
                  fontSize: '18px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, background-color 0.3s ease',
                }}
                onClick={() => handleButtonClick(item)} // Adicionando o clique
              >
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px' }}>
                  {item.icon}
                </div>
                <p style={{ fontWeight: 'bold' }}>{item.name.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
