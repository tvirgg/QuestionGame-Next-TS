"use client";
import React, { useState } from 'react';

interface PaymentOptionsProps {
    amount: number;
    onNext: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ amount, onNext }) => {
    const [method, setMethod] = useState<'qr' | 'card'>('qr');

    return (
        <div className="text-white">
            <h2 className="text-2xl mb-4">Выбор способа оплаты</h2>
            <div className="payment-options flex justify-around mb-4">
                <button
                    className={`flex-1 text-center py-2 ${
                        method === 'qr' ? 'text-[#f4c542] border-b-2 border-[#f4c542]' : 'text-gray-200'
                    }`}
                    onClick={() => setMethod('qr')}
                >
                    QR-код
                </button>
                <button
                    className={`flex-1 text-center py-2 ${
                        method === 'card' ? 'text-[#f4c542] border-b-2 border-[#f4c542]' : 'text-gray-200'
                    }`}
                    onClick={() => setMethod('card')}
                >
                    Банковская карта
                </button>
            </div>
            {method === 'qr' ? (
                <div className="qr-code flex flex-col items-center">
                    <p className="mb-2">Сумма к оплате: {amount} ₽</p>
                    {/* Замените на ваш QR-код */}
                    <img src="/qr-code.png" alt="QR Code" className="w-40 h-40" />
                </div>
            ) : (
                <div>
                    <p className="mb-4">Сумма к оплате: {amount} ₽</p>
                    <button
                        className="submit-button bg-[#f4c542] text-white py-2 px-4 rounded w-full hover:bg-[#d2a636]"
                        onClick={onNext}
                    >
                        Оплатить
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentOptions;