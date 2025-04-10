import React from "react";
import { Col } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";

const ServiceOneSingle = ({ service = {} }) => {
  const { icon, title, text } = service;

  return (
    <Col lg={4}>
      <div className="service-one__single">
        <span className="service-one__dot-1"></span>
        <span className="service-one__dot-2"></span>
        <span className="service-one__dot-3"></span>
        <div className="service-one__icon">
          <i className={icon}></i>
        </div>
        <h3 className="service-one__title">
          <a href="#">
            <TextSplit text={title} />
          </a>
        </h3>
        <p className="service-one__text">
          <TextSplit text={text} />
        </p>
        <a href="#" className="service-one__btn">
          Read More
        </a>
      </div>
    </Col>
  );
};

export default ServiceOneSingle;
