import Footer from '@/components/layout/Footer'
import AuthProtectionWrapper from '@/components/wrappers/AuthProtectionWrapper'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Container } from 'react-bootstrap'

const TopNavigationBar = dynamic(() => import('@/components/layout/TopNavigationBar/page'))
const VerticalNavigationBar = dynamic(() => import('@/components/layout/VerticalNavigationBar/page'))
const AdminLayout = ({ children }) => {
  
  return (
    <AuthProtectionWrapper>
      <div className="wrapper">
        <Suspense>
          <TopNavigationBar />
        </Suspense>
        <VerticalNavigationBar />
        <div className="page-content">
          <Container fluid>{children}</Container>
          <Footer />
        </div>
      </div>
    </AuthProtectionWrapper>
  )
}
export default AdminLayout
