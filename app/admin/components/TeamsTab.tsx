"use client";
import React, { useState } from 'react';
import Modal from './Modal';
import { XIcon, PlusIcon, CheckIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';

interface Team {
    id: number;
    tabletNumber: number; // Один номер планшета
    teamName: string;
    tableNumber: number;
    registeredParticipants: number;
    actualParticipants: number;
}

const TeamsTab: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([
        {
            id: 1,
            tabletNumber: 1,
            teamName: 'Команда А',
            tableNumber: 101,
            registeredParticipants: 5,
            actualParticipants: 4,
        },
        {
            id: 2,
            tabletNumber: 2,
            teamName: 'Команда Б',
            tableNumber: 102,
            registeredParticipants: 6,
            actualParticipants: 6,
        },
        // Добавьте больше тестовых данных при необходимости
    ]);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
    const [newTeam, setNewTeam] = useState<Team>({
        id: teams.length + 1,
        tabletNumber: 0,
        teamName: '',
        tableNumber: 0,
        registeredParticipants: 0,
        actualParticipants: 0,
    });

    // Состояния для ошибок валидации
    const [errors, setErrors] = useState({
        tabletNumber: '',
        teamName: '',
        tableNumber: '',
        registeredParticipants: '',
        actualParticipants: '',
    });

    const openEditModal = (team: Team) => {
        setCurrentTeam(team);
        setErrors({
            tabletNumber: '',
            teamName: '',
            tableNumber: '',
            registeredParticipants: '',
            actualParticipants: '',
        });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setCurrentTeam(null);
        setNewTeam({
            id: teams.length + 1,
            tabletNumber: 0,
            teamName: '',
            tableNumber: 0,
            registeredParticipants: 0,
            actualParticipants: 0,
        });
        setErrors({
            tabletNumber: '',
            teamName: '',
            tableNumber: '',
            registeredParticipants: '',
            actualParticipants: '',
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        const teamToSave = currentTeam ? currentTeam : newTeam;

        // Валидация
        const newErrors = {
            tabletNumber: '',
            teamName: '',
            tableNumber: '',
            registeredParticipants: '',
            actualParticipants: '',
        };
        let isValid = true;

        if (teamToSave.tabletNumber <= 0) {
            newErrors.tabletNumber = 'Пожалуйста, укажите корректный номер планшета.';
            isValid = false;
        } else {
            // Проверка на уникальность номера планшета
            const isTabletAssigned = teams.some(
                (team) =>
                    team.tabletNumber === teamToSave.tabletNumber &&
                    team.id !== teamToSave.id
            );
            if (isTabletAssigned) {
                newErrors.tabletNumber = 'Этот номер планшета уже назначен другой команде.';
                isValid = false;
            }
        }

        if (!teamToSave.teamName.trim()) {
            newErrors.teamName = 'Пожалуйста, укажите название команды.';
            isValid = false;
        }

        if (teamToSave.tableNumber <= 0) {
            newErrors.tableNumber = 'Пожалуйста, укажите корректный номер стола.';
            isValid = false;
        }

        if (teamToSave.registeredParticipants <= 0) {
            newErrors.registeredParticipants = 'Пожалуйста, укажите количество зарегистрированных участников.';
            isValid = false;
        }

        if (teamToSave.actualParticipants < 0) {
            newErrors.actualParticipants = 'Количество фактических участников не может быть отрицательным.';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            return;
        }

        if (currentTeam) {
            // Обновить существующую команду
            setTeams(teams.map((team) => (team.id === currentTeam.id ? teamToSave : team)));
        } else {
            // Добавить новую команду
            setTeams([...teams, teamToSave]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteTeam = (teamId: number) => {
        if (confirm('Вы уверены, что хотите удалить эту команду?')) {
            setTeams(teams.filter((team) => team.id !== teamId));
        }
    };

    return (
        <div className="bg-[#FAF3DD] text-black p-20 rounded-lg shadow-lg text-center py-20">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Команды</h2>
                <button
                    className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 flex items-center"
                    onClick={openAddModal}
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Добавить команду
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Номер планшета
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Название команды
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Номер стола
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Зарегистрировано
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Фактически
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Действия
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team, index) => (
                            <tr
                                key={team.id}
                                className={`${
                                    index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5E1]'
                                } hover:bg-gray-200 transition-colors duration-200`}
                            >
                                <td className="border px-4 py-3 text-center">
                                    {team.tabletNumber}
                                </td>
                                <td className="border px-4 py-3 text-center">{team.teamName}</td>
                                <td className="border px-4 py-3 text-center">{team.tableNumber}</td>
                                <td className="border px-4 py-3 text-center">
                                    {team.registeredParticipants}
                                </td>
                                <td className="border px-4 py-3 text-center">
                                    {team.actualParticipants}
                                </td>
                                <td className="border px-4 py-3 flex">
                                    <button
                                        className="text-blue-500 hover:text-blue-700 p-2 rounded transition-colors duration-200 mr-3"
                                        onClick={() => openEditModal(team)}
                                    >
                                        <PencilAltIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700 p-2 rounded transition-colors duration-200"
                                        onClick={() => handleDeleteTeam(team.id)}
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Модальное окно для добавления/редактирования команды */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-6 text-center mt-20">
                        {currentTeam ? 'Редактирование команды' : 'Добавление команды'}
                    </h2>
                    <form className="flex flex-col space-y-4">
                        {/* Номер планшета */}
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label
                                htmlFor="tabletNumber"
                                className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                            >
                                Номер планшета:
                            </label>
                            <div className="w-full md:w-2/3">
                                <input
                                    type="number"
                                    id="tabletNumber"
                                    placeholder="Введите номер планшета"
                                    value={
                                        currentTeam
                                            ? currentTeam.tabletNumber || ''
                                            : newTeam.tabletNumber || ''
                                    }
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (currentTeam) {
                                            setCurrentTeam({
                                                ...currentTeam,
                                                tabletNumber: value,
                                            });
                                        } else {
                                            setNewTeam({
                                                ...newTeam,
                                                tabletNumber: value,
                                            });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.tabletNumber ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.tabletNumber && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.tabletNumber}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Название команды */}
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label
                                htmlFor="teamName"
                                className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                            >
                                Название команды:
                            </label>
                            <div className="w-full md:w-2/3">
                                <input
                                    type="text"
                                    id="teamName"
                                    placeholder="Введите название команды"
                                    value={currentTeam ? currentTeam.teamName : newTeam.teamName}
                                    onChange={(e) => {
                                        if (currentTeam) {
                                            setCurrentTeam({
                                                ...currentTeam,
                                                teamName: e.target.value,
                                            });
                                        } else {
                                            setNewTeam({ ...newTeam, teamName: e.target.value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.teamName ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.teamName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>
                                )}
                            </div>
                        </div>
                        {/* Номер стола */}
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label
                                htmlFor="tableNumber"
                                className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                            >
                                Номер стола:
                            </label>
                            <div className="w-full md:w-2/3">
                                <input
                                    type="number"
                                    id="tableNumber"
                                    placeholder="Введите номер стола"
                                    value={
                                        currentTeam
                                            ? currentTeam.tableNumber || ''
                                            : newTeam.tableNumber || ''
                                    }
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (currentTeam) {
                                            setCurrentTeam({
                                                ...currentTeam,
                                                tableNumber: value,
                                            });
                                        } else {
                                            setNewTeam({ ...newTeam, tableNumber: value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.tableNumber ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.tableNumber && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.tableNumber}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Зарегистрировано участников */}
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <label
                                htmlFor="registeredParticipants"
                                className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                            >
                                Зарегистрировано участников:
                            </label>
                            <div className="w-full md:w-2/3">
                                <input
                                    type="number"
                                    id="registeredParticipants"
                                    placeholder="Введите количество"
                                    value={
                                        currentTeam
                                            ? currentTeam.registeredParticipants || ''
                                            : newTeam.registeredParticipants || ''
                                    }
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (currentTeam) {
                                            setCurrentTeam({
                                                ...currentTeam,
                                                registeredParticipants: value,
                                            });
                                        } else {
                                            setNewTeam({
                                                ...newTeam,
                                                registeredParticipants: value,
                                            });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.registeredParticipants ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.registeredParticipants && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.registeredParticipants}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Фактически участников */}
                        <div className="flex flex-col md:flex-row items-start md:items-center mb-10">
                            <label
                                htmlFor="actualParticipants"
                                className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                            >
                                Фактически участников:
                            </label>
                            <div className="w-full md:w-2/3">
                                <input
                                    type="number"
                                    id="actualParticipants"
                                    placeholder="Введите количество"
                                    value={
                                        currentTeam
                                            ? currentTeam.actualParticipants || ''
                                            : newTeam.actualParticipants || ''
                                    }
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (currentTeam) {
                                            setCurrentTeam({
                                                ...currentTeam,
                                                actualParticipants: value,
                                            });
                                        } else {
                                            setNewTeam({
                                                ...newTeam,
                                                actualParticipants: value,
                                            });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.actualParticipants ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.actualParticipants && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.actualParticipants}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Кнопки сохранения и отмены */}
                        <div className="flex justify-center space-x-4 mt-6  pb-20 px-[200px]">
                            <button
                                type="button"
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200 flex items-center"
                                onClick={handleSave}
                            >
                                <CheckIcon className="h-5 w-5 mr-2" />
                                {currentTeam ? 'Сохранить изменения' : 'Добавить команду'}
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

export default TeamsTab;
