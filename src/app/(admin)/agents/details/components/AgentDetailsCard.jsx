'use client';

import avatar2 from '@/assets/images/users/avatar-2.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import { propertyFileData, propertyStatusData, reviewData } from '../data';
const AgentStatCard = ({
  count,
  icon,
  progress,
  title,
  variant
}) => {
  const AgentDetailsOptions = {
    series: [progress],
    chart: {
      width: 90,
      height: 90,
      type: 'radialBar',
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '50%'
        },
        track: {
          margin: 0,
          background: variant
        },
        dataLabels: {
          show: false
        }
      }
    },
    grid: {
      padding: {
        top: -15,
        bottom: -15
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Cricket'],
    colors: [variant]
  };
  return <Card className="mb-0 shadow-none border">
      <CardBody>
        <Row className="justify-content-between align-items-center">
          <Col xl={5}>
            <div className="avatar bg-primary bg-opacity-10 rounded mb-3 flex-centered">
              <IconifyIcon icon={icon} width={28} height={28} className="fs-28 text-primary" />
            </div>
            <p className="fw-medium fs-15 mb-1">{title}</p>
            <p className="mb-0 fw-semibold text-dark fs-20">{count}</p>
          </Col>
          <Col lg={6}>
            <ReactApexChart options={AgentDetailsOptions} series={AgentDetailsOptions.series} height={90} type="radialBar" className="apex-charts" />
          </Col>
        </Row>
      </CardBody>
    </Card>;
};
const PropertyStatus = () => {
  return <div className="mt-4">
      <CardTitle as={'h4'} className="mb-3">
        Property Status :
      </CardTitle>
      <Row className="g-2">
        {propertyStatusData.map((item, idx) => <Col xl={4} lg={6} key={idx}>
            <AgentStatCard {...item} />
          </Col>)}
      </Row>
    </div>;
};
const Reviews = () => {
  const ReviewCard = ({
    country,
    day,
    description,
    image,
    name,
    userName
  }) => {
    return <Card className="bg-light-subtle mb-0">
        <CardBody>
          <div className="d-flex align-items-center gap-2">
            <Image src={image} alt="avatar" className="rounded-circle avatar-md" />
            <div>
              <h5 className="fw-semibold text-dark mb-1">{name}</h5>
              <p className="m-0">
                @{userName} <span className="ms-1">({country})</span>
              </p>
            </div>
          </div>
          <p className="my-3">&quot;{description}&quot;</p>
          <ul className="d-flex text-warning m-0 fs-18  list-unstyled">
            <li>
              <IconifyIcon icon="ri:star-fill" />
            </li>
            <li>
              <IconifyIcon icon="ri:star-fill" />
            </li>
            <li>
              <IconifyIcon icon="ri:star-fill" />
            </li>
            <li>
              <IconifyIcon icon="ri:star-fill" />
            </li>
            <li>
              <IconifyIcon icon="ri:star-half-line" />
            </li>
          </ul>
          <p className="fw-medium text-muted mb-0">{day} Days Ago</p>
        </CardBody>
      </Card>;
  };
  return <div className="mt-4">
      <CardTitle as={'h4'} className="mb-3">
        Reviews :
      </CardTitle>
      <Row>
        {reviewData.map((item, idx) => <Col lg={6} key={idx}>
            <ReviewCard {...item} />
          </Col>)}
      </Row>
    </div>;
};
const PropertyFile = () => {
  return <>
      <CardTitle as={'h4'} className="mt-4">
        Property File :
      </CardTitle>
      <div className="mt-3 d-flex flex-wrap gap-2">
        {propertyFileData.map((item, idx) => <div className="d-flex p-2 gap-2 bg-light-subtle align-items-center text-start position-relative border rounded" key={idx}>
            <IconifyIcon icon={item.icon} className={`text-${item.variant} fs-24`} />
            <div>
              <h4 className="fs-14 mb-1">
                <Link href="" className="text-dark stretched-link">
                  {item.name}
                </Link>
              </h4>
              <p className="fs-12 mb-0">{item.data} MB</p>
            </div>
            <IconifyIcon icon="ri:download-cloud-line" className=" fs-20 text-muted" />
          </div>)}
      </div>
    </>;
};
const AgentDetailsCard = () => {
  return <Card>
      <CardBody>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="position-relative">
            <Image src={avatar2} alt="avatar-2" className="avatar-xl user-img img-thumbnail rounded-circle" />
            <div className="badge bg-success rounded-2 position-absolute bottom-0 start-50 translate-middle-x mb-n1 fs-11"># 1</div>
          </div>
          <div className="d-block">
            <Link href="" className="text-dark fw-medium fs-16">
              Michael A. Miner
            </Link>
            <p className="mb-0">michaelminer@dayrep.com</p>
          </div>
          <div className="ms-lg-auto">
            <Link href="" className="btn btn-primary">
              Message
            </Link>
            &nbsp;
            <Link href="" className="btn btn-outline-secondary">
              Work With Michael
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <p className="d-flex align-items-center gap-2">
            <IconifyIcon icon="solar:map-point-wave-bold-duotone" className="fs-18 text-primary" />
            Lincoln Drive Harrisburg, PA 17101 U.S.A
          </p>
          <p className="d-flex align-items-center gap-2">
            <IconifyIcon icon="solar:outgoing-call-rounded-bold-duotone" className="fs-18 text-primary" />
            +123 864-357-7713
          </p>
          <CardTitle as={'h4'} className="mb-2 mt-3">
            Social Media :
          </CardTitle>
          <ul className="list-inline d-flex gap-1 mb-0 mt-3 align-items-center">
            <li className="list-inline-item">
              <Link href="" className="btn btn-soft-primary avatar-sm d-flex align-items-center justify-content-center fs-20">
                <span>
                  {' '}
                  <IconifyIcon icon="ri:facebook-fill" />
                </span>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="" className="btn btn-soft-danger avatar-sm d-flex align-items-center justify-content-center fs-20">
                <span>
                  {' '}
                  <IconifyIcon icon="ri:instagram-line" />
                </span>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="" className="btn btn-soft-info avatar-sm d-flex align-items-center justify-content-center  fs-20">
                <span>
                  {' '}
                  <IconifyIcon icon="ri:twitter-line" />
                </span>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="" className="btn btn-soft-success avatar-sm d-flex align-items-center justify-content-center fs-20">
                <span>
                  {' '}
                  <IconifyIcon icon="ri:whatsapp-line" />
                </span>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="" className="btn btn-soft-warning avatar-sm d-flex align-items-center justify-content-center fs-20">
                <span>
                  {' '}
                  <IconifyIcon icon="ri:mail-line" />
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <CardTitle as={'h4'} className="mb-2">
            About Michael :
          </CardTitle>
          <p className="mb-2">
            Meet Michael, a dedicated and experienced real estate agent who is committed to making your real estate journey smooth and successful.
            With a passion for helping clients achieve their dreams, Michael brings a wealth of knowledge and expertise to every transaction.
          </p>
          <p className="mb-2">
            Michael has been a prominent figure in the real estate industry for over a decade. His career began with a focus on residential
            properties, quickly expanding to include commercial real estate and investment properties. Michael&apos;s extensive experience and deep
            understanding of the market allow him to navigate even the most complex transactions with ease.
          </p>
          <p className="mb-2">
            <span className="fw-medium text-dark">Agency</span>
            <span className="mx-2">:</span>Universo Realtors
          </p>
          <p className="mb-2">
            <span className="fw-medium text-dark">Agent License</span>
            <span className="mx-2">:</span>LC-5758-2048-3944
          </p>
          <p className="mb-2">
            <span className="fw-medium text-dark">Text Number</span>
            <span className="mx-2">:</span>TC-9275-PC-55685
          </p>
          <p className="mb-2">
            <span className="fw-medium text-dark">Services Area</span>
            <span className="mx-2">:</span>Lincoln Drive Harrisburg
          </p>
          <div className="my-2">
            <Link href="" className="link-primary fw-medium">
              Viw More <IconifyIcon icon="ri:arrow-right-line" />
            </Link>
          </div>
        </div>
        <PropertyStatus />
        <Reviews />
        <PropertyFile />
      </CardBody>
    </Card>;
};
export default AgentDetailsCard;