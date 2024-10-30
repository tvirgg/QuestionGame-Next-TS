"use client";
import React from 'react';
import RulesContent from '../components/RulesContent';
import ReturnButton from '../components/ReturnButton';

const RulesPage: React.FC = () => {
    return (
        <div className="w-screen h-screen bg-[#1c2536] text-white flex flex-col">
            <div className="flex-grow container mx-auto p-5">
                <RulesContent />
            </div>
            <div className="p-5">
                <ReturnButton />
            </div>
        </div>
    );
};

export default RulesPage;