# update_admin_components.py
import os

# Базовые директории
base_dir = os.path.dirname(os.path.abspath(__file__))
app_dir = os.path.join(base_dir, 'app')
admin_dir = os.path.join(app_dir, 'admin')
components_dir = os.path.join(admin_dir, 'components')
pages_dir = os.path.join(admin_dir, 'page')

# Создаем директории, если их нет
os.makedirs(components_dir, exist_ok=True)
os.makedirs(pages_dir, exist_ok=True)

# 1. Создаем компонент Modal.tsx
modal_path = os.path.join(components_dir, 'Modal.tsx')
with open(modal_path, 'w', encoding='utf-8') as f:
    f.write('''
"use client";
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl p-6 w-11/12 md:w-8/12 lg:w-2/3 xl:w-7/12 max-w-4xl relative">
                <button className="absolute top-4 right-4 text-2xl text-[#d2a636]" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
''')

# 2. Обновляем компонент LotteryTab.tsx
lottery_tab_path = os.path.join(components_dir, 'LotteryTab.tsx')
with open(lottery_tab_path, 'w', encoding='utf-8') as f:
    f.write('''
"use client";
import React, { useState } from 'react';
import Modal from './Modal';

interface Participant {
    id: number;
    name: string;
    phone: string;
    team: string;
    tableNumber: number;
}

const LotteryTab: React.FC = () => {
    const [participants, setParticipants] = useState<Participant[]>([
        { id: 1, name: 'Иван Иванов', phone: '+71234567890', team: 'Команда А', tableNumber: 101 },
        { id: 2, name: 'Мария Петрова', phone: '+71234567891', team: 'Команда Б', tableNumber: 102 },
        // Добавьте больше тестовых данных
    ]);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [winner, setWinner] = useState<Participant | null>(null);

    const addParticipant = (participant: Participant) => {
        setParticipants([...participants, participant]);
    };

    const selectWinner = () => {
        if (participants.length === 0) return;
        const randomIndex = Math.floor(Math.random() * participants.length);
        setWinner(participants[randomIndex]);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-[#FAF3DD] text-black p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Лотерея</h2>
            <div className="flex justify-center mb-4">
                <button
                    className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                    onClick={selectWinner}
                >
                    Выбрать победителя
                </button>
            </div>
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Имя</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Телефон</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Команда</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Номер стола</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map((participant, index) => (
                        <tr
                            key={participant.id}
                            className={`${
                                index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5E1]'
                            } hover:bg-gray-200 transition-colors duration-200`}
                        >
                            <td className="border px-4 py-3 text-center">{participant.name}</td>
                            <td className="border px-4 py-3 text-center">{participant.phone}</td>
                            <td className="border px-4 py-3 text-center">{participant.team}</td>
                            <td className="border px-4 py-3 text-center">{participant.tableNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Модальное окно для отображения победителя */}
            {isModalOpen && winner && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Поздравляем победителя!</h2>
                    <p className="text-center text-lg mb-4">Команда: {winner.team}</p>
                    <p className="text-center text-lg mb-4">Стол: {winner.tableNumber}</p>
                    <p className="text-center text-lg mb-4">Имя: {winner.name}</p>
                    <button
                        className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 mx-auto block"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Закрыть
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default LotteryTab;
''')

# 3. Обновляем другие административные компоненты для удаления <p> элементов и центрирования текста
# Предположим, что такие элементы есть в компонентах CreateGame, CreateVenue и т.д.
# Мы обновим их, убрав ненужные <p> и добавив центрирование текста

# Функция для обновления компонента
def update_component(component_name, component_code):
    component_path = os.path.join(components_dir, f'{component_name}.tsx')
    with open(component_path, 'w', encoding='utf-8') as f:
        f.write(component_code)

# 4. Пример обновления компонента CreateGame.tsx
create_game_path = os.path.join(components_dir, 'CreateGame.tsx')
with open(create_game_path, 'w', encoding='utf-8') as f:
    f.write('''
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
''')

# 5. Пример обновления компонента CreateVenue.tsx
create_venue_path = os.path.join(components_dir, 'CreateVenue.tsx')
with open(create_venue_path, 'w', encoding='utf-8') as f:
    f.write('''
"use client";
import React, { useState } from 'react';

const CreateVenue: React.FC = () => {
    const [restaurantName, setRestaurantName] = useState('');
    const [menuFile, setMenuFile] = useState<File | null>(null);
    const [menuItems, setMenuItems] = useState<any[]>([]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setMenuFile(e.target.files[0]);
        }
    };

    const handleAddMenuItem = () => {
        // Логика добавления блюда
        const newItem = { name: 'Новое блюдо', photo: '', price: 0 };
        setMenuItems([...menuItems, newItem]);
    };

    const handleCreateVenue = () => {
        // Логика создания места проведения
        console.log({
            restaurantName,
            menuFile,
            menuItems
        });
    };

    return (
        <div className="bg-[#FAF3DD] text-black p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Создание места проведения</h2>
            <div className="flex flex-col space-y-4 items-center">
                <input
                    type="text"
                    placeholder="Название ресторана"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="p-2 rounded border w-2/3"
                />
                <input
                    type="file"
                    accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    onChange={handleFileUpload}
                    className="p-2 rounded border w-2/3"
                />
                <button
                    className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                    onClick={handleAddMenuItem}
                >
                    Добавить блюдо
                </button>
                {/* Список меню */}
                <div className="space-y-2 w-2/3">
                    {menuItems.map((item, index) => (
                        <div key={index} className="flex space-x-2 justify-center">
                            <input
                                type="text"
                                placeholder="Название блюда"
                                value={item.name}
                                onChange={(e) => {
                                    const newMenu = [...menuItems];
                                    newMenu[index].name = e.target.value;
                                    setMenuItems(newMenu);
                                }}
                                className="p-2 rounded border flex-1"
                            />
                            <input
                                type="number"
                                placeholder="Цена"
                                value={item.price}
                                onChange={(e) => {
                                    const newMenu = [...menuItems];
                                    newMenu[index].price = Number(e.target.value);
                                    setMenuItems(newMenu);
                                }}
                                className="p-2 rounded border w-24"
                            />
                        </div>
                    ))}
                </div>
                <button
                    className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                    onClick={handleCreateVenue}
                >
                    Создать место проведения
                </button>
            </div>
        </div>
    );
};

export default CreateVenue;
''')

