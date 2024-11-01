"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface HelloPageProps {
    tableNumber: number;
}

const HelloPage: React.FC<HelloPageProps> = ({ tableNumber }) => {
    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/');
    };

    return (
        <div
            className="relative w-full h-screen bg-cover bg-center text-white"
            style={{ backgroundImage: `url('/First_screen.jpg')` }}
        >
            {/* Upper pattern overlay */}
            <div className="absolute top-0 left-0 w-full h-[100px] bg-pattern"></div>

            {/* Team name */}
            <div className="flex justify-center items-center h-full">
                <h1 className="text-[100px] font-bold">Название команды</h1>
            </div>

            {/* Bottom layout with empty space, centered house icon, and table number */}
            <div className="absolute bottom-10 flex justify-between w-full px-10 items-center">
                {/* Empty left space */}
                <div className="w-1/3"></div>

                {/* House icon centered */}
                <div className="w-1/3 flex">
                    <div className="relative">
                        <div className="absolute backdrop-blur-[3px] w-[100px] h-[100px]"></div>
                        <img
                            src="/House.svg"
                            alt="House icon"
                            className="h-[100px] w-[100px] cursor-pointer relative z-10"
                            onClick={handleHomeClick}
                        />
                    </div>
                </div>

                {/* Table number on the right */}
                <div className="text-[#f4c542] text-[67px] leading-[35px] mt-3 text-right">
                    5 <br />
                    <span className="text-[30px]">стол</span>
                </div>
            </div>
        </div>
    );
};

export default HelloPage;
