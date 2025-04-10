import { Carousel as CarouselBootstrap, CarouselItem, Col, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import Image from 'next/image';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import Img1 from '@/assets/images/small/img-1.jpg';
import Img2 from '@/assets/images/small/img-2.jpg';
import Img3 from '@/assets/images/small/img-3.jpg';
import Img4 from '@/assets/images/small/img-4.jpg';
import Img5 from '@/assets/images/small/img-5.jpg';
import Img6 from '@/assets/images/small/img-6.jpg';
import Img7 from '@/assets/images/small/img-7.jpg';
import Img8 from '@/assets/images/small/img-8.jpg';
import Img9 from '@/assets/images/small/img-9.jpg';
import Img10 from '@/assets/images/small/img-10.jpg';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Carousel'
};
const SlidesOnly = () => {
  return <ComponentContainerCard id="slides-only" title="Slides Only" description={<>
          Here’s a carousel with slides only. Note the presence of the <code>.d-block</code> and <code>.img-fluid</code> on carousel images to prevent
          browser default image alignment.
        </>}>
      <div className="w-50 mb-3 mx-auto">
        <CarouselBootstrap indicators={false} controls={false}>
          <CarouselItem>
            <Image src={Img2} height={302} className="d-block w-100" alt="img-2" />
          </CarouselItem>
          <CarouselItem>
            <Image src={Img3} height={302} className="d-block w-100" alt="img-3" />
          </CarouselItem>
          <CarouselItem>
            <Image src={Img4} height={302} className="d-block w-100" alt="img-4" />
          </CarouselItem>
        </CarouselBootstrap>
      </div>
    </ComponentContainerCard>;
};
const SlidesWithControls = () => {
  return <ComponentContainerCard id="with-controls" title="With Controls" description={<>Adding in the previous and next controls:</>}>
      <div className="w-50 mb-3 mx-auto">
        <CarouselBootstrap indicators={false}>
          <CarouselItem>
            <Image src={Img4} height={302} className="d-block h-auto w-100" alt="img-2" />
          </CarouselItem>
          <CarouselItem>
            <Image src={Img2} height={302} className="d-block h-auto w-100" alt="img-3" />
          </CarouselItem>
          <CarouselItem>
            <Image src={Img3} height={302} className="d-block h-auto w-100" alt="img-4" />
          </CarouselItem>
        </CarouselBootstrap>
      </div>
    </ComponentContainerCard>;
};
const SlidesWithIndicators = () => {
  return <ComponentContainerCard id="with-indicators" title="With Indicators" description={<> You can also add the indicators to the carousel, alongside the controls, too.</>}>
      {/* <Row>
        <Col lg={6}> */}
      <div className="w-50 mb-3 mx-auto">
        <CarouselBootstrap>
          <CarouselItem>
            <Image src={Img5} height={302} className="d-block h-auto w-100" alt="img-5" />
          </CarouselItem>
          <CarouselItem>
            <Image src={Img6} height={302} className="d-block h-auto w-100" alt="img-6" />
          </CarouselItem>
          <CarouselItem>
            <Image src={Img7} height={302} className="d-block h-auto w-100" alt="img-7" />
          </CarouselItem>
        </CarouselBootstrap>
      </div>
      {/* </Col>
       </Row> */}
    </ComponentContainerCard>;
};
const SlidesWithCaptions = () => {
  return <ComponentContainerCard id="with-captions" title="With Captions" description={<>
          Add captions to your slides easily with the <code>.carousel-caption</code> element within any <code>.carousel-item</code>. They can be
          easily hidden on smaller viewports, as shown below, with optional display utilities. We hide them initially with <code>.d-none</code> and
          bring them back on medium-sized devices with <code>.d-md-block</code>.
        </>}>
      {/* <Row> */}
      <div className="w-50 mb-3 mx-auto">
        <CarouselBootstrap indicators={false}>
          <CarouselItem>
            <Image src={Img6} height={302} className="d-block h-auto w-100" alt="img-6" />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-white">First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <Image src={Img7} height={302} className="d-block h-auto w-100" alt="img-7" />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-white">Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <Image src={Img5} height={302} className="d-block h-auto w-100" alt="img-5" />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-white">Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </CarouselItem>
        </CarouselBootstrap>
      </div>
      {/* </Row> */}
    </ComponentContainerCard>;
};
const CrossFade = () => {
  return <ComponentContainerCard id="crossfade" title="Crossfade" description={<>
          {' '}
          Add <code>.carousel-fade</code> to your carousel to animate slides with a fade transition instead of a slide. Depending on your carousel
          content (e.g., text only slides), you may want to add <code>.bg-body</code> or some custom CSS to the <code>.carousel-item</code>s for
          proper crossfading.
        </>}>
      {/* <Row> */}
      <div className="w-50 mb-3 mx-auto">
        <CarouselBootstrap indicators={false} fade>
          <CarouselItem>
            <Image src={Img1} height={302} className="d-block h-auto w-100" alt="img-2" />
          </CarouselItem>
          <CarouselItem>
            <Image src={Img2} height={302} className="d-block h-auto w-100" alt="img-3" />
          </CarouselItem>
          <CarouselItem>
            <Image src={Img3} height={302} className="d-block h-auto w-100" alt="img-4" />
          </CarouselItem>
        </CarouselBootstrap>
      </div>
      {/* </Row> */}
    </ComponentContainerCard>;
};
const IndividualInterval = () => {
  return <ComponentContainerCard id="individual-carousel-item-interval" title="Individual" description={<>
          Add <code>data-bs-interval=&ldquo;</code> to a <code>.carousel-item</code> to change the amount of time to delay between automatically
          cycling to the next item.
        </>}>
      <div className="w-50 mb-3 mx-auto">
        {/* <Col lg={6}> */}
        <CarouselBootstrap indicators={false}>
          <CarouselItem interval={10000}>
            <Image src={Img1} height={302} className="d-block h-auto w-100" alt="img-2" />
          </CarouselItem>
          <CarouselItem interval={2000}>
            <Image src={Img2} height={302} className="d-block h-auto w-100" alt="img-3" />
          </CarouselItem>
          <CarouselItem>
            <Image src={Img3} height={302} className="d-block h-auto w-100" alt="img-4" />
          </CarouselItem>
        </CarouselBootstrap>
        {/* </Col> */}
      </div>
    </ComponentContainerCard>;
};
const DisableTouchCarousel = () => {
  return <ComponentContainerCard id="disable-touch-swiping" title="Disable touch swiping" description={<>
          Carousels support swiping left/right on touchscreen devices to move between slides. This can be disabled using the{' '}
          <code>data-bs-touch</code> attribute. The example below also does not includethe <code>data-bs-ride</code> attribute so it doesn’t autoplay.
        </>}>
      {/* <Row> */}
      <div className="w-50 mb-3 mx-auto">
        <CarouselBootstrap indicators={false} touch={false}>
          <CarouselItem>
            <Image src={Img4} height={302} className="d-block h-auto w-100" alt="img-2" />
          </CarouselItem>
          <CarouselItem>
            <Image src={Img5} height={302} className="d-block h-auto w-100" alt="img-3" />
          </CarouselItem>
          <CarouselItem>
            <Image src={Img6} height={302} className="d-block h-auto w-100" alt="img-4" />
          </CarouselItem>
        </CarouselBootstrap>
      </div>
      {/* </Row> */}
    </ComponentContainerCard>;
};
const DarkVariant = () => {
  return <ComponentContainerCard id="dark-variant" title="Dark Variant" description={<>
          Add <code>.carousel-dark</code> to the <code>.carousel</code> for darker controls, indicators, and captions. Controls have been inverted
          from their default white fill with the<code>filter</code> CSS property. Captions and controls have additional Sass variables that customize
          the<code>color</code> and <code>background-color</code>.
        </>}>
      {/* <Row> */}
      <div className="w-50 mb-3 mx-auto">
        <CarouselBootstrap className="carousel-dark">
          <CarouselItem interval={10000}>
            <Image height={302} src={Img8} className="d-block h-auto w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </CarouselItem>
          <CarouselItem interval={2000}>
            <Image src={Img9} height={302} className="d-block h-auto w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <Image src={Img10} height={302} className="d-block h-auto w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </CarouselItem>
        </CarouselBootstrap>
      </div>
      {/* </Row> */}
    </ComponentContainerCard>;
};
const Carousel = () => {
  return <>
      <PageTitle subName="UI" title="Carousel" />
      <Row>
        <Col xl={9}>
          <SlidesOnly />
          <SlidesWithControls />
          <SlidesWithIndicators />
          <SlidesWithCaptions />
          <CrossFade />
          <IndividualInterval />
          <DisableTouchCarousel />
          <DarkVariant />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          label: 'Slide Only',
          link: '#slides-only'
        }, {
          label: 'With Controls',
          link: '#with-controls'
        }, {
          label: 'With Indicators',
          link: '#with-indicators'
        }, {
          label: 'With Captions',
          link: '#with-captions'
        }, {
          label: 'Crossfade',
          link: '#crossfade'
        }, {
          label: 'Individual .carousel-item interval',
          link: '#individual-carousel-item-interval'
        }, {
          label: 'Disable touch swiping',
          link: '#disable-touch-swiping'
        }, {
          label: 'Dark Variant',
          link: '#dark-variant'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Carousel;