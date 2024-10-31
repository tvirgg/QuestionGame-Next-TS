"use client";
import React, { useState, useRef } from 'react';
import { FaHome, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const categories = [
    'Салаты', 
    'Супы', 
    'Горячее', 
    'Десерты', 
    'Закуски', 
    'Напитки', 
    'Гарниры', 
    'Соусы', 
    'Пицца', 
    'Паста', 
    'Бургеры', 
    'Сэндвичи', 
    'Морепродукты', 
    'Вегетарианские блюда', 
    'Суши и роллы', 
    'Блины', 
    'Завтраки', 
    'Гриль', 
    'Специальные предложения', 
    'Детское меню'
];

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
    // Салаты (примерно 24 блюда)
    { name: 'Салат Оливье', category: 'Салаты', price: 700, image: commonImage, description: 'Классический русский салат с овощами и майонезом' },
    { name: 'Цезарь с курицей', category: 'Салаты', price: 750, image: commonImage, description: 'Салат с курицей, пармезаном и соусом цезарь' },
    { name: 'Греческий салат', category: 'Салаты', price: 720, image: commonImage, description: 'Салат с огурцами, помидорами, оливками и фетой' },
    // Добавляем новые блюда
    { name: 'Салат с креветками', category: 'Салаты', price: 800, image: commonImage, description: 'Салат с креветками и авокадо' },
    { name: 'Салат с ростбифом', category: 'Салаты', price: 850, image: commonImage, description: 'Салат с тонко нарезанной говядиной' },
    { name: 'Салат из свежих овощей', category: 'Салаты', price: 650, image: commonImage, description: 'Лёгкий салат из сезонных овощей' },
    { name: 'Салат Капрезе', category: 'Салаты', price: 700, image: commonImage, description: 'Помидоры с моцареллой и базиликом' },
    { name: 'Салат с тунцом', category: 'Салаты', price: 770, image: commonImage, description: 'Салат с тунцом и яйцом' },
    { name: 'Салат Нисуаз', category: 'Салаты', price: 780, image: commonImage, description: 'Салат с анчоусами и оливками' },
    { name: 'Салат Чука', category: 'Салаты', price: 720, image: commonImage, description: 'Салат из морских водорослей с ореховым соусом' },
    { name: 'Салат с кальмарами', category: 'Салаты', price: 800, image: commonImage, description: 'Салат с кальмарами и овощами' },
    { name: 'Салат Вальдорф', category: 'Салаты', price: 750, image: commonImage, description: 'Салат с яблоками, орехами и сельдереем' },

    // Супы (примерно 24 блюда)
    { name: 'Борщ', category: 'Супы', price: 600, image: commonImage, description: 'Традиционный русский суп с мясом и свеклой' },
    { name: 'Крем-суп из грибов', category: 'Супы', price: 650, image: commonImage, description: 'Нежный суп с шампиньонами и сливками' },
    { name: 'Солянка', category: 'Супы', price: 700, image: commonImage, description: 'Суп с разными видами мяса и оливками' },
    { name: 'Уха', category: 'Супы', price: 750, image: commonImage, description: 'Рыбный суп с овощами' },
    { name: 'Том Ям', category: 'Супы', price: 800, image: commonImage, description: 'Острый тайский суп с морепродуктами' },
    { name: 'Куриный бульон', category: 'Супы', price: 550, image: commonImage, description: 'Лёгкий бульон с курицей и овощами' },
    { name: 'Сырный крем-суп', category: 'Супы', price: 680, image: commonImage, description: 'Суп с плавленым сыром и гренками' },
    { name: 'Минестроне', category: 'Супы', price: 650, image: commonImage, description: 'Итальянский овощной суп' },
    { name: 'Харчо', category: 'Супы', price: 700, image: commonImage, description: 'Грузинский острый суп с говядиной и рисом' },
    { name: 'Окрошка', category: 'Супы', price: 600, image: commonImage, description: 'Холодный суп на квасе с овощами' },
    { name: 'Гаспачо', category: 'Супы', price: 650, image: commonImage, description: 'Испанский холодный томатный суп' },
    { name: 'Крем-суп из тыквы', category: 'Супы', price: 680, image: commonImage, description: 'Нежный суп из тыквы со сливками' },
    { name: 'Суп Лапша', category: 'Супы', price: 600, image: commonImage, description: 'Куриный суп с домашней лапшой' },
    { name: 'Рассольник', category: 'Супы', price: 650, image: commonImage, description: 'Суп с солеными огурцами и перловкой' },
    { name: 'Щи', category: 'Супы', price: 600, image: commonImage, description: 'Капустный суп с мясом' },
    { name: 'Суп из морепродуктов', category: 'Супы', price: 850, image: commonImage, description: 'Суп с креветками, мидиями и кальмарами' },
    { name: 'Чечевичный суп', category: 'Супы', price: 650, image: commonImage, description: 'Суп из красной чечевицы с овощами' },
    { name: 'Суп Пюре из брокколи', category: 'Супы', price: 680, image: commonImage, description: 'Кремовый суп из брокколи' },
    { name: 'Суп с фрикадельками', category: 'Супы', price: 650, image: commonImage, description: 'Суп с мясными фрикадельками и овощами' },
    { name: 'Крем-суп из шпината', category: 'Супы', price: 670, image: commonImage, description: 'Нежный суп из шпината со сливками' },
    { name: 'Суп Рамен', category: 'Супы', price: 800, image: commonImage, description: 'Японский суп с лапшой и мясом' },
    { name: 'Суп Фо Бо', category: 'Супы', price: 850, image: commonImage, description: 'Вьетнамский суп с говядиной и лапшой' },
    { name: 'Суп Мисо', category: 'Супы', price: 600, image: commonImage, description: 'Японский суп с тофу и водорослями' },
    { name: 'Суп Гуляш', category: 'Супы', price: 700, image: commonImage, description: 'Венгерский густой суп с говядиной' },

    // Горячее (примерно 24 блюда)
    { name: 'Паста Карбонара', category: 'Горячее', price: 700, image: commonImage, description: 'Нежная паста с беконом и пармезаном' },
    { name: 'Стейк Рибай', category: 'Горячее', price: 1500, image: commonImage, description: 'Сочный стейк из мраморной говядины' },
    { name: 'Лазанья', category: 'Горячее', price: 800, image: commonImage, description: 'Паста с мясным соусом и сыром' },
    { name: 'Куриное филе на гриле', category: 'Горячее', price: 750, image: commonImage, description: 'Курица на гриле с овощами' },
    { name: 'Жаркое по-домашнему', category: 'Горячее', price: 850, image: commonImage, description: 'Говядина с картофелем и овощами' },
    { name: 'Семга на гриле', category: 'Горячее', price: 1300, image: commonImage, description: 'Филе семги на гриле с лимоном' },
    { name: 'Утка по-пекински', category: 'Горячее', price: 1400, image: commonImage, description: 'Хрустящая утка с соусом Хойсин' },
    { name: 'Плов с бараниной', category: 'Горячее', price: 900, image: commonImage, description: 'Ароматный плов с бараниной и специями' },
    { name: 'Свинные ребра BBQ', category: 'Горячее', price: 1200, image: commonImage, description: 'Ребра в соусе барбекю' },
    { name: 'Шашлык из курицы', category: 'Горячее', price: 800, image: commonImage, description: 'Куриный шашлык с луком' },
    { name: 'Котлета по-киевски', category: 'Горячее', price: 750, image: commonImage, description: 'Куриная котлета с маслом внутри' },
    { name: 'Филе Миньон', category: 'Горячее', price: 1600, image: commonImage, description: 'Нежное говяжье филе' },
    { name: 'Гуляш из говядины', category: 'Горячее', price: 850, image: commonImage, description: 'Тушеная говядина в соусе' },
    { name: 'Кебаб из баранины', category: 'Горячее', price: 900, image: commonImage, description: 'Баранина на шампуре с специями' },
    { name: 'Мусака', category: 'Горячее', price: 800, image: commonImage, description: 'Греческая запеканка с баклажанами и мясом' },
    { name: 'Рататуй', category: 'Горячее', price: 700, image: commonImage, description: 'Овощное рагу из баклажанов, кабачков и томатов' },
    { name: 'Оссо Буко', category: 'Горячее', price: 1400, image: commonImage, description: 'Тушеная телячья голяшка' },
    { name: 'Паэлья с морепродуктами', category: 'Горячее', price: 1300, image: commonImage, description: 'Рис с морепродуктами и шафраном' },
    { name: 'Томленая говядина с пюре', category: 'Горячее', price: 900, image: commonImage, description: 'Говядина, тушеная в соусе, с картофельным пюре' },
    { name: 'Телячьи медальоны', category: 'Горячее', price: 1200, image: commonImage, description: 'Медальоны из телятины с соусом' },
    { name: 'Рыба по-королевски', category: 'Горячее', price: 1100, image: commonImage, description: 'Запеченная рыба с овощами и сыром' },
    { name: 'Курица Терияки', category: 'Горячее', price: 800, image: commonImage, description: 'Курица в соусе терияки с рисом' },
    { name: 'Сибас на гриле', category: 'Горячее', price: 1200, image: commonImage, description: 'Филе сибаса на гриле с травами' },
    { name: 'Жареные креветки с чесноком', category: 'Горячее', price: 950, image: commonImage, description: 'Креветки в чесночном соусе' },

    // Десерты (примерно 24 блюда)
    { name: 'Тирамису', category: 'Десерты', price: 500, image: commonImage, description: 'Итальянский десерт с маскарпоне и кофе' },
    { name: 'Чизкейк', category: 'Десерты', price: 550, image: commonImage, description: 'Нежный десерт с сыром и ягодами' },
    { name: 'Шоколадный фондан', category: 'Десерты', price: 600, image: commonImage, description: 'Кекс с жидким шоколадом внутри' },
    { name: 'Мороженое ассорти', category: 'Десерты', price: 400, image: commonImage, description: 'Три шарика мороженого на выбор' },
    { name: 'Яблочный штрудель', category: 'Десерты', price: 450, image: commonImage, description: 'Тёплый штрудель с яблоками и корицей' },
    { name: 'Панна Котта', category: 'Десерты', price: 500, image: commonImage, description: 'Итальянский десерт со сливками и ванилью' },
    { name: 'Крем-брюле', category: 'Десерты', price: 520, image: commonImage, description: 'Десерт с карамельной корочкой' },
    { name: 'Эклеры', category: 'Десерты', price: 380, image: commonImage, description: 'Заварные пирожные с кремом' },
    { name: 'Тарталетка с фруктами', category: 'Десерты', price: 450, image: commonImage, description: 'Хрустящая тарталетка с кремом и фруктами' },
    { name: 'Макарони', category: 'Десерты', price: 300, image: commonImage, description: 'Французские миндальные пирожные' },
    { name: 'Медовик', category: 'Десерты', price: 480, image: commonImage, description: 'Слоёный торт с мёдом' },
    { name: 'Наполеон', category: 'Десерты', price: 500, image: commonImage, description: 'Слоёный торт с кремом' },
    { name: 'Фруктовый салат', category: 'Десерты', price: 420, image: commonImage, description: 'Ассорти из свежих фруктов' },
    { name: 'Сырники со сметаной', category: 'Десерты', price: 450, image: commonImage, description: 'Творожные сырники с сметаной' },
    { name: 'Мусс из белого шоколада', category: 'Десерты', price: 550, image: commonImage, description: 'Нежный мусс с ягодным соусом' },
    { name: 'Брауни с мороженым', category: 'Десерты', price: 600, image: commonImage, description: 'Шоколадный пирог с шариком мороженого' },
    { name: 'Тарт Татен', category: 'Десерты', price: 500, image: commonImage, description: 'Перевернутый пирог с яблоками' },
    { name: 'Профитроли', category: 'Десерты', price: 480, image: commonImage, description: 'Заварные пирожные с кремом и шоколадом' },
    { name: 'Фисташковый торт', category: 'Десерты', price: 550, image: commonImage, description: 'Торт с фисташковым кремом' },
    { name: 'Клубничный сорбет', category: 'Десерты', price: 400, image: commonImage, description: 'Освежающий сорбет из клубники' },
    { name: 'Тирамису с ягодами', category: 'Десерты', price: 550, image: commonImage, description: 'Тирамису с добавлением свежих ягод' },
    { name: 'Чизкейк Нью-Йорк', category: 'Десерты', price: 580, image: commonImage, description: 'Классический чизкейк' },
    { name: 'Блинчики с шоколадом', category: 'Десерты', price: 420, image: commonImage, description: 'Тонкие блинчики с шоколадным соусом' },
    { name: 'Мороженое фламбе', category: 'Десерты', price: 650, image: commonImage, description: 'Мороженое с фруктами, подожженное ромом' },

    // Закуски (примерно 24 блюда)
    { name: 'Брускетта с томатами', category: 'Закуски', price: 400, image: commonImage, description: 'Хлеб с томатами и базиликом' },
    { name: 'Карпаччо из говядины', category: 'Закуски', price: 850, image: commonImage, description: 'Тонко нарезанная говядина с соусом' },
    { name: 'Сырная тарелка', category: 'Закуски', price: 900, image: commonImage, description: 'Ассорти из европейских сыров' },
    { name: 'Оливки и маслины', category: 'Закуски', price: 350, image: commonImage, description: 'Ассорти из оливок и маслин' },
    { name: 'Куриные крылышки BBQ', category: 'Закуски', price: 650, image: commonImage, description: 'Крылышки в соусе барбекю' },
    { name: 'Хумус с лепешками', category: 'Закуски', price: 500, image: commonImage, description: 'Нутовый хумус с свежими лепешками' },
    { name: 'Креветки темпура', category: 'Закуски', price: 800, image: commonImage, description: 'Креветки в хрустящем кляре' },
    { name: 'Мидии в сливочном соусе', category: 'Закуски', price: 850, image: commonImage, description: 'Мидии, приготовленные в соусе' },
    { name: 'Паштет из утки', category: 'Закуски', price: 700, image: commonImage, description: 'Домашний паштет с хлебом' },
    { name: 'Жюльен с грибами', category: 'Закуски', price: 550, image: commonImage, description: 'Грибы в сливочном соусе под сыром' },
    { name: 'Рулетики из баклажанов', category: 'Закуски', price: 600, image: commonImage, description: 'Баклажаны с начинкой из сыра' },
    { name: 'Кальмары фри', category: 'Закуски', price: 750, image: commonImage, description: 'Кольца кальмаров во фритюре' },
    { name: 'Спринг-роллы с овощами', category: 'Закуски', price: 500, image: commonImage, description: 'Рулетики с овощами и соусом' },
    { name: 'Фалафель', category: 'Закуски', price: 450, image: commonImage, description: 'Шарики из нута с соусом' },
    { name: 'Тартар из лосося', category: 'Закуски', price: 850, image: commonImage, description: 'Свежий лосось с авокадо' },
    { name: 'Антипасти', category: 'Закуски', price: 900, image: commonImage, description: 'Ассорти из итальянских закусок' },
    { name: 'Печеный камамбер', category: 'Закуски', price: 800, image: commonImage, description: 'Запеченный сыр с хлебом' },
    { name: 'Куриные наггетсы', category: 'Закуски', price: 550, image: commonImage, description: 'Кусочки курицы в кляре' },
    { name: 'Гренки с чесноком', category: 'Закуски', price: 300, image: commonImage, description: 'Хрустящие гренки с чесноком' },
    { name: 'Мясное ассорти', category: 'Закуски', price: 950, image: commonImage, description: 'Ассорти из разных видов мяса' },
    { name: 'Куриные шашлычки', category: 'Закуски', price: 650, image: commonImage, description: 'Мини-шашлыки из курицы' },
    { name: 'Севиче из сибаса', category: 'Закуски', price: 800, image: commonImage, description: 'Маринованный сибас с лаймом' },
    { name: 'Паштет из куриной печени', category: 'Закуски', price: 600, image: commonImage, description: 'Паштет с тостами' },
    { name: 'Бастурма', category: 'Закуски', price: 700, image: commonImage, description: 'Вяленое мясо по-армянски' },

    // Напитки (примерно 24 блюда)
    { name: 'Эспрессо', category: 'Напитки', price: 200, image: commonImage, description: 'Крепкий кофе' },
    { name: 'Капучино', category: 'Напитки', price: 250, image: commonImage, description: 'Кофе с молочной пеной' },
    { name: 'Латте', category: 'Напитки', price: 270, image: commonImage, description: 'Кофе с молоком' },
    { name: 'Чай чёрный', category: 'Напитки', price: 150, image: commonImage, description: 'Классический чёрный чай' },
    { name: 'Чай зелёный', category: 'Напитки', price: 150, image: commonImage, description: 'Зелёный чай' },
    { name: 'Свежевыжатый сок', category: 'Напитки', price: 300, image: commonImage, description: 'Сок из свежих фруктов' },
    { name: 'Мохито безалкогольный', category: 'Напитки', price: 350, image: commonImage, description: 'Освежающий напиток с мятой и лаймом' },
    { name: 'Лимонад домашний', category: 'Напитки', price: 250, image: commonImage, description: 'Лимонад с натуральным лимоном' },
    { name: 'Горячий шоколад', category: 'Напитки', price: 300, image: commonImage, description: 'Напиток из топлёного шоколада' },
    { name: 'Молочный коктейль', category: 'Напитки', price: 320, image: commonImage, description: 'Напиток из молока и мороженого' },
    { name: 'Минеральная вода', category: 'Напитки', price: 150, image: commonImage, description: 'Газированная или негазированная вода' },
    { name: 'Айран', category: 'Напитки', price: 200, image: commonImage, description: 'Кисломолочный напиток' },
    { name: 'Фруктовый смузи', category: 'Напитки', price: 350, image: commonImage, description: 'Смузи из свежих фруктов' },
    { name: 'Чай каркаде', category: 'Напитки', price: 180, image: commonImage, description: 'Чай из лепестков гибискуса' },
    { name: 'Какао', category: 'Напитки', price: 280, image: commonImage, description: 'Горячий напиток с какао' },
    { name: 'Эспрессо макиато', category: 'Напитки', price: 220, image: commonImage, description: 'Эспрессо с каплей молока' },
    { name: 'Раф кофе', category: 'Напитки', price: 300, image: commonImage, description: 'Кофе со сливками и ванилью' },
    { name: 'Фраппе', category: 'Напитки', price: 320, image: commonImage, description: 'Холодный кофейный напиток' },
    { name: 'Матча латте', category: 'Напитки', price: 350, image: commonImage, description: 'Зелёный чай матча с молоком' },
    { name: 'Имбирный чай', category: 'Напитки', price: 200, image: commonImage, description: 'Чай с имбирём и лимоном' },
    { name: 'Компот', category: 'Напитки', price: 150, image: commonImage, description: 'Напиток из сухофруктов' },
    { name: 'Морс', category: 'Напитки', price: 180, image: commonImage, description: 'Напиток из ягод' },
    { name: 'Глинтвейн безалкогольный', category: 'Напитки', price: 380, image: commonImage, description: 'Горячий напиток с пряностями' },
    { name: 'Травяной чай', category: 'Напитки', price: 180, image: commonImage, description: 'Чай из трав' },

    // Гарниры (примерно 24 блюда)
    { name: 'Картофель фри', category: 'Гарниры', price: 200, image: commonImage, description: 'Хрустящий картофель фри' },
    { name: 'Рис отварной', category: 'Гарниры', price: 150, image: commonImage, description: 'Отварной рис' },
    { name: 'Овощи гриль', category: 'Гарниры', price: 300, image: commonImage, description: 'Овощи, приготовленные на гриле' },
    { name: 'Картофельное пюре', category: 'Гарниры', price: 180, image: commonImage, description: 'Нежное пюре из картофеля' },
    { name: 'Спагетти', category: 'Гарниры', price: 220, image: commonImage, description: 'Отварные спагетти с маслом' },
    { name: 'Гречка', category: 'Гарниры', price: 150, image: commonImage, description: 'Гречневая каша' },
    { name: 'Соте из овощей', category: 'Гарниры', price: 280, image: commonImage, description: 'Тушеные овощи в соусе' },
    { name: 'Кус-кус', category: 'Гарниры', price: 200, image: commonImage, description: 'Зерновой гарнир из пшеницы' },
    { name: 'Картофель по-деревенски', category: 'Гарниры', price: 220, image: commonImage, description: 'Запеченный картофель с кожурой' },
    { name: 'Салат из свежих овощей', category: 'Гарниры', price: 250, image: commonImage, description: 'Лёгкий овощной салат' },
    { name: 'Кукуруза гриль', category: 'Гарниры', price: 200, image: commonImage, description: 'Кукуруза, приготовленная на гриле' },
    { name: 'Брокколи на пару', category: 'Гарниры', price: 250, image: commonImage, description: 'Брокколи, приготовленная на пару' },
    { name: 'Сладкий картофель фри', category: 'Гарниры', price: 220, image: commonImage, description: 'Фри из батата' },
    { name: 'Полента', category: 'Гарниры', price: 200, image: commonImage, description: 'Каша из кукурузной муки' },
    { name: 'Фасоль в томате', category: 'Гарниры', price: 230, image: commonImage, description: 'Фасоль, тушеная в томатном соусе' },
    { name: 'Шпинат со сливками', category: 'Гарниры', price: 280, image: commonImage, description: 'Тушеный шпинат в сливочном соусе' },
    { name: 'Цветная капуста гриль', category: 'Гарниры', price: 260, image: commonImage, description: 'Цветная капуста на гриле' },
    { name: 'Рататуй', category: 'Гарниры', price: 300, image: commonImage, description: 'Овощное блюдо из баклажанов, кабачков и томатов' },
    { name: 'Микс салатных листьев', category: 'Гарниры', price: 220, image: commonImage, description: 'Смесь различных салатных листьев' },
    { name: 'Жареные грибы', category: 'Гарниры', price: 280, image: commonImage, description: 'Грибы, обжаренные с луком' },
    { name: 'Пюре из батата', category: 'Гарниры', price: 200, image: commonImage, description: 'Нежное пюре из батата' },
    { name: 'Булгур', category: 'Гарниры', price: 180, image: commonImage, description: 'Отварной булгур' },
    { name: 'Овощи темпура', category: 'Гарниры', price: 300, image: commonImage, description: 'Овощи в хрустящем кляре' },
    { name: 'Запеченная тыква', category: 'Гарниры', price: 250, image: commonImage, description: 'Тыква, запеченная с травами' },

];

const MenuPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const router = useRouter();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const filteredDishes = dishes.filter((dish) => dish.category === activeCategory);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-screen bg-[#1B2A46] text-white flex flex-col min-h-screen">
            <div className='w-[81%] mx-auto'>
                {/* Хедер */}
                <h1 className="text-[60px] font-bold text-left mt-10">Меню ресторана</h1>

                {/* Контейнер для кнопок прокрутки и навбара категорий */}
                <div className="flex items-center mt-5">
                    {/* Левая кнопка прокрутки */}
                    <button
                        className="mr-3 bg-[#D4AF37] text-[#001833] p-2 rounded-full shadow-md hover:bg-[#c19c29] focus:outline-none"
                        onClick={scrollLeft}
                        aria-label="Прокрутить влево"
                    >
                        <FaChevronLeft />
                    </button>

                    {/* Навбар категорий */}
                    <div className="flex-1 bg-white py-2 px-5 rounded-[10px] overflow-hidden"> 
                        <div
                            ref={scrollContainerRef}
                            className="flex space-x-2 overflow-x-auto hide-scrollbar"
                        >
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`flex-shrink-0 h-12 px-4 rounded-lg font-semibold text-lg transition-colors duration-200 ${
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
                    </div>

                    {/* Правая кнопка прокрутки */}
                    <button
                        className="ml-3 bg-[#D4AF37] text-[#001833] p-2 rounded-full shadow-md hover:bg-[#c19c29] focus:outline-none"
                        onClick={scrollRight}
                        aria-label="Прокрутить вправо"
                    >
                        <FaChevronRight />
                    </button>
                </div>

                {/* Сетка блюд */}
                <main className="flex-grow p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-[#D4AF37] scrollbar-track-transparent mt-2 bg-[#1B2A46]">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {filteredDishes.map((dish) => (
                            <div key={dish.name} className="hover:shadow-2xl duration-300 transform hover:scale-105" style={{ width: '260px'}}>
                                <div className="relative">
                                    <img src={dish.image} alt={dish.name} className="w-full h-[200px] object-cover rounded-xl" />
                                </div>
                                <div className="py-4 font-bold">
                                       <div className="rounded-md text-lg text-[32px]">
                                        {dish.price} ₽
                                    </div>
                                    <h2 className="text-left text-lg font-medium">{dish.name}</h2>
                                    <p className="text-left text-sm line-clamp-2">{dish.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>


                {/* Нижняя кнопка "Домой" */}
                <footer className="flex justify-center mt-14 mb-10">
                    <button
                        className="flex justify-center items-center w-12 h-12 rounded-full transition-transform duration-200 focus:outline-none w-[100px]"
                        onClick={() => router.push('/')}
                        aria-label="Домой"
                    >
                        <img src="House.svg" alt="Info icon" />
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default MenuPage;
