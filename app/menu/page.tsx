"use client";
import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const categories = ['Салаты', 'Супы', 'Горячее', 'Десерты'];

interface Dish {
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
}

const commonImage = 'https://img.freepik.com/premium-photo/traditional-italian-pasta-carbonara-with-bacon-parmesan-egg-pepper-dark-background-top-view_166116-5396.jpg';

const dishes: Dish[] = [
    // Салаты (12 блюд)
    { name: 'Салат Оливье', category: 'Салаты', price: 700, image: commonImage, description: 'Классический русский салат с овощами и майонезом' },
    { name: 'Цезарь с курицей', category: 'Салаты', price: 750, image: commonImage, description: 'Салат с курицей, пармезаном и соусом цезарь' },
    { name: 'Греческий салат', category: 'Салаты', price: 720, image: commonImage, description: 'Салат с огурцами, помидорами, оливками и фетой' },
    { name: 'Салат с авокадо', category: 'Салаты', price: 800, image: commonImage, description: 'Свежий салат с авокадо, креветками и цитрусовой заправкой' },
    { name: 'Капрезе', category: 'Салаты', price: 680, image: commonImage, description: 'Салат из свежих помидоров, моцареллы и базилика' },
    { name: 'Салат Нисуаз', category: 'Салаты', price: 770, image: commonImage, description: 'Салат с тунцом, яйцом и оливками' },
    { name: 'Салат с рукколой', category: 'Салаты', price: 730, image: commonImage, description: 'Салат с рукколой, пармезаном и орехами пекан' },
    { name: 'Салат Кобб', category: 'Салаты', price: 820, image: commonImage, description: 'Салат с индейкой, беконом и голубым сыром' },
    { name: 'Салат с киноа', category: 'Салаты', price: 780, image: commonImage, description: 'Полезный салат с киноа, овощами и лимонной заправкой' },
    { name: 'Салат с крабами', category: 'Салаты', price: 800, image: commonImage, description: 'Салат с крабовым мясом, авокадо и манго' },
    { name: 'Салат из свежих овощей', category: 'Салаты', price: 650, image: commonImage, description: 'Лёгкий салат из сезонных овощей с оливковым маслом' },
    { name: 'Салат с грильованными овощами', category: 'Салаты', price: 850, image: commonImage, description: 'Салат с грильованными овощами и бальзамическим соусом' },
    
    // Супы (2 блюда)
    { name: 'Борщ', category: 'Супы', price: 600, image: commonImage, description: 'Традиционный русский суп с мясом и свеклой' },
    { name: 'Крем-суп из грибов', category: 'Супы', price: 650, image: commonImage, description: 'Нежный суп с шампиньонами и сливками' },
    
    // Горячее (2 блюда)
    { name: 'Паста Карбонара', category: 'Горячее', price: 700, image: commonImage, description: 'Нежная паста с беконом и пармезаном' },
    { name: 'Стейк Рибай', category: 'Горячее', price: 1500, image: commonImage, description: 'Сочный стейк из мраморной говядины' },
    
    // Десерты (2 блюда)
    { name: 'Тирамису', category: 'Десерты', price: 500, image: commonImage, description: 'Итальянский десерт с маскарпоне и кофе' },
    { name: 'Чизкейк', category: 'Десерты', price: 550, image: commonImage, description: 'Нежный десерт с сыром и ягодами' },
];

const MenuPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const router = useRouter();

    const filteredDishes = dishes.filter((dish) => dish.category === activeCategory);

    return (
        <div className="w-screen h-screen bg-[#001833] text-white flex flex-col">
            {/* Хедер */}
                <h1 className="text-4xl font-bold text-left">Меню ресторана</h1>

            {/* Панель категорий */}
            <nav className="w-full bg-white p-5">
                <div className="flex space-x-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`h-12 px-4 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                                activeCategory === category
                                    ? 'bg-[#D4AF37] text-[#001833]'
                                    : 'bg-white text-[#001833] hover:bg-[#f0e6d2]'
                            }`}
                            onClick={() => setActiveCategory(category)}
                            aria-pressed={activeCategory === category}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Сетка блюд */}
            <main className="flex-grow container mx-auto p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-[#D4AF37] scrollbar-track-transparent">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {filteredDishes.map((dish) => (
                        <div key={dish.name} className="dish-card bg-[#001833] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                            <div className="relative">
                                <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover rounded-t-xl" />
                                <div className="absolute bottom-2 left-2 bg-[#D4AF37] text-[#001833] px-3 py-1 rounded-md text-lg font-bold">
                                    {dish.price} ₽
                                </div>
                            </div>
                            <div className="p-4">
                                <h2 className="text-left text-lg font-medium mb-2">{dish.name}</h2>
                                <p className="text-left text-sm line-clamp-2">{dish.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Нижняя кнопка "Домой" */}
            <footer className="flex justify-center mb-5">
                <button
                    className="flex justify-center items-center w-12 h-12 bg-[#001833] rounded-full transition-transform duration-200 hover:scale-105 focus:outline-none"
                    onClick={() => router.push('/')}
                    aria-label="Домой"
                >
                    <FaHome className="text-[#D4AF37] text-xl" />
                </button>
            </footer>
        </div>
    );
};

export default MenuPage;
