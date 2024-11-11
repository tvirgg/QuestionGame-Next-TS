"use client";
import React, { useState, useEffect } from 'react';
import { FaUserShield } from 'react-icons/fa'; // Retain FaUserShield import
import Modal from './Modal'; // Existing Modal for other uses
import LotteryForm from './LotteryForm';
import PlayerCountSelect from './PlayerCountSelect';
import PaymentOptions from './PaymentOptions';
import CardInputForm from './CardInputForm';

type MenuItem = {
    name: string;
    icon: React.ComponentType<{ className?: string }> | string; // Icon can be a component or a string
    href?: string;
    action?: string;
};

const menuItems: MenuItem[] = [
    { name: 'Правила игры', icon: 'Info.svg', href: '/rules' },
    { name: 'Результаты игры', icon: 'Game_results.svg', href: '/results' },
    { name: 'Рейтинг команд', icon: 'Team_rating.svg', href: '/rating' },
    { name: 'Меню ресторана', icon: 'Food_menu.svg', href: '/menu' },
    { name: 'Лотерея', icon: 'Lotery.svg', action: 'openLottery' },
    { name: 'Оплата', icon: 'Payment.svg', href: '/payment' },
    { name: 'Хелп', icon: 'Help.svg', action: 'showHelp' }, // Updated action
    { name: 'Наши контакты', icon: 'Contacts.svg', href: '/contacts' },
    { name: 'Админ ', icon: FaUserShield, href: '/admin' },
];

const MenuGrid: React.FC = () => {
    const [isLotteryOpen, setIsLotteryOpen] = useState(false);
    const [lotteryStep, setLotteryStep] = useState(1);
    const [lotteryData, setLotteryData] = useState<any>({});
    const [isHelpOpen, setIsHelpOpen] = useState(false); // New state for Help modal
    const [isHelpClosing, setIsHelpClosing] = useState(false); // State for fade-out

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
        } else if (item.action === 'showHelp') {
            if (!isHelpOpen) { // Prevent multiple triggers
                setIsHelpOpen(true);
            }
        } else if (item.href) {
            window.location.href = item.href;
        }
    };

    // Effect to auto-close the Help modal after 3 seconds with fade-out
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isHelpOpen) {
            timer = setTimeout(() => {
                setIsHelpClosing(true);
                // Wait for the fade-out animation to complete before hiding
                setTimeout(() => {
                    setIsHelpOpen(false);
                    setIsHelpClosing(false);
                }, 300); // Duration should match the fade-out animation duration
            }, 3000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isHelpOpen]);

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
                                className="icon text-[#f4c542] text-3xl mb-2 w-[80px] h-[80px]" // Adjust size as needed
                            />
                        ) : (
                            <item.icon className="icon text-[#f4c542] text-3xl mb-2 w-12 h-12" />
                        )}
                        <span className='text-[48px] font-bold mt-[30px]'>{item.name}</span>
                    </div>
                ))}
            </div>

            {/* Lottery Modal */}
            {isLotteryOpen && (
                <Modal isOpen={isLotteryOpen} onClose={handleLotteryClose}>
                    {lotteryStep === 1 && <LotteryForm onNext={handleLotteryNext} />}
                    {lotteryStep === 2 && <PlayerCountSelect onNext={handleLotteryNext} />}
                    {lotteryStep === 3 && (
                        <PaymentOptions
                            amount={lotteryData.playerCount * 100 || 100} // Example amount
                            pricePerPlayer={100} // Assuming 100 is the price per player
                            onBack={() => setLotteryStep(lotteryStep - 1)}
                            onNext={() => setLotteryStep(lotteryStep + 1)}
                        />
                    )}
                    {lotteryStep === 4 && <CardInputForm onSubmit={handleLotteryClose} />}
                </Modal>
            )}

            {/* Custom Help Modal with Fade-Out */}
            {isHelpOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 text-center">
                    <div
                        className={`bg-green-500 h-[320px] rounded-lg shadow-lg p-6 ${isHelpClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
                        role="alert"
                        aria-live="assertive"
                    >
                        <p className="text-white text-[40px] pt-20">Помощь уже в пути! <br /> Ожидайте</p>
                    </div>
                </div>
            )}

            {/* Animation Styles */}
            <style jsx>{`
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-in-out;
                }

                .animate-fade-out {
                    animation: fadeOut 0.3s ease-in-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes fadeOut {
                    from {
                        opacity: 1;
                        transform: scale(1);
                    }
                    to {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                }
            `}</style>
        </>
    );
};

export default MenuGrid;
