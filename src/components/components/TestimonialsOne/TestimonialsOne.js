'use client'
import testimonialsOne from '@/data/testimonialsOne'
import useActive from '@/hooks/useActive'
import React, { useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import SwiperCore, { Autoplay, Controller, EffectFade, Navigation } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import TextSplit from '../Reuseable/TextSplit'

SwiperCore.use([Controller, Autoplay, Navigation, EffectFade])

const { title, testimonials, buttons } = testimonialsOne

const length = testimonials.length
const lastIndex = length - 1

const mainSlideOptions = {
  slidesPerView: 1,
  loop: true,
  effect: 'fade',
  navigation: {
    nextEl: '.testimonials-one__button__next-btn',
    prevEl: '.testimonials-one__button__prev-btn',
  },
  autoplay: {
    delay: 5000,
  },
}

const controller = (swiper) => ({
  control: swiper?.destroyed ? null : swiper,
})

const TestimonialsOne = () => {
  const [firstSwiper, setFirstSwiper] = useState(null)
  const [secondSwiper, setSecondSwiper] = useState(null)
  const [index, setIndex] = useState({
    active: 0,
    previous: lastIndex,
    next: 1,
  })

  const ref = useActive('#testimonials')

  return (
    <section ref={ref} className="testimonials-one" id="testimonials">
      <Container>
        <Row>
          <Col lg={6}>
            <div className="testimonials-one__image-block">
              <Swiper
                {...mainSlideOptions}
                onSwiper={setFirstSwiper}
                controller={controller(secondSwiper)}
                onActiveIndexChange={({ activeIndex }) => {
                  const active = activeIndex ? (activeIndex > length ? 0 : activeIndex - 1) : lastIndex
                  setIndex({
                    active,
                    previous: active === 0 ? lastIndex : active - 1,
                    next: active === lastIndex ? 0 : active + 1,
                  })
                }}>
                {testimonials.map(({ id, image, qoute }) => (
                  <SwiperSlide key={id}>
                    <div className="item clearfix">
                      <div className="testimonials-one__image">
                        <Image src={require(`@/assets/images/images/${image}`).default.src} className="testimonials-one__thumb" alt="Awesome Image" />
                        <div className="testimonials-one__qoute">
                          <Image src={qoute.src} alt="Awesome Image" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="testimonials-one__button-block">
                {buttons.map(({ type, className }) => {
                  const active = type === 'current' ? index.active : type === 'prev' ? index.previous : index.next
                  const { image } = testimonials[active] || {}
                  return (
                    <button
                      key={type}
                      className={className}
                      style={
                        image && {
                          backgroundImage: `url(${require(`@/assets/images/images/${image}`).default.src})`,
                        }
                      }></button>
                  )
                })}
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="testimonials-one__content">
              <div className="block-title text-left">
                <h2 className="block-title__title light-text-color">
                  <TextSplit text={title} />
                </h2>
              </div>
              <Swiper {...mainSlideOptions} effect="slide" onSwiper={setSecondSwiper} controller={controller(firstSwiper)}>
                <div className="swiper-wrapper">
                  {testimonials.map(({ id, text, name, designation }) => (
                    <SwiperSlide key={id}>
                      <div className="item">
                        <div className="testimonials-one__single">
                          <p className="testimonials-one__text">{text}</p>
                          <div className="testimonials-one__bottom">
                            <h3 className="testimonials-one__title">{name}</h3>
                            <div className="testimonials-one__sep">.</div>
                            <p className="testimonials-one__designation">{designation}</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default TestimonialsOne
