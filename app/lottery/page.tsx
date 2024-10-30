"use client";
import React, { useState } from 'react';
import Modal from '../components/Modal';
import LotteryForm from '../components/LotteryForm';
import PlayerCountSelect from '../components/PlayerCountSelect';
import PaymentOptions from '../components/PaymentOptions';
import CardInputForm from '../components/CardInputForm';
import ReturnButton from '../components/ReturnButton';

const LotteryPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<any>({});

    const handleNext = (data: any) => {
        setFormData({ ...formData, ...data });
        setStep(step + 1);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-screen h-screen bg-[#1c2536] text-white flex flex-col">
            <div className="flex-grow container mx-auto p-5">
                {isModalOpen && (
                    <Modal isOpen={isModalOpen} onClose={handleClose}>
                        {step === 1 && <LotteryForm onNext={handleNext} />}
                        {step === 2 && <PlayerCountSelect onNext={handleNext} />}
                        {step === 3 && (
                            <PaymentOptions
                                amount={formData.playerCount * 100 || 100} // Пример суммы
                                onNext={() => setStep(step + 1)}
                            />
                        )}
                        {step === 4 && <CardInputForm onSubmit={handleClose} />}
                    </Modal>
                )}
            </div>
            <div className="p-5">
                <ReturnButton />
            </div>
        </div>
    );
};

export default LotteryPage;