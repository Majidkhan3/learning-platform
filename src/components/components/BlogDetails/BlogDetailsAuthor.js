import React from "react";
import { Image } from "react-bootstrap";

const BlogDetailsAuthor = ({ author = {} }) => {
  const { image, name, text } = author;

  return (
    <div className="blog-details__author">
      <div className="blog-details__author-image">
        <Image src={image.src} alt="Awesome Image" />
      </div>
      <div className="blog-details__author-content">
        <h3>{name}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default BlogDetailsAuthor;
