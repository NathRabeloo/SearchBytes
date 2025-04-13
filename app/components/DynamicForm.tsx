"use client";

import React, { useState } from "react";

type FormType = "range" | "list" | "question";

interface DynamicFormProps {
    formType: FormType;
    onSubmit: (data: any) => void;
    initialData?: any;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formType, onSubmit, initialData }) => {
    const [range, setRange] = useState({ min: initialData?.min || "", max: initialData?.max || "" });
    const [list, setList] = useState<string[]>(initialData?.list || [""]);
    const [question, setQuestion] = useState({ text: initialData?.text || "", answer: initialData?.answer || "" });

    const handleListChange = (index: number, value: string) => {
        const updated = [...list];
        updated[index] = value;
        setList(updated);
    };

    const addListItem = () => setList([...list, ""]);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (formType === "range") onSubmit(range);
        else if (formType === "list") onSubmit(list.filter((item) => item.trim() !== ""));
        else if (formType === "question") onSubmit(question);
    };

    return (
        <form
            onSubmit={submitHandler}
            className="w-full max-w-3xl bg-[#5A9BF6] dark:bg-dark-primary text-white p-4 md:p-6 rounded-2xl shadow-lg flex flex-col gap-4"
        >
            {formType === "range" && (
                <>
                    <div>
                        <label className="text-sm block mb-1">Mínimo:</label>
                        <input
                            type="number"
                            value={range.min}
                            onChange={(e) => setRange({ ...range, min: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg text-black"
                        />
                    </div>
                    <div>
                        <label className="text-sm block mb-1">Máximo:</label>
                        <input
                            type="number"
                            value={range.max}
                            onChange={(e) => setRange({ ...range, max: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg text-black"
                        />
                    </div>

                    <button type="submit" className="mt-2 bg-[#4A86E8] hover:bg-[#3B76D4] px-4 py-2 rounded-lg text-white font-semibold">
                        Sortear
                    </button>
                </>
            )}

            {formType === "list" && (
                <>
                    <label className="text-sm block mb-1">Lista de Itens:</label>
                    {list.map((item, index) => (
                        <input
                            key={index}
                            type="text"
                            value={item}
                            onChange={(e) => handleListChange(index, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg text-black mb-2"
                            placeholder={`Item ${index + 1}`}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={addListItem}
                        className="bg-[#4A86E8] hover:bg-[#3B76D4] px-4 py-2 rounded-lg text-white text-sm"
                    >
                        + Adicionar item
                    </button>
                </>
            )}

            {formType === "question" && (
                <>
                    <div>
                        <label className="text-sm block mb-1">Pergunta:</label>
                        <input
                            type="text"
                            value={question.text}
                            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg text-black"
                            placeholder="Digite sua pergunta"
                        />
                    </div>
                    <div>
                        <label className="text-sm block mb-1">Resposta Correta:</label>
                        <input
                            type="text"
                            value={question.answer}
                            onChange={(e) => setQuestion({ ...question, answer: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg text-black"
                            placeholder="Digite a resposta correta"
                        />
                    </div>
                </>
            )}

        </form>
    );
};

export default DynamicForm;
