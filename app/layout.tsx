'use client';

import localFont from 'next/font/local';
import './globals.css';
import { AuthProvider, useAuth } from '@/app/context/AuthContext'; // Импорт провайдера и хука
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Подключаем каждый вес и стиль шрифта
const mulishRegular = localFont({
  src: './fonts/Mulish-Regular.ttf',
  variable: '--font-mulish-regular',
});

const mulishLight = localFont({
  src: './fonts/Mulish-Light.ttf',
  variable: '--font-mulish-light',
});

const mulishBold = localFont({
  src: './fonts/Mulish-Bold.ttf',
  variable: '--font-mulish-bold',
});

const mulishSemiBold = localFont({
  src: './fonts/Mulish-SemiBold.ttf',
  variable: '--font-mulish-semibold',
});

// Проверка авторизации для всего приложения
function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth(); // Доступ к состоянию авторизации
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin'); // Перенаправляем на страницу входа
    }
  }, [user, loading, router]);

  if (loading) {
    // Пока данные загружаются, можно показывать индикатор загрузки
    return <div className="w-screen h-screen flex justify-center items-center bg-[#1c2536] text-white">Loading...</div>;
  }

  // Если пользователь авторизован, отображаем контент
  return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body
        className={`${mulishRegular.variable} ${mulishLight.variable} ${mulishBold.variable} ${mulishSemiBold.variable} antialiased`}
      >
        <AuthProvider>
          <AuthCheck>{children}</AuthCheck>
        </AuthProvider>
      </body>
    </html>
  );
}
