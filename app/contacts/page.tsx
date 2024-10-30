"use client";
import React from 'react';
import Contacts from '../components/Contacts';

const ContactPage: React.FC = () => {
    return (
        <div className="w-screen h-screen bg-[#1c2536] flex items-center justify-center">
            <Contacts />
        </div>
    );
};

export default ContactPage;