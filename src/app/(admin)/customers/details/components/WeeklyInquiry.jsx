'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const WeeklyInquiry = () => {
  const WeeklyInquiryOptions = {
    chart: {
      height: 294,
      parentHeightOffset: 0,
      type: 'bar',
      toolbar: {
        show: !1
      }
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        columnWidth: '40%',
        borderRadius: 4,
        distributed: !0
      }
    },
    grid: {
      show: !1,
      padding: {
        top: -20,
        bottom: -10,
        left: 0,
        right: 0
      }
    },
    colors: ['#604ae3', '#d3cbff', '#d3cbff', '#d3cbff'],
    dataLabels: {
      enabled: true
    },
    series: [{
      name: 'Inquiry',
      data: [4, 5, 6, 4, 9, 5, 4]
    }],
    legend: {
      show: !1
    },
    xaxis: {
      categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      axisBorder: {
        show: !1
      },
      axisTicks: {
        show: !1
      }
    },
    yaxis: {
      labels: {
        show: !1
      }
    },
    tooltip: {
      enabled: !0
    },
    responsive: [{
      breakpoint: 1025,
      options: {
        chart: {
          height: 199
        }
      }
    }]
  };
  return <Card>
      <CardHeader className="d-flex align-items-center justify-content-between">
        <CardTitle as={'h4'}>Weekly Inquiry</CardTitle>
        <Dropdown>
          <DropdownToggle as={'a'} className="btn btn-sm btn-outline-light rounded show  content-none icons-center" data-bs-toggle="dropdown" aria-expanded="true">
            This Month <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end" data-popper-placement="bottom-end" style={{
          position: 'absolute',
          inset: '0px 0px auto auto',
          margin: 0,
          transform: 'translate(0px, 34px)'
        }}>
            <DropdownItem>Day</DropdownItem>
            <DropdownItem>Month</DropdownItem>
            <DropdownItem>Year</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody>
        <Row>
          <Col xs={12}>
            <ReactApexChart options={WeeklyInquiryOptions} series={WeeklyInquiryOptions.series} height={294} type="bar" className="apex-charts" />
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="d-flex align-items-center justify-content-between border-top">
        <p className="mb-0 fw-medium fs-15">Jan-Dec 2023 </p>
        <p className="mb-0 text-dark fw-semibold fs-15">First Week 37</p>
      </CardFooter>
    </Card>;
};
export default WeeklyInquiry;