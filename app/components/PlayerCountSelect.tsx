"use client";
import React, { useState } from 'react';

interface PlayerCountSelectProps {
    onNext: (data: { playerCount: number }) => void;
}

const PlayerCountSelect: React.FC<PlayerCountSelectProps> = ({ onNext }) => {
    const [playerCount, setPlayerCount] = useState(1);
    const pricePerPlayer = 700; // Цена за одного человека
    const teamName = "НАЗВАНИЕ КОМАНДЫ";

    const handleSubmit = () => {
        onNext({ playerCount });
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg">
            <div className="mb-4">
                <button className="text-[#CC9F33] border border-[#CC9F33] px-4 py-2 rounded-lg">
                    {teamName}
                </button>
            </div>
            <h2 className="text-3xl font-bold mb-4">
                Выберите количество игроков, за которых будете оплачивать
            </h2>
            <div className="flex flex-wrap justify-center mb-4">
                {[...Array(12)].map((_, index) => (
                    <button
                        key={index}
                        className={`w-12 h-12 m-1 rounded-full text-lg font-semibold ${
                            playerCount === index + 1
                                ? 'bg-[#CC9F33] text-white'
                                : 'bg-gray-200 text-black'
                        }`}
                        onClick={() => setPlayerCount(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <div className="flex justify-between items-baseline mb-4 text-2xl font-semibold">
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{playerCount * pricePerPlayer} ₽</span>
                    <span className="ml-2 text-lg font-normal text-gray-500">к оплате</span>
                </div>
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{pricePerPlayer} ₽</span>
                    <span className="ml-2 text-lg font-normal text-gray-500">цена за 1 человека</span>
                </div>
            </div>
            <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">
                    Напишите вашу почту, на которую вы хотите, чтобы пришел чек
                </p>
                <input
                    type="email"
                    placeholder="Ваша электронная почта"
                    className="w-full border border-gray-300 p-2 rounded-lg mb-2 placeholder-black"
                />
                <input
                    type="text"
                    placeholder="Введите промокод"
                    className="w-full border border-gray-300 p-2 rounded-lg mb-4 placeholder-black"
                />
            </div>
            <button
                className="w-full bg-[#CC9F33] text-white py-3 rounded-lg font-semibold hover:bg-[#b28d2a]"
                onClick={handleSubmit}
            >
                ПЕРЕЙТИ К ОПЛАТЕ
            </button>
            <div className="flex items-center mt-2 text-sm text-gray-500">
                <input type="checkbox" className="form-checkbox border-gray-300 text-[#CC9F33] rounded" />
                <span className="ml-2">
                    Нажимая на кнопку, вы соглашаетесь с политикой обработки персональных данных
                </span>
            </div>
        </div>
    );
};

export default PlayerCountSelect;
