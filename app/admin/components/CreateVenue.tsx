"use client";
import React, { useState, ChangeEvent } from 'react';

// Определение структуры блюда
interface MenuItem {
    name: string;
    price: number;
}

// Определение структуры места проведения
interface Venue {
    id: number;
    restaurantName: string;
    menuFile: File | null;
    menuItems: MenuItem[];
}

const CreateVenue: React.FC = () => {
    // Инициализация состояния с предзаполненными местами
    const [venues, setVenues] = useState<Venue[]>([
        {
            id: 1,
            restaurantName: 'La Bella Italia',
            menuFile: null,
            menuItems: [
                { name: 'Margherita Pizza', price: 12 },
                { name: 'Spaghetti Carbonara', price: 15 },
            ],
        },
        {
            id: 2,
            restaurantName: 'Sushi World',
            menuFile: null,
            menuItems: [
                { name: 'California Roll', price: 8 },
                { name: 'Salmon Sashimi', price: 14 },
            ],
        },
    ]);

    // Состояние для управления модальным окном
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

    // Состояния для создания нового места
    const [newRestaurantName, setNewRestaurantName] = useState('');
    const [newMenuFile, setNewMenuFile] = useState<File | null>(null);
    const [newMenuItems, setNewMenuItems] = useState<MenuItem[]>([]);

    // Обработчики для создания нового места
    const handleNewFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewMenuFile(e.target.files[0]);
        }
    };

    const handleAddNewMenuItem = () => {
        const newItem: MenuItem = { name: 'Новое блюдо', price: 0 };
        setNewMenuItems([...newMenuItems, newItem]);
    };

    const handleCreateVenue = () => {
        if (!newRestaurantName.trim()) {
            alert('Пожалуйста, укажите название ресторана.');
            return;
        }

        const newVenue: Venue = {
            id: Date.now(),
            restaurantName: newRestaurantName,
            menuFile: newMenuFile,
            menuItems: newMenuItems,
        };

        setVenues([...venues, newVenue]);

        // Сброс формы
        setNewRestaurantName('');
        setNewMenuFile(null);
        setNewMenuItems([]);
    };

    // Обработчики для модального окна
    const openModal = (venue: Venue) => {
        setSelectedVenue(venue);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedVenue(null);
        setIsModalOpen(false);
    };

    const handleVenueFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (selectedVenue && e.target.files && e.target.files[0]) {
            const updatedVenues = venues.map((venue) =>
                venue.id === selectedVenue.id ? { ...venue, menuFile: e.target.files![0] } : venue
            );
            setVenues(updatedVenues);
            setSelectedVenue({ ...selectedVenue, menuFile: e.target.files![0], menuItems: [] });
        }
    };

    const handleVenueAddMenuItem = () => {
        if (selectedVenue) {
            const updatedVenues = venues.map((venue) =>
                venue.id === selectedVenue.id
                    ? { ...venue, menuItems: [...venue.menuItems, { name: '', price: 0 }] }
                    : venue
            );
            setVenues(updatedVenues);
            setSelectedVenue({
                ...selectedVenue,
                menuItems: [...selectedVenue.menuItems, { name: '', price: 0 }],
            });
        }
    };

    const handleVenueMenuItemChange = (index: number, field: keyof MenuItem, value: string | number) => {
        if (selectedVenue) {
            const updatedMenuItems = [...selectedVenue.menuItems];
            updatedMenuItems[index] = { ...updatedMenuItems[index], [field]: value };
            const updatedVenues = venues.map((venue) =>
                venue.id === selectedVenue.id ? { ...venue, menuItems: updatedMenuItems } : venue
            );
            setVenues(updatedVenues);
            setSelectedVenue({ ...selectedVenue, menuItems: updatedMenuItems });
        }
    };

    const handleFileMenuUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Логика обработки загруженного файла
            const file = e.target.files[0];
            // Например, парсинг Excel файла и обновление меню
            // Здесь добавим простой пример без реального парсинга
            const newMenuItems: MenuItem[] = [
                { name: 'Пример блюда 1', price: 10 },
                { name: 'Пример блюда 2', price: 20 },
            ];
            if (selectedVenue) {
                const updatedVenues = venues.map((venue) =>
                    venue.id === selectedVenue.id ? { ...venue, menuItems: newMenuItems, menuFile: file } : venue
                );
                setVenues(updatedVenues);
                setSelectedVenue({ ...selectedVenue, menuItems: newMenuItems, menuFile: file });
            }
        }
    };

    return (
        <div className="bg-[#FAF3DD] text-black p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Панель администратора: Создание места проведения</h2>
            
            {/* Форма для создания нового места */}
            <div className="flex flex-col space-y-4 mb-8">
                <h3 className="text-xl font-semibold">Добавить новое место проведения</h3>
                <input
                    type="text"
                    placeholder="Название ресторана"
                    value={newRestaurantName}
                    onChange={(e) => setNewRestaurantName(e.target.value)}
                    className="p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
                {/* <input
                    type="file"
                    accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    onChange={handleNewFileUpload}
                    className="p-2 rounded border w-full"
                />
                <button
                    className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                    onClick={handleAddNewMenuItem}
                >
                    Добавить блюдо вручную
                </button> */}
                {/* Список новых блюд */}
                <div className="space-y-2">
                    {newMenuItems.map((item, index) => (
                        <div key={index} className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Название блюда"
                                value={item.name}
                                onChange={(e) => {
                                    const updatedItems = [...newMenuItems];
                                    updatedItems[index].name = e.target.value;
                                    setNewMenuItems(updatedItems);
                                }}
                                className="p-2 rounded border flex-1 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                            />
                            <input
                                type="number"
                                placeholder="Цена"
                                value={item.price}
                                onChange={(e) => {
                                    const updatedItems = [...newMenuItems];
                                    updatedItems[index].price = Number(e.target.value);
                                    setNewMenuItems(updatedItems);
                                }}
                                className="p-2 rounded border w-24 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                            />
                        </div>
                    ))}
                </div>
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
                    onClick={handleCreateVenue}
                >
                    Создать место проведения
                </button>
            </div>

            {/* Список существующих мест */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Список мест проведения</h3>
                {venues.length === 0 ? (
                    <p>Нет доступных мест проведения.</p>
                ) : (
                    <ul className="space-y-2">
                        {venues.map((venue) => (
                            <li
                                key={venue.id}
                                className="flex justify-between items-center p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-100"
                                onClick={() => openModal(venue)}
                            >
                                <span className="font-medium">{venue.restaurantName}</span>
                                <span className="text-sm text-gray-500">{venue.menuItems.length} блюд</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Модальное окно для редактирования меню места */}
            {isModalOpen && selectedVenue && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-[#FFF8E1] rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative shadow-lg">
                        {/* Кнопка закрытия модального окна */}
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                            onClick={closeModal}
                            aria-label="Закрыть"
                        >
                            {/* SVG иконка крестика */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-2xl font-semibold mb-6 text-center">Редактирование меню: {selectedVenue.restaurantName}</h3>
                        
                        {/* Опции добавления меню */}
                        <div className="mb-6">
                            <p className="mb-2 font-medium">Добавить меню:</p>
                            <div className="flex space-x-4">
                                {/* Внести вручную */}
                                <button
                                    className={`flex items-center space-x-2 bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 ${
                                        selectedVenue.menuFile ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    onClick={handleVenueAddMenuItem}
                                    disabled={!!selectedVenue.menuFile}
                                >
                                    {/* SVG иконка ручного ввода */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                                    </svg>
                                    <span>Внести вручную</span>
                                </button>
                                
                                {/* Добавить файлом */}
                                <label className="flex items-center space-x-2 bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 cursor-pointer">
                                    {/* SVG иконка загрузки файла */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Добавить файлом</span>
                                    <input
                                        type="file"
                                        accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                                        onChange={handleFileMenuUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                        
                        {/* Загрузка файла меню */}
                        {selectedVenue.menuFile && (
                            <div className="mb-6">
                                <p className="font-medium">Текущий файл меню: {selectedVenue.menuFile.name}</p>
                                <button
                                    className="mt-2 text-red-600 hover:text-red-800 flex items-center space-x-1"
                                    onClick={() => {
                                        const updatedVenues = venues.map((venue) =>
                                            venue.id === selectedVenue.id ? { ...venue, menuFile: null, menuItems: [] } : venue
                                        );
                                        setVenues(updatedVenues);
                                        setSelectedVenue({ ...selectedVenue, menuFile: null, menuItems: [] });
                                    }}
                                >
                                    {/* SVG иконка удаления */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>Удалить файл</span>
                                </button>
                            </div>
                        )}
                        
                        {/* Список блюд */}
                        <div className="space-y-4 max-h-64 overflow-y-auto">
                            {selectedVenue.menuItems.map((item, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <input
                                        type="text"
                                        placeholder="Название блюда"
                                        value={item.name}
                                        onChange={(e) => handleVenueMenuItemChange(index, 'name', e.target.value)}
                                        className="p-2 rounded border flex-1 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Цена"
                                        value={item.price}
                                        onChange={(e) => handleVenueMenuItemChange(index, 'price', Number(e.target.value))}
                                        className="p-2 rounded border w-24 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                                    />
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => {
                                            const updatedMenuItems = selectedVenue.menuItems.filter((_, i) => i !== index);
                                            const updatedVenues = venues.map((venue) =>
                                                venue.id === selectedVenue.id ? { ...venue, menuItems: updatedMenuItems } : venue
                                            );
                                            setVenues(updatedVenues);
                                            setSelectedVenue({ ...selectedVenue, menuItems: updatedMenuItems });
                                        }}
                                        aria-label="Удалить блюдо"
                                    >
                                        {/* SVG иконка удаления */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        {/* Кнопка сохранения изменений */}
                        <div className="mt-6 text-center">
                            <button
                                className="bg-[#D4A373] text-white py-2 px-6 rounded hover:bg-[#c99b6d] transition-colors duration-200"
                                onClick={closeModal}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default CreateVenue;
