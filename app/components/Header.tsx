"use client";
import React from 'react';

interface HeaderProps {
    teamName: string;
    tableNumber: number;
}

const Header: React.FC<HeaderProps> = ({ teamName, tableNumber }) => {
    return (
        <div className="flex justify-between items-center bg-[#2e3a50] p-4 rounded-lg text-white text-2xl">
            <div className="font-bold">{teamName}</div>
            <div className="text-[#f4c542] text-xl">Стол № {tableNumber}</div>
        </div>
    );
};

export default Header;