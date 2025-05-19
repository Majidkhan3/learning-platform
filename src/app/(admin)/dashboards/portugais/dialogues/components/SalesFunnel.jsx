'use client';

import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { salesFunnelOptions } from '../data';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
const SalesFunnel = () => {
  return <Col lg={6}>
      <Card>
        <CardHeader className="d-flex  justify-content-between align-items-center border-0">
          <CardTitle as={'h4'}>Sales Funnel</CardTitle>
          <Dropdown>
            <DropdownToggle as={'a'} className="btn btn-sm btn-outline-light rounded content-none icons-center" data-bs-toggle="dropdown" aria-expanded="false">
              This Month <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>Today</DropdownItem>
              <DropdownItem>Month</DropdownItem>
              <DropdownItem>Years</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody>
          <div className="mx-n3">
            <ReactApexChart options={salesFunnelOptions} series={salesFunnelOptions.series} height={165} type="area" className="apex-charts mt-2" />
          </div>
        </CardBody>
        <CardFooter className="p-0 border-top">
          <div className="bg-light-subtle p-1 rounded">
            <Row className="text-center">
              <Col lg={3} xs={3} className="border-end">
                <p className="mb-1 text-muted"> Visitors</p>
                <p className="fs-16 text-dark fw-medium mb-1">123.7k</p>
              </Col>
              <Col lg={3} xs={3} className="border-end">
                <p className="mb-1 text-muted">Views</p>
                <p className="fs-16 text-dark fw-medium mb-1">167.1k</p>
              </Col>
              <Col lg={3} xs={3} className="border-end">
                <p className="mb-1 text-muted">Leads</p>
                <p className="fs-16 text-dark fw-medium mb-1">89.7k</p>
              </Col>
              <Col lg={3} xs={3}>
                <p className="mb-1 text-muted">Market</p>
                <p className="fs-16 text-dark fw-medium mb-1">34.8k</p>
              </Col>
            </Row>
          </div>
        </CardFooter>
      </Card>
    </Col>;
};
export default SalesFunnel;