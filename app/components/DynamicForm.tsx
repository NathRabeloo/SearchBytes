"use client";

import React, { useState } from "react";

type FormType = "range" | "list" | "question";

interface DynamicFormProps {
    formType: FormType;
    onSubmit: (data: any) => void;
    initialData?: any;
}

const WheelSpinner = ({ items, onComplete }: { items: string[]; onComplete: (item: string) => void }) => {
    const [spinning, setSpinning] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const spin = () => {
        if (spinning || items.length === 0) return;

        setSpinning(true);
        const duration = 3000;
        const chosen = items[Math.floor(Math.random() * items.length)];
        setTimeout(() => {
            setSelectedItem(chosen);
            onComplete(chosen);
            setSpinning(false);
        }, duration);
    };

    return (
        <div className="flex flex-col items-center justify-center mt-4">
            <button
                onClick={spin}
                disabled={spinning}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg mb-4"
            >
                Sortear
            </button>
            <div className="h-16 w-full text-center text-xl font-bold transition-all duration-300 ease-in-out">
                {spinning ? (
                    <div className="animate-pulse text-yellow-300">Sorteando...</div>
                ) : selectedItem ? (
                    <div className="text-green-700 dark:text-green-300">🎉 {selectedItem} 🎉</div>
                ) : null}
            </div>
        </div>
    );
};

const DynamicForm: React.FC<DynamicFormProps> = ({ formType, onSubmit, initialData }) => {
    const [range, setRange] = useState({ min: initialData?.min || "", max: initialData?.max || "" });
    const [list, setList] = useState<string[]>(initialData?.list || [""]);
    const [question, setQuestion] = useState({ text: initialData?.text || "", answer: initialData?.answer || "" });
    const [rangeResult, setRangeResult] = useState<number | null>(null);

    const handleListChange = (index: number, value: string) => {
        const updated = [...list];
        updated[index] = value;
        setList(updated);
    };

    const addListItem = () => setList([...list, ""]);

    const handleRangeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const min = parseInt(range.min);
        const max = parseInt(range.max);
        if (!isNaN(min) && !isNaN(max) && min <= max) {
            const result = Math.floor(Math.random() * (max - min + 1)) + min;
            setRangeResult(result);
            onSubmit(result);
        }
    };

    return (
        <form
            onSubmit={handleRangeSubmit}
            className="w-full h-full max-w-3xl bg-[#5A9BF6] dark:bg-dark-primary text-white p-4 md:p-6 rounded-2xl shadow-lg flex flex-col gap-4"
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

                    <button
                        type="submit"
                        className="mt-2 bg-[#4A86E8] hover:bg-[#3B76D4] px-4 py-2 rounded-lg text-white font-semibold"
                    >
                        Sortear
                    </button>

                    {rangeResult !== null && (
                        <div className="text-center text-xl font-bold mt-2 text-yellow-300">
                            🎉 Número sorteado: {rangeResult}
                        </div>
                    )}
                </>
            )}

            {formType === "list" && (
                <div>
                    <label className="text-sm block mb-1">Lista de Itens:</label>
                    <div className="max-h-[300px] overflow-y-auto">
                        {list.map((item, index) => (
                            <input
                                key={index}
                                type="text"
                                value={item}
                                onChange={(e) => handleListChange(index, e.target.value)}
                                className=" px-3 py-2 rounded-lg text-black mb-2 mx-2"
                                placeholder={`Item ${index + 1}`}
                            />

                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={addListItem}
                        className="bg-[#4A86E8] hover:bg-[#3B76D4] px-4 py-2 rounded-lg text-white text-sm mt-3"
                    >
                        + Adicionar item
                    </button>

                    <WheelSpinner
                        items={list.filter((item) => item.trim() !== "")}
                        onComplete={(winner) => onSubmit(winner)}
                    />
                </div>
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
