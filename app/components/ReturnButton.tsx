
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaHome } from 'react-icons/fa';

const ReturnButton: React.FC = () => {
    const router = useRouter();

    return (
        <button
            className="flex justify-center items-center w-[90px] h-[90px] cursor-pointer transition-colors duration-200"
            onClick={() => router.push('/hello')}
        >
                <img
                        src="/House.svg"
                        alt="House icon"
                        className="h-12 w-12 cursor-pointer w-[100px] h-[100px]"
                    />
        </button>
    );
};

export default ReturnButton;
        