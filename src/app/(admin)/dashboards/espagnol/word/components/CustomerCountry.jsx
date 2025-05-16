import Image from 'next/image';
import { customersCountryData } from '../data';
import { Card, CardBody, Col, ProgressBar, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
const CountryCard = ({
  amount,
  change,
  country,
  image,
  progress,
  totalCustomers
}) => {
  return <Card>
      <CardBody>
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-3 bg-light avatar d-flex align-items-center justify-content-center">
            <Image src={image} alt="flag" className="avatar-sm rounded" />
          </div>
          <div>
            <h4 className="text-dark fw-semibold mb-1">{country}</h4>
            <p className="mb-0 fw-medium">
              <span className="text-dark fw-semibold"> ${amount} </span> Per Month
            </p>
          </div>
        </div>
        <div className="d-flex align-items-end justify-content-between mt-3">
          <p className="mb-0 fw-medium fs-15">Total Customer</p>
          <div className="text-end">
            <p className="mb-1 fw-semibold text-dark">Today</p>
            <h4 className="text-success mb-0 fw-semibold icons-center">
              <IconifyIcon width={'20'} height={'20'} icon="ri-arrow-drop-up-fill" />+{change}
            </h4>
          </div>
        </div>
        <ProgressBar style={{
        height: 10
      }} now={progress} animated striped variant="bg-primary" className="mt-3  my-2 bg-opacity-75" role="progressbar" />
        <div className="d-flex align-items-center justify-content-between">
          <h4 className="text-dark fw-bold mb-0">{totalCustomers}</h4>
          <div>
            <p className="mb-0">Goal : 10,000</p>
          </div>
        </div>
      </CardBody>
    </Card>;
};
const CustomerCountry = () => {
  return <Row>
      {customersCountryData.map((item, idx) => <Col md={6} xl={6} key={idx}>
          <CountryCard {...item} />
        </Col>)}
    </Row>;
};
export default CustomerCountry;