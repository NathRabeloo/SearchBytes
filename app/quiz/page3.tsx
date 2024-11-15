"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await fetch("/api/quizzes");
      if (res.ok) {
        const data = await res.json();
        setQuizzes(data);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const addQuestion = (type) => {
    setQuestions([
      ...questions,
      { id: Date.now(), type, text: "", options: [], required: false },
    ]);
  };

  const saveQuiz = async () => {
    const quizData = {
      title,
      description,
      questions,
    };

    try {
      const url = currentQuiz ? `/api/quizzes/${currentQuiz.id}` : "/api/quizzes";
      const method = currentQuiz ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });

      if (res.ok) {
        const savedQuiz = await res.json();
        fetchQuizzes();
        setCurrentQuiz(null);
        resetForm();
        generateQRCode(savedQuiz.id);
      } else {
        console.error("Error saving quiz");
      }
    } catch (error) {
      console.error("Request error:", error);
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
      const res = await fetch(`/api/quizzes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchQuizzes();
      } else {
        console.error("Error deleting quiz");
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setQuestions([]);
  };

  const generateQRCode = async (quizId) => {
    try {
      const res = await fetch(`/api/quizzes/generate-qr?quizId=${quizId}`);
      if (res.ok) {
        const data = await res.json();
        setQrCodeUrl(data.qrCodeUrl);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-500 text-white p-4">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <ul>
          <li className="mb-2 cursor-pointer">Dashboard</li>
          <li className="mb-2 cursor-pointer">Quizzes</li>
          <li className="mb-2 cursor-pointer">Results</li>
          <li className="mb-2 cursor-pointer">Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8">
        <h1 className="text-2xl font-bold mb-4">
          {currentQuiz ? "Edit Quiz" : "Create Quiz"}
        </h1>

        {/* Quiz Form */}
        <input
          type="text"
          placeholder="Quiz Title"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Quiz Description"
          className="w-full p-2 border rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Questions List */}
        <div className="space-y-4 mb-4">
          {questions.map((q, index) => (
            <Question
              key={q.id}
              question={q}
              index={index + 1}
              updateQuestion={(updatedQuestion) => {
                const newQuestions = [...questions];
                newQuestions[index] = updatedQuestion;
                setQuestions(newQuestions);
              }}
            />
          ))}
        </div>

        {/* Add Question Buttons */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => addQuestion("multiple-choice")}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            + Multiple Choice
          </button>
          <button
            onClick={() => addQuestion("text")}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            + Text
          </button>
          <button
            onClick={() => addQuestion("rating")}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            + Rating
          </button>
          <button
            onClick={() => addQuestion("date")}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            + Date
          </button>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={resetForm}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={saveQuiz}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {currentQuiz ? "Update Quiz" : "Save Quiz"}
          </button>
        </div>

        {/* QR Code Display */}
        {qrCodeUrl && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Quiz QR Code</h2>
            <QRCode value={qrCodeUrl} />
          </div>
        )}

        {/* Quizzes List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Quizzes</h2>
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz.id} className="flex justify-between items-center mb-2">
                <span>{quiz.title}</span>
                <div>
                  <button
                    onClick={() => editQuiz(quiz)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteQuiz(quiz.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

function Question({ question, index, updateQuestion }) {
  const [isRequired, setIsRequired] = useState(question.required);

  const addOption = () => {
    const updatedQuestion = {
      ...question,
      options: [...question.options, { id: Date.now(), text: "" }],
    };
    updateQuestion(updatedQuestion);
  };

  const updateOptionText = (optionIndex, text) => {
    const updatedOptions = [...question.options];
    updatedOptions[optionIndex].text = text;
    updateQuestion({ ...question, options: updatedOptions });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <label className="text-lg font-semibold">Question {index}</label>
      <input
        type="text"
        placeholder="Enter your question"
        className="w-full p-2 border rounded mt-2"
        value={question.text}
        onChange={(e) => updateQuestion({ ...question, text: e.target.value })}
      />

      {question.type === "multiple-choice" && (
        <div className="mt-4">
          {question.options.map((option, i) => (
            <div key={option.id} className="flex items-center mt-2">
              <input type="radio" name={`question-${index}`} />
              <input
                type="text"
                placeholder={`Option ${i + 1}`}
                className="ml-2 p-2 border rounded"
                value={option.text}
                onChange={(e) => updateOptionText(i, e.target.value)}
              />
            </div>
          ))}
          <button onClick={addOption} className="text-blue-500 mt-2">
            + Add Option
          </button>
        </div>
      )}

      {question.type === "text" && (
        <input
          type="text"
          placeholder="User's answer"
          className="w-full p-2 border rounded mt-2"
          disabled
        />
      )}

      {question.type === "rating" && (
        <div className="mt-2">
          <input type="range" min="1" max="5" className="w-full" disabled />
        </div>
      )}

      {question.type === "date" && (
        <input
          type="date"
          className="w-full p-2 border rounded mt-2"
          disabled
        />
      )}

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={isRequired}
          onChange={() => {
            setIsRequired(!isRequired);
            updateQuestion({ ...question, required: !isRequired });
          }}
        />
        <span className="ml-2">Required question</span>
      </div>
    </div>
  );
}