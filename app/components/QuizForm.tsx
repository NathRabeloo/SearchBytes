"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface Question {
  id: string;
  text: string;
  type: "multiple" | "text";
  options?: string[];
  correctAnswer?: string | number;
}

interface QuizFormProps {
  quizId?: string; // Se for fornecido, estamos editando um quiz existente
  onCancel: () => void;
  onSave: (quizData: any) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ quizId, onCancel, onSave }) => {
  const [activeTab, setActiveTab] = useState<'create' | 'edit' | 'reports'>('create');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      text: "",
      type: "multiple",
      options: ["Resposta 1", "Resposta 2", "Resposta 3"],
      correctAnswer: 2 // Índice da resposta correta (zero-based)
    }
  ]);
  const [disciplines, setDisciplines] = useState<string[]>([
    "Matemática", "Português", "Ciências", "História", "Geografia", 
    "Física", "Química", "Biologia", "Artes", "Educação Física",
    "Inglês", "Espanhol", "Filosofia", "Sociologia", "Lógica de Programação",
    "Desenvolvimento Web", "Banco de Dados", "POO"
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (quizId) {
      setActiveTab('edit');
      // Carregar dados do quiz se estiver editando
      loadQuizData(quizId);
    }
  }, [quizId]);

  const loadQuizData = async (id: string) => {
    try {
      setIsLoading(true);
      // Substituir por chamada API real
      console.log(`Carregando quiz com ID ${id}`);
      
      // Simulação de resposta do backend
      setTimeout(() => {
        // Dados ficticios de exemplo
        if (id === "2") {
          setTitle("Quiz de Lógica de Programação");
          setDescription("Quiz sobre conceitos básicos de lógica de programação");
          setDiscipline("Lógica de Programação");
          setQuestions([
            {
              id: "1",
              text: "O que é um algoritmo?",
              type: "multiple",
              options: [
                "Um tipo de dado", 
                "Uma sequência finita de passos para resolver um problema", 
                "Uma linguagem de programação"
              ],
              correctAnswer: 1
            },
            {
              id: "2",
              text: "Explique o conceito de variável em programação",
              type: "text",
              correctAnswer: "Uma variável é um espaço na memória do computador destinado a armazenar dados que podem ser modificados durante a execução do programa."
            }
          ]);
        }
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Erro ao carregar quiz:", error);
      setIsLoading(false);
    }
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: (questions.length + 1).toString(),
      text: "",
      type: "multiple",
      options: ["Resposta 1", "Resposta 2", ""],
      correctAnswer: 0
    };
    
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (questionId: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== questionId));
    } else {
      alert("Seu quiz deve ter pelo menos uma pergunta.");
    }
  };

  const handleQuestionTextChange = (questionId: string, text: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, text } : q
    ));
  };

  const handleQuestionTypeChange = (questionId: string, type: "multiple" | "text") => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        if (type === "multiple") {
          return { 
            ...q, 
            type, 
            options: q.options || ["Resposta 1", "Resposta 2", ""],
            correctAnswer: 0
          };
        } else {
          return { 
            ...q, 
            type,
            correctAnswer: "" 
          };
        }
      }
      return q;
    }));
  };

  const handleOptionChange = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleCorrectAnswerChange = (questionId: string, value: string | number) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, correctAnswer: value } : q
    ));
  };

  const handleAddOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        return { ...q, options: [...q.options, ""] };
      }
      return q;
    }));
  };

  const handleRemoveOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options && q.options.length > 2) {
        const newOptions = [...q.options];
        newOptions.splice(optionIndex, 1);
        
        // Ajustar a resposta correta se necessário
        let newCorrectAnswer = q.correctAnswer;
        if (typeof newCorrectAnswer === 'number') {
          if (optionIndex === newCorrectAnswer) {
            newCorrectAnswer = 0; // Redefine para a primeira opção se a correta foi removida
          } else if (optionIndex < newCorrectAnswer) {
            newCorrectAnswer = (newCorrectAnswer as number) - 1; // Ajusta o índice
          }
        }
        
        return { ...q, options: newOptions, correctAnswer: newCorrectAnswer };
      }
      return q;
    }));
  };

  const handleCorrectOptionChange = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, correctAnswer: optionIndex } : q
    ));
  };

  const handleSave = () => {
    // Validação básica
    if (!title.trim()) {
      alert("Por favor, informe um título para o quiz.");
      return;
    }
    
    if (!discipline) {
      alert("Por favor, selecione uma disciplina.");
      return;
    }
    
    for (const question of questions) {
      if (!question.text.trim()) {
        alert("Todas as perguntas devem ter um texto.");
        return;
      }
      
      if (question.type === "multiple" && question.options) {
        const validOptions = question.options.filter(opt => opt.trim() !== "");
        if (validOptions.length < 2) {
          alert("Perguntas de múltipla escolha devem ter pelo menos 2 opções.");
          return;
        }
      }
      
      if (question.type === "text" && !question.correctAnswer) {
        alert("Perguntas de texto devem ter uma resposta correta definida.");
        return;
      }
    }
    
    // Preparar dados para salvar
    const quizData = {
      id: quizId,
      title,
      description,
      discipline,
      questions
    };
    
    // Chamar função de callback com os dados
    onSave(quizData);
  };

  // Alternar entre as abas
  const handleTabChange = (tab: 'create' | 'edit' | 'reports') => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 bg-white dark:bg-dark-card rounded-lg shadow-md">
        <p className="text-center py-8">Carregando dados do quiz...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-dark-card rounded-t-lg shadow-md">
      {/* Abas de navegação */}
      <div className="flex border-b border-gray-200 dark:border-dark-border">
        <button
          className={`py-3 px-6 ${
            activeTab === 'create' 
              ? 'bg-blue-100 dark:bg-dark-hover text-blue-600 dark:text-blue-400 font-medium' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-hover'
          }`}
          onClick={() => handleTabChange('create')}
        >
          Criar Quiz
        </button>
        <button
          className={`py-3 px-6 ${
            activeTab === 'edit' 
              ? 'bg-blue-100 dark:bg-dark-hover text-blue-600 dark:text-blue-400 font-medium' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-hover'
          }`}
          onClick={() => handleTabChange('edit')}
        >
          Editar Quiz
        </button>
        <button
          className={`py-3 px-6 ${
            activeTab === 'reports' 
              ? 'bg-blue-100 dark:bg-dark-hover text-blue-600 dark:text-blue-400 font-medium' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-hover'
          }`}
          onClick={() => handleTabChange('reports')}
        >
          Relatórios
        </button>
      </div>

      {/* Formulário */}
      <div className="p-6">
        {/* Informações básicas do Quiz */}
        <div className="mb-6">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 text-sm font-medium">
              Título do Quiz
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text"
              placeholder="Ex: Quiz de Programação Web"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-1 text-sm font-medium">
              Descrição do Quiz
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text"
              placeholder="Descrição opcional do quiz"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="discipline" className="block mb-1 text-sm font-medium">
              Disciplina
            </label>
            <select
              id="discipline"
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text"
            >
              <option value="">Nome da Disciplina</option>
              {disciplines.map((disc, index) => (
                <option key={index} value={disc}>
                  {disc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botão para adicionar pergunta */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" /> Adicionar pergunta
          </button>
        </div>

        {/* Lista de perguntas */}
        {questions.map((question, qIndex) => (
          <div 
            key={question.id}
            className="mb-8 p-4 border border-gray-200 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-card"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {qIndex + 1}. Digite a pergunta:
              </h3>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(question.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remover pergunta"
              >
                <FaTrash />
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={question.text}
                onChange={(e) => handleQuestionTextChange(question.id, e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text"
                placeholder="Pergunta"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Tipo de resposta:
                </label>
                <select
                  value={question.type}
                  onChange={(e) => handleQuestionTypeChange(question.id, e.target.value as any)}
                  className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text"
                >
                  <option value="multiple">Alternativa</option>
                  <option value="text">Texto</option>
                </select>
              </div>

              {question.type === "text" && (
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Tipo de resposta:
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text"
                    disabled
                  >
                    <option value="text">Texto</option>
                  </select>
                </div>
              )}
            </div>

            {question.type === "multiple" && question.options && (
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Respostas
                </label>
                
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correctAnswer_${question.id}`}
                        checked={question.correctAnswer === oIndex}
                        onChange={() => handleCorrectOptionChange(question.id, oIndex)}
                        className="h-4 w-4"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(question.id, oIndex, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text"
                        placeholder={`Resposta ${oIndex + 1}`}
                      />
{question.options && question.options.length > 2 && (
  <button
    type="button"
    onClick={() => handleRemoveOption(question.id, oIndex)}
    className="text-red-500 hover:text-red-700 p-1"
  >
    <FaTrash size={14} />
  </button>
)}
                      )
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={() => handleAddOption(question.id)}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <FaPlus className="mr-1" size={12} /> Adicionar opção
                </button>
              </div>
            )}

            {question.type === "text" && (
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Resposta
                </label>
                <textarea
                  value={question.correctAnswer as string || ""}
                  onChange={(e) => handleCorrectAnswerChange(question.id, e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text"
                  placeholder="A resposta certa é..."
                  rows={3}
                />
              </div>
            )}

            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={() => handleRemoveQuestion(question.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
              >
                Remover pergunta
              </button>
            </div>
          </div>
        ))}

        {/* Botões de ação */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 dark:border-dark-border rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Salvar Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;