"use client";
import React from 'react';

const RulesContent: React.FC = () => {
    return (
        <div className="rules-page bg-[#1c2536] text-white rounded-2xl p-10 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Правила игры</h1>
            <h2 className="text-2xl mb-6">Как играть</h2>
            <p className="mb-4">
                Добро пожаловать в нашу игру! Здесь вы можете прочитать правила и понять, как всё работает.
            </p>
            <p className="mb-4">
                Игра состоит из нескольких раундов:
            </p>
            <ul className="list-disc list-inside mb-4 text-left">
                <li><span className="text-[#f4c542] font-bold">Первый раунд:</span> Разминка.</li>
                <li><span className="text-[#d95f02] font-bold">Второй раунд:</span> Основная часть.</li>
                <li><span className="text-[#f4c542] font-bold">Третий раунд:</span> Финал.</li>
            </ul>
            <div className="important-note font-bold text-[#d95f02]">
                Не забывайте следить за временем!
            </div>
        </div>
    );
};

export default RulesContent;