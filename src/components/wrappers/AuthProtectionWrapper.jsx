'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import FallbackLoading from '../FallbackLoading';

// Create AuthContext
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProtectionWrapper = ({ children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null,
    isInitialized: false,
  });

  const { push } = useRouter();
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
    push('/login');
  };

  const updateUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setState((prevState) => ({
      ...prevState,
      user,
    }));
  };

  useEffect(() => {
    const checkToken = async () => {
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
        console.log('Redirecting to login');
        push(`/login?redirectTo=${pathname}`);
      }
    };

    checkToken();
  }, [pathname, push]);

  if (!state.isInitialized) {
    return <FallbackLoading />;
  }

  const authContextValue = {
    ...state,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProtectionWrapper;