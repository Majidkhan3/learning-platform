import { Col, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllBubbleCharts from './components/AllBubbleCharts';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Bubble Charts'
};
const BubbleCharts = () => {
  return <>
      <PageTitle title="Bubble" subName="Charts" />
      <Row>
        <Col xl={9}>
          <AllBubbleCharts />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#simple',
          label: 'Simple Bubble Chart'
        }, {
          link: '#3d-bubble',
          label: '3D Bubble Chart'
        }]} />
        </Col>
      </Row>
    </>;
};
export default BubbleCharts;