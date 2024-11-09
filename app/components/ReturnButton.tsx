
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const ReturnButton: React.FC = () => {
    const router = useRouter();

    return (
        <button
            className="flex justify-center items-centercursor-pointer transition-colors duration-200"
            onClick={() => router.push('/')}
        >
                <img
                        src="/House.svg"
                        alt="House icon"
                        className="h-12 w-12 cursor-pointer w-[120px] h-[120px]"
                    />
        </button>
    );
};

export default ReturnButton;
        