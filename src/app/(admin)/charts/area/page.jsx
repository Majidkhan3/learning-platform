import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllAreaCharts from './components/AllAreaCharts';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Area Charts'
};
const AreaCharts = () => {
  return <>
      <PageTitle title="Area" subName="Charts" />
      <Row>
        <Col xl={9}>
          <Card>
            <CardBody>
              <CardTitle as={'h5'} className="anchor" id="overview">
                Overview
                <a className="btn btn-sm btn-outline-success rounded-2 float-end" href="https://apexcharts.com/javascript-chart-demos/" target="_blank">
                  Official Website
                </a>
              </CardTitle>
              <p className="text-muted mb-3">ApexCharts is loaded with powerful features to fulfill your data-visualization needs.</p>
            </CardBody>
          </Card>
          <AllAreaCharts />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#overview',
          label: 'Overview'
        }, {
          link: '#basic',
          label: 'Basic Area Chart'
        }, {
          link: '#spline',
          label: 'Spline Area'
        }, {
          link: '#datetime',
          label: 'Area Chart - Datetime X-axis'
        }, {
          link: '#negative',
          label: 'Area with Negative Values'
        }, {
          link: '#stacked',
          label: 'Stacked Area'
        }, {
          link: '#timeSeries',
          label: 'Irregular TimeSeries'
        }, {
          link: '#chart-nullvalues',
          label: 'Area Chart with Null values'
        }]} />
        </Col>
      </Row>
    </>;
};
export default AreaCharts;