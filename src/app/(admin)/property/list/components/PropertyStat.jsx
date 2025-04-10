import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Link from 'next/link';
import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import { propertyStatData } from '../data';
const PropertyStatCard = ({
  amount,
  change,
  icon,
  title,
  variant
}) => {
  return <Card>
      <CardBody>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <CardTitle as={'h4'} className="mb-2 ">
              {title}
            </CardTitle>
            <p className="text-muted fw-medium fs-22 mb-0">{amount}</p>
          </div>
          <div>
            <div className="avatar-md bg-primary bg-opacity-10 rounded flex-centered">
              <IconifyIcon icon={icon} width={32} height={32} className="fs-32 text-primary " />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-3">
          <p className="mb-0">
            <span className={`text-${variant} fw-medium mb-0`}>
              {variant == 'success' ? <IconifyIcon icon="ri:arrow-up-line" /> : <IconifyIcon icon="ri:arrow-down-line" />}
              {change}%
            </span>{' '}
            vs last month
          </p>
          <div>
            <Link href="" className="link-primary fw-medium">
              See Details <IconifyIcon icon="ri:arrow-right-line" className="align-middle" />
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>;
};
const PropertyStat = () => {
  return <Row>
      {propertyStatData.map((item, idx) => <Col md={6} xl={3} key={idx}>
          <PropertyStatCard {...item} />
        </Col>)}
    </Row>;
};
export default PropertyStat;