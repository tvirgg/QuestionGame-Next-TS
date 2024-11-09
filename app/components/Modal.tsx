"use client";
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black rounded-2xl p-6 relative w-[58%]">
            <button
                className="absolute top-[39px] right-[49px]"
                onClick={onClose}
                aria-label="Закрыть"
            >
    <img
        src="/Close.svg"
        alt="Закрыть"
        className="h-[112px] w-[112px]" // Настройте размер по необходимости
    />
</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
