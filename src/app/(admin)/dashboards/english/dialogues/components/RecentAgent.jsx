'use client';

import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { agentOptions } from '../data';
import { currency } from '@/context/constants';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
const RecentAgent = () => {
  return <Col lg={12}>
      <Card>
        <CardHeader className="d-flex  justify-content-between align-items-center border-0">
          <div>
            <CardTitle as={'h4'} className="mb-1">
              Recent Agent Status
            </CardTitle>
            <p className="text-muted mb-0">More than {currency}50K</p>
          </div>
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
          <Row className="align-items-center g-2">
            <Col lg={12}>
              <Row className="g-2 text-center">
                <Col lg={4}>
                  <div className="border bg-light-subtle p-2 rounded">
                    <p className="text-muted mb-1">Today</p>
                    <h5 className="text-dark mb-1">{currency}8,839</h5>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="border bg-light-subtle p-2 rounded">
                    <p className="text-muted mb-1">This Month</p>
                    <h5 className="text-dark mb-1">
                      {currency}52,356{' '}
                      <span className="text-success font-size-13">
                        0.2 % <IconifyIcon icon="mdi:arrow-up" className="ms-1" />
                      </span>
                    </h5>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="border bg-light-subtle p-2 rounded">
                    <p className="text-muted mb-1">This Year</p>
                    <h5 className="text-dark mb-1">
                      {currency}78M{' '}
                      <span className="text-success font-size-13">
                        0.1 % <IconifyIcon icon="mdi:arrow-up" className="ms-1" />
                      </span>
                    </h5>
                  </div>
                </Col>
              </Row>
              <ReactApexChart options={agentOptions} series={agentOptions.series} height={330} type="line" className="apex-charts mt-5" />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>;
};
export default RecentAgent;