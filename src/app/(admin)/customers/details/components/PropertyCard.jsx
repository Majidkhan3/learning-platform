import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
const PropertyCard = ({
  property
}) => {
  const {
    bath,
    beds,
    size,
    image,
    name,
    location,
    save,
    icon,
    flor
  } = property;
  return <Card className="overflow-hidden">
      <div className="position-relative">
        <Image src={image} alt="properties" className="img-fluid rounded-top" />
        <span className="position-absolute top-0 start-0 p-1">
          {save ? <button type="button" className="btn btn-warning avatar-sm d-inline-flex align-items-center justify-content-center fs-20 rounded text-light ">
              {' '}
              <span>
                {' '}
                <IconifyIcon icon="solar:bookmark-broken" />
              </span>
            </button> : <button type="button" className="btn bg-warning-subtle avatar-sm d-inline-flex align-items-center justify-content-center fs-20 rounded text-warning">
              <span>
                <IconifyIcon icon="solar:bookmark-broken" />
              </span>
            </button>}
        </span>
      </div>
      <CardBody>
        <div className="d-flex align-items-center gap-2">
          <div className="avatar bg-light rounded flex-centered">
            <IconifyIcon icon={icon} width={24} height={24} className="fs-24 text-primary" />
          </div>
          <div>
            <Link href="" className="text-dark fw-medium fs-16">
              {name}
            </Link>
            <p className="text-muted mb-0">{location}</p>
          </div>
        </div>
        <Row className="mt-2 g-2">
          <Col lg={4} xs={4}>
            <span className="badge bg-light-subtle text-muted border fs-12">
              <span className="fs-16">
                <IconifyIcon icon="solar:bed-broken" className="align-middle" />
              </span>
              &nbsp;{beds} Beds
            </span>
          </Col>
          <Col lg={4} xs={4}>
            <span className="badge bg-light-subtle text-muted border fs-12">
              <span className="fs-16">
                <IconifyIcon icon="solar:bath-broken" className="align-middle" />
              </span>
              &nbsp;{bath} Bath
            </span>
          </Col>
          <Col lg={4} xs={4}>
            <span className="badge bg-light-subtle text-muted border fs-12">
              <span className="fs-16">
                <IconifyIcon icon="solar:scale-broken" className="align-middle" />
              </span>
              &nbsp;{size}ft
            </span>
          </Col>
          <Col lg={4} xs={4}>
            <span className="badge bg-light-subtle text-muted border fs-12">
              <span className="fs-16">
                <IconifyIcon icon="solar:double-alt-arrow-up-broken" className="align-middle" />
              </span>
              &nbsp;{flor} Floor
            </span>
          </Col>
        </Row>
      </CardBody>
    </Card>;
};
export default PropertyCard;