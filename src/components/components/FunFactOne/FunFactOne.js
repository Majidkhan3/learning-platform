import funFactOne from "@/data/funFactOne";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";
import VisibilityCountUp from "../Reuseable/VisibilityCountUp";

const { title, funFacts } = funFactOne;

const FunFactOne = () => {
  return (
    <section className="funfact-one">
      <Container>
        <div className="block-title text-center">
          <h2 className="block-title__title black-text-color">
            <TextSplit text={title} />
          </h2>
        </div>

        <Row>
          {funFacts.map(({ id, count, tagline }) => (
            <Col key={id} lg={3} md={6} sm={12}>
              <div className="funfact-one__single-outer">
                <div className="funfact-one__single">
                  <span className="funfact-one__dot-1"></span>
                  <span className="funfact-one__dot-2"></span>
                  <span className="funfact-one__dot-3"></span>
                  <h3 className="funfact-one__title counter">
                    <VisibilityCountUp count={count} />
                  </h3>
                  <p className="funfact-one__tag-line">{tagline}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FunFactOne;
