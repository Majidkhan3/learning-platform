import { Col, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllFormValidation from './components/AllFormValidation';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Validation'
};
const Validation = () => {
  return <>
      <PageTitle title="Form Validation" subName="Form" />
      <Row>
        <Col xl={9}>
          <AllFormValidation />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#browser-defaults',
          label: 'Browser Defaults'
        }, {
          link: '#custom-styles',
          label: 'Custom Styles'
        }, {
          link: '#server-side',
          label: 'Server side'
        }, {
          link: '#supported-elements',
          label: 'Supported Elements'
        }, {
          link: '#tooltips',
          label: 'Tooltips'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Validation;