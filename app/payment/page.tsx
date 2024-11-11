"use client";
import React, { useState } from 'react';
import ReturnButton from '../components/ReturnButton';
import PaymentMain from '../components/PaymentMain';

const PayPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<any>({});
    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-screen h-screen bg-[#1c2536] text-white flex flex-col pb-10">
            <div className="mx-auto w-[45%] bg-white mt-[20vh] rounded-[30px]">
                <PaymentMain
                                amount={700} // Пример суммы
                                onNext={() => setStep(step + 1)} pricePerPlayer={0} onBack={function (): void {
                                    throw new Error('Function not implemented.');
                                } } />
            </div>
            <div className="mx-auto mt-20">
                <ReturnButton />
            </div>
        </div>
    );
};

export default PayPage;