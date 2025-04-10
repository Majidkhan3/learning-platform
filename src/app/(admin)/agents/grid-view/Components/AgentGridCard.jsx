'use client';

import homeImg from '@/assets/images/home-2.png';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const PropertiesChart = () => {
  const GridOptions = {
    chart: {
      height: 123,
      type: 'donut'
    },
    series: [80, 40, 30],
    legend: {
      show: false
    },
    stroke: {
      width: 0
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: false,
            total: {
              showAlways: true,
              show: true
            }
          }
        }
      }
    },
    labels: ['Vacant', 'Occupied', 'Unlisted'],
    colors: ['#027ef4', '#f0934e', '#47ad94'],
    dataLabels: {
      enabled: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        }
      }
    }]
  };
  return <Col xl={6} lg={12}>
      <Card>
        <CardBody>
          <Row className="align-items-center">
            <Col lg={7}>
              <h4 className="text-dark mb-1">Welcome Back , Gaston</h4>
              <p className="fs-14">This is your properties portfolio report</p>
              <Row className="align-items-center text-center mb-2">
                <Col lg={7} className="border-end border-light">
                  <Row className="align-items-center">
                    <Col lg={6}>
                      <div id="grid-chart" className="apex-charts" />
                      <ReactApexChart options={GridOptions} series={GridOptions.series} height={123} type="donut" className="apex-charts mb-4" />
                    </Col>
                    <Col lg={6}>
                      <h5>Properties</h5>
                      <h2 className="fw-semibold text-dark">250</h2>
                    </Col>
                  </Row>
                </Col>
                <Col lg={5}>
                  <div className="ps-2">
                    <p className="d-flex align-items-center mb-2 gap-2">
                      <IconifyIcon icon="ri:circle-fill" className="text-primary" />
                      80 Vacant
                    </p>
                    <p className="d-flex align-items-center mb-2 gap-2">
                      <IconifyIcon icon="ri:circle-fill" className="text-warning" />
                      40 Occupied
                    </p>
                    <p className="d-flex align-items-center gap-2 mb-0">
                      <IconifyIcon icon="ri:circle-fill" className="text-success" />
                      30 Unlisted
                    </p>
                  </div>
                </Col>
              </Row>
              <p className="text-muted mb-0 d-flex align-items-center gap-1">
                Last Updated <span>:</span> <span className="text-dark">4 day ago</span>
              </p>
            </Col>
            <Col lg={5} className="text-end">
              <Image src={homeImg} alt="home" className="img-fluid" />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>;
};
const DevelopmentTask = () => {
  return <Col xl={3} lg={6}>
      <Card>
        <CardHeader className="d-flex align-items-center border-bottom border-dashed">
          <CardTitle as={'h4'} className="mb-0">
            Development Task
          </CardTitle>
          <div className="ms-auto">
            <Dropdown>
              <DropdownToggle as={'a'} className="drop-arrow-none card-drop p-0 " data-bs-toggle="dropdown" aria-expanded="false">
                <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Download</DropdownItem>
                <DropdownItem>Share</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={5}>
              <h5 className="text-dark fw-medium mb-1">250</h5>
              <p className="text-muted mb-0">Total properties </p>
            </Col>
            <Col lg={4} xs={3} className="text-center">
              <h5 className="text-dark fw-medium mb-1">30</h5>
              <p className="text-muted mb-0">Pending</p>
            </Col>
            <Col xl={3} xs={3} className="text-end">
              <h5 className="text-dark fw-medium mb-1">04</h5>
              <p className="text-muted mb-0">Day Left</p>
            </Col>
          </Row>
          <div className="progress progress-lg bg-light-subtle rounded-0 gap-1 overflow-visible mt-2" style={{
          height: 10
        }}>
            <div className="progress-bar bg-primary rounded-pill" role="progressbar" style={{
            width: '40%'
          }}></div>
            <div className="progress-bar bg-warning rounded-pill" role="progressbar" style={{
            width: '30%'
          }}></div>
            <div className="progress-bar bg-info rounded-pill" role="progressbar" style={{
            width: '30%'
          }}></div>
          </div>
          <p className="mb-0 mt-3">
            <span className="text-success fw-medium mb-0">
              <IconifyIcon icon="ri:arrow-up-line" />
              34.4%
            </span>{' '}
            vs last month
          </p>
        </CardBody>
        <CardFooter className="d-flex justify-content-between  py-2">
          <p className="text-muted mb-0 d-flex align-items-center gap-1">
            Last Updated <span>:</span> <span className="text-dark">12 hour ago</span>
          </p>
          <Link href="" className="link-primary fw-medium">
            View More
          </Link>
        </CardFooter>
      </Card>
    </Col>;
};
const SealProperties = () => {
  const SealPropertiesOptions = {
    chart: {
      type: 'line',
      height: 115,
      sparkline: {
        enabled: true
      }
    },
    series: [{
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    }],
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    colors: ['#ffffff'],
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return '';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };
  return <Col xl={3} lg={6}>
      <Card className="bg-primary bg-gradient">
        <CardBody>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <CardTitle as={'h4'} className="mb-2 text-white">
                Total Seal Properties{' '}
              </CardTitle>
              <p className="text-white fw-medium fs-24 mb-0">450</p>
            </div>
            <div>
              <div className="avatar-md bg-light rounded flex-centered">
                <IconifyIcon icon="solar:home-bold-duotone" width={32} height={32} className="fs-32 text-primary" />
              </div>
            </div>
          </div>
          <div id="seal_properties" data-colors="#ffffff" className="apex-charts" />
          <ReactApexChart options={SealPropertiesOptions} series={SealPropertiesOptions.series} height={115} type="line" className="apex-charts" />
        </CardBody>
      </Card>
    </Col>;
};
const AgentGridCard = () => {
  return <Row>
      <PropertiesChart />
      <DevelopmentTask />
      <SealProperties />
    </Row>;
};
export default AgentGridCard;