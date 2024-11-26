'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import { API_BASE_URL } from 'baseapi/config'

// Обновлённый интерфейс User
interface User {
  id: string // UUID
  username: string
  email: string
  role: 'admin' | 'user' | 'cashier' | 'waiter' | 'team'
  name: string
  password?: string // пароль можно оставить необязательным, если он не приходит из API
}

interface AuthContextType {
  token: string | null
  user: User | null
  loading: boolean
  login: (token: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      fetchUserData(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        console.warn('Token is invalid or expired. Logging out...');
        logoutUser();
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch user data');

      const data = await response.json();

      // Преобразование данных API к формату интерфейса User
      const transformedUser: User = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role,
        name: data.name,
        password: data.password || undefined, // пароль, если он приходит
      };

      setUser(transformedUser);
    } catch (error) {
      console.error('Error fetching user data:', error);
      if ((error as Error).message !== 'Token is invalid or expired. Logging out...') {
        logoutUser();
      }
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    await fetchUserData(newToken)
    router.push('/') // Убедитесь, что это нужный путь
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    router.push('/signin')
  }

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login: loginUser, logout: logoutUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined)
    throw new Error('useAuth must be used within an AuthProvider')
  return context
}
