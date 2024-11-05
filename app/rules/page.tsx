"use client";
import React from "react";
import RulesContent from "../components/RulesContent";
import { useRouter } from "next/navigation";

const RulesPage: React.FC = () => {
    const router = useRouter();
    const handleHomeClick = () => {
        router.push("/");
    };

    return (
        <div className="w-screen h-screen bg-[#FFFFFC] text-white flex flex-col">
            <div className="flex-grow container mr-auto p-10">
                <RulesContent />
            </div>
            <div className="flex justify-center p-5">
                <div className="relative">
                    <div className="absolute inset-0 bg-[#f5f5f5] rounded-full blur-md w-[80px] h-[80px]"></div>
                    <img
                        src="/House.svg"
                        alt="House icon"
                        className="h-[130px] w-[130px] cursor-pointer relative z-10"
                        onClick={handleHomeClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default RulesPage;
