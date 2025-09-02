'use client'

import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { DEFAULT_PAGE_TITLE } from '@/context/constants'
import dynamic from 'next/dynamic'
const LayoutProvider = dynamic(() => import('@/context/useLayoutContext').then((mod) => mod.LayoutProvider), {
  ssr: false,
})
import { NotificationProvider } from '@/context/useNotificationContext'
// import { AuthContext } from '@/context/AuthContext'
const AppProvidersWrapper = ({ children }) => {
  // const handleChangeTitle = () => {
  //   if (document.visibilityState == 'hidden') document.title = 'Please come back 🥺'
  // }
  useEffect(() => {
    if (document) {
      const e = document.querySelector('#__next_splash')
      if (e?.hasChildNodes()) {
        document.querySelector('#splash-screen')?.classList.add('remove')
      }
      e?.addEventListener('DOMNodeInserted', () => {
        document.querySelector('#splash-screen')?.classList.add('remove')
      })
    }
  }, [])
  return (
    // <AuthContext>
      <SessionProvider>
        <LayoutProvider>
          <NotificationProvider>
            {children}
            <ToastContainer theme="colored" />
          </NotificationProvider>
        </LayoutProvider>
      </SessionProvider>
    // </AuthContext>
  )
}
export default AppProvidersWrapper
