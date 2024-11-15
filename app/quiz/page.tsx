"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import Sidebar from '../components/Sidebar/Sidebar';

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('/api/quizzes');
      if (response.ok) {
        const data = await response.json();
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
      { id: Date.now(), text: "", type: "multiple-choice", options: [], required: false },
    ]);
  };

  const updateQuestion = (id, updatedQuestion) => {
    setQuestions(questions.map((q) => (q.id === id ? updatedQuestion : q)));
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const saveQuiz = async () => {
    const quizData = {
      title,
      description,
      questions,
    };

    try {
      const response = await fetch('/api/quizzes', {
        method: currentQuiz ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentQuiz ? { ...quizData, id: currentQuiz.id } : quizData),
      });

      if (response.ok) {
        const savedQuiz = await response.json();
        if (currentQuiz) {
          setQuizzes(quizzes.map(q => q.id === savedQuiz.id ? savedQuiz : q));
        } else {
          setQuizzes([...quizzes, savedQuiz]);
        }
        resetForm();
        setQrCodeUrl(`${window.location.origin}/quiz/${savedQuiz.id}`);
      } else {
        console.error('Failed to save quiz');
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  const editQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setTitle(quiz.title);
    setDescription(quiz.description);
    setQuestions(quiz.questions);
  };

  const deleteQuiz = async (id) => {
    try {
      const response = await fetch(`/api/quizzes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setQuizzes(quizzes.filter(q => q.id !== id));
      } else {
        console.error('Failed to delete quiz');
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const resetForm = () => {
    setCurrentQuiz(null);
    setTitle("");
    setDescription("");
    setQuestions([]);
    setQrCodeUrl("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Create a Quiz</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <input
            type="text"
            placeholder="Quiz Title"
            className="w-full p-2 border rounded mb-4 text-gray-800"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Quiz Description"
            className="w-full p-2 border rounded mb-4 text-gray-800"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          
          {questions.map((question, index) => (
            <QuestionItem
              key={question.id}
              question={question}
              index={index}
              updateQuestion={updateQuestion}
              removeQuestion={removeQuestion}
            />
          ))}
          
          <button
            onClick={addQuestion}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
          >
            Add Question
          </button>
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={saveQuiz}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              {currentQuiz ? "Update Quiz" : "Save Quiz"}
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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Quizzes</h2>
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

function QuestionItem({ question, index, updateQuestion, removeQuestion }) {
  const addOption = () => {
    const updatedQuestion = {
      ...question,
      options: [...question.options, { id: Date.now(), text: "" }],
    };
    updateQuestion(question.id, updatedQuestion);
  };

  const updateOptionText = (optionIndex, text) => {
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
          Remove
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter your question"
        className="w-full p-2 border rounded mb-2 text-gray-800"
        value={question.text}
        onChange={(e) => updateQuestion(question.id, { ...question, text: e.target.value })}
      />
      <select
        className="w-full p-2 border rounded mb-2 text-gray-800"
        value={question.type}
        onChange={(e) => updateQuestion(question.id, { ...question, type: e.target.value })}
      >
        <option value="multiple-choice">Multiple Choice</option>
        <option value="text">Text</option>
        <option value="rating">Rating</option>
        <option value="date">Date</option>
      </select>
      
      {question.type === "multiple-choice" && (
        <div className="ml-4">
          {question.options.map((option, i) => (
            <div key={option.id} className="flex items-center mt-2">
              <input type="radio" disabled className="mr-2" />
              <input
                type="text"
                placeholder={`Option ${i + 1}`}
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
            + Add Option
          </button>
        </div>
      )}
      
      {question.type === "text" && (
        <input
          type="text"
          placeholder="Short answer text"
          className="w-full p-2 border rounded mt-2 bg-gray-100 text-gray-800"
          disabled
        />
      )}
      
      {question.type === "rating" && (
        <div className="flex items-center mt-2">
          <span className="text-gray-800">1</span>
          <input type="range" min="1" max="5" className="mx-2 flex-1" disabled />
          <span className="text-gray-800">5</span>
        </div>
      )}
      
      {question.type === "date" && (
        <input
          type="date"
          className="w-full p-2 border rounded mt-2 bg-gray-100 text-gray-800"
          disabled
        />
      )}
      
      <div className="mt-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) => updateQuestion(question.id, { ...question, required: e.target.checked })}
            className="mr-2"
          />
          <span className="text-gray-800">Required question</span>
        </label>
      </div>
    </div>
  );
}