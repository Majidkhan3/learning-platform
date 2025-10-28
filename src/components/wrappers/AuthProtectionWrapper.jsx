'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import FallbackLoading from '../FallbackLoading'

export const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)
const verifyTokenClient = async (token) => {
  try {
    const response = await fetch('/api/auth/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.ok
  } catch (error) {
    return false
  }
}
const hasLanguageAccess = (user, path) => {
  if (!user || !path) return false

  if (path.includes('/espagnol') && !user.languages?.includes('Espagnol')) {
    return false
  } else if (path.includes('/portugais') && !user.languages?.includes('Portuguese')) {
    return false
  } else if (path.includes('/english') && !user.languages?.includes('English')) {
    return false
  } else if (path.includes('/french') && !user.languages?.includes('French')) {
    return false
  }
  // Add more language checks here if needed
  return true
}
const AuthProtectionWrapper = ({ children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null,
    isInitialized: false,
    token: null,
  })

  const router = useRouter()
  const pathname = usePathname()
 const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      const storedUser = JSON.parse(localStorage.getItem('user'))

      if (!token || !storedUser?._id) return

      // Verify token before making the API call
      const isValidToken = await verifyTokenClient(token)
      if (!isValidToken) {
        logout()
        return
      }

      const response = await fetch(`/api/users/${storedUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()

        // Compare if user data has changed
        if (JSON.stringify(userData) !== JSON.stringify(storedUser)) {
          localStorage.setItem('user', JSON.stringify(userData))
          setState((prev) => ({
            ...prev,
            user: userData,
            token: token, // Include token in state update
          }))
        }
      } else if (response.status === 401) {
        // Handle unauthorized access
        logout()
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      logout()
    }
  }
  const login = ({ jwt, email, avatar, ...others }) => {
    localStorage.setItem('token', jwt)
    localStorage.setItem(
      'user',
      JSON.stringify({
        email,
        avatar,
        ...others,
      }),
    )

    setState({
      isAuthenticated: true,
      user: {
        email,
        avatar,
        ...others,
      },
      isInitialized: true,
      token: jwt,
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setState({
      isAuthenticated: false,
      user: null,
      isInitialized: true,
      token: null,
    })
    router.push('/login')
  }

  const updateUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setState((prevState) => ({
      ...prevState,
      user,
    }))
  }
  const checkAndVerifyToken = async () => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (token && user) {
      // Verify token validity
      const isValidToken = await verifyTokenClient(token)
      
      if (!isValidToken) {
        logout()
        return
      }

      const userData = JSON.parse(user)

      if (!hasLanguageAccess(userData, pathname)) {
        router.push('/')
        return
      }

      setState({
        isAuthenticated: true,
        user: userData,
        isInitialized: true,
        token: token,
      })
      fetchUserData()
    } else {
      setState({
        isAuthenticated: false,
        user: null,
        isInitialized: true,
        token: null,
      })

      if (!pathname.includes('/login')) {
        router.push(`/login?redirectTo=${pathname}`)
      }
    }
  }

  useEffect(() => {
    checkAndVerifyToken();
    const refreshInterval = setInterval(fetchUserData, 5 * 60 * 1000)

    return () => clearInterval(refreshInterval)
  }, [pathname, router])

  if (!state.isInitialized) {
    return <FallbackLoading />
  }

  return <AuthContext.Provider value={{ ...state, login, updateUser }}>{children}</AuthContext.Provider>
}

export default AuthProtectionWrapper
