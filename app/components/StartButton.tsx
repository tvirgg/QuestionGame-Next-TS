"use client";
import React from 'react';
import Link from 'next/link';

const StartButton: React.FC = () => {
    return (
        <Link href="/">
            <button className="start-button text-[#f4c542] text-[70px] font-bold border-none cursor-pointer transition-colors duration-200 hover:text-[#d2a636]">
            <img
                        src="/logo.png"
                        alt="House icon"
                        className="mt-6"
                    />
            </button>
        </Link>
    );
};

export default StartButton;