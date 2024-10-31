
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaHome } from 'react-icons/fa';

const ReturnButton: React.FC = () => {
    const router = useRouter();

    return (
        <button
            className="flex justify-center items-center w-[90px] h-[90px] bg-[#2e3a50] rounded-full cursor-pointer hover:bg-[#1b2a49]  border border-[#f4c542] transition-colors duration-200"
            onClick={() => router.push('/')}
        >
            <FaHome className="text-[#CC9F33] text-[60px]" />
        </button>
    );
};

export default ReturnButton;
        