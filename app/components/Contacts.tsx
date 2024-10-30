"use client";
import React from 'react';
import { FaTelegramPlane, FaWhatsapp, FaVk } from 'react-icons/fa';
import ReturnButton from './ReturnButton';

const Contacts: React.FC = () => {
    return (
        <div className="contact-page bg-[#1c2536] text-white rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-6">Наши контакты</h2>
            <div className="social-links flex justify-around text-4xl text-[#f4c542]">
                <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer">
                    <FaTelegramPlane />
                </a>
                <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp />
                </a>
                <a href="https://vk.com/yourpage" target="_blank" rel="noopener noreferrer">
                    <FaVk />
                </a>
            </div>
            <div className="mt-6">
                <ReturnButton />
            </div>
        </div>
    );
};

export default Contacts;