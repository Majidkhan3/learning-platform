import pricingOne from "@/data/pricingOne";
import useActive from "@/hooks/useActive";
import React from "react";
import { Container, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";
import SinglePricingOne from "./SinglePricingOne";

const { title, pricing } = pricingOne;

const PricingOne = () => {
  const ref = useActive("#pricing");

  return (
    <section ref={ref} className="pricing-one" id="pricing">
      <Container>
        <div className="block-title text-center">
          <h2 className="block-title__title black-text-color">
            <TextSplit text={title} />
          </h2>
        </div>
        <Row>
          {pricing.map((singlePricing) => (
            <SinglePricingOne
              key={singlePricing.id}
              singlePricing={singlePricing}
            />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default PricingOne;
