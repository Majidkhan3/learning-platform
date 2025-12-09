'use client';

import avatar10 from '@/assets/images/users/avatar-10.jpg';
import avatar6 from '@/assets/images/users/avatar-6.jpg';
import avatar7 from '@/assets/images/users/avatar-7.jpg';
import avatar8 from '@/assets/images/users/avatar-8.jpg';
import avatar9 from '@/assets/images/users/avatar-9.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardHeader, CardTitle, Col } from 'react-bootstrap';
import { customersInvestOptions } from '../data';
import { currency } from '@/context/constants';
const CustomersInvest = () => {
  return <Col lg={6}>
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Recent Customers Invest</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="d-flex flex-wrap gap-2 align-items-center bg-light-subtle border justify-content-between p-3 rounded mb-3">
            <div>
              <h5 className="fw-medium mb-1 text-dark fs-16">Customer Buy Property</h5>
              <div className="avatar-group mt-3">
                <div className="avatar d-flex align-items-center justify-content-center">
                  <Image src={avatar6} alt="" className="rounded-circle avatar border border-light border-3" />
                </div>
                <div className="avatar d-flex align-items-center justify-content-center">
                  <Image src={avatar7} alt="" className="rounded-circle avatar border border-light border-3" />
                </div>
                <div className="avatar d-flex align-items-center justify-content-center">
                  <Image src={avatar8} alt="" className="rounded-circle avatar border border-light border-3" />
                </div>
                <div className="avatar d-flex align-items-center justify-content-center">
                  <Image src={avatar9} alt="" className="rounded-circle avatar border border-light border-3" />
                </div>
                <div className="avatar d-flex align-items-center justify-content-center">
                  <Image src={avatar10} alt="" className="rounded-circle avatar border border-light border-3" />
                </div>
              </div>
            </div>
            <div className="text-end">
              <h5 className="fw-medium mb-3 text-dark fs-16">Revenue</h5>
              <h3 className="text-dark fw-bold d-flex align-items-center gap-2 mb-0">
                {' '}
                <span className="text-success mb-0 fs-16 fw-semibold">
                  <IconifyIcon icon="ri:arrow-drop-up-fill" />
                  +22.0
                </span>{' '}
                {currency}67435.00
              </h3>
            </div>
          </div>
          <ReactApexChart options={customersInvestOptions} series={customersInvestOptions.series} height={300} type="bar" className="apex-charts" />
        </CardBody>
      </Card>
    </Col>;
};
export default CustomersInvest;