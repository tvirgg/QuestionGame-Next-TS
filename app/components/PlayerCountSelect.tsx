"use client";
import React, { useState } from 'react';

interface PlayerCountSelectProps {
    onNext: (data: { playerCount: number; email: string; promoCode?: string }) => void;
}

const PlayerCountSelect: React.FC<PlayerCountSelectProps> = ({ onNext }) => {
    const [playerCount, setPlayerCount] = useState(1);
    const pricePerPlayer = 700; // Цена за одного человека
    const teamName = "КОМАНДА А";
    const [email, setEmail] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [checkboxError, setCheckboxError] = useState('');

    const handleSubmit = () => {
        if (!isChecked) {
            setCheckboxError('Вы должны согласиться с политикой обработки персональных данных.');
            return;
        }
        setCheckboxError('');
        onNext({ playerCount, email, promoCode });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        if (e.target.checked) {
            setCheckboxError('');
        }
    };

    return (
        <div className="pt-[100px] pb-[60px] w-[85%] mx-auto p-4 bg-white rounded-lg">
            <div className="mb-12">
                <span className="text-lg font-regular text-[#CC9F33] border border-[#CC9F33] p-3 px-5 rounded-[15px]">
                    {teamName}
                </span>
            </div>
            <h2 className="text-[45px] font-bold text-black mb-10 leading-[1.1]">
                Выберите количество игроков,<br /> за которых будете оплачивать
            </h2>
            <div className="flex flex-wrap justify-start mb-4">
                {[...Array(12)].map((_, index) => (
                    <button
                        key={index}
                        className={`w-[56px] h-[56px] m-1 rounded-full text-lg font-semibold ${
                            playerCount === index + 1
                                ? 'bg-[#CC9F33] text-white'
                                : 'bg-gray-200 text-black'
                        }`}
                        onClick={() => setPlayerCount(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <div className="flex justify-start items-baseline mb-4 text-2xl font-semibold mt-10">
                <div className="flex items-baseline">
                    <span className="text-[36px] font-regular">{playerCount * pricePerPlayer} ₽</span>
                    <span className="ml-3 text-[24px] font-normal text-gray-500">к оплате</span>
                </div>
                <div className="flex items-baseline ml-20">
                    <span className="text-[36px] font-regular">{pricePerPlayer} ₽</span>
                    <span className="ml-3 text-[24px] font-normal text-gray-500">цена за 1 человека</span>
                </div>
            </div>
            <div className="mb-4 w-[460px]">
                <p className="font-bold mb-[16px] leading-[1.1] mt-[40px]">
                    Напишите вашу почту, на которую <br />
                    вы хотите, чтобы пришел чек
                </p>
                <input
                    type="email"
                    placeholder="Ваша электронная почта"
                    className="w-full border border-gray-300 p-[14px] rounded-lg mb-2 placeholder-black  focus:outline-none focus:ring-2 focus:ring-[#CC9F33]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Введите промокод"
                    className="w-full border border-gray-300 p-[14px] rounded-lg mb-4 placeholder-black focus:outline-none focus:ring-2 focus:ring-[#CC9F33]"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                />
            </div>
            <button
                className="bg-[#CC9F33] text-white py-3 rounded-lg font-semibold hover:bg-[#b28d2a] w-[460px] mb-4"
                onClick={handleSubmit}
            >
                ПЕРЕЙТИ К ОПЛАТЕ
            </button>
            <div className="flex items-start">
                <div className="flex items-center mr-2 mt-2.5">
                    <input
                        type="checkbox"
                        className={`mr-2 w-[24px] h-[24px] border rounded bg-white appearance-none relative checked:bg-[#CC9F33]`}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <style jsx>{`
                        input[type="checkbox"]:checked::after {
                            content: "";
                            display: block;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 6px;
                            height: 12px;
                            border: solid white;
                            border-width: 0 2px 2px 0;
                            transform: translate(-50%, -50%) rotate(45deg);
                        }
                    `}</style>
                </div>
                <div className="flex-1">
                    <p className="text-[13px] text-gray-600 leading-[1.3] mt-1.5">
                        Нажимая на кнопку, вы соглашаетесь <br /> с политикой обработки персональных данных
                    </p>
                    {checkboxError && (
                        <p className="text-red-500 text-sm mt-1">
                            {checkboxError}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlayerCountSelect;
