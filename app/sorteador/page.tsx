"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

export default function SortearNumeros() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);

  const handleSortear = async () => {
    const res = await fetch('/api/sorteador');
    const data = await res.json();

    if (data.result) {
      setResult(data.result);
    } else {
      alert(data.error || "Erro ao sortear número.");
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-100 text-blue-900">
      <Sidebar /> {/* Menu Lateral */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6">Sorteador de Números</h1>
        <div className="space-y-4 w-80">
          <div>
            <label className="block text-lg mb-1">Mínimo:</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg mb-1">Máximo:</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSortear}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sortear
          </button>
          {result !== null && (
            <div className="mt-4 bg-white border border-blue-300 p-4 rounded shadow">
              <h2 className="text-lg font-bold text-blue-800">Número sorteado:</h2>
              <p className="text-2xl font-bold">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
