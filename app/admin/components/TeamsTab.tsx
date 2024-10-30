"use client";
import React, { useState } from 'react';
import Modal from './Modal';

interface Team {
    id: number;
    tabletNumber: number;
    teamName: string;
    tableNumber: number;
    registeredParticipants: number;
    actualParticipants: number;
}

const TeamsTab: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([
        { id: 1, tabletNumber: 1, teamName: 'Команда А', tableNumber: 101, registeredParticipants: 5, actualParticipants: 4 },
        { id: 2, tabletNumber: 2, teamName: 'Команда Б', tableNumber: 102, registeredParticipants: 6, actualParticipants: 6 },
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
        actualParticipants: 0
    });

    const openEditModal = (team: Team) => {
        setCurrentTeam(team);
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
            actualParticipants: 0
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (currentTeam) {
            // Обновление существующей команды
            setTeams(teams.map(team => team.id === currentTeam.id ? currentTeam : team));
        } else {
            // Добавление новой команды
            setTeams([...teams, newTeam]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="bg-[#FAF3DD] text-black p-6 rounded-lg shadow-lg text-center">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Команды</h2>
                <button
                    className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                    onClick={openAddModal}
                >
                    Добавить команду
                </button>
            </div>
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Номер планшета</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Название команды</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Номер стола</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Зарегистрировано</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Фактически</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Действия</th>
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
                            <td className="border px-4 py-3 text-center">{team.tabletNumber}</td>
                            <td className="border px-4 py-3 text-center">{team.teamName}</td>
                            <td className="border px-4 py-3 text-center">{team.tableNumber}</td>
                            <td className="border px-4 py-3 text-center">{team.registeredParticipants}</td>
                            <td className="border px-4 py-3 text-center">{team.actualParticipants}</td>
                            <td className="border px-4 py-3 text-center">
                                <button
                                    className="bg-[#D4A373] text-white px-3 py-1 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                                    onClick={() => openEditModal(team)}
                                >
                                    Редактировать
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Модальное окно для добавления/редактирования команды */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        {currentTeam ? 'Редактирование команды' : 'Добавление команды'}
                    </h2>
                    <form className="flex flex-col space-y-4">
                        {/* Номер планшета */}
                        <div className="flex flex-col md:flex-row items-center">
                            <label htmlFor="tabletNumber" className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium">
                                Номер планшета:
                            </label>
                            <input
                                type="number"
                                id="tabletNumber"
                                placeholder="Введите номер планшета"
                                value={currentTeam ? currentTeam.tabletNumber : newTeam.tabletNumber}
                                onChange={(e) => {
                                    if (currentTeam) {
                                        setCurrentTeam({ ...currentTeam, tabletNumber: Number(e.target.value) });
                                    } else {
                                        setNewTeam({ ...newTeam, tabletNumber: Number(e.target.value) });
                                    }
                                }}
                                className="p-2 rounded border w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                            />
                        </div>
                        {/* Название команды */}
                        <div className="flex flex-col md:flex-row items-center">
                            <label htmlFor="teamName" className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium">
                                Название команды:
                            </label>
                            <input
                                type="text"
                                id="teamName"
                                placeholder="Введите название команды"
                                value={currentTeam ? currentTeam.teamName : newTeam.teamName}
                                onChange={(e) => {
                                    if (currentTeam) {
                                        setCurrentTeam({ ...currentTeam, teamName: e.target.value });
                                    } else {
                                        setNewTeam({ ...newTeam, teamName: e.target.value });
                                    }
                                }}
                                className="p-2 rounded border w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                            />
                        </div>
                        {/* Номер стола */}
                        <div className="flex flex-col md:flex-row items-center">
                            <label htmlFor="tableNumber" className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium">
                                Номер стола:
                            </label>
                            <input
                                type="number"
                                id="tableNumber"
                                placeholder="Введите номер стола"
                                value={currentTeam ? currentTeam.tableNumber : newTeam.tableNumber}
                                onChange={(e) => {
                                    if (currentTeam) {
                                        setCurrentTeam({ ...currentTeam, tableNumber: Number(e.target.value) });
                                    } else {
                                        setNewTeam({ ...newTeam, tableNumber: Number(e.target.value) });
                                    }
                                }}
                                className="p-2 rounded border w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                            />
                        </div>
                        {/* Зарегистрировано участников */}
                        <div className="flex flex-col md:flex-row items-center">
                            <label htmlFor="registeredParticipants" className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium">
                                Зарегистрировано участников:
                            </label>
                            <input
                                type="number"
                                id="registeredParticipants"
                                placeholder="Введите количество"
                                value={currentTeam ? currentTeam.registeredParticipants : newTeam.registeredParticipants}
                                onChange={(e) => {
                                    if (currentTeam) {
                                        setCurrentTeam({ ...currentTeam, registeredParticipants: Number(e.target.value) });
                                    } else {
                                        setNewTeam({ ...newTeam, registeredParticipants: Number(e.target.value) });
                                    }
                                }}
                                className="p-2 rounded border w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                            />
                        </div>
                        {/* Фактически участников */}
                        <div className="flex flex-col md:flex-row items-center">
                            <label htmlFor="actualParticipants" className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium">
                                Фактически участников:
                            </label>
                            <input
                                type="number"
                                id="actualParticipants"
                                placeholder="Введите количество"
                                value={currentTeam ? currentTeam.actualParticipants : newTeam.actualParticipants}
                                onChange={(e) => {
                                    if (currentTeam) {
                                        setCurrentTeam({ ...currentTeam, actualParticipants: Number(e.target.value) });
                                    } else {
                                        setNewTeam({ ...newTeam, actualParticipants: Number(e.target.value) });
                                    }
                                }}
                                className="p-2 rounded border w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                            />
                        </div>
                        {/* Кнопка сохранения */}
                        <button
                            type="button"
                            className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 w-full"
                            onClick={handleSave}
                        >
                            {currentTeam ? 'Сохранить изменения' : 'Добавить команду'}
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    )};

    export default TeamsTab;
