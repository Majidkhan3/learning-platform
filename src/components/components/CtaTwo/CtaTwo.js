import ctaTwo from "@/data/ctaTwo";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";

const { image, title, items } = ctaTwo;

const CtaTwo = () => {
  return (
    <section className="cta-two">
      <Image src={image.src} className="cta-two__moc" alt="Awesome Image" />
      <Container>
        <Row>
          <Col lg={6}>
            <div className="cta-two__block">
              <div className="block-title text-left">
                <h2 className="block-title__title black-text-color">
                  <TextSplit text={title} />
                </h2>
              </div>
              {items.map(({ id, title, icon, text }) => (
                <div key={id} className="cta-two__single">
                  <div className="cta-two__icon">
                    <i className={icon}></i>
                  </div>
                  <div className="cta-two__content">
                    <h3 className="cta-two__title">{title}</h3>
                    <p className="cta-two__text">{text}</p>
                  </div>
                </div>
              ))}
              <a href="#" className="thm-btn cta-two__btn">
                Learn More
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CtaTwo;
