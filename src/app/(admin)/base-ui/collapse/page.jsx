import UIExamplesList from '@/components/UIExamplesList';
import AllCollapse from './components/AllCollapse';
import { Col, Row } from 'react-bootstrap';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Collapse'
};
const Collapse = () => {
  return <>
      <PageTitle subName="UI" title="Collapse" />
      <Row>
        <Col xl={9}>
          <AllCollapse />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          label: 'Default Example',
          link: '#default'
        }, {
          label: 'Horizontal Collapse',
          link: '#horizontal'
        }, {
          label: 'Multiple Targets',
          link: '#multiple-targets'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Collapse;