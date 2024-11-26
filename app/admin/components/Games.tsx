"use client";
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { XIcon, PlusIcon, CheckIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from 'baseapi/config';

interface Game {
    id: string;
    date: string;
    number: string;
    name: string;
    venue_id: string;
    start_time: string;
    end_time: string;
    price_per_player: number;
    teams: { team_id: string }[];
}

const GamesTab: React.FC = () => {
    const { token } = useAuth();
    const [games, setGames] = useState<Game[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentGame, setCurrentGame] = useState<Game | null>(null);
    const [newGame, setNewGame] = useState<Game>({
        id: '',
        date: '',
        number: '',
        name: '',
        venue_id: '',
        start_time: '',
        end_time: '',
        price_per_player: 0,
        teams: [],
    });

    const [errors, setErrors] = useState({
        date: '',
        number: '',
        name: '',
        venue_id: '',
        start_time: '',
        end_time: '',
        price_per_player: '',
    });

    useEffect(() => {
        // Функция для получения списка игр
        const fetchGames = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/games`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data: Game[] = await response.json();
                    setGames(data);
                } else if (response.status === 401) {
                    // Обработка неавторизованного доступа
                    console.error('Необходима аутентификация');
                } else {
                    // Обработка других ошибок
                    console.error('Ошибка при получении игр:', await response.text());
                }
            } catch (error) {
                console.error('Ошибка при получении игр:', error);
            }
        };

        fetchGames();
    }, [token]);

    const openEditModal = (game: Game) => {
        setCurrentGame(game);
        setErrors({
            date: '',
            number: '',
            name: '',
            venue_id: '',
            start_time: '',
            end_time: '',
            price_per_player: '',
        });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setCurrentGame(null);
        setNewGame({
            id: '',
            date: '',
            number: '',
            name: '',
            venue_id: '',
            start_time: '',
            end_time: '',
            price_per_player: 0,
            teams: [],
        });
        setErrors({
            date: '',
            number: '',
            name: '',
            venue_id: '',
            start_time: '',
            end_time: '',
            price_per_player: '',
        });
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        const gameToSave = currentGame ? currentGame : newGame;

        // Валидация
        const newErrors = {
            date: '',
            number: '',
            name: '',
            venue_id: '',
            start_time: '',
            end_time: '',
            price_per_player: '',
        };
        let isValid = true;

        if (!gameToSave.date) {
            newErrors.date = 'Пожалуйста, укажите дату игры.';
            isValid = false;
        }

        if (!gameToSave.number.trim()) {
            newErrors.number = 'Пожалуйста, укажите номер игры.';
            isValid = false;
        }

        if (!gameToSave.name.trim()) {
            newErrors.name = 'Пожалуйста, укажите название игры.';
            isValid = false;
        }

        if (!gameToSave.venue_id.trim()) {
            newErrors.venue_id = 'Пожалуйста, укажите идентификатор места проведения.';
            isValid = false;
        }

        if (!gameToSave.start_time) {
            newErrors.start_time = 'Пожалуйста, укажите время начала игры.';
            isValid = false;
        }

        if (!gameToSave.end_time) {
            newErrors.end_time = 'Пожалуйста, укажите время окончания игры.';
            isValid = false;
        }

        if (gameToSave.price_per_player <= 0) {
            newErrors.price_per_player = 'Пожалуйста, укажите корректную цену за игрока.';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            return;
        }

        if (currentGame) {
            // Обновление существующей игры
            try {
                const response = await fetch(`${API_BASE_URL}/admin/games/${currentGame.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        date: gameToSave.date,
                        name: gameToSave.name,
                        start_time: gameToSave.start_time,
                        end_time: gameToSave.end_time,
                        is_finished: false, // Или другой флаг, если нужно
                    }),
                });
                if (response.ok) {
                    // Обновление игры в состоянии
                    setGames(games.map((game) => (game.id === currentGame.id ? gameToSave : game)));
                    setIsModalOpen(false);
                } else {
                    // Обработка ошибок
                    console.error('Ошибка при обновлении игры:', await response.text());
                }
            } catch (error) {
                console.error('Ошибка при обновлении игры:', error);
            }
        } else {
            // Добавление новой игры
            try {
                const response = await fetch(`${API_BASE_URL}/admin/games`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        date: gameToSave.date,
                        number: gameToSave.number,
                        name: gameToSave.name,
                        venue_id: gameToSave.venue_id,
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    // Получение деталей новой игры
                    const newGameResponse = await fetch(`${API_BASE_URL}/games/${data.game_id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    if (newGameResponse.ok) {
                        const newGameData = await newGameResponse.json();
                        setGames([...games, newGameData.game]);
                        setIsModalOpen(false);
                    }
                } else {
                    // Обработка ошибок
                    console.error('Ошибка при добавлении игры:', await response.text());
                }
            } catch (error) {
                console.error('Ошибка при добавлении игры:', error);
            }
        }
    };

    const handleDeleteGame = async (gameId: string) => {
        if (confirm('Вы уверены, что хотите удалить эту игру?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/admin/games/${gameId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    setGames(games.filter((game) => game.id !== gameId));
                } else {
                    // Обработка ошибок
                    console.error('Ошибка при удалении игры:', await response.text());
                }
            } catch (error) {
                console.error('Ошибка при удалении игры:', error);
            }
        }
    };

    return (
        <div className="bg-[#FAF3DD] text-black p-20 rounded-lg shadow-lg text-center py-20">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Игры</h2>
                <button
                    className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 flex items-center"
                    onClick={openAddModal}
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Добавить игру
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Номер игры
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Название игры
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Дата
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Время начала
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Время окончания
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Цена за игрока
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Действия
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, index) => (
                            <tr
                                key={game.id}
                                className={`${
                                    index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5E1]'
                                } hover:bg-gray-200 transition-colors duration-200`}
                            >
                                <td className="border px-4 py-3 text-center">{game.number}</td>
                                <td className="border px-4 py-3 text-center">{game.name}</td>
                                <td className="border px-4 py-3 text-center">
                                    {new Date(game.date).toLocaleString()}
                                </td>
                                <td className="border px-4 py-3 text-center">
                                    {new Date(game.start_time).toLocaleTimeString()}
                                </td>
                                <td className="border px-4 py-3 text-center">
                                    {new Date(game.end_time).toLocaleTimeString()}
                                </td>
                                <td className="border px-4 py-3 text-center">{game.price_per_player} ₽</td>
                                <td className="border px-4 py-3 flex justify-center">
                                    <button
                                        className="text-blue-500 hover:text-blue-700 p-2 rounded transition-colors duration-200 mr-3"
                                        onClick={() => openEditModal(game)}
                                    >
                                        <PencilAltIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700 p-2 rounded transition-colors duration-200"
                                        onClick={() => handleDeleteGame(game.id)}
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Модальное окно для добавления/редактирования игры */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-6 text-center mt-20">
                        {currentGame ? 'Редактирование игры' : 'Добавление игры'}
                    </h2>
                    <form className="flex flex-col space-y-4">
                        {/* Номер игры */}
                        {!currentGame && (
                            <div className="flex flex-col md:flex-row items-start md:items-center">
                                <label
                                    htmlFor="number"
                                    className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                                >
                                    Номер игры:
                                </label>
                                <div className="w-full md:w-2/3">
                                    <input
                                        type="text"
                                        id="number"
                                        placeholder="Введите номер игры"
                                        value={newGame.number}
                                        onChange={(e) => {
                                            setNewGame({ ...newGame, number: e.target.value });
                                        }}
                                        className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                            errors.number ? 'border-red-500' : ''
                                        }`}
                                    />
                                    {errors.number && (
                                        <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* Название игры */}
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label
                                htmlFor="name"
                                className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                            >
                                Название игры:
                            </label>
                            <div className="w-full md:w-2/3">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Введите название игры"
                                    value={currentGame ? currentGame.name : newGame.name}
                                    onChange={(e) => {
                                        if (currentGame) {
                                            setCurrentGame({
                                                ...currentGame,
                                                name: e.target.value,
                                            });
                                        } else {
                                            setNewGame({ ...newGame, name: e.target.value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.name ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>
                        </div>
                        {/* Дата игры */}
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label
                                htmlFor="date"
                                className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                            >
                                Дата игры:
                            </label>
                            <div className="w-full md:w-2/3">
                                <input
                                    type="datetime-local"
                                    id="date"
                                    placeholder="Введите дату игры"
                                    value={currentGame ? currentGame.date : newGame.date}
                                    onChange={(e) => {
                                        if (currentGame) {
                                            setCurrentGame({
                                                ...currentGame,
                                                date: e.target.value,
                                            });
                                        } else {
                                            setNewGame({ ...newGame, date: e.target.value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.date ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.date && (
                                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                                )}
                            </div>
                        </div>
                        {/* Время начала */}
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label
                                htmlFor="start_time"
                                className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                            >
                                Время начала:
                            </label>
                            <div className="w-full md:w-2/3">
                                <input
                                    type="time"
                                    id="start_time"
                                    value={currentGame ? currentGame.start_time.split('T')[1].slice(0,5) : newGame.start_time}
                                    onChange={(e) => {
                                        if (currentGame) {
                                            const datePart = currentGame.start_time.split('T')[0];
                                            setCurrentGame({
                                                ...currentGame,
                                                start_time: `${datePart}T${e.target.value}:00Z`,
                                            });
                                        } else {
                                            setNewGame({ ...newGame, start_time: `${newGame.date.split('T')[0]}T${e.target.value}:00Z` });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.start_time ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.start_time && (
                                    <p className="text-red-500 text-sm mt-1">{errors.start_time}</p>
                                )}
                            </div>
                        </div>
                        {/* Время окончания */}
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label
                                htmlFor="end_time"
                                className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                            >
                                Время окончания:
                            </label>
                            <div className="w-full md:w-2/3">
                                <input
                                    type="time"
                                    id="end_time"
                                    value={currentGame ? currentGame.end_time.split('T')[1].slice(0,5) : newGame.end_time}
                                    onChange={(e) => {
                                        if (currentGame) {
                                            const datePart = currentGame.end_time.split('T')[0];
                                            setCurrentGame({
                                                ...currentGame,
                                                end_time: `${datePart}T${e.target.value}:00Z`,
                                            });
                                        } else {
                                            setNewGame({ ...newGame, end_time: `${newGame.date.split('T')[0]}T${e.target.value}:00Z` });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.end_time ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.end_time && (
                                    <p className="text-red-500 text-sm mt-1">{errors.end_time}</p>
                                )}
                            </div>
                        </div>
                        {/* Цена за игрока */}
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label
                                htmlFor="price_per_player"
                                className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                            >
                                Цена за игрока:
                            </label>
                            <div className="w-full md:w-2/3">
                                <input
                                    type="number"
                                    id="price_per_player"
                                    placeholder="Введите цену за игрока"
                                    value={currentGame ? currentGame.price_per_player : newGame.price_per_player}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (currentGame) {
                                            setCurrentGame({
                                                ...currentGame,
                                                price_per_player: value,
                                            });
                                        } else {
                                            setNewGame({ ...newGame, price_per_player: value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.price_per_player ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.price_per_player && (
                                    <p className="text-red-500 text-sm mt-1">{errors.price_per_player}</p>
                                )}
                            </div>
                        </div>
                        {/* Идентификатор места проведения */}
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label
                                htmlFor="venue_id"
                                className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                            >
                                Идентификатор места проведения:
                            </label>
                            <div className="w-full md:w-2/3">
                                <input
                                    type="text"
                                    id="venue_id"
                                    placeholder="Введите идентификатор места"
                                    value={currentGame ? currentGame.venue_id : newGame.venue_id}
                                    onChange={(e) => {
                                        if (currentGame) {
                                            setCurrentGame({
                                                ...currentGame,
                                                venue_id: e.target.value,
                                            });
                                        } else {
                                            setNewGame({ ...newGame, venue_id: e.target.value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.venue_id ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.venue_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.venue_id}</p>
                                )}
                            </div>
                        </div>
                        {/* Кнопки сохранения и отмены */}
                        <div className="flex justify-center space-x-4 mt-6 pb-20 px-[200px]">
                            <button
                                type="button"
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200 flex items-center"
                                onClick={handleSave}
                            >
                                <CheckIcon className="h-5 w-5 mr-2" />
                                {currentGame ? 'Сохранить изменения' : 'Добавить игру'}
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
                </Modal>
            )}
        </div>
    );
};

export default GamesTab;
