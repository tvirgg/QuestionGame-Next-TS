"use client";
import React, { useState } from 'react';

interface Payment {
    id: number;
    tabletNumber: number;
    tableNumber: number;
    teamName: string;
    plannedParticipants: number;
    actualParticipants: number;
    paymentMethod: string;
    previouslyPaid: number;
    additionalPayment: number;
    isFullyPaid: boolean;
}

const PaymentsTab: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([
        { id: 1, tabletNumber: 1, tableNumber: 101, teamName: 'Команда А', plannedParticipants: 5, actualParticipants: 4, paymentMethod: 'QR-код', previouslyPaid: 300, additionalPayment: 50, isFullyPaid: false },
        { id: 2, tabletNumber: 2, tableNumber: 102, teamName: 'Команда Б', plannedParticipants: 6, actualParticipants: 6, paymentMethod: 'Карта', previouslyPaid: 600, additionalPayment: 0, isFullyPaid: true },
        // Добавьте больше тестовых данных
    ]);

    // Удаляем состояния, связанные с модальным окном
    // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [currentPayment, setCurrentPayment] = useState<Payment | null>(null);
    // const [additionalPayment, setAdditionalPayment] = useState<number>(0);

    // Функция для обработки доплаты
    const handleAddPayment = (paymentId: number) => {
        setPayments(prevPayments => prevPayments.map(payment => {
            if (payment.id === paymentId) {
                // Расчет необходимой доплаты
                const totalRequiredPayment = payment.plannedParticipants * 50;
                const totalPaid = payment.previouslyPaid + payment.additionalPayment;
                const neededAdditionalPayment = totalRequiredPayment - totalPaid;

                // Если уже полностью оплачено, ничего не делаем
                if (neededAdditionalPayment <= 0) {
                    return { ...payment, isFullyPaid: true };
                }

                // Обновляем доплату и статус оплаты
                const updatedAdditionalPayment = payment.additionalPayment + neededAdditionalPayment;
                const updatedIsFullyPaid = (payment.previouslyPaid + updatedAdditionalPayment) >= totalRequiredPayment;

                return {
                    ...payment,
                    additionalPayment: updatedAdditionalPayment,
                    isFullyPaid: updatedIsFullyPaid
                };
            }
            return payment;
        }));
    };

    return (
        <div className="bg-[#FAF3DD] text-black p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Оплаты</h2>
            {/* Обернем таблицу в контейнер с горизонтальной прокруткой */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Номер планшета</th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Номер стола</th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Название команды</th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Запланировано</th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Фактически</th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Способ оплаты</th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Оплачено ранее</th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Доплата</th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Статус</th>
                            <th className="px-4 py-3 bg-[#D4A373] text-white text-center text-lg font-semibold">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr
                                key={payment.id}
                                className={`${
                                    index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5E1]'
                                } hover:bg-gray-200 transition-colors duration-200`}
                            >
                                <td className="border px-4 py-3 text-center">{payment.tabletNumber}</td>
                                <td className="border px-4 py-3 text-center">{payment.tableNumber}</td>
                                <td className="border px-4 py-3 text-center">{payment.teamName}</td>
                                <td className="border px-4 py-3 text-center">{payment.plannedParticipants}</td>
                                <td className="border px-4 py-3 text-center">{payment.actualParticipants}</td>
                                <td className="border px-4 py-3 text-center">{payment.paymentMethod}</td>
                                <td className="border px-4 py-3 text-center">{payment.previouslyPaid} ₽</td>
                                <td className="border px-4 py-3 text-center">{payment.additionalPayment} ₽</td>
                                <td className="border px-4 py-3 text-center">
                                    {payment.isFullyPaid ? (
                                        <span className="text-green-600 font-bold">Полностью оплачено</span>
                                    ) : (
                                        <span className="text-red-600 font-bold">Требуется доплата</span>
                                    )}
                                </td>
                                <td className="border px-4 py-3 text-center">
                                    {!payment.isFullyPaid && (
                                        <button
                                            className="bg-[#D4A373] text-white px-3 py-1 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                                            onClick={() => handleAddPayment(payment.id)}
                                        >
                                            Добавить доплату
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Удаляем модальное окно, так как оно больше не нужно */}
            {/* {isModalOpen && currentPayment && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Добавление доплаты</h2>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="number"
                            placeholder="Сумма доплаты"
                            value={additionalPayment}
                            onChange={(e) => setAdditionalPayment(Number(e.target.value))}
                            className="p-2 rounded border"
                        />
                        <button
                            className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                            onClick={handleAddPayment}
                        >
                            Добавить
                        </button>
                    </div>
                </Modal>
            )} */}
        </div>
    );


}
export default PaymentsTab;