'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Link from 'next/link';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { goalsOptions } from '../data';
import { currency } from '@/context/constants';
const Goals = () => {
  return <Card>
      <CardHeader className="d-flex align-items-center justify-content-between pb-0">
        <CardTitle as={'h4'}>Goals</CardTitle>
        <div>
          <Link href="" className="link-dark fs-20">
            <IconifyIcon icon="ri-settings-4-line" />
          </Link>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <ReactApexChart options={goalsOptions} series={goalsOptions.series} height={300} type="radialBar" className="apex-charts mb-4" />
        <h5>Income Statistic</h5>
        <Row className="align-items-center justify-content-center mt-3 ">
          <Col lg={6} xs={6}>
            <div className="d-flex align-items-center gap-2">
              <div className="avatar bg-light bg-opacity-50 rounded flex-centered">
                <IconifyIcon icon="solar:wallet-money-broken" width={28} height={28} className="fs-28 text-primary" />
              </div>
              <div>
                <p className="mb-0 fs-16 text-dark fw-semibold">{currency}12,167</p>
                <small>From June</small>
              </div>
            </div>
          </Col>
          <Col lg={6} xs={6}>
            <div className="d-flex align-items-center justify-content-end gap-2">
              <div className="avatar bg-light bg-opacity-50 rounded flex-centered">
                <IconifyIcon icon="solar:wallet-money-broken" width={28} height={28} className="fs-28 text-primary " />
              </div>
              <div>
                <p className="mb-0 fs-16 text-dark fw-semibold">{currency}14,900</p>
                <small>From July</small>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>;
};
export default Goals;