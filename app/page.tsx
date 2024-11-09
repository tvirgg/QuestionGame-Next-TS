"use client"; // Ensure this is a Client Component
import React from 'react';
import Header from './components/Header';
import MenuGrid from './components/MenuGrid';
import ReturnButton from './components/ReturnButton';
import StartButton from './components/StartButton';
import { useRouter } from 'next/navigation'; // Updated import

const MainMenu: React.FC = () => {
    const router = useRouter();
    return (
        <div className="w-screen h-screen bg-[#1c2536] text-white flex flex-col">
            <div className="flex-grow mx-auto w-[81%]">
                <Header teamName="Команда А" tableNumber={5} />
                <MenuGrid />
            </div>
            <div className="mx-auto flex justify-between p-5 w-[81%]">
                <button
                    className="flex justify-center items-center cursor-pointer transition-colors duration-200"
                    onClick={() => router.push('/hello')}
                >
                    <img
                        src="/House.svg"
                        alt="House icon"
                        className="h-12 w-12 cursor-pointer w-[90px] h-[90px]"
                    />
                </button>
                <StartButton />
            </div>
        </div>
    );
};

export default MainMenu;
