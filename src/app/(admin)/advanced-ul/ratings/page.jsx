import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllRatings from './components/AllRatings';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Ratings'
};
const Ratings = () => {
  return <>
      <PageTitle subName="Extended" title="Ratings" />
      <Row>
        <Col xl={9}>
          <Card>
            <CardBody>
              <CardTitle as={'h5'} className="mb-1 anchor" id="overview">
                Overview
                <a className="btn btn-sm btn-outline-success rounded-2 float-end" href="https://www.npmjs.com/package/@smastrom/react-rating" target="_blank">
                  Official Website
                </a>
              </CardTitle>
              <p className="text-muted mb-3">Zero dependency, highly customizable rating component for React.</p>
              <h5 className="mt-2">Usage</h5>
              <p className="mb-0">React Rating&apos;s css needs to be imported when using the Rating component</p>
            </CardBody>
          </Card>
          <AllRatings />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#overview',
          label: 'Default'
        }, {
          link: '#read_only',
          label: 'Read Only Example'
        }, {
          link: '#disable',
          label: 'Disable Example'
        }, {
          link: '#highlight',
          label: 'Highlight Only'
        }, {
          link: '#reset_example',
          label: 'Reset Rating Example'
        }, {
          link: '#rating_style',
          label: 'Rating Styles'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Ratings;