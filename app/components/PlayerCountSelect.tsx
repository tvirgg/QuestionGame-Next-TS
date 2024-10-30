"use client";
import React, { useState } from 'react';

interface PlayerCountSelectProps {
    onNext: (data: { playerCount: number }) => void;
}

const PlayerCountSelect: React.FC<PlayerCountSelectProps> = ({ onNext }) => {
    const [playerCount, setPlayerCount] = useState(1);
    const pricePerPlayer = 100; // Пример цены

    const handleSubmit = () => {
        onNext({ playerCount });
    };

    return (
        <div className="text-white">
            <h2 className="text-2xl mb-4">Выбор количества игроков</h2>
            <div className="player-select flex flex-wrap justify-center mb-4">
                {[...Array(12)].map((_, index) => (
                    <button
                        key={index}
                        className={`w-10 h-10 m-1 rounded-full ${
                            playerCount === index + 1
                                ? 'bg-[#f4c542] text-white'
                                : 'bg-gray-200 text-black'
                        }`}
                        onClick={() => setPlayerCount(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <div className="price-info flex justify-between mb-4">
                <span>Цена за игрока:</span>
                <span>{pricePerPlayer} ₽</span>
            </div>
            <div className="price-info flex justify-between mb-4">
                <span>Общая сумма:</span>
                <span>{playerCount * pricePerPlayer} ₽</span>
            </div>
            <button
                className="submit-button bg-[#f4c542] text-white py-2 px-4 rounded w-full hover:bg-[#d2a636]"
                onClick={handleSubmit}
            >
                Далее
            </button>
        </div>
    );
};

export default PlayerCountSelect;