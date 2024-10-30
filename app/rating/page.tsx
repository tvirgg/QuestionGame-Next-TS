
"use client";
import React from 'react';
import TeamRatingTable from '../components/TeamRatingTable';
import ReturnButton from '../components/ReturnButton';

const RatingPage: React.FC = () => {
    return (
        <div className="w-screen h-screen bg-[#14213D] text-white flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mt-8 mb-6">Рейтинг команд</h1>
            <TeamRatingTable />
            <div className="mt-8">
                <ReturnButton />
            </div>
        </div>
    );
};

export default RatingPage;
