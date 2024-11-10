"use client";
import React, { useState } from 'react';
import Modal from './Modal';
import {
    XIcon,
    PlusIcon,
    PencilAltIcon,
    TrashIcon,
    CheckIcon,
} from '@heroicons/react/outline';

interface Player {
    id: number;
    playerName: string;
    team: string;
    gameName: string;
    email: string;
    phone: string;
    questionDifficulty: string;
    aboutHost: string;
    payment: boolean;
}

const PlayersTab: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([
        {
            id: 1,
            playerName: 'Иван',
            team: 'Команда А',
            gameName: 'Игра 1',
            email: 'mail@mail.ru',
            phone: '88005553535',
            questionDifficulty: 'Легко',
            aboutHost: 'Хорошо',
            payment: false,
        },
        {
            id: 2,
            playerName: 'Мария',
            team: 'Команда Б',
            gameName: 'Игра 2',
            email: 'maria@mail.ru',
            phone: '88001234567',
            questionDifficulty: 'Средне',
            aboutHost: 'Отлично',
            payment: true,
        },
        // Добавьте больше тестовых данных при необходимости
    ]);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [newPlayer, setNewPlayer] = useState<Player>({
        id: players.length + 1,
        playerName: '',
        team: '',
        gameName: '',
        email: '',
        phone: '',
        questionDifficulty: '',
        aboutHost: '',
        payment: false,
    });

    // States for validation errors
    const [errors, setErrors] = useState({
        playerName: '',
        team: '',
        gameName: '',
        email: '',
        phone: '',
        questionDifficulty: '',
        aboutHost: '',
    });

    const openEditModal = (player: Player) => {
        setCurrentPlayer(player);
        setErrors({
            playerName: '',
            team: '',
            gameName: '',
            email: '',
            phone: '',
            questionDifficulty: '',
            aboutHost: '',
        });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setCurrentPlayer(null);
        setNewPlayer({
            id: players.length + 1,
            playerName: '',
            team: '',
            gameName: '',
            email: '',
            phone: '',
            questionDifficulty: '',
            aboutHost: '',
            payment: false,
        });
        setErrors({
            playerName: '',
            team: '',
            gameName: '',
            email: '',
            phone: '',
            questionDifficulty: '',
            aboutHost: '',
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        const playerToSave = currentPlayer ? currentPlayer : newPlayer;

        // Validation
        const newErrors = {
            playerName: '',
            team: '',
            gameName: '',
            email: '',
            phone: '',
            questionDifficulty: '',
            aboutHost: '',
        };
        let isValid = true;

        if (!playerToSave.playerName.trim()) {
            newErrors.playerName = 'Пожалуйста, введите имя игрока.';
            isValid = false;
        }
        if (!playerToSave.team.trim()) {
            newErrors.team = 'Пожалуйста, укажите команду.';
            isValid = false;
        }
        if (!playerToSave.gameName.trim()) {
            newErrors.gameName = 'Пожалуйста, укажите название игры.';
            isValid = false;
        }
        if (!playerToSave.email.trim()) {
            newErrors.email = 'Пожалуйста, введите электронную почту.';
            isValid = false;
        }
        if (!playerToSave.phone.trim()) {
            newErrors.phone = 'Пожалуйста, введите номер телефона.';
            isValid = false;
        }
        if (!playerToSave.questionDifficulty.trim()) {
            newErrors.questionDifficulty = 'Пожалуйста, укажите сложность вопросов.';
            isValid = false;
        }
        if (!playerToSave.aboutHost.trim()) {
            newErrors.aboutHost = 'Пожалуйста, укажите информацию о ведущем.';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            return;
        }

        if (currentPlayer) {
            // Update existing player
            setPlayers(players.map((player) => (player.id === currentPlayer.id ? playerToSave : player)));
        } else {
            // Add new player
            setPlayers([...players, playerToSave]);
        }
        setIsModalOpen(false);
    };

    const handleDeletePlayer = (playerId: number) => {
        if (confirm('Вы уверены, что хотите удалить этого игрока?')) {
            setPlayers(players.filter((player) => player.id !== playerId));
        }
    };

    return (
        <div className="bg-[#FAF3DD] text-black p-20 rounded-lg shadow-lg text-center py-20">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Игроки</h2>
                <button
                    className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 flex items-center"
                    onClick={openAddModal}
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Добавить игрока
                </button>
            </div>
            <div className="overflow-x-auto text-[14px]">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-md font-semibold">
                                Имя игрока
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-md font-semibold">
                                Команда
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-md font-semibold">
                                Название игры
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-md font-semibold">
                                Почта
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-md font-semibold">
                                Телефон
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-md font-semibold">
                                Сложность вопросов
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-md font-semibold">
                                О ведущем
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-md font-semibold">
                                Оплата?
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-md font-semibold">
                                Действия
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr
                                key={player.id}
                                className={`${
                                    index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5E1]'
                                } hover:bg-gray-200 transition-colors duration-200`}
                            >
                                <td className="border px-4 py-3 text-center">{player.playerName}</td>
                                <td className="border px-4 py-3 text-center">{player.team}</td>
                                <td className="border px-4 py-3 text-center">{player.gameName}</td>
                                <td className="border px-4 py-3 text-center">{player.email}</td>
                                <td className="border px-4 py-3 text-center">{player.phone}</td>
                                <td className="border px-4 py-3 text-center">{player.questionDifficulty}</td>
                                <td className="border px-4 py-3 text-center">{player.aboutHost}</td>
                                <td className="border px-4 py-3 text-center">
                                    {player.payment ? 'ДА' : 'НЕТ'}
                                </td>
                                <td className="px-4 py-7 flex justify-center border">
                                    <button
                                        className="text-blue-500 hover:text-blue-700 p-2 rounded transition-colors duration-200 mr-3"
                                        onClick={() => openEditModal(player)}
                                    >
                                        <PencilAltIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700 p-2 rounded transition-colors duration-200"
                                        onClick={() => handleDeletePlayer(player.id)}
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Модальное окно для добавления/редактирования игрока */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="m-20">
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            {currentPlayer ? 'Редактирование игрока' : 'Добавление игрока'}
                        </h2>
                        <form className="flex flex-col space-y-4">
                            {/* Имя игрока */}
                            <div className="flex flex-col">
                                <label className="font-medium">Имя игрока:</label>
                                <input
                                    type="text"
                                    placeholder="Введите имя игрока"
                                    value={currentPlayer ? currentPlayer.playerName : newPlayer.playerName}
                                    onChange={(e) => {
                                        if (currentPlayer) {
                                            setCurrentPlayer({ ...currentPlayer, playerName: e.target.value });
                                        } else {
                                            setNewPlayer({ ...newPlayer, playerName: e.target.value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.playerName ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.playerName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.playerName}</p>
                                )}
                            </div>
                            {/* Команда */}
                            <div className="flex flex-col">
                                <label className="font-medium">Команда:</label>
                                <input
                                    type="text"
                                    placeholder="Введите название команды"
                                    value={currentPlayer ? currentPlayer.team : newPlayer.team}
                                    onChange={(e) => {
                                        if (currentPlayer) {
                                            setCurrentPlayer({ ...currentPlayer, team: e.target.value });
                                        } else {
                                            setNewPlayer({ ...newPlayer, team: e.target.value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.team ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.team && (
                                    <p className="text-red-500 text-sm mt-1">{errors.team}</p>
                                )}
                            </div>
                            {/* Название игры */}
                            <div className="flex flex-col">
                                <label className="font-medium">Название игры:</label>
                                <input
                                    type="text"
                                    placeholder="Введите название игры"
                                    value={currentPlayer ? currentPlayer.gameName : newPlayer.gameName}
                                    onChange={(e) => {
                                        if (currentPlayer) {
                                            setCurrentPlayer({ ...currentPlayer, gameName: e.target.value });
                                        } else {
                                            setNewPlayer({ ...newPlayer, gameName: e.target.value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.gameName ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.gameName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.gameName}</p>
                                )}
                            </div>
                            {/* Почта */}
                            <div className="flex flex-col">
                                <label className="font-medium">Почта:</label>
                                <input
                                    type="email"
                                    placeholder="Введите почту"
                                    value={currentPlayer ? currentPlayer.email : newPlayer.email}
                                    onChange={(e) => {
                                        if (currentPlayer) {
                                            setCurrentPlayer({ ...currentPlayer, email: e.target.value });
                                        } else {
                                            setNewPlayer({ ...newPlayer, email: e.target.value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.email ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            {/* Телефон */}
                            <div className="flex flex-col">
                                <label className="font-medium">Телефон:</label>
                                <input
                                    type="tel"
                                    placeholder="Введите номер телефона"
                                    value={currentPlayer ? currentPlayer.phone : newPlayer.phone}
                                    onChange={(e) => {
                                        if (currentPlayer) {
                                            setCurrentPlayer({ ...currentPlayer, phone: e.target.value });
                                        } else {
                                            setNewPlayer({ ...newPlayer, phone: e.target.value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.phone ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>
                            {/* Сложность вопросов */}
                            <div className="flex flex-col">
                                <label className="font-medium">Сложность вопросов:</label>
                                <input
                                    type="text"
                                    placeholder="Введите сложность вопросов"
                                    value={
                                        currentPlayer
                                            ? currentPlayer.questionDifficulty
                                            : newPlayer.questionDifficulty
                                    }
                                    onChange={(e) => {
                                        if (currentPlayer) {
                                            setCurrentPlayer({ ...currentPlayer, questionDifficulty: e.target.value });
                                        } else {
                                            setNewPlayer({ ...newPlayer, questionDifficulty: e.target.value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.questionDifficulty ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.questionDifficulty && (
                                    <p className="text-red-500 text-sm mt-1">{errors.questionDifficulty}</p>
                                )}
                            </div>
                            {/* О ведущем */}
                            <div className="flex flex-col">
                                <label className="font-medium">О ведущем:</label>
                                <input
                                    type="text"
                                    placeholder="Введите информацию о ведущем"
                                    value={currentPlayer ? currentPlayer.aboutHost : newPlayer.aboutHost}
                                    onChange={(e) => {
                                        if (currentPlayer) {
                                            setCurrentPlayer({ ...currentPlayer, aboutHost: e.target.value });
                                        } else {
                                            setNewPlayer({ ...newPlayer, aboutHost: e.target.value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.aboutHost ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.aboutHost && (
                                    <p className="text-red-500 text-sm mt-1">{errors.aboutHost}</p>
                                )}
                            </div>
                            {/* Оплата */}
                            <div className="flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    checked={currentPlayer ? currentPlayer.payment : newPlayer.payment}
                                    onChange={(e) => {
                                        if (currentPlayer) {
                                            setCurrentPlayer({ ...currentPlayer, payment: e.target.checked });
                                        } else {
                                            setNewPlayer({ ...newPlayer, payment: e.target.checked });
                                        }
                                    }}
                                    className="mr-2 h-5 w-5"
                                />
                                <label className="font-medium">Оплата произведена</label>
                            </div>
                            {/* Кнопки сохранения и отмены */}
                            <div className="flex justify-center space-x-4 mt-6 pb-20 px-[200px]">
                                <button
                                    type="button"
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200 flex items-center"
                                    onClick={handleSave}
                                >
                                    <CheckIcon className="h-5 w-5 mr-2" />
                                    {currentPlayer ? 'Сохранить изменения' : 'Добавить игрока'}
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-200 flex items-center"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <XIcon className="h-5 w-5 mr-2" />
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default PlayersTab;
