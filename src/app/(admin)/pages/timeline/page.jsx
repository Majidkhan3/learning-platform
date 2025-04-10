import PageTitle from '@/components/PageTitle';
import { getAllTimeline } from '@/helpers/data';
import { Fragment } from 'react';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Timeline'
};
const CenteredTimeline = ({
  timeline
}) => {
  return <div className="timeline">
      {Object.keys(timeline).map((day, idx) => {
      return <Fragment key={idx}>
            <article className="timeline-time">
              <div className="time-show d-flex align-items-center justify-content-center mt-0">
                <h5 className="mb-0 text-uppercase fs-14 fw-semibold">{day}</h5>
              </div>
            </article>
            {timeline[day].map((item, idx) => {
          return idx % 2 === 0 ? <article className="timeline-item timeline-item-left" key={idx}>
                  <div className="timeline-desk">
                    <div className="timeline-box clearfix">
                      <span className="timeline-icon" />
                      <div className="overflow-hidden">
                        <Card className="d-inline-block">
                          <CardBody>
                            <h5 className="mt-0 fs-16">
                              {item.title}
                              {item.important && <span className="badge bg-secondary ms-1 align-items-center">important</span>}
                            </h5>
                            <p className="text-muted mb-0">{item.description}</p>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </div>
                </article> : <article className="timeline-item" key={idx}>
                  <div className="timeline-desk">
                    <div className="timeline-box clearfix">
                      <span className="timeline-icon" />
                      <div className="overflow-hidden">
                        <Card className="d-inline-block">
                          <CardBody>
                            <h5 className="mt-0 fs-16">
                              {item.important && <span className="badge bg-secondary me-1 align-items-center">important</span>}
                              {item.title}
                            </h5>
                            <p className="text-muted mb-0">{item.description}</p>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </div>
                </article>;
        })}
          </Fragment>;
    })}
    </div>;
};
const Timeline = async () => {
  const timelineData = await getAllTimeline();
  return <>
      <PageTitle title="Timeline" subName="Pages" />
      <Row>
        <Col lg={12}>
          {' '}
          <CenteredTimeline timeline={timelineData} />
        </Col>
      </Row>
    </>;
};
export default Timeline;