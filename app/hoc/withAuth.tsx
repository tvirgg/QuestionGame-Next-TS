"use client"; // Ensure this is a Client Component
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/signin'); // Перенаправление на страницу входа
      }
    }, [loading, user, router]);

    if (loading || !user) {
      return <div className="w-screen h-screen bg-[#1c2536] text-white flex justify-center items-center">Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};
