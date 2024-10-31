"use client";
import React, { useState } from 'react';
import { FaUserShield } from 'react-icons/fa'; // Сохраняем импорт FaUserShield
import Modal from './Modal';
import LotteryForm from './LotteryForm';
import PlayerCountSelect from './PlayerCountSelect';
import PaymentOptions from './PaymentOptions';
import CardInputForm from './CardInputForm';

type MenuItem = {
    name: string;
    icon: React.ComponentType<{ className?: string }> | string; // Иконка может быть компонентом или строкой
    href?: string;
    action?: string;
};

const menuItems: MenuItem[] = [
    // { name: 'Панель администратора', icon: FaUserShield, href: '/admin' },
    { name: 'Правила игры', icon: 'Info.svg', href: '/rules' }, // Используем Info.svg для "Правила игры"
    { name: 'Результаты игры', icon: 'Game_results.svg', href: '/results' },
    { name: 'Рейтинг команд', icon: 'Team_rating.svg', href: '/rating' },
    { name: 'Меню ресторана', icon: 'Food_menu.svg', href: '/menu' },
    { name: 'Лотерея', icon: 'Lotery.svg', action: 'openLottery' },
    { name: 'Оплата', icon: 'Payment.svg', href: '/payment' },
    { name: 'Хелп', icon: 'Help.svg', href: '/help' },
    { name: 'Наши контакты', icon: 'Contacts.svg', href: '/contacts' },
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

    const handleMenuClick = (item: MenuItem) => {
        if (item.action === 'openLottery') {
            setIsLotteryOpen(true);
        } else if (item.href) {
            window.location.href = item.href;
        }
    };

    return (
        <>
            <div className="menu grid grid-cols-3 gap-4 pl-12 pt-12">
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        className="menu-item flex flex-col text-white text-lg transition-transform duration-200 hover:scale-105 cursor-pointer mb-[64px]"
                        onClick={() => handleMenuClick(item)}
                    >
                        {typeof item.icon === 'string' ? (
                            <img
                                src={`/${item.icon}`}
                                alt={item.name}
                                className="icon text-[#f4c542] text-3xl mb-2 w-[80px] h-[80px]" // Настройте размеры по необходимости
                            />
                        ) : (
                            <item.icon className="icon text-[#f4c542] text-3xl mb-2 w-12 h-12" />
                        )}
                        <span className='text-[48px] font-bold mt-[30px]'>{item.name}</span>
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
