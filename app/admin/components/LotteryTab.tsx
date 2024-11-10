
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
        <div className="bg-[#FAF3DD] text-black p-6 rounded-lg shadow-lg p-20">
            <h2 className="text-2xl font-bold mb-4">Лотерея</h2>
            <div className="flex justify-start mb-4 mb-15">
                <button
                    className="bg-[#c99b6d] text-white py-2 px-4 rounded hover:bg-[#691d2d] transition-colors duration-200"
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
                    <h2 className="text-2xl font-bold mb-4 text-center mt-20 mx-20">Поздравляем победителя!</h2>
                    <p className="text-center text-lg mb-4">Команда: {winner.team}</p>
                    <p className="text-center text-lg mb-4">Стол: {winner.tableNumber}</p>
                    <p className="text-center text-lg mb-4">Имя: {winner.name}</p>
                    <button
                        className="bg-green text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 mx-auto block mb-20"
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
