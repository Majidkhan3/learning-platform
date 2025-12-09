'use client';

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { salesChart } from '../data';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
const SalesChart = () => {
  return <Col xl={8}>
      <Card className="overflow-hidden">
        <CardHeader className="d-flex justify-content-between align-items-center pb-1">
          <div>
            <CardTitle as={'h4'}>Sales Analytic</CardTitle>
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
          <div className="text-end">
            <p className="mb-0 fs-18 fw-medium text-dark icons-center">
              <IconifyIcon icon="ri:wallet-3-fill" className="me-1" /> Earnings : <span className="text-primary fw-bold">&nbsp;{currency}85,934</span>
            </p>
          </div>
          <Row className="align-items-top text-center">
            <Col lg={12}>
              <ReactApexChart options={salesChart} series={salesChart.series} height={341} type="area" className="apex-charts mt-2" />
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="p-2 bg-light-subtle text-center">
          <Row className="g-3">
            <Col md={4} className="border-end">
              <p className="text-muted mb-1">Income</p>
              <p className="text-dark fs-18 fw-medium d-flex align-items-center justify-content-center gap-2 mb-0">
                23,675.00{' '}
                <span className="badge text-success bg-success-subtle fs-12">
                  <IconifyIcon icon="ri:arrow-up-line" />
                  0.08%
                </span>
              </p>
            </Col>
            <Col md={4} className="border-end">
              <p className="text-muted mb-1">Expenses</p>
              <p className="text-dark fs-18 fw-medium d-flex align-items-center justify-content-center gap-2 mb-0">
                11,562.00{' '}
                <span className="badge text-danger bg-danger-subtle fs-12">
                  <IconifyIcon icon="ri:arrow-down-line" />
                  5.38%
                </span>
              </p>
            </Col>
            <Col md={4}>
              <p className="text-muted mb-1">Balance</p>
              <p className="text-dark fs-18 fw-medium d-flex align-items-center justify-content-center gap-2 mb-0">
                67,365.00{' '}
                <span className="badge text-success bg-success-subtle fs-12">
                  <IconifyIcon icon="ri:arrow-up-line" />
                  2.89%
                </span>
              </p>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Col>;
};
export default SalesChart;