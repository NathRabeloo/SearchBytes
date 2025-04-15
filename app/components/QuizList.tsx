"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaQrcode } from "react-icons/fa";
import SearchBar from "./SearchBar";

interface Quiz {
  id: string;
  title: string;
  discipline: string;
  createdAt: string;
}

interface QuizListProps {
  onCreateQuiz: () => void;
  onEditQuiz: (quizId: string) => void;
}

const QuizList: React.FC<QuizListProps> = ({ onCreateQuiz, onEditQuiz }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simular carregamento de quizzes do backend
  useEffect(() => {
    // Aqui você deve substituir com sua chamada API real
    const fetchQuizzes = async () => {
      try {
        setIsLoading(true);
        // Simulação de resposta do backend
        const mockQuizzes: Quiz[] = [
          { id: "1", title: "Quiz de Banco de Dados", discipline: "Banco de Dados", createdAt: "2025-01-10" },
          { id: "2", title: "Quiz de Lógica de Programação", discipline: "Lógica de Programação", createdAt: "2025-01-11" },
          { id: "3", title: "Quiz de Programação Web", discipline: "Desenvolvimento Web", createdAt: "2025-01-12" },
          { id: "4", title: "Quiz de HTML e CSS", discipline: "Desenvolvimento Web", createdAt: "2025-01-13" },
          { id: "5", title: "Quiz de Programação Orientada a Objetos", discipline: "POO", createdAt: "2025-01-14" },
        ];
        
        setQuizzes(mockQuizzes);
        setFilteredQuizzes(mockQuizzes);
        
        // Extrair disciplinas únicas para o filtro
        const uniqueDisciplines = Array.from(new Set(mockQuizzes.map(quiz => quiz.discipline)));
        setDisciplines(uniqueDisciplines);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar quizzes:", error);
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Filtrar quizzes com base na pesquisa e disciplina selecionada
  useEffect(() => {
    let filtered = [...quizzes];
    
    if (searchQuery) {
      filtered = filtered.filter(quiz => 
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedDiscipline) {
      filtered = filtered.filter(quiz => 
        quiz.discipline === selectedDiscipline
      );
    }
    
    setFilteredQuizzes(filtered);
  }, [searchQuery, selectedDiscipline, quizzes]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDisciplineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDiscipline(e.target.value);
  };

  const handleDelete = async (quizId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este quiz?")) {
      try {
        // Aqui você deve implementar a chamada de API para excluir o quiz
        console.log(`Excluindo quiz ${quizId}`);
        
        // Atualizar estado removendo o quiz excluído
        const updatedQuizzes = quizzes.filter(quiz => quiz.id !== quizId);
        setQuizzes(updatedQuizzes);
        
        // Atualizar também os quizzes filtrados
        setFilteredQuizzes(prev => prev.filter(quiz => quiz.id !== quizId));
      } catch (error) {
        console.error("Erro ao excluir quiz:", error);
      }
    }
  };

  const generateQRCode = (quizId: string) => {
    // Implementação para gerar QR code
    console.log(`Gerando QR Code para o quiz ${quizId}`);
    alert(`QR Code gerado para o quiz ID: ${quizId}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Meus quizzes</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Selecione os quizzes desejados para visualizar, editar ou gerar o QR Code
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          placeholder="Buscar quizzes..."
        />

        <div className="flex items-center gap-2">
          <label htmlFor="discipline" className="text-sm font-medium">
            Disciplina
          </label>
          <select
            id="discipline"
            className="p-2 rounded-lg bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border"
            value={selectedDiscipline}
            onChange={handleDisciplineChange}
          >
            <option value="">Todas</option>
            {disciplines.map((discipline, index) => (
              <option key={index} value={discipline}>
                {discipline}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p>Carregando quizzes...</p>
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <div className="text-center py-8 bg-white dark:bg-dark-card rounded-lg shadow">
          <p className="text-gray-500 dark:text-gray-400">Nenhum quiz encontrado.</p>
          <button
            onClick={onCreateQuiz}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Criar Primeiro Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-100 dark:bg-dark-hover">
                <tr>
                  <th className="py-3 px-4 text-left">Quizzes criados</th>
                  <th className="py-3 px-4 text-left">Disciplina</th>
                  <th className="py-3 px-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuizzes.map((quiz) => (
                  <tr 
                    key={quiz.id} 
                    className="border-t border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-hover"
                  >
                    <td className="py-3 px-4">{quiz.title}</td>
                    <td className="py-3 px-4">{quiz.discipline}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => generateQRCode(quiz.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
                        >
                          GERAR QR CODE
                        </button>
                        <button 
                          onClick={() => onEditQuiz(quiz.id)} 
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(quiz.id)} 
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="py-3 px-4 border-t border-gray-200 dark:border-dark-border flex items-center justify-between">
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-200 dark:bg-dark-hover rounded">1</button>
              <button className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-dark-hover rounded">2</button>
              <button className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-dark-hover rounded">3</button>
              <button className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-dark-hover rounded">4</button>
              <button className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-dark-hover rounded">...</button>
              <button className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-dark-hover rounded">12</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizList;