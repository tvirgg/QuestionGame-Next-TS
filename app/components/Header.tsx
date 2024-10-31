"use client";
import React from 'react';

interface HeaderProps {
    teamName: string;
    tableNumber: number;
}

const Header: React.FC<HeaderProps> = ({ teamName, tableNumber }) => {
    return (
        <div className="flex justify-between items-center bg-[#2e3a50] py-[48px] px-[65px] rounded-[35px] text-white mt-5 border border-[#f4c542]">
            <div className="font-bold text-[60px]">{teamName}</div>
            <div className="text-[#f4c542] text-[67px] leading-[35px] mt-3">
                1 <br /> <span className="text-[30px]">стол</span>
            </div>

        </div>
    );
};

export default Header;