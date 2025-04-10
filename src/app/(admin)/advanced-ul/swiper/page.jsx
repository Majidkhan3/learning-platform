import { Button, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllSwiper from './AllSwiper';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Swiper'
};
const Swiper = () => {
  return <>
      <PageTitle subName="Extended" title="Swipper Slider" />
      <Row>
        <Col xl={9}>
          <Card>
            <CardBody>
              <CardTitle as={'h5'} className="mb-1 anchor" id="overview">
                Overview
                <Button variant="outline-success" size="sm" className="rounded-2 float-end" href="https://swiperjs.com/get-started" target="_blank">
                  Official Website
                </Button>
              </CardTitle>
              <p className="text-muted mb-3">Swiper is the most modern slider with hardware accelerated transitions and amazing native behavior.</p>
            </CardBody>
          </Card>
          <AllSwiper />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#overview',
          label: 'Overview'
        }, {
          link: '#default',
          label: 'Default Swiper'
        }, {
          link: '#navigation',
          label: 'Navigation & Pagination'
        }, {
          link: '#pagination-dynamic',
          label: 'Pagination Dynamic Swiper'
        }, {
          link: '#effect-fade',
          label: 'Effect Fade Swiper'
        }, {
          link: '#effect-creative',
          label: 'Effect Creative Swiper'
        }, {
          link: '#effect-flip',
          label: 'Effect Flip Swiper'
        }, {
          link: '#scrollbar',
          label: 'Scrollbar Swiper'
        }, {
          link: '#vertical',
          label: 'Vertical Swiper'
        }, {
          link: '#mousewheel',
          label: 'Mousewheel Control Swiper'
        }, {
          link: '#responsive',
          label: 'Responsive Breakpoints Swiper'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Swiper;