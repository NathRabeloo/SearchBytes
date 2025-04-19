"use client";

import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

interface SpinningWheelProps {
    items: string[];
    onFinish: (winner: string) => void;
}

const SpinningWheel: React.FC<SpinningWheelProps> = ({ items, onFinish }) => {
    const [angle, setAngle] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const spin = () => {
        if (items.length < 2) {
            alert("Adicione pelo menos dois itens para rodar a roleta.");
            return;
        }

        const spins = 10 + Math.random() * 5;
        const degrees = spins * 360;
        setAngle(degrees);
        setSpinning(true);

        const winnerIndex = items.length - Math.floor((degrees % 360) / (360 / items.length)) - 1;
        const winner = items[winnerIndex < 0 ? items.length - 1 : winnerIndex];

        setTimeout(() => {
            setSpinning(false);
            onFinish(winner);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.95, x: 0.569 },
            });
        }, 4000); // tempo de giro
    };

    const colors = ["#F87171", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA", "#F472B6"];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const radius = canvas.width / 2;
        const anglePerItem = (2 * Math.PI) / items.length;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        items.forEach((item, index) => {
            const startAngle = index * anglePerItem;
            const endAngle = startAngle + anglePerItem;
            const color = colors[index % colors.length];

            // Desenhar setor
            ctx.beginPath();
            ctx.moveTo(radius, radius);
            ctx.arc(radius, radius, radius, startAngle, endAngle);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.stroke();

            // Desenhar texto
            ctx.save();
            ctx.translate(radius, radius);
            ctx.rotate(startAngle + anglePerItem / 2);
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.font = "bold 14px sans-serif";
            ctx.fillText(item, radius - 10, 0);
            ctx.restore();
        });
    }, [items]);

    return (
        <div className="flex flex-col items-center relative">
            {/* Ponteiro */}
            <div
                style={{
                    position: "absolute",
                    top: "40%", // Ajuste da posição do ponteiro
                    left: "70%",
                    zIndex: 50,
                    transform: "translate(50%, -50%) rotate(-90deg)", // Posiciona e rotaciona o ponteiro para a esquerda
                    
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderBottom: "20px solid red", // Cor do ponteiro
                }}
            ></div>

            {/* Canvas da roleta */}
            <canvas
                ref={canvasRef}
                width={300}
                height={300}
                style={{
                    transition: "transform 4s cubic-bezier(0.33, 1, 0.68, 1)",
                    transform: `rotate(${angle}deg)`,
                }}
                className="rounded-full border-4 border-gray-800"
            />
            <button
                onClick={spin}
                className={`mt-4 px-6 py-2 rounded-lg font-bold ${spinning ? 'bg-red-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                disabled={spinning}
            >
                {spinning ? "Girando..." : "Girar Roleta"}
            </button>
        </div>
    );
};

export default SpinningWheel;





