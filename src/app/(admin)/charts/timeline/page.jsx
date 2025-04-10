import AllTimelineCharts from './components/AllTimelineCharts';
import UIExamplesList from '@/components/UIExamplesList';
import { Col, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Timeline Charts'
};
const TimelineCharts = () => {
  return <Row>
      <Col xl={9}>
        <AllTimelineCharts />
      </Col>
      <Col xl={3}>
        <UIExamplesList examples={[{
        link: '#basic',
        label: 'Basic Timeline'
      }, {
        link: '#distributed',
        label: 'Distributed Timeline'
      }, {
        link: '#multi-series',
        label: 'Multi Series Timeline'
      }, {
        link: '#advanced',
        label: 'Advanced Timeline'
      }, {
        link: '#group-rows',
        label: 'Multiple Series - Group Rows'
      }]} />
      </Col>
    </Row>;
};
export default TimelineCharts;