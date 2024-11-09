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

    // Состояния для хранения ошибок
    const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; agree?: string }>({});

    const validate = () => {
        const newErrors: { name?: string; email?: string; phone?: string; agree?: string } = {};

        if (!name.trim()) {
            newErrors.name = 'Пожалуйста, введите ваше имя.';
        }

        if (!email.trim()) {
            newErrors.email = 'Пожалуйста, введите вашу электронную почту.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Пожалуйста, введите корректный email.';
        }

        if (!phone.trim()) {
            newErrors.phone = 'Пожалуйста, введите ваш телефон.';
        } else if (!/^\+?\d{10,15}$/.test(phone)) {
            newErrors.phone = 'Пожалуйста, введите корректный номер телефона.';
        }

        if (!agree) {
            newErrors.agree = 'Вы должны согласиться с политикой обработки персональных данных.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onNext({ name, email, phone });
            // Сброс ошибок при успешной отправке
            setErrors({});
        }
    };

    return (
        <div className="bg-white p-8 mx-auto flex pt-[120px] pb-[60px] w-[85%]">
            <div className="w-1/2 pr-8">
                <div className="mb-14">
                    <span className="text-lg font-regular text-[#CC9F33] border border-[#CC9F33] p-3 px-5 rounded-[15px]">
                        КОМАНДА А
                    </span>
                </div>
                <h2 className="text-[45px] font-bold text-black mb-10 leading-[1.1]">Примите участие в нашей лотерее</h2>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-3 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#CC9F33] placeholder-black`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder="Ваша электронная почта"
                        className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-3 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#CC9F33] placeholder-black`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="mb-6">
                    <input
                        type="tel"
                        placeholder="Телефон"
                        className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-3 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#CC9F33] placeholder-black`}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-[#CC9F33] text-white py-3 px-6 rounded-[10px] font-regular hover:bg-[#b2882a] mb-8 w-full text-[14px]"
                >
                    УЧАСТВОВАТЬ В ЛОТЕРЕЕ
                </button>
                <div className="flex items-start mb-4">
                    <div className="flex items-center  mr-2 mt-2.5">
                        <input
                            type="checkbox"
                            className={`mr-2 w-[24px] h-[24px] border ${errors.agree ? 'border-red-500' : 'border-gray-300'} rounded bg-white appearance-none relative checked:bg-[#CC9F33]`}
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />
                        <style jsx>{`
                            input[type="checkbox"]:checked::after {
                                content: "";
                                display: block;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                width: 6px;
                                height: 12px;
                                border: solid white;
                                border-width: 0 2px 2px 0;
                                transform: translate(-50%, -50%) rotate(45deg);
                            }
                        `}</style>
                    </div>
                    <div className="flex-1">
                    <p className="text-[13px] text-gray-600 leading-[1.3] mt-1">
        Нажимая на кнопку, вы соглашаетесь <br /> с политикой обработки персональных данных
    </p>
                        {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree}</p>}
                    </div>
                </div>
            </div>
            <div className="w-1/2 text-sm text-gray-800 pl-14">
                <h3 className="font-bold mb-4 text-[#CC9F33] text-[20px]">Правила проведения лотереи*</h3>
                <ul className="list-disc list-outside space-y-2 font-regular text-[14px]">
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
                <p className="mt-[24px] mb-2 font-bold text-[#CC9F33]">Приятной игры и удачи в лотерее!</p>
                <p>Полные правила лотереи вы можете посмотреть тут: <a href="#" className="underline text-[#CC9F33]">ссылка</a></p>
            </div>
        </div>
    );

};

export default LotteryForm;
