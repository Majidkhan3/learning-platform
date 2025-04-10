import AllToasts from './components/AllToasts';
import UIExamplesList from '@/components/UIExamplesList';
import { Col, Row } from 'react-bootstrap';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Toasts'
};
const Toasts = () => {
  return <>
      <PageTitle subName="UI" title="Toasts" />
      <Row>
        <Col xl={9}>
          <AllToasts />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#basic_examples',
          label: 'Basic Examples'
        }, {
          link: '#live_example',
          label: 'Live example'
        }, {
          link: '#default_buttons',
          label: 'Staking'
        }, {
          link: '#custom_content',
          label: 'Custom Content'
        }, {
          link: '#transcluent',
          label: 'Transcluent'
        }, {
          link: '#placement',
          label: 'Placement'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Toasts;