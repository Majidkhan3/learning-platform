import UIExamplesList from '@/components/UIExamplesList';
import { Col, Row } from 'react-bootstrap';
import AllCandlestickCharts from './components/AllCandlestickCharts';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Candlestick Alert'
};
const CandlestickCharts = () => {
  return <>
      <PageTitle title="Candlestick" subName="Charts" />
      <Row>
        <Col xl={9}>
          <AllCandlestickCharts />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#simple',
          label: 'Simple Candlestick Chart'
        }, {
          link: '#x-axis',
          label: 'Category X-Axis'
        }, {
          link: '#line',
          label: 'Candlestick with Line'
        }]} />
        </Col>
      </Row>
    </>;
};
export default CandlestickCharts;