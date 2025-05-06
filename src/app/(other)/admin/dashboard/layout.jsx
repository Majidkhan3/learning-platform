"use client"
import Footer from '@/components/layout/Footer'
import AuthProtectionWrapper from '@/components/wrappers/AuthProtectionWrapper'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Container } from 'react-bootstrap'
import { AdminProvider } from '../../../../context/AdminContext'
import { usePathname } from 'next/navigation'
const TopNavigationBar = dynamic(() => import('@/components/layout/TopNavigationBar/page'))
const VerticalNavigationBar = dynamic(() => import('@/components/layout/VerticalNavigationBarAll/page'))
const AdminLayout = ({ children }) => {
  const pathname = usePathname()
  console.log('pathname', pathname)
  const isAdmin = pathname?.includes('/admin')
  console.log('isAdmin', isAdmin)
  return (
    // <AuthProtectionWrapper>
    <AdminProvider>
      <div className="wrapper">
        <Suspense>
          <TopNavigationBar />
        </Suspense>
        <VerticalNavigationBar isAdmin={isAdmin}/>
        <div className="page-content">
          <Container fluid>{children}</Container>
          <Footer />
        </div>
      </div>
    </AdminProvider>
    // </AuthProtectionWrapper>
  )
}
export default AdminLayout
