import image from '@/assets/images/images/preloader.png'
import React from 'react'
import { Image } from 'react-bootstrap'

const Preloader = ({ loading = true }) => {
  return (
    <div
      style={{
        zIndex: loading ? 9999 : -1,
      }}
      className={`preloader animated${loading ? '' : ' fadeOut'}`}>
      <Image className="preloader__icon" src={image.src} alt="Awesome Image" />
    </div>
  )
}

export default Preloader
