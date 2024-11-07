"use client";
import React, { useState } from 'react';

interface LotteryFormProps {
    onNext: (data: { name: string; email: string; phone: string }) => void;
}

const LotteryForm: React.FC<LotteryFormProps> = ({ onNext }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [agree, setAgree] = useState(false);

    const handleSubmit = () => {
        if (agree) {
            onNext({ name, email, phone });
        } else {
            alert('Пожалуйста, согласитесь с политикой обработки персональных данных');
        }
    };

    return (
        <div className="bg-white p-8 max-w-6xl mx-auto flex border border-gray-300">
            <div className="w-2/3 pr-8">
                <div className="mb-6">
                    <span className="text-lg font-bold text-[#CC9F33] border border-[#CC9F33] py-1 px-4 rounded-full">
                        НАЗВАНИЕ КОМАНДЫ
                    </span>
                </div>
                <h2 className="text-3xl font-bold text-black mb-6">Примите участие в нашей лотерее</h2>
                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2 text-[#CC9F33]">Ваше имя</label>
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CC9F33] placeholder-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2 text-[#CC9F33]">Ваша электронная почта</label>
                    <input
                        type="email"
                        placeholder="example@mail.com"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CC9F33] placeholder-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2 text-[#CC9F33]">Телефон</label>
                    <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CC9F33] placeholder-black"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-[#CC9F33] text-white py-3 px-6 rounded font-semibold hover:bg-[#b2882a] mb-4"
                >
                    Участвовать в лотерее
                </button>
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        className="mr-2 w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-[#CC9F33] accent-[#CC9F33]"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    <label className="text-sm text-gray-600">
                        Нажимая на кнопку, вы соглашаетесь с политикой обработки персональных данных
                    </label>
                </div>
                <div className="text-lg font-semibold mb-6">
                    <span className="text-black">500 ₽ к оплате</span>
                    <span className="ml-4 text-black">700 ₽ цена за 1 человека</span>
                </div>
            </div>
            <div className="w-1/3 text-sm text-gray-800">
                <h3 className="font-semibold mb-2 text-[#CC9F33]">Правила проведения лотереи*</h3>
                <ul className="list-disc list-inside space-y-2">
                    <li>Лотерея проводится в рамках квиз-игры и доступна всем участникам, пришедшим на игру.</li>
                    <li>Для участия необходимо зарегистрироваться, отправив ФИО и телефон в предложенной форме.</li>
                    <li>Каждый участник может зарегистрироваться только один раз, дубликаты удаляются.</li>
                    <li>Розыгрыш лотереи проводится в перерывах между раундами или по завершении квиз-игры.</li>
                    <li>Ведущий с помощью программы случайных чисел определяет победителя.</li>
                    <li>Если победитель присутствует, он выходит к ведущему и забирает приз.</li>
                    <li>Если победитель отсутствует, проводится повторный розыгрыш до тех пор, пока не будет найден присутствующий участник.</li>
                    <li>Призы могут включать подарочные сертификаты, бесплатные напитки, сувениры бара и другие поощрения.</li>
                    <li>Призы выдаются лично в руки победителям сразу после объявления результатов или по завершении игры.</li>
                    <li>Призы не подлежат обмену на деньги и возврату.</li>
                </ul>
                <p className="mt-4 font-semibold text-[#CC9F33]">Приятной игры и удачи в лотерее!</p>
                <p>Полные правила лотереи вы можете посмотреть тут: <a href="#" className="text-blue-500 underline">ссылка</a></p>
            </div>
        </div>
    );
};

export default LotteryForm;
