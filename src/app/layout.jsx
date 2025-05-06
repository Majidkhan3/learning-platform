import logoDark from '@/assets/images/logo-dark.png'
import AppProvidersWrapper from '@/components/wrappers/AppProvidersWrapper'
import { Figtree } from 'next/font/google'
import Image from 'next/image'
import NextTopLoader from 'nextjs-toploader'
import '@/assets/scss/app.scss'
import language from '@/assets/images/language.png'
import { DEFAULT_PAGE_TITLE } from '@/context/constants'
import { AuthContext } from '@/context/AuthContext'
import AuthProtectionWrapper from '@/components/wrappers/AuthProtectionWrapper'
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const splashScreenStyles = `
#splash-screen {
  position: fixed;
  top: 50%;
  left: 50%;
  background: white;
  display: flex;
  height: 100%;
  width: 100%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 1;
  transition: all 15s linear;
  overflow: hidden;
}

#splash-screen.remove {
  animation: fadeout 0.7s forwards;
  z-index: 0;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
`
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style suppressHydrationWarning>{splashScreenStyles}</style>
      </head>
      <body className={figtree.className}>
        <div id="splash-screen">
          <Image
            alt="Logo"
            width={112}
            height={24}
            src={language}
            style={{
              height: '6%',
              width: 'auto',
            }}
            priority
          />
        </div>
        <NextTopLoader color="#604ae3" showSpinner={false} />
        <div id="__next_splash">
          
          <AppProvidersWrapper>
            {/* <AuthProtectionWrapper> */}
              {children}
            {/* </AuthProtectionWrapper> */}
          </AppProvidersWrapper>
        </div>
      </body>
    </html>
  )
}
