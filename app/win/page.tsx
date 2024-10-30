"use client";
import React from 'react';
import WinPage from '../components/WinPage';

const WinnerPage: React.FC = () => {
    return (
        <div className="w-screen h-screen bg-[#1c2536] text-[#f4c542]">
            <WinPage winnerName="Иван Иванов" />
        </div>
    );
};

export default WinnerPage;