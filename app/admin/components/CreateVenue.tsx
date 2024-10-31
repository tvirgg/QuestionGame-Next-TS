"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import {
    XIcon,
    PlusIcon,
    UploadIcon,
    PencilAltIcon,
    TrashIcon,
    CheckIcon,
} from '@heroicons/react/outline';

// Определение структуры категории
interface Category {
    id: number;
    name: string;
}

// Определение структуры блюда
interface MenuItem {
    id: number;
    name: string;
    categoryId: number;
    price: number;
    photo?: File | null;
}

// Определение структуры места проведения
interface Venue {
    id: number;
    restaurantName: string;
    menuItems: MenuItem[];
    categories: Category[];
}

const CreateVenue: React.FC = () => {
    // Инициализация состояния с предзаполненными местами
    const [venues, setVenues] = useState<Venue[]>([
        {
            id: 1,
            restaurantName: 'La Bella Italia',
            menuItems: [
                { id: 1, name: 'Margherita Pizza', categoryId: 1, price: 12 },
                { id: 2, name: 'Spaghetti Carbonara', categoryId: 2, price: 15 },
            ],
            categories: [
                { id: 1, name: 'Пицца' },
                { id: 2, name: 'Паста' },
                { id: 3, name: 'Салаты' },
            ],
        },
        {
            id: 2,
            restaurantName: 'Sushi World',
            menuItems: [
                { id: 1, name: 'California Roll', categoryId: 4, price: 8 },
                { id: 2, name: 'Salmon Sashimi', categoryId: 5, price: 14 },
            ],
            categories: [
                { id: 4, name: 'Роллы' },
                { id: 5, name: 'Сашими' },
                { id: 6, name: 'Напитки' },
            ],
        },
    ]);

    // Состояние для управления модальным окном редактирования меню
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

    // Состояния для добавления нового блюда в модальном окне
    const [newMenuItem, setNewMenuItem] = useState<MenuItem>({
        id: 0,
        name: '',
        categoryId: 0,
        price: 0,
        photo: null,
    });

    // Состояния для управления модальным окном редактирования категорий
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    // Состояния для редактирования категории
    const [localCategories, setLocalCategories] = useState<Category[]>([]);
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [editingCategoryName, setEditingCategoryName] = useState<string>('');
    const [newCategoryName, setNewCategoryName] = useState('');

    // Состояния для редактирования блюда
    const [editingMenuItemId, setEditingMenuItemId] = useState<number | null>(null);
    const [editedMenuItem, setEditedMenuItem] = useState<MenuItem | null>(null);

    // Состояния для создания нового места
    const [newRestaurantName, setNewRestaurantName] = useState('');

    // Состояние для фильтрации блюд по категории
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | number>('Все');

    // Обработчики для создания нового места
    const handleCreateVenue = () => {
        if (!newRestaurantName.trim()) {
            alert('Пожалуйста, укажите название ресторана.');
            return;
        }

        const newVenue: Venue = {
            id: Date.now(),
            restaurantName: newRestaurantName,
            menuItems: [],
            categories: [],
        };

        setVenues([...venues, newVenue]);

        // Сброс формы
        setNewRestaurantName('');
    };

    // Обработчики для модального окна редактирования меню
    const openModal = (venue: Venue) => {
        setSelectedVenue(venue);
        setIsModalOpen(true);
        setSelectedCategoryFilter('Все');
    };

    const closeModal = () => {
        setSelectedVenue(null);
        setIsModalOpen(false);
        setNewMenuItem({ id: 0, name: '', categoryId: 0, price: 0, photo: null });
        setEditingMenuItemId(null);
        setEditedMenuItem(null);
    };

    // Обработчик для добавления нового блюда
    const handleAddMenuItem = () => {
        if (selectedVenue) {
            if (
                !newMenuItem.name.trim() ||
                !newMenuItem.categoryId ||
                newMenuItem.price <= 0
            ) {
                alert('Пожалуйста, заполните все поля для нового блюда.');
                return;
            }
            const updatedMenuItems = [
                ...selectedVenue.menuItems,
                { ...newMenuItem, id: Date.now() },
            ];
            const updatedVenue = { ...selectedVenue, menuItems: updatedMenuItems };
            const updatedVenues = venues.map((venue) =>
                venue.id === selectedVenue.id ? updatedVenue : venue
            );
            setVenues(updatedVenues);
            setSelectedVenue(updatedVenue);
            // Сброс формы
            setNewMenuItem({ id: 0, name: '', categoryId: 0, price: 0, photo: null });
        }
    };

    // Обработчик для удаления блюда
    const handleDeleteMenuItem = (menuItemId: number) => {
        if (selectedVenue) {
            const updatedMenuItems = selectedVenue.menuItems.filter(
                (item) => item.id !== menuItemId
            );
            const updatedVenue = { ...selectedVenue, menuItems: updatedMenuItems };
            const updatedVenues = venues.map((venue) =>
                venue.id === selectedVenue.id ? updatedVenue : venue
            );
            setVenues(updatedVenues);
            setSelectedVenue(updatedVenue);
        }
    };

    // Обработчики для редактирования блюда
    const handleEditMenuItem = (menuItem: MenuItem) => {
        setEditingMenuItemId(menuItem.id);
        setEditedMenuItem({ ...menuItem });
    };

    const handleSaveEditedMenuItem = () => {
        if (selectedVenue && editedMenuItem) {
            const updatedMenuItems = selectedVenue.menuItems.map((item) =>
                item.id === editedMenuItem.id ? editedMenuItem : item
            );
            const updatedVenue = { ...selectedVenue, menuItems: updatedMenuItems };
            const updatedVenues = venues.map((venue) =>
                venue.id === selectedVenue.id ? updatedVenue : venue
            );
            setVenues(updatedVenues);
            setSelectedVenue(updatedVenue);
            setEditingMenuItemId(null);
            setEditedMenuItem(null);
        }
    };

    // Обработчики для модального окна редактирования категорий
    const openCategoryModal = () => {
        if (selectedVenue) {
            setLocalCategories([...selectedVenue.categories]);
        }
        setIsCategoryModalOpen(true);
        setEditingCategoryId(null);
        setEditingCategoryName('');
        setNewCategoryName('');
    };

    const closeCategoryModal = () => {
        // Применяем изменения к selectedVenue
        if (selectedVenue) {
            // Обновляем список категорий
            const updatedVenue = {
                ...selectedVenue,
                categories: localCategories,
            };
            // Удаляем блюда, связанные с удаленными категориями
            const validCategoryIds = new Set(localCategories.map((cat) => cat.id));
            const updatedMenuItems = updatedVenue.menuItems.filter((item) =>
                validCategoryIds.has(item.categoryId)
            );
            updatedVenue.menuItems = updatedMenuItems;
            // Обновляем состояния
            setSelectedVenue(updatedVenue);
            const updatedVenues = venues.map((venue) =>
                venue.id === selectedVenue.id ? updatedVenue : venue
            );
            setVenues(updatedVenues);
        }
        setIsCategoryModalOpen(false);
    };

    const cancelCategoryModal = () => {
        setIsCategoryModalOpen(false);
        setEditingCategoryId(null);
        setEditingCategoryName('');
        setNewCategoryName('');
    };

    const handleAddCategory = () => {
        const trimmedCategory = newCategoryName.trim();
        if (!trimmedCategory) {
            alert('Пожалуйста, укажите название категории.');
            return;
        }
        if (localCategories.some((category) => category.name === trimmedCategory)) {
            alert('Такая категория уже существует.');
            return;
        }
        const newCategory: Category = {
            id: Date.now(),
            name: trimmedCategory,
        };
        setLocalCategories([...localCategories, newCategory]);
        setNewCategoryName('');
    };

    const handleDeleteCategory = (categoryId: number) => {
        const updatedCategories = localCategories.filter(
            (category) => category.id !== categoryId
        );
        setLocalCategories(updatedCategories);
    };

    const handleSaveEditedCategory = (categoryId: number) => {
        const trimmedName = editingCategoryName.trim();
        if (!trimmedName) {
            alert('Название категории не может быть пустым.');
            return;
        }
        if (
            localCategories.some(
                (category) => category.name === trimmedName && category.id !== categoryId
            )
        ) {
            alert('Категория с таким названием уже существует.');
            return;
        }
        const updatedCategories = localCategories.map((category) =>
            category.id === categoryId ? { ...category, name: trimmedName } : category
        );
        setLocalCategories(updatedCategories);
        setEditingCategoryId(null);
        setEditingCategoryName('');
    };

    // Обработчик для загрузки меню файлом
    const handleFileMenuUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && selectedVenue) {
            const file = e.target.files[0];
            // Здесь можно добавить логику парсинга файла
            // Для примера добавим два блюда
            const parsedMenuItems: MenuItem[] = [
                {
                    id: Date.now(),
                    name: 'Новое блюдо 1',
                    categoryId: selectedVenue.categories[0]?.id || 0,
                    price: 10,
                },
                {
                    id: Date.now() + 1,
                    name: 'Новое блюдо 2',
                    categoryId: selectedVenue.categories[1]?.id || 0,
                    price: 20,
                },
            ];
            const updatedMenuItems = [...selectedVenue.menuItems, ...parsedMenuItems];
            const updatedVenue = { ...selectedVenue, menuItems: updatedMenuItems };
            const updatedVenues = venues.map((venue) =>
                venue.id === selectedVenue.id ? updatedVenue : venue
            );
            setVenues(updatedVenues);
            setSelectedVenue(updatedVenue);
        }
    };

    // Фильтрация блюд по категории
    const filteredMenuItems = selectedVenue
        ? selectedCategoryFilter === 'Все'
            ? selectedVenue.menuItems
            : selectedVenue.menuItems.filter(
                  (item) => item.categoryId === Number(selectedCategoryFilter)
              )
        : [];

    return (
        <div className="bg-[#FAF3DD] text-black p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Панель администратора: Создание места проведения
            </h2>

            {/* Форма для создания нового места */}
            <div className="flex flex-col space-y-4 mb-8">
                <h3 className="text-xl font-semibold">Добавить новое место проведения</h3>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Название ресторана"
                        value={newRestaurantName}
                        onChange={(e) => setNewRestaurantName(e.target.value)}
                        className="p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                    />
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200 ml-4 flex items-center"
                        onClick={handleCreateVenue}
                    >
                        <PlusIcon className="h-5 w-5 mr-1" />
                        Создать место
                    </button>
                </div>
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
                                <span className="text-sm text-gray-500">
                                    {venue.menuItems.length} блюд
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Модальное окно для редактирования меню места */}
            {isModalOpen && selectedVenue && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-[#FFF8E1] rounded-lg w-11/12 md:w-3/4 lg:w-2/3 p-6 relative shadow-lg overflow-y-auto max-h-screen">
                        {/* Кнопка закрытия модального окна */}
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                            onClick={closeModal}
                            aria-label="Закрыть"
                        >
                            {/* Иконка крестика */}
                            <XIcon className="h-6 w-6" />
                        </button>
                        <h3 className="text-2xl font-semibold mb-6 text-center">
                            Редактирование меню: {selectedVenue.restaurantName}
                        </h3>

                        {/* Селект выбора категории и кнопка редактирования категорий */}
                        <div className="mb-6 flex items-center">
                            <select
                                value={selectedCategoryFilter}
                                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                                className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                            >
                                <option value="Все">Все категории</option>
                                {selectedVenue.categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center"
                                onClick={openCategoryModal}
                            >
                                <PencilAltIcon className="h-5 w-5 mr-1" />
                                Редактировать категории
                            </button>
                        </div>

                        {/* Кнопка для загрузки меню файлом */}
                        <div className="mb-6 flex justify-end">
                            <label className="flex items-center space-x-2 bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 cursor-pointer">
                                {/* Иконка загрузки файла */}
                                <UploadIcon className="h-5 w-5" />
                                <span>Добавить меню файлом</span>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                                    onChange={handleFileMenuUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                            {/* Список блюд */}
                            <div className="flex-1">
                                <h4 className="text-xl font-semibold mb-4">Список блюд</h4>
                                {filteredMenuItems.length === 0 ? (
                                    <p>Блюда не добавлены.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {filteredMenuItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between p-4 bg-white rounded shadow"
                                            >
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {selectedVenue.categories.find(
                                                            (cat) => cat.id === item.categoryId
                                                        )?.name}{' '}
                                                        — ${item.price}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        className="text-blue-500 hover:text-blue-700"
                                                        onClick={() => handleEditMenuItem(item)}
                                                    >
                                                        {/* Иконка редактирования */}
                                                        <PencilAltIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => handleDeleteMenuItem(item.id)}
                                                    >
                                                        {/* Иконка удаления */}
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Форма для добавления нового блюда */}
                            <div className="flex-1">
                                <h4 className="text-xl font-semibold mb-4">
                                    {editingMenuItemId ? 'Редактировать блюдо' : 'Добавить новое блюдо'}
                                </h4>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Название блюда"
                                        value={
                                            editingMenuItemId && editedMenuItem
                                                ? editedMenuItem.name
                                                : newMenuItem.name
                                        }
                                        onChange={(e) => {
                                            if (editingMenuItemId && editedMenuItem) {
                                                setEditedMenuItem({
                                                    ...editedMenuItem,
                                                    name: e.target.value,
                                                });
                                            } else {
                                                setNewMenuItem({ ...newMenuItem, name: e.target.value });
                                            }
                                        }}
                                        className="p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <select
                                            value={
                                                editingMenuItemId && editedMenuItem
                                                    ? editedMenuItem.categoryId
                                                    : newMenuItem.categoryId || ''
                                            }
                                            onChange={(e) => {
                                                const categoryId = Number(e.target.value);
                                                if (editingMenuItemId && editedMenuItem) {
                                                    setEditedMenuItem({
                                                        ...editedMenuItem,
                                                        categoryId,
                                                    });
                                                } else {
                                                    setNewMenuItem({
                                                        ...newMenuItem,
                                                        categoryId,
                                                    });
                                                }
                                            }}
                                            className="p-2 rounded border flex-1 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                                        >
                                            <option value="">Выберите категорию</option>
                                            {selectedVenue.categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Цена"
                                        value={
                                            editingMenuItemId && editedMenuItem
                                                ? editedMenuItem.price
                                                : newMenuItem.price
                                        }
                                        onChange={(e) => {
                                            if (editingMenuItemId && editedMenuItem) {
                                                setEditedMenuItem({
                                                    ...editedMenuItem,
                                                    price: Number(e.target.value),
                                                });
                                            } else {
                                                setNewMenuItem({
                                                    ...newMenuItem,
                                                    price: Number(e.target.value),
                                                });
                                            }
                                        }}
                                        className="p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                                    />
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        {/* Иконка загрузки фото */}
                                        <UploadIcon className="h-6 w-6 text-gray-600" />
                                        <span className="text-gray-600">
                                            {editingMenuItemId &&
                                            editedMenuItem &&
                                            editedMenuItem.photo
                                                ? editedMenuItem.photo.name
                                                : newMenuItem.photo
                                                ? newMenuItem.photo.name
                                                : 'Добавить фото'}
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    if (editingMenuItemId && editedMenuItem) {
                                                        setEditedMenuItem({
                                                            ...editedMenuItem,
                                                            photo: e.target.files[0],
                                                        });
                                                    } else {
                                                        setNewMenuItem({
                                                            ...newMenuItem,
                                                            photo: e.target.files[0],
                                                        });
                                                    }
                                                }
                                            }}
                                            className="hidden"
                                        />
                                    </label>

                                    {editingMenuItemId ? (
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200 flex items-center"
                                                onClick={handleSaveEditedMenuItem}
                                            >
                                                <PencilAltIcon className="h-5 w-5 mr-1" />
                                                Сохранить изменения
                                            </button>
                                            <button
                                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-200 flex items-center"
                                                onClick={() => {
                                                    setEditingMenuItemId(null);
                                                    setEditedMenuItem(null);
                                                }}
                                            >
                                                <XIcon className="h-5 w-5 mr-1" />
                                                Отмена
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="bg-[#D4A373] text-white py-2 px-4 rounded hover:bg-[#c99b6d] transition-colors duration-200 flex items-center"
                                            onClick={handleAddMenuItem}
                                        >
                                            <PlusIcon className="h-5 w-5 mr-1" />
                                            Добавить блюдо
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно для редактирования категорий */}
            {isCategoryModalOpen && selectedVenue && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-[#FFF8E1] rounded-lg w-11/12 md:w-1/2 p-6 relative shadow-lg">
                        {/* Кнопка закрытия модального окна */}
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                            onClick={cancelCategoryModal}
                            aria-label="Закрыть"
                        >
                            {/* Иконка крестика */}
                            <XIcon className="h-6 w-6" />
                        </button>
                        <h3 className="text-2xl font-semibold mb-4 text-center">
                            Категории
                        </h3>

                        {/* Форма для добавления новой категории */}
                        <h4 className="text-xl font-semibold mb-4">Добавить новую категорию</h4>
                        <div className="flex space-x-2 mb-4">
                            <input
                                type="text"
                                placeholder="Название категории"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                className="p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                            />
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center"
                                onClick={handleAddCategory}
                            >
                                <PlusIcon className="h-5 w-5 mr-1" />
                                Добавить
                            </button>
                        </div>

                        {/* Список категорий */}
                        <h4 className="text-xl font-semibold mb-4">Список категорий</h4>
                        {localCategories.length === 0 ? (
                            <p>Категории не добавлены.</p>
                        ) : (
                            <ul className="space-y-2">
                                {localCategories.map((category) => (
                                    <li
                                        key={category.id}
                                        className="flex items-center justify-between"
                                    >
                                        {editingCategoryId === category.id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editingCategoryName}
                                                    onChange={(e) =>
                                                        setEditingCategoryName(e.target.value)
                                                    }
                                                    className="p-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                                                />
                                                <button
                                                    className="text-green-500 hover:text-green-700 ml-2"
                                                    onClick={() =>
                                                        handleSaveEditedCategory(category.id)
                                                    }
                                                >
                                                    <CheckIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    className="text-gray-500 hover:text-gray-700 ml-2"
                                                    onClick={() => {
                                                        setEditingCategoryId(null);
                                                        setEditingCategoryName('');
                                                    }}
                                                >
                                                    <XIcon className="h-5 w-5" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{category.name}</span>
                                                <div className="flex items-center">
                                                    <button
                                                        className="text-blue-500 hover:text-blue-700 ml-2"
                                                        onClick={() => {
                                                            setEditingCategoryId(category.id);
                                                            setEditingCategoryName(category.name);
                                                        }}
                                                    >
                                                        <PencilAltIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        className="text-red-500 hover:text-red-700 ml-2"
                                                        onClick={() =>
                                                            handleDeleteCategory(category.id)
                                                        }
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Кнопки сохранения и отмены */}
                        <div className="mt-6 text-center">
                            <button
                                className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition-colors duration-200 mr-4"
                                onClick={closeCategoryModal}
                            >
                                Сохранить
                            </button>
                            <button
                                className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600 transition-colors duration-200"
                                onClick={cancelCategoryModal}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateVenue;
