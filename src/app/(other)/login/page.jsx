'use client'
import React, { Suspense } from 'react'
import { GuestGuard } from '@/guards'
import dynamic from 'next/dynamic'
const LoginForm = dynamic(() => import('./components/Login'))

const page = () => {
  return (
    // <GuestGuard>
      <Suspense>
        <LoginForm />
      </Suspense>
    // </GuestGuard>
  )
}

export default page
