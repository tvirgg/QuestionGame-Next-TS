
"use client";
import React from 'react';

interface Team {
    name: string;
    round1: number;
    round2: number;
    round3: number;
    round4: number;
    round5: number;
    round6: number;
    round7: number;
    place: number;
    total: number;
}

const testData: Team[] = [
    { name: 'Команда А', round1: 10, round2: 15, round3: 20, round4: 25, round5: 30, round6: 35, round7: 40, place: 1, total: 175 },
    { name: 'Команда Б', round1: 9, round2: 14, round3: 19, round4: 24, round5: 29, round6: 34, round7: 39, place: 2, total: 168 },
    { name: 'Команда В', round1: 8, round2: 13, round3: 18, round4: 23, round5: 28, round6: 33, round7: 38, place: 3, total: 161 },
    { name: 'Команда Г', round1: 7, round2: 12, round3: 17, round4: 22, round5: 27, round6: 32, round7: 37, place: 4, total: 154 },
    { name: 'Команда Д', round1: 6, round2: 11, round3: 16, round4: 21, round5: 26, round6: 31, round7: 36, place: 5, total: 147 },
    // Добавьте больше тестовых данных по необходимости
];

const TeamRatingTable: React.FC = () => {
    return (
        <div className="w-full max-w-6xl mx-auto bg-[#FAF3DD] rounded-lg overflow-hidden shadow-lg mt-6">
            <table className="min-w-full">
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
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Место</th>
                        <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Итого</th>
                    </tr>
                </thead>
                <tbody>
                    {testData.map((team, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5E1]'
                            } hover:bg-gray-200 transition-colors duration-200`}
                        >
                            <td className="border px-4 py-3 text-center">{team.name}</td>
                            <td className="border px-4 py-3 text-center">{team.round1}</td>
                            <td className="border px-4 py-3 text-center">{team.round2}</td>
                            <td className="border px-4 py-3 text-center">{team.round3}</td>
                            <td className="border px-4 py-3 text-center">{team.round4}</td>
                            <td className="border px-4 py-3 text-center">{team.round5}</td>
                            <td className="border px-4 py-3 text-center">{team.round6}</td>
                            <td className="border px-4 py-3 text-center">{team.round7}</td>
                            <td className="border px-4 py-3 text-center">{team.place}</td>
                            <td className="border px-4 py-3 text-center">{team.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamRatingTable;
