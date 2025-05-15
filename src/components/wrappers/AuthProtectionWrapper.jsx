'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import FallbackLoading from '../FallbackLoading'

export const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)
const hasLanguageAccess = (user, path) => {
  if (!user || !path) return false

  if (path.includes('/espagnol') && !user.languages?.includes('Espagnol')) {
    return false
  } else if (path.includes('/portugal') && !user.languages?.includes('Portuguese')) {
    return false
  } else if (path.includes('/english') && !user.languages?.includes('English')) {
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
  })

  const router = useRouter()
  const pathname = usePathname()
 const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      const storedUser = JSON.parse(localStorage.getItem('user'))
      
      if (!token || !storedUser?._id) return

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
          setState(prev => ({
            ...prev,
            user: userData
          }))
        }
      } else if (response.status === 401) {
        // Handle unauthorized access
        logout()
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
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
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setState({
      isAuthenticated: false,
      user: null,
      isInitialized: true,
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

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        const userData = JSON.parse(user)

        // Check language access
        if (!hasLanguageAccess(userData, pathname)) {
          router.push('/')
          return
        }
        setState({
          isAuthenticated: true,
          user: JSON.parse(user),
          isInitialized: true,
        })
         fetchUserData()
      } else {
        setState({
          isAuthenticated: false,
          user: null,
          isInitialized: true,
        })

        // Only redirect to login if not already there
        if (!pathname.includes('/login')) {
          router.push(`/login?redirectTo=${pathname}`)
        }
      }
    }

    checkToken()
     const refreshInterval = setInterval(fetchUserData, 5 * 60 * 1000)

    return () => clearInterval(refreshInterval)
  }, [pathname, router])

  if (!state.isInitialized) {
    return <FallbackLoading />
  }

  return <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>{children}</AuthContext.Provider>
}

export default AuthProtectionWrapper