# 6. Обновляем другие компоненты по аналогии, удаляя <p> и центрируя текст
# Пример обновления TeamsTab.tsx
teams_tab_path = os.path.join(components_dir, 'TeamsTab.tsx')
with open(teams_tab_path, 'w', encoding='utf-8') as f:
    f.write('''
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
        // Добавьте больше тестовых данных
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
                    <h2 className="text-2xl font-bold mb-4 text-center">{currentTeam ? 'Редактирование команды' : 'Добавление команды'}</h2>
                    <div className="flex flex-col space-y-4 items-center">
                        <input
                            type="number"
                            placeholder="Номер планшета"
                            value={currentTeam ? currentTeam.tabletNumber : newTeam.tabletNumber}
                            onChange={(e) => {
                                if (currentTeam) {
                                    setCurrentTeam({ ...currentTeam, tabletNumber: Number(e.target.value) });
                                } else {
                                    setNewTeam({ ...newTeam, tabletNumber: Number(e.target.value) });
                                }
                            }}
                            className="p-2 rounded border w-2/3"
                        />
                        <input
                            type="text"
                            placeholder="Название команды"
                            value={currentTeam ? currentTeam.teamName : newTeam.teamName}
                            onChange={(e) => {
                                if (currentTeam) {
                                    setCurrentTeam({ ...currentTeam, teamName: e.target.value });
                                } else {
                                    setNewTeam({ ...newTeam, teamName: e.target.value });
                                }
                            }}
                            className="p-2 rounded border w-2/3"
                        />
                        <input
                            type="number"
                            placeholder="Номер стола"
                            value={currentTeam ? currentTeam.tableNumber : newTeam.tableNumber}
                            onChange={(e) => {
                                if (currentTeam) {
                                    setCurrentTeam({ ...currentTeam, tableNumber: Number(e.target.value) });
                                } else {
                                    setNewTeam({ ...newTeam, tableNumber: Number(e.target.value) });
                                }
                            }}
                            className="p-2 rounded border w-2/3"
                        />
                        <input
                            type="number"
                            placeholder="Зарегистрировано участников"
                            value={currentTeam ? currentTeam.registeredParticipants : newTeam.registeredParticipants}
                            onChange={(e) => {
                                if (currentTeam) {
                                    setCurrentTeam({ ...currentTeam, registeredParticipants: Number(e.target.value) });
                                } else {
                                    setNewTeam({ ...newTeam, registeredParticipants: Number(e.target.value) });
                                }
                            }}
                            className="p-2 rounded border w-2/3"
                        />
                        <input
                            type="number"
                            placeholder="Фактически участников"
                            value={currentTeam ? currentTeam.actualParticipants : newTeam.actualParticipants}
                            onChange={(e) => {
                                if (currentTeam) {
                                    setCurrentTeam({ ...currentTeam, actualParticipants: Number(e.target.value) });
                                } else {
                                    setNewTeam({ ...newTeam, actualParticipants: Number(e.target.value) });
                                }
                            }}
                            className="p-2 rounded border w-2/3"
                        />
                        <button
                            className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 w-2/3"
                            onClick={handleSave}
                        >
                            {currentTeam ? 'Сохранить изменения' : 'Добавить команду'}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TeamsTab;
''')

# 7. Обновляем компонент AdminMain.tsx для соответствия требованиям
admin_main_path = os.path.join(components_dir, 'AdminMain.tsx')
with open(admin_main_path, 'w', encoding='utf-8') as f:
    f.write('''
"use client";
import React, { useState } from 'react';
import CreateGame from './CreateGame';
import CreateVenue from './CreateVenue';
import TeamsTab from './TeamsTab';
import RolesTab from './RolesTab';
import ScoreCountingTab from './ScoreCountingTab';
import PaymentsTab from './PaymentsTab';
import LotteryTab from './LotteryTab';

const AdminMain: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('Создание игры');

    const renderTabContent = () => {
        switch(activeTab) {
            case 'Создание игры':
                return <CreateGame />;
            case 'Создание места проведения':
                return <CreateVenue />;
            case 'Команды':
                return <TeamsTab />;
            case 'Роли':
                return <RolesTab />;
            case 'Подсчёт очков':
                return <ScoreCountingTab />;
            case 'Оплаты':
                return <PaymentsTab />;
            case 'Лотерея':
                return <LotteryTab />;
            default:
                return <CreateGame />;
        }
    };

    return (
        <div className="w-screen h-screen bg-[#14213D] text-white flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mt-8 mb-6 text-center">Административный интерфейс</h1>
            <div className="tabs flex space-x-4 mb-6">
                {['Создание игры', 'Создание места проведения', 'Команды', 'Роли', 'Подсчёт очков', 'Оплаты', 'Лотерея'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 rounded ${
                            activeTab === tab ? 'bg-[#D4A373] text-black' : 'bg-[#1b2a49] hover:bg-[#2e3a50]'
                        } transition-colors duration-200`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="flex-grow w-full max-w-6xl">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AdminMain;
''')

# 8. Создаем или обновляем страницу admin/page.tsx
admin_page_path = os.path.join(admin_dir, 'page.tsx')
with open(admin_page_path, 'w', encoding='utf-8') as f:
    f.write('''
"use client";
import React from 'react';
import AdminMain from './components/AdminMain';

const AdminPage: React.FC = () => {
    return (
        <AdminMain />
    );
};

export default AdminPage;
''')

print("Административные компоненты успешно созданы и обновлены.")
