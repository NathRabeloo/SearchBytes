'use client';

import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import Sidebar from '../components/Sidebar/Sidebar';

const SurveyPage = () => {
  const [questions, setQuestions] = useState([]);
  const [surveyUrl, setSurveyUrl] = useState('');

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, text: '', options: [] }]);
  };

  const handleQuestionChange = (index, newQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = newQuestion;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = [
      ...updatedQuestions[questionIndex].options,
      '',
    ];
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, newOption) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = newOption;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a unique survey URL or ID
    const surveyId = Math.floor(Math.random() * 1000000);
    const surveyUrl = `https://your-domain.com/survey/${surveyId}`;
    setSurveyUrl(surveyUrl);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4 text-black">Criar Enquete</h1>
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={question.id} className="mb-4">
              <h3 className="text-lg font-semibold text-black">Pergunta {index + 1}</h3>
              <input
                type="text"
                value={question.text}
                onChange={(e) => handleQuestionChange(index, { ...question, text: e.target.value })}
                className="mt-2 p-2 w-full text-black bg-white border"
              />
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="mt-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                      className="p-2 w-full text-black bg-white border"
                    />
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleAddOption(index)}
                className="mt-2 px-4 py-2 bg-gray-200 text-gray-600 rounded"
              >
                Add Option
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-600 rounded"
          >
            Add Question
          </button>
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Gerar QR Code
          </button>
        </form>
        {surveyUrl && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-black">Enquetes QR Code</h2>
            <QRCode value={surveyUrl} />
            <p className="mt-2 text-black">Escaneie o QRCode para responder a enquete.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyPage;