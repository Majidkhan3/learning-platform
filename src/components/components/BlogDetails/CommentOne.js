import React from "react";
import { Image } from "react-bootstrap";

const CommentOne = ({ comments = [] }) => {
  return (
    <>
      <h2 className="blog-details__content-title">
        {comments.length} Comments
      </h2>
      <div className="comment-one">
        {comments.map(({ id, image, name, date, time, text }) => (
          <div key={id} className="comment-one__single">
            <div className="comment-one__image">
              <div className="inner-block">
                <Image
                  src={require(`src/assets/images/${image}`).default.src}
                  alt="Awesome Image"
                />
              </div>
            </div>
            <div className="comment-one__content">
              <div className="comment-one__content-top">
                <div className="comment-one__top-left">
                  <h3 className="comment-one__author">{name}</h3>
                  <p className="comment-one__date">
                    {date} <span className="comment-one__date-sep">.</span>{" "}
                    {time}
                  </p>
                  <p className="comment-one__text">{text}</p>
                </div>
                <div className="comment-one__top-right">
                  <a href="#" className="comment-one__reply">
                    Reply
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentOne;
