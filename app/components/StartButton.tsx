"use client";
import React from 'react';
import Link from 'next/link';

const StartButton: React.FC = () => {
    return (
        <Link href="/game">
            <button className="start-button text-[#f4c542] text-xl font-bold border-none cursor-pointer transition-colors duration-200 hover:text-[#d2a636]">
                ИГРА
            </button>
        </Link>
    );
};

export default StartButton;