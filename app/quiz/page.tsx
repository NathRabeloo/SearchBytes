// pages/quizzes/index.tsx
"use client";

import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Link from 'next/link';

// Componente do Menu Lateral
const Sidebar = () => {
  return (
    <div style={{ width: '250px', padding: '20px', backgroundColor: '#F1F5F9', position: 'fixed', height: '100%', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#0084FF' }}>Menu</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        <li style={{ margin: '10px 0' }}>
          <Link href="/">Home</Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link href="/quizzes">Quizzes</Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link href="/polls">Enquetes</Link>
        </li>
        {/* Adicione outros links conforme necessário */}
      </ul>
    </div>
  );
};

// Página de Quizzes
const QuizzesPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionText, setQuestionText] = useState('');
  const [optionTexts, setOptionTexts] = useState<string[]>(['']); // Inicia com um campo de opção
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [qrCodeVisible, setQrCodeVisible] = useState(false);

  interface Question {
    text: string;
    options: string[];
    correctAnswer: number; // índice da resposta correta
  }

  const handleAddOption = () => {
    setOptionTexts([...optionTexts, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...optionTexts];
    updatedOptions[index] = value;
    setOptionTexts(updatedOptions);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (questionText.trim() === '' || optionTexts.some(option => option.trim() === '') || correctAnswer === null) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const newQuestion = {
      text: questionText,
      options: optionTexts,
      correctAnswer,
    };

    setQuestions([...questions, newQuestion]);
    setQuestionText('');
    setOptionTexts(['']); // Reseta as opções
    setCorrectAnswer(null);
  };

  const handleToggleQRCode = () => {
    setQrCodeVisible(!qrCodeVisible);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar /> {/* Adiciona o menu lateral */}
      <div style={{ padding: '40px', marginLeft: '250px', width: '100%', backgroundColor: '#EFF6FF', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', color: '#0084FF' }}>Criar Quiz Rápido</h1>
        <form onSubmit={handleAddQuestion} style={{ marginBottom: '40px' }}>
          <input
            type="text"
            placeholder="Digite sua pergunta"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              marginBottom: '10px',
              fontSize: '16px',
              backgroundColor: '#F9FAFB',
            }}
          />
          {optionTexts.map((option, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder={`Opção ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                style={{
                  width: 'calc(100% - 50px)',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  marginRight: '10px',
                  fontSize: '16px',
                  backgroundColor: '#F9FAFB',
                }}
              />
              <input
                type="radio"
                name="correctAnswer"
                checked={correctAnswer === index}
                onChange={() => setCorrectAnswer(index)}
                style={{ marginLeft: '10px' }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            style={{
              padding: '12px 24px',
              backgroundColor: '#60A5FA',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              marginBottom: '20px',
            }}
          >
            Adicionar Opção
          </button>
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
            }}
          >
            Adicionar Pergunta
          </button>
        </form>

        {questions.length > 0 && (
          <div>
            <h2>Perguntas Adicionadas</h2>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {questions.map((question, index) => (
                <li key={index} style={{ marginBottom: '20px' }}>
                  <h3>{question.text}</h3>
                  <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {question.options.map((option, idx) => (
                      <li key={idx}>
                        {option} {question.correctAnswer === idx && '✓'}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button onClick={handleToggleQRCode} style={{ marginTop: '40px', padding: '12px 24px', backgroundColor: '#0084FF', color: '#FFFFFF', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>
          {qrCodeVisible ? 'Ocultar QR Code' : 'Mostrar QR Code'}
        </button>

        {qrCodeVisible && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h2>QR Code do Quiz</h2>
            <QRCode value={JSON.stringify(questions)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizzesPage;
