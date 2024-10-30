"use client";
import React from 'react';
import ReturnButton from './ReturnButton';

interface WinPageProps {
    winnerName: string;
}

const WinPage: React.FC<WinPageProps> = ({ winnerName }) => {
    return (
        <div className="win-page bg-[#1c2536] text-[#f4c542] rounded-2xl p-10 text-center relative w-full h-full flex flex-col justify-center items-center">
            <h1 className="congratulations-text text-4xl font-bold mb-4">Поздравляем!</h1>
            <p className="place-text text-2xl">Победитель: {winnerName}</p>
            {/* Декоративные элементы */}
            <div className="absolute top-4 left-4">
                {/* Добавьте SVG или изображения */}
            </div>
            <div className="absolute bottom-4 right-4">
                {/* Добавьте SVG или изображения */}
            </div>
            <div className="mt-6">
                <ReturnButton />
            </div>
        </div>
    );
};

export default WinPage;