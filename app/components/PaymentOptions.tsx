"use client";
import React, { useState } from 'react';

interface PaymentOptionsProps {
    amount: number;
    pricePerPlayer: number;
    onBack: () => void;
    onNext: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ amount, pricePerPlayer, onBack, onNext }) => {
    const [method, setMethod] = useState<'qr' | 'card'>('qr');

    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <button onClick={onBack} className="text-gray-600">
                    <span className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="ml-1">назад</span>
                    </span>
                </button>
            </div>
            <div className="mb-4">
                <button className="text-[#CC9F33] border border-[#CC9F33] px-4 py-2 rounded-lg">
                    НАЗВАНИЕ КОМАНДЫ
                </button>
            </div>
            <h2 className="text-3xl font-bold mb-4">
                Вы можете оплатить любым удобным для вас способом
            </h2>
            <div className="flex justify-between items-baseline mb-4 text-2xl font-semibold">
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{amount} ₽</span>
                    <span className="ml-2 text-lg font-normal text-gray-500">к оплате</span>
                </div>
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{pricePerPlayer} ₽</span>
                    <span className="ml-2 text-lg font-normal text-gray-500">цена за 1 человека</span>
                </div>
            </div>
            <div className="flex border-b border-gray-300 mb-4">
                <button
                    className={`flex-1 text-left py-2 font-semibold pl-4 ${
                        method === 'qr' ? 'text-[#CC9F33] border-b-2 border-[#CC9F33]' : 'text-gray-500'
                    }`}
                    onClick={() => setMethod('qr')}
                >
                    Оплата QR кодом
                </button>
                <button
                    className={`flex-1 text-center py-2 font-semibold ${
                        method === 'card' ? 'text-[#CC9F33] border-b-2 border-[#CC9F33]' : 'text-gray-500'
                    }`}
                    onClick={() => setMethod('card')}
                >
                    Банковской картой
                </button>
            </div>
            {method === 'qr' ? (
                <div className="flex flex-col items-start mb-4 pl-4">
                    <img src="/qr.png" alt="QR Code" className="w-40 h-40" />
                </div>
            ) : (
                <div className="mb-4">
                    <p className="text-lg mb-2">Заполните данные своей карты</p>
                    <input
                        type="text"
                        placeholder="Номер карты"
                        className="w-full border border-gray-300 p-2 rounded-lg mb-2 placeholder-black"
                    />
                    <div className="flex space-x-2 mb-2">
                        <input
                            type="text"
                            placeholder="Месяц / год"
                            className="flex-1 border border-gray-300 p-2 rounded-lg placeholder-black"
                        />
                        <input
                            type="text"
                            placeholder="CVV"
                            className="w-1/3 border border-gray-300 p-2 rounded-lg placeholder-black"
                        />
                    </div>
                </div>
            )}
            <button
                onClick={onNext}
                className="w-2/3 bg-[#CC9F33] text-white py-3 rounded-lg font-semibold hover:bg-[#b28d2a] mx-auto block"
            >
                оплатить
            </button>
        </div>
    );
};

export default PaymentOptions;
