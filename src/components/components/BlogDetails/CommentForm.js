import React from "react";
import { Col, Row } from "react-bootstrap";

const CommentForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, name) => (data[name] = value));
    console.log(data);
  };

  return (
    <>
      <h2 className="blog-details__content-title">Leave a Comment</h2>
      <form onSubmit={handleSubmit} className="reply-form">
        <Row>
          <Col lg={6}>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              className="reply-form__field"
            />
          </Col>
          <Col lg={6}>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="reply-form__field"
            />
          </Col>
          <Col lg={12}>
            <textarea
              placeholder="Write message"
              name="message"
              className="reply-form__field"
            ></textarea>
            <button className="reply-form__btn thm-btn" type="submit">
              Submit Comment
            </button>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default CommentForm;
