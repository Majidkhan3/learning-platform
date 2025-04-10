import { Col, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllTreemapCharts from './components/AllTreemapCharts';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Treemap Charts'
};
const TreemapCharts = () => {
  return <>
      <PageTitle title="Treemap" subName="Charts" />
      <Row>
        <Col xl={9}>
          <AllTreemapCharts />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#basic',
          label: 'Basic'
        }, {
          link: '#multiple',
          label: 'Treemap Multiple Series'
        }, {
          link: '#distributed',
          label: 'Distributed Treemap'
        }, {
          link: '#color-range',
          label: 'Color Range Treemap'
        }]} />
        </Col>
      </Row>
    </>;
};
export default TreemapCharts;