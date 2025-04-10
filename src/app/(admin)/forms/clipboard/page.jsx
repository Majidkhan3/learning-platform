import { Col, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllClipboards from './components/AllClipboards';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Clipboard'
};
const Clipboard = () => {
  return <>
      <PageTitle title="Clipboard" subName="Form" />
      <Row>
        <Col xl={9}>
          <AllClipboards />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#copy-from-element',
          label: 'Copy text from another element'
        }, {
          link: '#cut-from-element',
          label: 'Cut text from another element'
        }, {
          link: '#copy-from-attribute',
          label: 'Copy text from attribute'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Clipboard;