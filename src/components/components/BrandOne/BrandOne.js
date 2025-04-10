import brandOne from "@/data/brandOne";
import React from "react";
import { Container, Image } from "react-bootstrap";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay]);

const options = {
  loop: true,
  autoplay: {
    delay: 5000
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 0
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    991: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    1000: {
      slidesPerView: 5,
      spaceBetween: 30
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 30
    }
  }
};

const BrandOne = () => {
  return (
    <section className="brand-one">
      <Container>
        <Swiper {...options} className="brand-one__carousel">
          {brandOne.map((image, i) => (
            <SwiperSlide key={i}>
              <div className="item">
                <Image src={image.src} alt="Awesome Image" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default BrandOne;
