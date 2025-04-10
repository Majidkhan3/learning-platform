import PageTitle from '@/components/PageTitle';
import UIExamplesList from '@/components/UIExamplesList';
import { Button, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import AllSweetAlerts from './Components/AllSweetAlerts';
export const metadata = {
  title: 'Sweet Alert'
};
const SweetAlerts = () => {
  return <>
      <PageTitle subName="Extended" title="Sweet Alerts" />
      <Row>
        <Col xl={9}>
          <Card>
            <CardBody>
              <CardTitle as={'h5'} className="mb-1 anchor" id="overview">
                Overview
                <Button variant="outline-success" size="sm" className="rounded-2 float-end" href="https://sweetalert2.github.io/" target="_blank">
                  Official Website
                </Button>
              </CardTitle>
              <p className="text-muted mb-3">
                A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript&apos;s popup boxes
              </p>
            </CardBody>
          </Card>
          <AllSweetAlerts />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#overview',
          label: 'Overview'
        }, {
          link: '#basic',
          label: 'Basic'
        }, {
          link: '#title',
          label: 'A Title with a Text Under'
        }, {
          link: '#message',
          label: 'Message'
        }, {
          link: '#longcontent',
          label: 'long content Images Message'
        }, {
          link: '#parameter',
          label: 'Parameter'
        }]} />
        </Col>
      </Row>
    </>;
};
export default SweetAlerts;