// app/signin/page.tsx

'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { API_BASE_URL } from 'baseapi/config' // Используем API_BASE_URL без изменений

export default function SigninPage() {
  const [username, setusername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('') 
  const { login } = useAuth() 
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setIsLoading(true);
  
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await response.json();
  
      // Проверяем `access_token` вместо `token`
      if (response.ok && result.access_token) {
        await login(result.access_token); // Передаем `access_token` в `login`
      } else {
        setMessage(result.message || 'Ошибка при входе.');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      setMessage('Произошла ошибка. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div>
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">Вход</h2>
            <p className="mt-2 text-sm text-gray-600">Полноценный доступ к работе с сервисом</p>
          </div>

          {/* Отображение сообщений */}
          {message && (
            <div className="mt-4 text-center text-sm text-red-600">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="username" className="sr-only">username</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Ваш username"
                required
                autoComplete="username"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Пароль</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Ваш пароль"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Забыли пароль?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
