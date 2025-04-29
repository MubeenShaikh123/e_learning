'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/features/user/userSlice';

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('x-access-token');

      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok || !data.valid) {
          localStorage.removeItem('token'); // Clear invalid token
          router.push('/auth/login');
          return;
        }

        dispatch(setUser({ name: data.name, email: data.email }));
        setLoading(false); // Allow access after successful verification
      } catch (error) {
        console.error(`Auth Error:, ${error}`);
        router.push('/auth/login');
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          {/* Pulse effect container */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Ripple effects */}
              <div className="absolute -inset-2 rounded-full bg-blue-500 opacity-30 animate-ping"></div>
              <div className="absolute -inset-4 rounded-full bg-blue-400 opacity-20 animate-pulse"></div>

              {/* Main spinner */}
              <div className="relative flex items-center justify-center w-16 h-16">
                <div className="w-16 h-16 border-4 border-blue-100 dark:border-gray-700 rounded-full"></div>
                <div className="absolute w-16 h-16 border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
                <div className="absolute w-6 h-6 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full shadow-md"></div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Authenticating</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Securing your session...</p>

            {/* Progress bar */}
            <div className="w-full h-1 mt-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
            </div>

            <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
              This may take a few moments
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
