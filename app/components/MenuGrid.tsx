
"use client";
import React, { useState } from 'react';
import { FaRegQuestionCircle, FaChartBar, FaUtensils, FaGift, FaCreditCard, FaHandsHelping, FaAddressBook, FaTrophy } from 'react-icons/fa';
import { FaUserShield } from 'react-icons/fa';
import Modal from './Modal';
import LotteryForm from './LotteryForm';
import PlayerCountSelect from './PlayerCountSelect';
import PaymentOptions from './PaymentOptions';
import CardInputForm from './CardInputForm';

const menuItems = [
        { name: 'Панель администратора', icon: FaUserShield, href: '/admin' },
    
    { name: 'Правила игры', icon: FaRegQuestionCircle, href: '/rules' },
    { name: 'Результаты игры', icon: FaTrophy, href: '/results' },
    { name: 'Рейтинг команд', icon: FaChartBar, href: '/rating' },
    { name: 'Меню ресторана', icon: FaUtensils, href: '/menu' },
    { name: 'Лотерея', icon: FaGift, action: 'openLottery' },
    { name: 'Оплата', icon: FaCreditCard, href: '/payment' },
    { name: 'Хелп', icon: FaHandsHelping, href: '/help' },
    { name: 'Наши контакты', icon: FaAddressBook, href: '/contacts' },
];

const MenuGrid: React.FC = () => {
    const [isLotteryOpen, setIsLotteryOpen] = useState(false);
    const [lotteryStep, setLotteryStep] = useState(1);
    const [lotteryData, setLotteryData] = useState<any>({});

    const handleLotteryNext = (data: any) => {
        setLotteryData({ ...lotteryData, ...data });
        setLotteryStep(lotteryStep + 1);
    };

    const handleLotteryClose = () => {
        setIsLotteryOpen(false);
        setLotteryStep(1);
        setLotteryData({});
    };

    const handleMenuClick = (item: any) => {
        if (item.action === 'openLottery') {
            setIsLotteryOpen(true);
        } else if (item.href) {
            window.location.href = item.href;
        }
    };

    return (
        <>
            <div className="menu grid grid-cols-3 gap-4 py-5">
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        className="menu-item flex flex-col items-center text-white text-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
                        onClick={() => handleMenuClick(item)}
                    >
                        <item.icon className="icon text-[#f4c542] text-3xl mb-2" />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
            {isLotteryOpen && (
                <Modal isOpen={isLotteryOpen} onClose={handleLotteryClose}>
                    {lotteryStep === 1 && <LotteryForm onNext={handleLotteryNext} />}
                    {lotteryStep === 2 && <PlayerCountSelect onNext={handleLotteryNext} />}
                    {lotteryStep === 3 && (
                        <PaymentOptions
                            amount={lotteryData.playerCount * 100 || 100} // Пример суммы
                            onNext={() => setLotteryStep(lotteryStep + 1)}
                        />
                    )}
                    {lotteryStep === 4 && <CardInputForm onSubmit={handleLotteryClose} />}
                </Modal>
            )}
        </>
    );
};

export default MenuGrid;
