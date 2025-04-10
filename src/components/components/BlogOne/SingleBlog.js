import Link from 'next/link'
import React from 'react'
import { Col, Image } from 'react-bootstrap'
import TextSplit from '../Reuseable/TextSplit'

const SingleBlog = ({ blog = {} }) => {
  const { title, image, admin, date, comments } = blog

  return (
    <Col lg={6}>
      <div className="blog-one__single">
        <div className="blog-one__image-outer">
          <div className="blog-one__image">
            <Image src={require(`@/assets/images/images/${image}`).default.src} alt="Awesome Image" />
            <Link href="/blog-details">
              <a className="blog-one__link">Read More</a>
            </Link>
          </div>
        </div>

        <div className="blog-one__content">
          <div className="blog-one__meta">
            <Link href="/blog-details">
              <a className="blog-one__meta-link">By {admin}</a>
            </Link>
            <span className="blog-one__meta-sep">.</span>
            <Link href="/blog-details">
              <a className="blog-one__meta-link">{date}</a>
            </Link>
            <span className="blog-one__meta-sep">.</span>
            <Link href="/blog-details">
              <a className="blog-one__meta-link">{comments} comments</a>
            </Link>
          </div>

          <h3 className="blog-one__title">
            <Link href="/blog-details">
              <a>
                <TextSplit text={title} />
              </a>
            </Link>
          </h3>
        </div>
      </div>
    </Col>
  )
}

export default SingleBlog
