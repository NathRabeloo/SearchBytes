"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import Sidebar from '../components/Sidebar/Sidebar';
import { PrismaClient } from '@prisma/client';
export default function QuizPage() {
  const [quizzes, setQuizzes] = useState<Array<{ id: number; title: string; description: string; questions: Array<{ id: number; text: string; type: string; options: Array<{ id: number; text: string }>; required: boolean; }> }>>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Array<{ id: number; text: string; type: string; options: Array<{ id: number; text: string }>; required: boolean; }>>([]);
  const [currentQuiz, setCurrentQuiz] = useState<null | { id: number; title: string; description: string; questions: Array<{ id: number; text: string; type: string; options: Array<{ id: number; text: string }>; required: boolean; }> }>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('/api/quizzes');
      if (response.ok) {
        const data = await response.json();
        console.log("Quizzes deu certo o fetch");
        setQuizzes(data);
      } else {
        console.error('Failed to fetch quizzes');
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: '', type: 'multiple-choice', options: [], required: false },
    ]);
  };

  const updateQuestion = (questionId: number, updatedQuestion: { id: number; text: string; type: string; options: { id: number; text: string }[]; required: boolean; }) => {
    setQuestions(questions.map((q) => (q.id === questionId ? updatedQuestion : q)));
  };

  const removeQuestion = (id:number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

const saveQuiz = async () => {
  try {
    const response = await fetch('/api/quizzes', {
      method: currentQuiz ? 'PUT' : 'POST',
      
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        questions: questions.map((question) => ({
          text: question.text,
          type: question.type,
          options: question.options.map((option) => ({ text: option.text })),
          required: question.required,
        })),
      }),
    });

    if (response.ok) {
      const savedQuiz = await response.json();
      console.log("Quizzes deu certo SALVAR");
      if (savedQuiz.id) { // Check if the savedQuiz object has an id
        if (currentQuiz) {
          setQuizzes((prevQuizzes) => prevQuizzes.map((q) => (q.id === savedQuiz.id ? savedQuiz : q)));
        } else {
          setQuizzes((prevQuizzes) => [...prevQuizzes, savedQuiz]);
        }
        resetForm();
        setQrCodeUrl(`${window.location.origin}/quiz/${savedQuiz.id}`);
      } else {
        console.error('Failed to save quiz: missing id in response');
      }
    } else {
      console.error('Failed to save quiz');
    }
  } catch (error) {
    console.error('Error saving quiz:', error);
  }
};


const editQuiz = (quiz: { id: number; title: string; description: string; questions: Array<{ id: number; text: string; type: string; options: Array<{ id: number; text: string }>; required: boolean; }> }) => {
  setCurrentQuiz(quiz);
  setTitle(quiz.title);
  setDescription(quiz.description);
  setQuestions(quiz.questions);
};

  const deleteQuiz = async (id: number) => {
    try {
      const response = await fetch(`/api/quizzes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setQuizzes(quizzes.filter((q) => q.id !== id));
      } else {
        console.error('Failed to delete quiz');
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const resetForm = () => {
    setCurrentQuiz(null);
    setTitle('');
    setDescription('');
    setQuestions([]);
    setQrCodeUrl('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Crie um quiz</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <input
            type="text"
            placeholder="Título do Quiz"
            className="w-full p-2 border rounded mb-4 text-gray-800"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição do Quiz"
            className="w-full p-2 border rounded mb-4 text-gray-800"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          
          {questions.map((question, index) => (
            <QuestionItem
            key={question.id}
            question={question}
            index={index}
            updateQuestion={(questionId, updatedQuestion) => updateQuestion(questionId, { ...updatedQuestion, required: false })}
            removeQuestion={removeQuestion}
          />
          ))}
          
          <button
            onClick={addQuestion}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
          >
            Adicionar pergunta
          </button>
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={saveQuiz}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              {currentQuiz ? 'Update Quiz' : 'Save Quiz'}
            </button>
          </div>
        </div>
        
        {qrCodeUrl && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Quiz QR Code</h2>
            <QRCode value={qrCodeUrl} />
          </div>
        )}
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Quizzes criados</h2>
          <div className="bg-white rounded-lg shadow-md">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="border-b last:border-b-0 p-4 flex justify-between items-center">
                <span className="text-lg text-gray-800">{quiz.title}</span>
                <div>
                  <button
                    onClick={() => editQuiz(quiz)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteQuiz(quiz.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function QuestionItem({ question, index, updateQuestion, removeQuestion }: {
  question: { id: number; text: string; type: string; options: Array<{ id: number; text: string }> };
  index: number;
  updateQuestion: (questionId: number, updatedQuestion: { id: number; text: string; type: string; options: Array<{ id: number; text: string }> }) => void;
  removeQuestion: (questionId: number) => void;
}) {
  const addOption = () => {
    const updatedQuestion = {
      ...question,
      options: [...question.options, { id: Date.now(), text: '' }],
    };
    updateQuestion(question.id, updatedQuestion);
  };

  const updateOptionText = (optionIndex: number, text: string) => {
    const updatedOptions = question.options.map((opt, idx) =>
      idx === optionIndex ? { ...opt, text } : opt
    );
    updateQuestion(question.id, { ...question, options: updatedOptions });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4 shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Question {index + 1}</h3>
        <button
          onClick={() => removeQuestion(question.id)}
          className="text-red-500 hover:text-red-700"
        >
          Remover pergunta
        </button>
      </div>
      <input
        type="text"
        placeholder="Digite sua pergunta"
        className="w-full p-2 border rounded mb-2 text-gray-800"
        value={question.text}
        onChange={(e) => updateQuestion(question.id, { ...question, text: e.target.value })}
      />
      <select
        className="w-full p-2 border rounded mb-2 text-gray-800"
        value={question.type}
        onChange={(e) => updateQuestion(question.id, { ...question, type: e.target.value })}
      >
        <option value="multiple-choice">Mútlipla escolha</option>
        <option value="text">Texto</option>
        <option value="rating">Rating</option>
        <option value="date">Data</option>
      </select>
      
      {question.type === 'multiple-choice' && (
        <div className="ml-4">
          {question.options.map((option, i) => (
            <div key={option.id} className="flex items-center mt-2">
              <input type="radio" disabled className="mr-2" />
              <input
                type="text"
                placeholder={`Opção ${i + 1}`}
                className="flex-1 p-2 border rounded text-gray-800"
                value={option.text}
                onChange={(e) => updateOptionText(i, e.target.value)}
              />
            </div>
          ))}
          <button
            onClick={addOption}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            + Adicionar opção
          </button>
        </div>
      )}
      
      {question.type === 'text' && (
        <input
          type="text"
          placeholder="Texto de resposta curta"
          className="w-full p-2 border rounded text-gray-800"
          value={question.text}
          onChange={(e) => updateQuestion(question.id, { ...question, text: e.target.value })}
        />
      )}
      
      {question.type === 'rating' && (
        <div className="flex items-center">
          <span className="mr-2">Rating:</span>
          <input
            type="number"
            min="1"
            max="5"
            className="w-16 p-2 border rounded text-gray-800"
            value={question.text}
            onChange={(e) => updateQuestion(question.id, { ...question, text: e.target.value })}
          />
        </div>
      )}
      
      {question.type === 'date' && (
        <input
          type="date"
          className="w-full p-2 border rounded text-gray-800"
          value={question.text}
          onChange={(e) => updateQuestion(question.id, { ...question, text: e.target.value })}
        />
      )}
    </div>
  );
  
}

