
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaHome } from 'react-icons/fa';

const ReturnButton: React.FC = () => {
    const router = useRouter();

    return (
        <button
            className="flex justify-center items-center w-16 h-16 bg-[#14213D] rounded-full cursor-pointer hover:bg-[#1b2a49] transition-colors duration-200"
            onClick={() => router.push('/')}
        >
            <FaHome className="text-[#D4A373] text-3xl" />
        </button>
    );
};

export default ReturnButton;
