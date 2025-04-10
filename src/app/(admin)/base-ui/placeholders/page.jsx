import AllPlaceholders from './components/AllPlaceholders';
import UIExamplesList from '@/components/UIExamplesList';
import { Col, Row } from 'react-bootstrap';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Placeholder'
};
const PLaceholders = () => {
  return <>
      <PageTitle subName="UI" title="Placeholders" />
      <Row>
        <Col xl={9}>
          <AllPlaceholders />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#default',
          label: 'Overview'
        }, {
          link: '#how-works',
          label: 'How it works'
        }, {
          link: '#width',
          label: 'Width'
        }, {
          link: '#color',
          label: 'Color'
        }]} />
        </Col>
      </Row>
    </>;
};
export default PLaceholders;