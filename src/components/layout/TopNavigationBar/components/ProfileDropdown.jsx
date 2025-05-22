'use client'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'

import { useRouter } from 'next/navigation'
import { Dropdown, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'


const ProfileDropdown = () => {
   const router = useRouter(); 
    const auth = useAuth()
  const user = auth?.user
   if (!user) return null
   const hasAccess = (language) => {
  return user?.languages?.includes(language)
}

   const handleLanguageClick = (route, access) => {
  if (hasAccess(access)) {
    router.push(route)
  } else {
    alert("You don't have access to this language dashboard.")
  }
}

  const languageOptions = [
  { title: 'Espagnol', route: '/dashboards/espagnol', access: 'Espagnol' },
  { title: 'Portugais', route: '/dashboards/portugais', access: 'Portuguese' },
  { title: 'French', route: '/dashboards/french', access: 'French' },
  { title: 'English', route: '/dashboards/english', access: 'English' },
]

  return (
    <Dropdown className="topbar-item" drop="down">
      <DropdownToggle
        as={'a'}
        type="button"
        className="topbar-button content-none"
        id="page-header-user-dropdown "
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        <span className="d-flex align-items-center">
          <Image className="rounded-circle" width={32} src={avatar1} alt="avatar-3" />
        </span>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        <DropdownHeader as={'h6'} className="dropdown-header">
          Welcome Gaston!
        </DropdownHeader>
        {/* <DropdownItem as={Link} href="/profile">
          <IconifyIcon icon="solar:calendar-broken" className="align-middle me-2 fs-18" />
          <span className="align-middle">My Schedules</span>
        </DropdownItem>
        <DropdownItem as={Link} href="/pages/pricing">
          <IconifyIcon icon="solar:wallet-broken" className="align-middle me-2 fs-18" />
          <span className="align-middle">Pricing</span>
        </DropdownItem>
        <DropdownItem as={Link} href="/support/faqs">
          <IconifyIcon icon="solar:help-broken" className="align-middle me-2 fs-18" />
          <span className="align-middle">Help</span>
        </DropdownItem>
        <DropdownItem as={Link} href="/auth/lock-screen">
          <IconifyIcon icon="solar:lock-keyhole-broken" className="align-middle me-2 fs-18" />
          <span className="align-middle">Lock screen</span>
        </DropdownItem> */}
        <div className="dropdown-divider my-1" />
        <DropdownItem
          className="text-danger"
          onClick={(event) => {
            event.preventDefault()
            if (window.location.pathname.includes('admin')) {
              localStorage.removeItem('admin')
              localStorage.removeItem('admin_token')
              window.location.href = '/admin'
            } else {
              localStorage.removeItem('user')
              localStorage.removeItem('token')
              window.location.href = '/login'
            }
          }}>
          <IconifyIcon icon="solar:logout-3-broken" className="align-middle me-2 fs-18" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
        {languageOptions.map(({ title, route, access }) => {
  const accessGranted = hasAccess(access)
  return (
    <DropdownItem
      key={title}
      onClick={() => handleLanguageClick(route, access)}
      style={{
        opacity: accessGranted ? 1 : 0.5,
        cursor: accessGranted ? 'pointer' : 'not-allowed'
      }}
    >
      <span className="align-middle">{title}</span>
    </DropdownItem>
  )
})}

      </DropdownMenu>
    </Dropdown>
  )
}
export default ProfileDropdown
