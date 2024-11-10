
"use client";
import React, { useState } from 'react';
import CreateGame from './CreateGame';
import CreateVenue from './CreateVenue';
import TeamsTab from './TeamsTab';
import RolesTab from './RolesTab';
import ScoreCountingTab from './ScoreCountingTab';
import PaymentsTab from './PaymentsTab';
import LotteryTab from './LotteryTab';
import PlayersTab from './Users';

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
            case 'Игроки':
                    return <PlayersTab />;
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
            <h1 className="text-4xl font-bold mt-8 mb-6 text-center">Интерфейс Администратора</h1>
            <div className="tabs flex space-x-4 mb-6">
                {['Создание игры', 'Создание места проведения', 'Команды', 'Роли', 'Игроки', 'Подсчёт очков', 'Оплаты', 'Лотерея'].map((tab) => (
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
            <div className="flex-grow w-full max-w-7xl">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AdminMain;
