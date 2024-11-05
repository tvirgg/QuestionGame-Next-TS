"use client";
import React from 'react';

const RulesContent: React.FC = () => {
    return (
        <div className="rules-page text-[#333333] rounded-3xl max-w-2xl pt-[50px] pl-[90px]">
            <h1 className="text-bold text-[58px] mb-6">Правила игры</h1>
            <p className="mb-6 text-bold text-[40px] whitespace-nowrap">
    Вас ждут <span className="font-semibold">7 раундов</span> с небольшими <br></br> перерывами после 3 и 6 раундов.
</p>

            <p className="mb-4 text-[23px] whitespace-nowrap">
                Почти во всех раундах, за редким исключением, будет по 6 вопросов. <br></br>
                После каждого вопроса вам в команде надо будет посовещаться <br></br>
                и написать ответ на бланках, которые будут лежать где-то рядом. <br></br>
                После каждого раунда надо сдать бланк.
            </p>
            <ul className="list-none text-left space-y-2 mb-8 text-[24px]">
                <li><span className="text-[#CC9F33]">1 раунд.</span> Разминка.</li>
                <li><span className="text-[#CC9F33]">2 раунд.</span> На логику.</li>
                <li><span className="text-[#CC9F33]">3 раунд.</span> Музыкальный.</li>
                <li><span className="text-[#CC9F33]">4 раунд.</span> Интерактивный.</li>
                <li><span className="text-[#CC9F33]">5 раунд.</span> Сюрприз.</li>
                <li><span className="text-[#CC9F33]">6 раунд.</span> Тематический.</li>
                <li><span className="text-[#CC9F33]">7 раунд.</span> Решающий.</li>
            </ul>
            <p className="text-base mb-6 text-[23px] whitespace-nowrap">
                Если у вас будут появляться вопросы перед <br></br>
                игрой или в течение её, не стесняйтесь задавать <br></br>
                их нашим помощникам.
            </p>
            <div className="font-semibold text-[21px]">
                Ни в коем случае <span className="text-[#CC9F33] whitespace-nowrap">нельзя забывать вкусно есть <br></br> и пить во время игры!</span> За этот пункт вашего досуга отвечают наши партнерские крутые бары.
            </div>
        </div>
    );
};

export default RulesContent;
