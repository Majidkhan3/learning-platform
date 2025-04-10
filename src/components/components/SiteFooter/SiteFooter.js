import footerData from '@/data/siteFooter'
import Link from 'next/link'
import React from 'react'
import { Container, Image } from 'react-bootstrap'

const { logo, author, year, links, socials } = footerData

const SiteFooter = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    console.log(formData.get('email'))
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__upper">
        <Container>
          <div className="site-footer__5-col-wrap">
            <div className="footer-widget footer-widget__about">
              {/* <Link href="/">
                <a className="footer-widget__logo">
                  <Image width={66} src={logo.src} alt="Awesome Image" />
                </a>
              </Link> */}
            </div>
            <div className="footer-widget">
              <h3 className="footer-widget__title">Explore</h3>
              <ul className="footer-widget__links">
                {links.slice(0, 5).map(({ id, name, href }) => (
                  <li key={id} className="footer-widget__links-item">
                    <a href={href} className="footer-widget__links-link">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-widget">
              <h3 className="footer-widget__title">Services</h3>
              <ul className="footer-widget__links">
                {links.slice(5, 9).map(({ id, name, href }) => (
                  <li key={id} className="footer-widget__links-item">
                    <a href={href} className="footer-widget__links-link">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-widget">
              <h3 className="footer-widget__title">Links</h3>
              <ul className="footer-widget__links">
                {links.slice(9).map(({ id, name, href }) => (
                  <li key={id} className="footer-widget__links-item">
                    <a href={href} className="footer-widget__links-link">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-widget footer-widget__subscribe">
              <h3 className="footer-widget__title">Subscribe</h3>
              <form onSubmit={handleSubmit} className="footer-widget__subscribe-form">
                <input type="email" name="email" placeholder="Email address" required />
                <button type="submit">
                  <i className="fa fa-location-arrow"></i>
                </button>
              </form>
            </div>
          </div>
        </Container>
      </div>
      <div className="site-footer__lower">
        <Container>
          <div className="inner-container">
            <p className="site-footer__copytext">
              © copyright {year} by <a href="#">{author}</a>
            </p>
            <div className="site-footer__social">
              {socials.map(({ id, icon, href }) => (
                <a key={id} href={href}>
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default SiteFooter
