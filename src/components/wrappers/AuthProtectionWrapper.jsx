'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import FallbackLoading from '../FallbackLoading';

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AuthProtectionWrapper = ({ children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null,
    isInitialized: false,
  });

  const router = useRouter();
  const pathname = usePathname();

  const login = ({ jwt, email, avatar, ...others }) => {
    localStorage.setItem('token', jwt);
    localStorage.setItem(
      'user',
      JSON.stringify({
        email,
        avatar,
        ...others,
      })
    );

    setState({
      isAuthenticated: true,
      user: {
        email,
        avatar,
        ...others,
      },
      isInitialized: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setState({
      isAuthenticated: false,
      user: null,
      isInitialized: true,
    });
    router.push('/login');
  };

  const updateUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setState((prevState) => ({
      ...prevState,
      user,
    }));
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        setState({
          isAuthenticated: true,
          user: JSON.parse(user),
          isInitialized: true,
        });
      } else {
        setState({
          isAuthenticated: false,
          user: null,
          isInitialized: true,
        });

        // Only redirect to login if not already there
        if (!pathname.includes('/login')) {
          router.push(`/login?redirectTo=${pathname}`);
        }
      }
    };

    checkToken();
  }, [pathname, router]);

  if (!state.isInitialized) {
    return <FallbackLoading />;
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProtectionWrapper;
