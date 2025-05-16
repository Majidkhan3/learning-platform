import React from 'react'
import LanguageSelectionPage from '@/components/home'
import AuthProtectionWrapper from '@/components/wrappers/AuthProtectionWrapper'
const page = () => {
  return (
    <AuthProtectionWrapper>
      <LanguageSelectionPage />
    </AuthProtectionWrapper>
  )
}

export default page
