import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";

const BlogDetailsContent = ({ blog = {} }) => {
  const { image, admin, date, comments, title, texts } = blog;

  return (
    <div className="blog-details__content">
      <div className="blog-details__image">
        <Image src={image.src} alt="Awesome Image" />
      </div>
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
          <a className="blog-one__meta-link">{comments.length} comments</a>
        </Link>
      </div>
      <h3 className="blog-one__title">{title}</h3>
      {texts.map((text, i) => (
        <p key={i} className="blog-details__text">
          {text}
        </p>
      ))}
    </div>
  );
};

export default BlogDetailsContent;
