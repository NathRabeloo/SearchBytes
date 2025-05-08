// app/home/sorteador/page.tsx
"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import DynamicForm from "../../components/DynamicForm";

const SorteadorPage = () => {
  const [formType, setFormType] = useState<"range" | "list">("range");

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Header
        date={currentDate}
        title="Sorteador"
        buttonText="Realizar um Sorteio →"
        buttonLink="/home/sorteador"
        desktopImageLeft="/assets/professora_denilce.png"
        mobileImage="/assets/professora_denilce.png"
        showOnlyLeftImage={true}
      />

      <div className="my-4 flex gap-4 items-center">
        <button
          onClick={() => setFormType("range")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            formType === "range"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-600"
          }`}
        >
          Sorteio por Números
        </button>
        <button
          onClick={() => setFormType("list")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            formType === "list"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-600"
          }`}
        >
          Sorteio por Lista
        </button>
      </div>

      <DynamicForm
        formType={formType}
        onSubmit={(data) => {
          console.log("Dados enviados:", data);
        }}
      />
    </>
  );
};

export default SorteadorPage;
