"use client";
import React, { useState } from 'react';

interface CardInputFormProps {
    onSubmit: () => void;
}

const CardInputForm: React.FC<CardInputFormProps> = ({ onSubmit }) => {
    const [cardNumber, setCardNumber] = useState('1234 5678 9012 3456');
    const [expiry, setExpiry] = useState('12/24');
    const [cvv, setCvv] = useState('123');

    const handleSubmit = () => {
        // Обработка данных карты
        onSubmit();
    };

    return (
        <div className="text-white">
            <h2 className="text-2xl mb-4">Оплата банковской картой</h2>
            <div className="card-input-group flex flex-col mb-4">
                <label>Номер карты</label>
                <input
                    className="border p-2 rounded text-black"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
            </div>
            <div className="flex mb-4">
                <div className="card-input-group flex-1 mr-2">
                    <label>Срок действия</label>
                    <input
                        className="border p-2 rounded text-black"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                    />
                </div>
                <div className="card-input-group flex-1 ml-2">
                    <label>CVV</label>
                    <input
                        className="border p-2 rounded text-black"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    />
                </div>
            </div>
            <button
                className="pay-button bg-[#f4c542] text-white py-2 px-4 rounded w-full hover:bg-[#d2a636]"
                onClick={handleSubmit}
            >
                Оплатить
            </button>
        </div>
    );
};

export default CardInputForm;