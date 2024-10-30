
"use client";
import React, { useState } from 'react';

const CreateGame: React.FC = () => {
    const [gameName, setGameName] = useState('');
    const [gameDate, setGameDate] = useState('');
    const [gameNumber, setGameNumber] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [teams, setTeams] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleCreateGame = () => {
        // Логика создания игры
        console.log({
            gameName,
            gameDate,
            gameNumber,
            restaurant,
            teams,
            file
        });
    };

    return (
        <div className="bg-[#FAF3DD] text-black p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Создание игры</h2>
            <div className="flex flex-col space-y-4 items-center">
                <input
                    type="text"
                    placeholder="Название игры"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    className="p-2 rounded border w-2/3"
                />
                <input
                    type="date"
                    value={gameDate}
                    onChange={(e) => setGameDate(e.target.value)}
                    className="p-2 rounded border w-2/3"
                />
                <input
                    type="number"
                    placeholder="Номер игры"
                    value={gameNumber}
                    onChange={(e) => setGameNumber(e.target.value)}
                    className="p-2 rounded border w-2/3"
                />
                <select
                    value={restaurant}
                    onChange={(e) => setRestaurant(e.target.value)}
                    className="p-2 rounded border w-2/3"
                >
                    <option value="">Выберите ресторан</option>
                    <option value="Ресторан А">Ресторан А</option>
                    <option value="Ресторан Б">Ресторан Б</option>
                    <option value="Ресторан В">Ресторан В</option>
                </select>
                <input
                    type="file"
                    accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    onChange={handleFileUpload}
                    className="p-2 rounded border w-2/3"
                />
                <button
                    className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                    onClick={handleCreateGame}
                >
                    Создать игру
                </button>
            </div>
        </div>
    );
};

export default CreateGame;
