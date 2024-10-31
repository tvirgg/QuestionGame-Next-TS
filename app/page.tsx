"use client";
import React from 'react';
import Header from './components/Header';
import MenuGrid from './components/MenuGrid';
import ReturnButton from './components/ReturnButton';
import StartButton from './components/StartButton';

const MainMenu: React.FC = () => {
    return (
        <div className="w-screen h-screen bg-[#1c2536] text-white flex flex-col">
            <div className="flex-grow mx-auto w-[81%]">
                <Header teamName="Команда А" tableNumber={5} />
                <MenuGrid />
            </div>
            <div className="mx-auto flex justify-between p-5 w-[81%]">
                <ReturnButton />
                <StartButton />
            </div>
        </div>
    );
};

export default MainMenu;