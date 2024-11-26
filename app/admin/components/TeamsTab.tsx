"use client";
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { XIcon, PlusIcon, CheckIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from 'baseapi/config';

interface Team {
    id: string;
    user_id: string;
    name: string;
    table_number: number;
    players_count: number;
    players: any[];
    extra_data: any;
}

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    name: string;
}

const TeamsTab: React.FC = () => {
    const { token } = useAuth();
    const [teams, setTeams] = useState<Team[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
    const [newTeam, setNewTeam] = useState<Team>({
        id: '',
        user_id: '',
        name: '',
        table_number: 0,
        players_count: 0,
        players: [],
        extra_data: {},
    });

    const [errors, setErrors] = useState({
        user_id: '',
        name: '',
        table_number: '',
    });

    useEffect(() => {
        // Fetch teams
        const fetchTeams = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/teams`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setTeams(data);
                } else if (response.status === 401) {
                    // Handle unauthorized access
                } else {
                    // Handle other errors
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        // Fetch users (tablets)
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else if (response.status === 401) {
                    // Handle unauthorized access
                } else {
                    // Handle other errors
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchTeams();
        fetchUsers();
    }, [token]);

    const openEditModal = (team: Team) => {
        setCurrentTeam(team);
        setErrors({
            user_id: '',
            name: '',
            table_number: '',
        });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setCurrentTeam(null);
        setNewTeam({
            id: '',
            user_id: '',
            name: '',
            table_number: 0,
            players_count: 0,
            players: [],
            extra_data: {},
        });
        setErrors({
            user_id: '',
            name: '',
            table_number: '',
        });
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        const teamToSave = currentTeam ? currentTeam : newTeam;

        // Validation
        const newErrors = {
            user_id: '',
            name: '',
            table_number: '',
        };
        let isValid = true;

        if (!teamToSave.user_id) {
            newErrors.user_id = 'Пожалуйста, выберите пользователя (планшет).';
            isValid = false;
        }

        if (!teamToSave.name.trim()) {
            newErrors.name = 'Пожалуйста, укажите название команды.';
            isValid = false;
        }

        if (teamToSave.table_number <= 0) {
            newErrors.table_number = 'Пожалуйста, укажите корректный номер стола.';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            return;
        }

        if (currentTeam) {
            // Update existing team
            try {
                const response = await fetch(`${API_BASE_URL}/admin/teams/${currentTeam.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: teamToSave.name,
                        table_number: teamToSave.table_number,
                        extra_data: teamToSave.extra_data,
                    }),
                });
                if (response.ok) {
                    // Update team in state
                    setTeams(teams.map((team) => (team.id === currentTeam.id ? teamToSave : team)));
                    setIsModalOpen(false);
                } else {
                    // Handle errors
                    console.error('Error updating team:', await response.text());
                }
            } catch (error) {
                console.error('Error updating team:', error);
            }
        } else {
            // Add new team
            try {
                const response = await fetch(`${API_BASE_URL}/admin/teams`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        user_id: teamToSave.user_id,
                        name: teamToSave.name,
                        table_number: teamToSave.table_number,
                        extra_data: teamToSave.extra_data,
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    // Fetch the new team details
                    const newTeamResponse = await fetch(`${API_BASE_URL}/teams/${data.team_id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (newTeamResponse.ok) {
                        const newTeamData = await newTeamResponse.json();
                        setTeams([...teams, newTeamData.team]);
                        setIsModalOpen(false);
                    }
                } else {
                    // Handle errors
                    console.error('Error adding team:', await response.text());
                }
            } catch (error) {
                console.error('Error adding team:', error);
            }
        }
    };

    const handleDeleteTeam = async (teamId: string) => {
        if (confirm('Вы уверены, что хотите удалить эту команду?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/admin/teams/${teamId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    setTeams(teams.filter((team) => team.id !== teamId));
                } else {
                    // Handle errors
                    console.error('Error deleting team:', await response.text());
                }
            } catch (error) {
                console.error('Error deleting team:', error);
            }
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
                                Пользователь (Планшет)
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Название команды
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Номер стола
                            </th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">
                                Кол-во игроков
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
                                    {users.find((user) => user.id === team.user_id)?.username || 'N/A'}
                                </td>
                                <td className="border px-4 py-3 text-center">{team.name}</td>
                                <td className="border px-4 py-3 text-center">{team.table_number}</td>
                                <td className="border px-4 py-3 text-center">
                                    {team.players_count}
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

            {/* Modal for adding/editing team */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-6 text-center mt-20">
                        {currentTeam ? 'Редактирование команды' : 'Добавление команды'}
                    </h2>
                    <form className="flex flex-col space-y-4">
                        {/* User (Tablet) */}
                        {!currentTeam && (
                            <div className="flex flex-col md:flex-row items-start md:items-center">
                                <label
                                    htmlFor="user_id"
                                    className="w-full md:w-1/3 text-left md:text-right mr-4 font-medium"
                                >
                                    Пользователь (Планшет):
                                </label>
                                <div className="w-full md:w-2/3">
                                    <select
                                        id="user_id"
                                        value={newTeam.user_id}
                                        onChange={(e) => {
                                            setNewTeam({ ...newTeam, user_id: e.target.value });
                                        }}
                                        className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                            errors.user_id ? 'border-red-500' : ''
                                        }`}
                                    >
                                        <option value="">Выберите пользователя</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.username} ({user.name})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_id && (
                                        <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* Team Name */}
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
                                    value={currentTeam ? currentTeam.name : newTeam.name}
                                    onChange={(e) => {
                                        if (currentTeam) {
                                            setCurrentTeam({
                                                ...currentTeam,
                                                name: e.target.value,
                                            });
                                        } else {
                                            setNewTeam({ ...newTeam, name: e.target.value });
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
                        {/* Table Number */}
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
                                            ? currentTeam.table_number || ''
                                            : newTeam.table_number || ''
                                    }
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (currentTeam) {
                                            setCurrentTeam({
                                                ...currentTeam,
                                                table_number: value,
                                            });
                                        } else {
                                            setNewTeam({ ...newTeam, table_number: value });
                                        }
                                    }}
                                    className={`p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373] ${
                                        errors.table_number ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.table_number && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.table_number}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Buttons */}
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
