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
    { name: 'Команда Е', round1: 5, round2: 10, round3: 15, round4: 20, round5: 25, round6: 30, round7: 35, place: 6, total: 140 },
    { name: 'Команда Ж', round1: 4, round2: 9, round3: 14, round4: 19, round5: 24, round6: 29, round7: 34, place: 7, total: 133 },
    { name: 'Команда З', round1: 3, round2: 8, round3: 13, round4: 18, round5: 23, round6: 28, round7: 33, place: 8, total: 126 },
    { name: 'Команда И', round1: 2, round2: 7, round3: 12, round4: 17, round5: 22, round6: 27, round7: 32, place: 9, total: 119 },
    { name: 'Команда К', round1: 1, round2: 6, round3: 11, round4: 16, round5: 21, round6: 26, round7: 31, place: 10, total: 112 },
];

const TeamResultTable: React.FC = () => {
    return (
        <div className="w-[88%] mx-auto bg-[#CC9F33] rounded-[20px] overflow-hidden mt-2 mb-5">
            <table className="min-w-full text-black">
                <thead>
                    <tr className='h-[76px] font-light'>
                        {/* Новая колонка "Место" */}
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-300">Место</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-300">Команда</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-300">Итого</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-300">Раунд 1</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-300">Раунд 2</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-300">Раунд 3</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-300">Раунд 4</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-300">Раунд 5</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-300">Раунд 6</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-300">Раунд 7</th>
                    </tr>
                </thead>
                <tbody>
                    {testData.map((team, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5E1]'
                            } hover:bg-gray-200 transition-colors duration-200 font-regular text-[26px] `}
                        >
                            {/* Новая ячейка "Место" */}
                            <td className="border px-4 py-3 pl-8 w-[75px]">{index + 1}</td>
                            <td className="border px-4 py-3 pl-8 w-[340px]">{team.name}</td>
                            <td className="border px-4 py-3 pl-8 h-[75px] text-left">{team.total}</td>
                            <td className="border px-4 py-3 pl-8 h-[75px] text-left">{team.round1}</td>
                            <td className="border px-4 py-3 pl-8 h-[75px] text-left">{team.round2}</td>
                            <td className="border px-4 py-3 pl-8 h-[75px] text-left">{team.round3}</td>
                            <td className="border px-4 py-3 pl-8 h-[75px] text-left">{team.round4}</td>
                            <td className="border px-4 py-3 pl-8 h-[75px] text-left">{team.round5}</td>
                            <td className="border px-4 py-3 pl-8 h-[75px] text-left">{team.round6}</td>
                            <td className="border px-4 py-3 pl-8 h-[75px] text-left">{team.round7}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamResultTable;
