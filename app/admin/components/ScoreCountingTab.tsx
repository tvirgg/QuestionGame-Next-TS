
"use client";
import React, { useState } from 'react';
import Modal from './Modal';

interface TeamScore {
    id: number;
    teamName: string;
    round1: number;
    round2: number;
    round3: number;
    round4: number;
    round5: number;
    round6: number;
    round7: number;
    total: number;
}

const ScoreCountingTab: React.FC = () => {
    const [scores, setScores] = useState<TeamScore[]>([
        { id: 1, teamName: 'Команда А', round1: 10, round2: 15, round3: 20, round4: 25, round5: 30, round6: 35, round7: 40, total: 175 },
        { id: 2, teamName: 'Команда Б', round1: 9, round2: 14, round3: 19, round4: 24, round5: 29, round6: 34, round7: 39, total: 168 },
        // Добавьте больше тестовых данных
    ]);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentScore, setCurrentScore] = useState<TeamScore | null>(null);

    const openEditModal = (score: TeamScore) => {
        setCurrentScore(score);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (currentScore) {
            setScores(scores.map(score => score.id === currentScore.id ? currentScore : score));
        }
        setIsModalOpen(false);
    };

    return (
        <div className="bg-[#FAF3DD] text-black p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Подсчёт очков</h2>
                {/* Здесь можно добавить кнопки для завершения игры и возврата назад */}
            </div>
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Команда</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Раунд 1</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Раунд 2</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Раунд 3</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Раунд 4</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Раунд 5</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Раунд 6</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Раунд 7</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Итого</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr
                            key={score.id}
                            className={`${
                                index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5E1]'
                            } hover:bg-gray-200 transition-colors duration-200`}
                        >
                            <td className="border px-4 py-3 text-center">{score.teamName}</td>
                            <td className="border px-4 py-3 text-center">{score.round1}</td>
                            <td className="border px-4 py-3 text-center">{score.round2}</td>
                            <td className="border px-4 py-3 text-center">{score.round3}</td>
                            <td className="border px-4 py-3 text-center">{score.round4}</td>
                            <td className="border px-4 py-3 text-center">{score.round5}</td>
                            <td className="border px-4 py-3 text-center">{score.round6}</td>
                            <td className="border px-4 py-3 text-center">{score.round7}</td>
                            <td className="border px-4 py-3 text-center">{score.total}</td>
                            <td className="border px-4 py-3 text-center">
                                <button
                                    className="bg-[#D4A373] text-white px-3 py-1 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                                    onClick={() => openEditModal(score)}
                                >
                                    Редактировать
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Модальное окно для редактирования очков */}
            {isModalOpen && currentScore && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Редактирование очков</h2>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="number"
                            placeholder="Раунд 1"
                            value={currentScore.round1}
                            onChange={(e) => setCurrentScore({ ...currentScore, round1: Number(e.target.value) })}
                            className="p-2 rounded border"
                        />
                        <input
                            type="number"
                            placeholder="Раунд 2"
                            value={currentScore.round2}
                            onChange={(e) => setCurrentScore({ ...currentScore, round2: Number(e.target.value) })}
                            className="p-2 rounded border"
                        />
                        <input
                            type="number"
                            placeholder="Раунд 3"
                            value={currentScore.round3}
                            onChange={(e) => setCurrentScore({ ...currentScore, round3: Number(e.target.value) })}
                            className="p-2 rounded border"
                        />
                        <input
                            type="number"
                            placeholder="Раунд 4"
                            value={currentScore.round4}
                            onChange={(e) => setCurrentScore({ ...currentScore, round4: Number(e.target.value) })}
                            className="p-2 rounded border"
                        />
                        <input
                            type="number"
                            placeholder="Раунд 5"
                            value={currentScore.round5}
                            onChange={(e) => setCurrentScore({ ...currentScore, round5: Number(e.target.value) })}
                            className="p-2 rounded border"
                        />
                        <input
                            type="number"
                            placeholder="Раунд 6"
                            value={currentScore.round6}
                            onChange={(e) => setCurrentScore({ ...currentScore, round6: Number(e.target.value) })}
                            className="p-2 rounded border"
                        />
                        <input
                            type="number"
                            placeholder="Раунд 7"
                            value={currentScore.round7}
                            onChange={(e) => setCurrentScore({ ...currentScore, round7: Number(e.target.value) })}
                            className="p-2 rounded border"
                        />
                        <input
                            type="number"
                            placeholder="Итого"
                            value={currentScore.total}
                            onChange={(e) => setCurrentScore({ ...currentScore, total: Number(e.target.value) })}
                            className="p-2 rounded border"
                            disabled
                        />
                        <button
                            className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                            onClick={handleSave}
                        >
                            Сохранить
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ScoreCountingTab;
