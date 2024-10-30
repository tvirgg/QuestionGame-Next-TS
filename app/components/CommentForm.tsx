"use client";
import React, { useState } from 'react';

interface CommentFormProps {
    onSubmit: (data: { comment: string; questionFeedback: string[]; hostFeedback: string[] }) => void;
}

const questionOptions = ['Сложные вопросы', 'Интересные темы', 'Плохая формулировка'];
const hostOptions = ['Приятный голос', 'Хорошая подача', 'Медленный темп'];

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
    const [comment, setComment] = useState('Очень понравилось!');
    const [questionFeedback, setQuestionFeedback] = useState<string[]>(['Интересные темы']);
    const [hostFeedback, setHostFeedback] = useState<string[]>(['Хорошая подача']);

    const handleCheckboxChange = (option: string, setState: React.Dispatch<React.SetStateAction<string[]>>, state: string[]) => {
        if (state.includes(option)) {
            setState(state.filter((item) => item !== option));
        } else {
            setState([...state, option]);
        }
    };

    const handleSubmit = () => {
        onSubmit({ comment, questionFeedback, hostFeedback });
    };

    return (
        <div className="comment-page bg-[#1c2536] text-white rounded-2xl p-10 shadow-lg">
            <h2 className="text-2xl mb-4">Оставьте ваш комментарий</h2>
            <textarea
                className="comment-box border border-[#f4c542] rounded w-full p-2 mb-4 text-black"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ваш комментарий..."
            />
            <div className="checkbox-group mb-4">
                <h3 className="mb-2">Оценка вопросов:</h3>
                {questionOptions.map((option) => (
                    <label key={option} className="block">
                        <input
                            type="checkbox"
                            checked={questionFeedback.includes(option)}
                            onChange={() => handleCheckboxChange(option, setQuestionFeedback, questionFeedback)}
                        />{' '}
                        {option}
                    </label>
                ))}
            </div>
            <div className="checkbox-group mb-4">
                <h3 className="mb-2">Оценка ведущего:</h3>
                {hostOptions.map((option) => (
                    <label key={option} className="block">
                        <input
                            type="checkbox"
                            checked={hostFeedback.includes(option)}
                            onChange={() => handleCheckboxChange(option, setHostFeedback, hostFeedback)}
                        />{' '}
                        {option}
                    </label>
                ))}
            </div>
            <button
                className="submit-button bg-[#f4c542] text-white py-2 px-4 rounded w-full hover:bg-[#d2a636]"
                onClick={handleSubmit}
            >
                Отправить данные
            </button>
        </div>
    );
};

export default CommentForm;