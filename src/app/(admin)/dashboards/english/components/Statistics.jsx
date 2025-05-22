'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { chartOptions, statisticData } from '../data';
const StatCard = ({
  amount,
  change,
  icon,
  title,
  variant
}) => {
  return <Card>
      <CardBody>
        <Row className="align-items-center justify-content-between">
          <Col xs={6}>
            <div className="avatar-md bg-light bg-opacity-50 rounded flex-centered">
              <IconifyIcon width={32} height={32} icon={icon} className="text-primary" />
            </div>
            <p className="text-muted mb-2 mt-3">{title}</p>
            <h3 className="text-dark fw-bold d-flex align-items-center gap-2 mb-0">
              {amount}{' '}
              <span className={`badge text-${variant == 'danger' ? 'danger' : 'success'} bg-${variant == 'danger' ? 'danger' : 'success'}-subtle fs-12`}>
                {variant == 'danger' ? <IconifyIcon icon="ri:arrow-down-line" /> : <IconifyIcon icon="ri:arrow-up-line" />}
                {change}%
              </span>
            </h3>
          </Col>
          <Col xs={6}>
            <ReactApexChart options={chartOptions} series={chartOptions.series} height={95} type="bar" className="apex-charts" />
          </Col>
        </Row>
      </CardBody>
    </Card>;
};
const Statistics = () => {
  return <Row>
      {statisticData.map((item, idx) => <Col md={6} xl={3} key={idx}>
          <StatCard {...item} />
        </Col>)}
    </Row>;
};
export default Statistics;