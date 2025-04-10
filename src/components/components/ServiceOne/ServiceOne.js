import serviceOne from "@/data/serviceOne";
import useActive from "@/hooks/useActive";
import React from "react";
import { Container, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";
import ServiceOneSingle from "./ServiceOneSingle";

const { title, services } = serviceOne;

const ServiceOne = () => {
  const ref = useActive("#services");

  return (
    <section ref={ref} className="service-one" id="services">
      <Container>
        <div className="block-title text-center">
          <h2 className="block-title__title black-text-color">
            <TextSplit text={title} />
          </h2>
        </div>
        <Row>
          {services.map((service) => (
            <ServiceOneSingle key={service.id} service={service} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ServiceOne;
