
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
    { name: 'Команда А', round1: 10, round2: 15, round3: 20, round4: 25, round5: 30, round6: 35, round7: 40, place: 1, total: 175 },
    { name: 'Команда Б', round1: 9, round2: 14, round3: 19, round4: 24, round5: 29, round6: 34, round7: 39, place: 2, total: 168 },
    { name: 'Команда В', round1: 8, round2: 13, round3: 18, round4: 23, round5: 28, round6: 33, round7: 38, place: 3, total: 161 },
    { name: 'Команда Г', round1: 7, round2: 12, round3: 17, round4: 22, round5: 27, round6: 32, round7: 37, place: 4, total: 154 },
    { name: 'Команда Д', round1: 6, round2: 11, round3: 16, round4: 21, round5: 26, round6: 31, round7: 36, place: 5, total: 147 },
];

const TeamRatingTable: React.FC = () => {
    return (
        <div className="w-[88%] mx-auto bg-[#CC9F33] rounded-[20px] overflow-hidden mt-2 mb-5">
            <table className="min-w-full text-black">
                <thead>
                    <tr className='h-[76px] font-light'>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-30">Команда</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-30">Раунд 1</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-30">Раунд 2</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-30">Раунд 3</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-30">Раунд 4</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-30">Раунд 5</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-30">Раунд 6</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-30">Раунд 7</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-r border-gray-30">Место</th>
                        <th className="px-4 pl-8 py-3 text-white text-[26px] font-light text-left border-l border-gray-30">Итого</th>
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
                            <td className="border px-4 py-3 pl-9 h-[82px] w-[340px]">{team.name}</td>
                            <td className="border px-4 py-3 pl-9 h-[76px text-left">{team.round1}</td>
                            <td className="border px-4 py-3 pl-9 h-[76px] text-left">{team.round2}</td>
                            <td className="border px-4 py-3 pl-9 h-[76px] text-left">{team.round3}</td>
                            <td className="border px-4 py-3 pl-9 h-[76px] text-left">{team.round4}</td>
                            <td className="border px-4 py-3 pl-9 h-[76px] text-left">{team.round5}</td>
                            <td className="border px-4 py-3 pl-9 h-[76px] text-left">{team.round6}</td>
                            <td className="border px-4 py-3 pl-9 h-[76px] text-left">{team.round7}</td>
                            <td className="border px-4 py-3 pl-9 h-[76px] text-left">{team.place}</td>
                            <td className="border px-4 py-3 pl-9 h-[76px] text-left">{team.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamRatingTable;
