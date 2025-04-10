// import ComingSoon from './components/ComingSoon';
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
export const metadata = {
  title: 'Coming Soon',
}
const Coming = dynamic(() => import('./components/ComingSoon'))

const ComingSoonPage = () => {
  return (
    <Suspense>
      <Coming />
    </Suspense>
  )
}
export default ComingSoonPage
