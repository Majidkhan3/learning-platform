import PageTitle from '@/components/PageTitle';
import UIExamplesList from '@/components/UIExamplesList';
import { Col, Row } from 'react-bootstrap';
import AllScatterCharts from './components/AllScatterCharts';
export const metadata = {
  title: 'Scatter Charts'
};
const ScatterCharts = () => {
  return <>
      <PageTitle title="Scatter" subName="Charts" />
      <Row>
        <Col xl={9}>
          <AllScatterCharts />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#basic',
          label: 'Scatter (XY) Chart'
        }, {
          link: '#datetime',
          label: 'Scatter Chart - Datetime'
        }, {
          link: '#images',
          label: 'Scatter - Images'
        }]} />
        </Col>
      </Row>
    </>;
};
export default ScatterCharts;