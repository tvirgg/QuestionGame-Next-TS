"use client";
import React, { useState, useRef } from 'react';

const CreateGame: React.FC = () => {
    const [gameName, setGameName] = useState('');
    const [gameDate, setGameDate] = useState('');
    const [gameNumber, setGameNumber] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [teams, setTeams] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
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
                <div className="w-2/3">
                    {/* <label className="block mb-1 font-medium">Загрузить файл</label> */}
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            onClick={handleFileButtonClick}
                            className="flex items-center px-3 py-2 bg-[#D4A373] text-white rounded hover:bg-[#c99b6d] transition-colors duration-200"
                        >
                            {/* Новая SVG-иконка загрузки файла */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M5 20h14v-2H5v2zm7-18L5.33 9h3.34v6h6V9h3.33L12 2z" />
                            </svg>
                            Выбрать файл
                        </button>
                        {file && <span className="text-sm text-gray-700">{file.name}</span>}
                    </div>
                    <input
                        type="file"
                        accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        className="hidden"
                    />
                </div>
                <button
                    className="w-2/3 bg-[#D4A373] text-white py-2 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                    onClick={handleCreateGame}
                >
                    Создать игру
                </button>
            </div>
        </div>
    );
};

export default CreateGame;
