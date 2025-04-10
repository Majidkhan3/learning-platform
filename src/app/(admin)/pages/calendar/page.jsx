import { lazy, Suspense } from 'react';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import PageTitle from '@/components/PageTitle';
const CalendarPage = lazy(() => import('./components/CalendarPage'));
export const metadata = {
  title: 'Schedule'
};
const Schedule = () => {
  return <>
      <PageTitle title="Calendar" subName="Pages" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <Row>
                <Suspense>
                  <CalendarPage />
                </Suspense>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
export default Schedule;