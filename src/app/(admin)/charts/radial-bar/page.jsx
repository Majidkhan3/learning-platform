import { Col, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllRadialBarCharts from './components/AllRadialBarCharts';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'RadialBar Charts'
};
const RadialBarCharts = () => {
  return <>
      <PageTitle title="RadialBar" subName="Charts" />
      <Row>
        <Col xl={9}>
          <AllRadialBarCharts />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          label: 'Basic RadialBar Chart',
          link: '#basic'
        }, {
          label: 'Multiple RadialBars',
          link: '#multiple'
        }, {
          label: 'Circle Chart - Custom Angle',
          link: '#circle-angle'
        }, {
          label: 'Circle Chart with Image',
          link: '#image'
        }, {
          label: 'Stroked Circular Gauge',
          link: '#stroked-guage'
        }, {
          label: 'Gradient Circular Chart',
          link: '#gradient'
        }, {
          label: 'Semi Circle Gauge',
          link: '#semi-circle'
        }]} />
        </Col>
      </Row>
    </>;
};
export default RadialBarCharts;