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
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [errors, setErrors] = useState<{ cardNumber?: string; expiryDate?: string; cvv?: string }>({});

    const validateCardDetails = () => {
        const newErrors: { cardNumber?: string; expiryDate?: string; cvv?: string } = {};

        // Валидация номера карты (16 цифр)
        if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ''))) {
            newErrors.cardNumber = 'Введите корректный номер карты (16 цифр).';
        }

        // Валидация даты (формат MM/YY)
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            newErrors.expiryDate = 'Введите корректную дату в формате MM/YY.';
        }

        // Валидация CVV (3 цифры)
        if (!/^\d{3}$/.test(cvv)) {
            newErrors.cvv = 'Введите корректный CVV (3 цифры).';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = () => {
        if (validateCardDetails()) {
            onNext();
        }
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
        if (value.length <= 16) {
            setCardNumber(value);
        }
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
        if (value.length > 4) {
            value = value.slice(0, 4);
        }

        if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }

        setExpiryDate(value);
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
        if (value.length <= 3) {
            setCvv(value);
        }
    };

    return (
        <div className="mt-[80px] pt-[20px] pb-[60px] w-[85%] mx-auto p-4 bg-white rounded-lg">
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
            <div className="mb-12 mt-12">
                <span className="text-lg font-regular text-[#CC9F33] border border-[#CC9F33] p-3 px-5 rounded-[15px]">
                    КОМАНДА А
                </span>
            </div>
            <h2 className="text-[45px] font-bold text-black leading-[1.1]">
                Вы можете оплатить любым <br /> удобным для вас способом
            </h2>
            <div className="flex justify-start items-baseline mb-[40px] text-2xl font-semibold mt-[40px]">
                <div className="flex items-baseline">
                    <span className="text-[36px] font-regular">5600 ₽</span>
                    <span className="ml-3 text-[24px] font-normal text-gray-500">к оплате</span>
                </div>
                <div className="flex items-baseline ml-20">
                    <span className="text-[36px] font-regular">700 ₽</span>
                    <span className="ml-3 text-[24px] font-normal text-gray-500">цена за 1 человека</span>
                </div>
            </div>
            <div className="flex border-b border-gray-300 mb-4 w-[460px]">
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
                <div className="flex flex-col items-start mb-4 h-[230px] w-[460px]">
                    <img src="/qr.png" alt="QR Code" className="w-40 h-40 mt-[10px]" />
                    <button
                        onClick={onNext}
                        className=" w-[460px] bg-[#CC9F33] text-white py-3 rounded-lg font-semibold hover:bg-[#b28d2a] block mt-[20px]"
                    >
                        оплатить
                    </button>
                </div>
            ) : (
                <div className="mb-4 w-[460px]">
                    <p className="text-[16px] mb-2 font-bold">Заполните данные своей карты</p>
                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Номер карты"
                            className={`w-full border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mb-1 placeholder-black focus:outline-none focus:ring-2 focus:ring-[#CC9F33]`}
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="flex space-x-2 mb-2">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Месяц / год"
                                className={`w-full border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mb-1 placeholder-black focus:outline-none focus:ring-2 focus:ring-[#CC9F33]`}
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                            />
                            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                        </div>
                        <div className="w-1/3">
                            <input
                                type="text"
                                placeholder="CVV"
                                className={`w-full border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mb-1 placeholder-black focus:outline-none focus:ring-2 focus:ring-[#CC9F33]`}
                                value={cvv}
                                onChange={handleCvvChange}
                            />
                            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                        </div>
                    </div>
                    <button
                        onClick={handlePayment}
                        className="w-full bg-[#CC9F33] text-white py-3 rounded-lg font-semibold hover:bg-[#b28d2a] block mt-[20px]"
                    >
                        оплатить
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentOptions;
