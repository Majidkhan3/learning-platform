'use client'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'
import { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap'

const ProfileDropdown = () => {
  const router = useRouter()
  const auth = useAuth()
  const user = auth?.user
  if (!user) return null

  const hasAccess = (language) => user?.languages?.includes(language)

  const fileInputRef = useRef(null)
  const [profileImage, setProfileImage] = useState(user?.image || avatar1)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleImageClick = () => setShowImageModal(true)
  const handleModalClose = () => setShowImageModal(false)

  const handleLanguageClick = (route, access) => {
    if (hasAccess(access)) router.push(route)
    else alert("You don't have access to this language dashboard.")
  }

  const handleProfileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64String = reader.result

      try {
        const response = await fetch('/api/users/uploaddp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64String,
            userId: auth?.user?._id,
          }),
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data?.message || 'Upload failed')

        setProfileImage(data.imageUrl)
        auth.updateUser({ ...auth.user, image: data.imageUrl })
        alert('✅ Profile image updated successfully')
      } catch (err) {
        console.error('❌ Upload failed:', err)
        alert(`❌ ${err.message || 'Upload failed'}`)
      }
    }

    reader.readAsDataURL(file)
  }

  const languageOptions = [
    { title: 'Spanish', route: '/dashboards/espagnol', access: 'Espagnol' },
    { title: 'Portuguese', route: '/dashboards/portugais', access: 'Portuguese' },
    { title: 'French', route: '/dashboards/french', access: 'French' },
    { title: 'English', route: '/dashboards/english', access: 'English' },
  ]

  const languageIcons = {
    Spanish: 'mdi:translate',
    Portuguese: 'mdi:alphabet-latin',
    French: 'mdi:book-open-page-variant',
    English: 'mdi:book-education-outline',
  }

  return (
    <>
      <div className="position-relative"> {/* Added wrapper div */}
        <Dropdown className="topbar-item" show={showDropdown} onToggle={setShowDropdown}>
          <DropdownToggle
            as="button"
            type="button"
            className="topbar-button content-none"
            id="page-header-user-dropdown"
            aria-haspopup="true"
            aria-expanded={showDropdown}
            onClick={() => setShowDropdown(prev => !prev)}
          >
            <span className="d-flex align-items-center gap-2">
              <Image
                className="rounded-circle"
                width={32}
                height={32}
                src={profileImage || avatar1}
                alt="Profile Picture"
                onClick={(e) => {
                  e.stopPropagation()
                  handleImageClick()
                }}
                style={{ cursor: 'pointer' }}
              />
              <IconifyIcon
                icon="mdi:chevron-down"
                width={20}
                height={20}
                className="dropdown-arrow-icon"
                style={{ color: '#666' }}
              />
            </span>
          </DropdownToggle>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleProfileChange}
            style={{ display: 'none' }}
          />

          <DropdownMenu 
            className="dropdown-menu-end"
            style={{
              position: 'absolute',
              right: 0,
              // For mobile responsiveness
              '@media (max-width: 768px)': {
                position: 'fixed',
                top: 'auto',
                bottom: 'auto',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '300px',
                maxHeight: '80vh',
                overflowY: 'auto',
              }
            }}
          >
            <DropdownHeader as="h6" className="dropdown-header">
                 Welcome {user?.pseudo || 'User'}!
            </DropdownHeader>
            <div className="dropdown-divider my-1" />
            <DropdownItem onClick={() => router.push('/admin')}>
              <IconifyIcon icon="mdi:view-dashboard-outline" className="align-middle me-2 fs-18" />
              <span className="align-middle">Admin</span>
            </DropdownItem>

            <DropdownItem
              className="text-danger"
              onClick={() => {
                if (window.location.pathname.includes('admin')) {
                  localStorage.removeItem('admin')
                  localStorage.removeItem('admin_token')
                  window.location.href = '/admin'
                } else {
                  localStorage.removeItem('user')
                  localStorage.removeItem('token')
                  window.location.href = '/login'
                }
              }}
            >
              <IconifyIcon icon="solar:logout-3-broken" className="align-middle me-2 fs-18" />
              <span className="align-middle">Logout</span>
            </DropdownItem>

            <DropdownItem onClick={() => fileInputRef.current.click()}>
              <IconifyIcon icon="mdi:image-edit" className="align-middle me-2 fs-18" />
              <span className="align-middle">Change Profile</span>
            </DropdownItem>

            <div className="dropdown-divider my-1" />
            {languageOptions.map(({ title, route, access }) => {
              const accessGranted = hasAccess(access)
              return (
                <DropdownItem
                  key={title}
                  onClick={() => handleLanguageClick(route, access)}
                  style={{
                    opacity: accessGranted ? 1 : 0.5,
                    cursor: accessGranted ? 'pointer' : 'not-allowed',
                  }}
                >
                  <IconifyIcon icon={languageIcons[title]} className="me-2" width={18} />
                  <span className="align-middle">{title}</span>
                </DropdownItem>
              )
            })}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Full-size modal */}
      <Modal show={showImageModal} onHide={handleModalClose} centered>
        <Modal.Body className="text-center p-3" style={{ position: 'relative', height: '60vh' }}>
          <Image
            src={profileImage || avatar1}
            alt="Profile Full Size"
            fill
            style={{
              objectFit: 'contain',
              borderRadius: '10px',
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProfileDropdown