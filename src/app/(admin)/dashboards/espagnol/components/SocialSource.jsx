'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import ReactApexChart from 'react-apexcharts';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { socialOptions } from '../data';
import SalesLocation from './SalesLocation';
import WeeklySales from './WeeklySales';
const SocialSourceCard = () => {
  return <Col xl={3} lg={6}>
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center pb-1">
          <div>
            <CardTitle as={'h4'} className="mb-1">
              Social Source
            </CardTitle>
            <p className="fs-13 mb-0">Total Traffic In This Week</p>
          </div>
          <Dropdown>
            <DropdownToggle as={'a'} className="btn btn-sm btn-outline-light rounded content-none icons-center" data-bs-toggle="dropdown" aria-expanded="false">
              This Month <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>Week</DropdownItem>
              <DropdownItem>Months</DropdownItem>
              <DropdownItem>Years</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody>
          <ReactApexChart options={socialOptions} series={socialOptions.series} height={349} type="radialBar" className="apex-charts" />
          <p className="mb-0 fs-18 fw-medium text-dark">
            <IconifyIcon icon="ri:group-fill" /> Buyers : <span className="text-primary fw-bold">70</span>
          </p>
        </CardBody>
        <CardFooter className="border-top d-flex align-items-center justify-content-between">
          <h5 className="mb-0">See More Statistic</h5>
          <div>
            <Button variant="primary" size="sm">
              See Details
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Col>;
};
const SocialSource = () => {
  return <Row>
      <SocialSourceCard />
      <SalesLocation />
      <WeeklySales />
    </Row>;
};
export default SocialSource;