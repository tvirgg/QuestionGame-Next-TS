"use client";
import React from 'react';
import CommentForm from '../components/CommentForm';
import ReturnButton from '../components/ReturnButton';

const CommentPage: React.FC = () => {
    const handleSubmit = (data: any) => {
        // Обработка данных комментария
        console.log('Данные комментария:', data);
    };

    return (
        <div className="w-screen h-screen bg-[#1c2536] text-white flex flex-col">
            <div className="flex-grow container mx-auto p-5 flex items-center justify-center">
                <CommentForm onSubmit={handleSubmit} />
            </div>
            <div className="p-5">
                <ReturnButton />
            </div>
        </div>
    );
};

export default CommentPage;