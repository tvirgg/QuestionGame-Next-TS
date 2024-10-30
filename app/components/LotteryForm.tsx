"use client";
import React, { useState } from 'react';

interface LotteryFormProps {
    onNext: (data: { name: string; email: string; phone: string }) => void;
}

const LotteryForm: React.FC<LotteryFormProps> = ({ onNext }) => {
    const [name, setName] = useState('Иван Иванов');
    const [email, setEmail] = useState('ivan@example.com');
    const [phone, setPhone] = useState('+71234567890');

    const handleSubmit = () => {
        onNext({ name, email, phone });
    };

    return (
        <div className="text-white">
            <h2 className="text-2xl mb-4">Участие в лотерее</h2>
            <div className="form-group flex flex-col mb-4">
                <label>Имя</label>
                <input
                    className="border p-2 rounded text-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group flex flex-col mb-4">
                <label>Email</label>
                <input
                    className="border p-2 rounded text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group flex flex-col mb-4">
                <label>Телефон</label>
                <input
                    className="border p-2 rounded text-black"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <button
                className="submit-button bg-[#f4c542] text-white py-2 px-4 rounded w-full hover:bg-[#d2a636]"
                onClick={handleSubmit}
            >
                Участвовать в лотерее
            </button>
        </div>
    );
};

export default LotteryForm;