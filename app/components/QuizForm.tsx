"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface Question {
  id: string;
  text: string;
  type: "multiple" | "text";
  options?: string[]; // 'options' é opcional
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
      options: ["Resposta 1", "Resposta 2", "Resposta 3"], // Exemplo com opções iniciais
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
        // Dados fictícios de exemplo
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
      options: ["Resposta 1", "Resposta 2", ""], // Definir um valor padrão
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
            options: q.options ?? ["Resposta 1", "Resposta 2", ""], // Valor padrão
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
              : 'text-gray-600 dark:text-dark-text'
          }`}
          onClick={() => handleTabChange('create')}
        >
          Criar Quiz
        </button>
        <button
          className={`py-3 px-6 ${
            activeTab === 'edit' 
              ? 'bg-blue-100 dark:bg-dark-hover text-blue-600 dark:text-blue-400 font-medium' 
              : 'text-gray-600 dark:text-dark-text'
          }`}
          onClick={() => handleTabChange('edit')}
        >
          Editar Quiz
        </button>
        <button
          className={`py-3 px-6 ${
            activeTab === 'reports' 
              ? 'bg-blue-100 dark:bg-dark-hover text-blue-600 dark:text-blue-400 font-medium' 
              : 'text-gray-600 dark:text-dark-text'
          }`}
          onClick={() => handleTabChange('reports')}
        >
          Relatórios
        </button>
      </div>

      {/* Conteúdo da criação de quiz */}
      {activeTab === 'create' && (
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Título do Quiz</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Digite o título do quiz"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Descrição do quiz"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Disciplina</label>
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Selecione a disciplina</option>
              {disciplines.map((discipline, index) => (
                <option key={index} value={discipline}>
                  {discipline}
                </option>
              ))}
            </select>
          </div>

          {/* Perguntas */}
          {questions.map((question, index) => (
            <div key={question.id} className="mb-6 border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => handleQuestionTextChange(question.id, e.target.value)}
                  className="w-3/4 p-2 border rounded-md"
                  placeholder={`Pergunta ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(question.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={16} />
                </button>
              </div>

              {/* Tipo de pergunta */}
              <div className="mb-2">
                <label className="text-sm font-medium">Tipo de pergunta</label>
                <select
                  value={question.type}
                  onChange={(e) => handleQuestionTypeChange(question.id, e.target.value as "multiple" | "text")}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="multiple">Múltipla escolha</option>
                  <option value="text">Resposta livre</option>
                </select>
              </div>

              {/* Opções de múltipla escolha */}
              {question.type === "multiple" && question.options && (
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">Respostas</label>
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
            </div>
          ))}

          <div className="mb-4">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="text-blue-600 hover:text-blue-800"
            >
              <FaPlus className="mr-2" size={14} /> Adicionar pergunta
            </button>
          </div>

          <div className="flex justify-between">
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
              Cancelar
            </button>
            <button onClick={handleSave} className="text-blue-600 hover:text-blue-800">
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizForm;