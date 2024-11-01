
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const ReturnButton: React.FC = () => {
    const router = useRouter();

    return (
        <button
            className="flex justify-center items-center w-[80px] h-[80px] cursor-pointer transition-colors duration-200"
            onClick={() => router.push('/hello')}
        >
                <img
                        src="/House.svg"
                        alt="House icon"
                        className="h-12 w-12 cursor-pointer w-[80px] h-[80px]"
                    />
        </button>
    );
};

export default ReturnButton;
        