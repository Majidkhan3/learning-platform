'use client'
import React, { Suspense } from 'react'
import { GuestGuard } from '@/guards'
import dynamic from 'next/dynamic'
import AuthProtectionWrapper from '@/components/wrappers/AuthProtectionWrapper'
const LoginForm = dynamic(() => import('./components/Login'))

const page = () => {
  return (
    // <GuestGuard>
    <AuthProtectionWrapper>
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthProtectionWrapper>
    // </GuestGuard>
  )
}

export default page
