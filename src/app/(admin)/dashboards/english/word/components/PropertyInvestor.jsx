'use client';

import avatar2 from '@/assets/images/users/avatar-2.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import ReactApexChart from 'react-apexcharts';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col } from 'react-bootstrap';
import { propertyOptions } from '../data';
const PropertyInvestor = () => {
  return <Col xl={4}>
      <Card>
        <CardHeader>
          <CardTitle>Property Investor</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="d-flex align-items-center gap-3">
            <Image src={avatar2} className="rounded avatar-xl img-thumbnail" alt="img-7" />
            <div>
              <h4 className="mb-1">
                <Link href="/customers/details" className="mb-1 link-dark fw-semibold">
                  Daavid Nummi
                </Link>
              </h4>
              <Link href="" className="link-primary fw-medium fs-14">
                EastTribune.nl
              </Link>
              <ul className="list-inline d-flex flex-wrap gap-1 mb-0 align-items-center mt-2">
                <li className="list-inline-item">
                  <Button variant="soft-primary" href="" className="d-flex align-items-center justify-content-center avatar-sm">
                    <span>
                      <IconifyIcon width={20} height={20} icon="ri:facebook-fill" />
                    </span>
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button variant="soft-danger" className="d-flex align-items-center justify-content-center avatar-sm">
                    <span>
                      {' '}
                      <IconifyIcon width={20} height={20} icon="ri:instagram-fill" />
                    </span>
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button variant="soft-info" className="d-flex align-items-center justify-content-center avatar-sm ">
                    <span>
                      {' '}
                      <IconifyIcon width={20} height={20} icon="ri:twitter-fill" />
                    </span>
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button variant="soft-success" className="d-flex align-items-center justify-content-center avatar-sm">
                    <span>
                      {' '}
                      <IconifyIcon width={20} height={20} icon="ri:whatsapp-fill" />
                    </span>
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button variant="soft-warning" className="d-flex align-items-center justify-content-center avatar-sm">
                    <span>
                      {' '}
                      <IconifyIcon width={20} height={20} icon="ri:mail-fill" />
                    </span>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <ReactApexChart options={propertyOptions} series={propertyOptions.series} height={182} type="bar" className="apex-charts mt-3" />
          </div>
        </CardBody>
        <CardFooter className="border-top border-dashed gap-1 hstack">
          <Button variant="primary" className="w-100">
            Open Chat
          </Button>
          <Button variant="light" className="w-100">
            Call To Customer
          </Button>
        </CardFooter>
      </Card>
    </Col>;
};
export default PropertyInvestor;