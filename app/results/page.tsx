
"use client";
import React from 'react';
import TeamRatingTable from '../components/TeamResultTable';
import ReturnButton from '../components/ReturnButton';

const ResultPage: React.FC = () => {
    return (
        <div className="w-screen h-screen bg-[#14213D] text-white flex flex-col p-4">
            <h1 className="text-[69px] font-semibold mt-[70px] pl-[140px]">Результаты игры</h1>
            <TeamRatingTable />
            <div className="mx-auto">
                <ReturnButton />
            </div>
        </div>
    );
};

export default ResultPage;
