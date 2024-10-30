"use client";
import React from 'react';

interface RatingButtonsProps {
    onRate: (rating: string) => void;
}

const RatingButtons: React.FC<RatingButtonsProps> = ({ onRate }) => {
    return (
        <div className="rating-buttons-container flex justify-center mt-6">
            <button className="rating-button green mx-2" onClick={() => onRate('Отлично')}>
                ОТЛИЧНО!
            </button>
            <button className="rating-button yellow mx-2" onClick={() => onRate('Хорошо')}>
                ХОРОШО!
            </button>
            <button className="rating-button red mx-2" onClick={() => onRate('Ещё доработать')}>
                ЕЩЁ ДОРАБОТАТЬ!
            </button>
        </div>
    );
};

export default RatingButtons;