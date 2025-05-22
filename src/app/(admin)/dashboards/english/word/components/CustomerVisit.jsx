'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import ReactApexChart from 'react-apexcharts';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { customerVisit } from '../data';
const CustomerVisit = () => {
  return <Col xl={4} lg={6}>
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center pb-1">
          <CardTitle>Customer Visit by Device</CardTitle>
          <Dropdown>
            <DropdownToggle as={'a'} className="btn btn-sm btn-outline-light rounded icons-center content-none" data-bs-toggle="dropdown" aria-expanded="false">
              Today{' '}
              <span>
                {' '}
                <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>Today</DropdownItem>
              <DropdownItem>Month</DropdownItem>
              <DropdownItem>Years</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h3 className="d-flex align-items-center text-dark gap-2 mb-0">
                67,893
                <span className="badge text-danger bg-danger-subtle px-2 py-1 fs-12 ">
                  <IconifyIcon icon="ri:arrow-down-line" />
                  0.66%
                </span>
              </h3>
              <small>(Total Devices)</small>
            </div>
            <div className="avatar-md bg-light bg-opacity-50 rounded flex-centered">
              <IconifyIcon icon="solar:devices-broken" width={32} height={32} className="fs-32 text-primary " />
            </div>
          </div>
          <div className="mx-n3">
            <ReactApexChart options={customerVisit} series={customerVisit.series} height={150} type="area" className="apex-charts my-3" />
          </div>
          <Row className="mt-4 mb-1">
            <Col lg={6}>
              <div className="border rounded p-2">
                <p className="mb-1 text-muted">
                  <IconifyIcon icon="ri:smartphone-line" className="text-dark" /> Mobile
                </p>
                <p className="fs-18 text-dark fw-medium">
                  2.435 <span className="text-muted fs-14">60%</span>
                </p>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="text-dark mb-0">Android</p>
                    <p className="mb-0">2,545</p>
                  </div>
                  <div className="text-end">
                    <p className="text-dark mb-0">IOS</p>
                    <p className="mb-0">487</p>
                  </div>
                </div>
                <div className="progress progress-lg rounded-0 gap-1 overflow-visible mt-3 bg-light-subtle" style={{
                height: 10
              }}>
                  <div className="progress-bar bg-success rounded-pill" role="progressbar" style={{
                  width: '70%'
                }}></div>
                  <div className="progress-bar bg-dark rounded-pill" role="progressbar" style={{
                  width: '30%'
                }}></div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="border rounded p-2 text-end">
                <p className="mb-1 text-muted">
                  <IconifyIcon icon="ri:computer-line" className="text-dark" /> Desktop
                </p>
                <p className="fs-18 text-dark fw-medium">
                  578 <span className="text-muted fs-14">20%</span>
                </p>
                <div className="d-flex justify-content-between">
                  <div className="text-start">
                    <p className="text-dark mb-0">Windows</p>
                    <p className="mb-0">523</p>
                  </div>
                  <div>
                    <p className="text-dark mb-0">Mac</p>
                    <p className="mb-0">876</p>
                  </div>
                </div>
                <div className="progress progress-lg rounded-0 gap-1 overflow-visible mt-3 bg-light-subtle" style={{
                height: 10
              }}>
                  <div className="progress-bar bg-dark rounded-pill" role="progressbar" style={{
                  width: '30%'
                }}></div>
                  <div className="progress-bar bg-warning rounded-pill" role="progressbar" style={{
                  width: '70%'
                }}></div>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="border-top">
          <Row className="g-2">
            <Col lg={7}>
              <Button variant="primary" className="w-100">
                View All
              </Button>
            </Col>
            <Col lg={5}>
              <Button variant="light" className="w-100">
                Edit Data
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Col>;
};
export default CustomerVisit;