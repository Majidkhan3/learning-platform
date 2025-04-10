import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllSliders from './components/AllSliders';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Range Slider'
};
const Slider = () => {
  return <>
      <PageTitle title="Range Slider" subName="Form" />
      <Row>
        <Col xl={9}>
          <Card>
            <CardBody>
              <CardTitle as={'h5'} className="mb-1 anchor" id="overview">
                Overview
                <a className="btn btn-sm btn-outline-success rounded-2 float-end" href="https://github.com/leongersen/noUiSlider#readme" target="_blank">
                  Official Website
                </a>
              </CardTitle>
              <p className="text-muted mb-3">noUiSlider is a lightweight JavaScript range slider.</p>
            </CardBody>
          </Card>
          <AllSliders />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#overview',
          label: 'Overview'
        }, {
          link: '#basic-range',
          label: 'Basic Range Slider'
        }, {
          link: '#vertical-range',
          label: 'Vertical Range Slider'
        }, {
          link: '#multi-range',
          label: 'Multi Elements Range'
        }, {
          link: '#colorpicker-range',
          label: 'Colorpicker'
        }, {
          link: '#value-range',
          label: 'Value Range Slider'
        }, {
          link: '#tooltip',
          label: 'Tooltip'
        }, {
          link: '#soft-limits',
          label: 'Soft Limits'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Slider;