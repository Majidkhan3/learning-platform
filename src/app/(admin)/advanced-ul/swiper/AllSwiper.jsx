'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Autoplay, EffectCreative, EffectFade, EffectFlip, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import smallImg1 from '@/assets/images/small/img-1.jpg';
import smallImg2 from '@/assets/images/small/img-2.jpg';
import smallImg3 from '@/assets/images/small/img-3.jpg';
import smallImg4 from '@/assets/images/small/img-4.jpg';
import smallImg5 from '@/assets/images/small/img-5.jpg';
import smallImg6 from '@/assets/images/small/img-6.jpg';

// styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-flip';
import 'swiper/css/mousewheel';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
const DefaultSwiper = () => {
  return <ComponentContainerCard id="default" title="Default Swiper" description={<>
          Use <code>data-swiper=&quot;default&quot;</code> attribute to set a default swiper.
        </>}>
      <Row>
        <Col lg={6}>
          <Swiper loop autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }} className="rounded" modules={[Autoplay]}>
            <SwiperSlide>
              <Image src={smallImg1} alt="swiper-img" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg2} alt="swiper-img" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg3} alt="swiper-img" className="img-fluid" />
            </SwiperSlide>
          </Swiper>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const NavigationSwiper = () => {
  return <ComponentContainerCard id="navigation" title="Navigation & Pagination Swiper" description={<>
          Use <code>data-swiper=&quot;navigation&quot;</code> attribute to set a swiper with navigation and pagination.
        </>}>
      <Row>
        <Col lg={6}>
          <Swiper className="rounded" modules={[Autoplay, Navigation, Pagination]} loop autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }} navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }} pagination={{
          type: 'bullets',
          clickable: true,
          el: '.swiper-pagination'
        }}>
            <SwiperSlide>
              <Image src={smallImg4} alt="swiper-img" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg5} alt="swiper-img" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg6} alt="swiper-img" className="img-fluid" />
            </SwiperSlide>
            <div className="swiper-pagination" />
          </Swiper>
          <div className="swiper-button-next">
            <IconifyIcon icon="bx:bx-chevron-right" />
          </div>
          <div className="swiper-button-prev">
            <IconifyIcon icon="bx:bx-chevron-left" />
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const DynamicPaginationSwiper = () => {
  return <ComponentContainerCard id="pagination-dynamic" title="Pagination Dynamic Swiper" description={<>
          {' '}
          Use <code>data-swiper=&quot;dynamic&quot;</code> attribute to set a swiper with dynamic and pagination.
        </>}>
      <Row>
        <Col lg={6}>
          <Swiper className="rounded" data-swiper="dynamic" modules={[Autoplay, Pagination]} loop autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }} pagination={{
          clickable: true,
          el: '.swiper-pagination',
          dynamicBullets: true
        }}>
            <SwiperSlide>
              <Image src={smallImg4} alt="swiper-img" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg5} alt="swiper-img" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg6} alt="swiper-img" className="img-fluid" />
            </SwiperSlide>
            <div className="swiper-pagination dynamic-pagination" />
          </Swiper>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const SwiperWithFadeEffect = () => {
  return <ComponentContainerCard id="effect-fade" title="Effect Fade Swiper" description={<>
          Use <code>data-swiper=&quot;effect-fade&quot;</code> attribute to set a swiper with fade effect.
        </>}>
      <Row>
        <Col lg={6}>
          <Swiper className="rounded" modules={[Autoplay, Pagination, EffectFade]} loop effect="fade" autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }} pagination={{
          el: '.swiper-pagination',
          clickable: true
        }}>
            <SwiperSlide>
              <Image src={smallImg3} alt="swiper-img" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg4} alt="swiper-img" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg5} alt="swiper-img" className="img-fluid" />
            </SwiperSlide>
            <div className="swiper-pagination" />
          </Swiper>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const CreativeEffectSwiper = () => {
  return <ComponentContainerCard id="effect-creative" title="Effect Creative Swiper" description={<>
          Use <code>data-swiper=&quot;creative&quot;</code> attribute to set a swiper with creative custom effect.
        </>}>
      <Row>
        <Col lg={6}>
          <Swiper modules={[Autoplay, EffectCreative, Pagination]} loop grabCursor effect="creative" creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400]
          },
          next: {
            translate: ['100%', 0, 0]
          }
        }} autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }} pagination={{
          el: '.swiper-pagination',
          clickable: true
        }}>
            <SwiperSlide>
              <Image src={smallImg3} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg4} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg5} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <div className="swiper-pagination" />
          </Swiper>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const FlipEffectSwiper = () => {
  return <ComponentContainerCard id="effect-flip" title="Effect Flip Swiper" description={<>
          Use <code>data-swiper=&quot;flip&quot;</code> attribute to set a swiper with flip custom effect.
        </>}>
      <Row>
        <Col lg={6}>
          <Swiper modules={[Autoplay, Pagination, EffectFlip]} loop effect="flip" grabCursor autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }} pagination={{
          el: '.swiper-pagination',
          clickable: true
        }}>
            <SwiperSlide>
              <Image src={smallImg3} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg4} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg5} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <div className="swiper-pagination" />
          </Swiper>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const ScrollbarSwiper = () => {
  return <ComponentContainerCard id="scrollbar" title="Scrollbar Swiper" description={<>
          Use <code>data-swiper=&quot;scrollbar&quot;</code> attribute to set a swiper with scrollbar pagination.
        </>}>
      <Row>
        <Col lg={6}>
          <Swiper modules={[Autoplay, Scrollbar, Navigation]} loop autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }} scrollbar={{
          el: '.swiper-scrollbar',
          hide: true
        }} navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}>
            <SwiperSlide>
              <Image src={smallImg3} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg4} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg5} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <div className="swiper-button-next">
              <IconifyIcon icon="bx:bx-chevron-right" />
            </div>
            <div className="swiper-button-prev">
              <IconifyIcon icon="bx:bx-chevron-left" />
            </div>
            <div className="swiper-scrollbar" />
          </Swiper>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const VerticalSwiper = () => {
  return <ComponentContainerCard id="vertical" title="Vertical Swiper" description={<>
          Use <code>data-swiper=&quot;vertical&quot;</code> attribute to set a swiper with vertical pagination.
        </>}>
      <Row>
        <Col lg={6}>
          <Swiper modules={[Autoplay, Pagination]} loop direction="vertical" autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }} pagination={{
          el: '.swiper-pagination',
          clickable: true
        }} style={{
          height: 320
        }}>
            <SwiperSlide>
              <Image src={smallImg3} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg4} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg5} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <div className="swiper-pagination" />
          </Swiper>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const MousewheelControlSwiper = () => {
  return <ComponentContainerCard id="mousewheel" title="Mousewheel Control Swiper" description={<>
          Use <code>data-swiper=&quot;mousewheel&quot;</code> attribute to set a swiper with mousewheel scroll.
        </>}>
      <Row>
        <Col lg={6} className="mb-3">
          <Swiper modules={[Autoplay, Pagination, Mousewheel]} loop direction="vertical" mousewheel autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }} pagination={{
          el: '.swiper-pagination',
          clickable: true
        }} className="rounded" style={{
          height: 324
        }}>
            <SwiperSlide>
              <Image src={smallImg3} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg4} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={smallImg5} alt="swiper-img" className="img-fluid rounded" />
            </SwiperSlide>
            <div className="swiper-pagination" />
          </Swiper>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const ResponsiveBreakpointsSwiper = () => {
  return <ComponentContainerCard id="responsive" title="Responsive Breakpoints Swiper" description={<>
          Use <code>data-swiper=&quot;responsive&quot;</code> attribute to set a responsive swiper.
        </>}>
      <Swiper modules={[Autoplay, Pagination]} loop slidesPerView={1} spaceBetween={10} pagination={{
      el: '.swiper-pagination',
      clickable: true
    }} breakpoints={{
      768: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    }} className="rounded gallery-light pb-4">
        <SwiperSlide>
          <Image src={smallImg1} alt="swiper-img" className="img-fluid rounded" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={smallImg2} alt="swiper-img" className="img-fluid rounded" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={smallImg3} alt="swiper-img" className="img-fluid rounded" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={smallImg4} alt="swiper-img" className="img-fluid rounded" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={smallImg5} alt="swiper-img" className="img-fluid rounded" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={smallImg6} alt="swiper-img" className="img-fluid rounded" />
        </SwiperSlide>
        <div className="swiper-pagination swiper-pagination-dark" />
      </Swiper>
    </ComponentContainerCard>;
};
const AllSwiper = () => {
  return <>
      <DefaultSwiper />
      <NavigationSwiper />
      <DynamicPaginationSwiper />
      <SwiperWithFadeEffect />
      <CreativeEffectSwiper />
      <FlipEffectSwiper />
      <ScrollbarSwiper />
      <VerticalSwiper />
      <MousewheelControlSwiper />
      <ResponsiveBreakpointsSwiper />
    </>;
};
export default AllSwiper;