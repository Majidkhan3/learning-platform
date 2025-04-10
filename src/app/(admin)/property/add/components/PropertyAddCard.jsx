import properties1 from '@/assets/images/properties/p-1.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import Image from 'next/image';
import { Button, Card, CardBody, CardFooter, Col, Row } from 'react-bootstrap';
const PropertyAddCard = () => {
  return <Col xl={3} lg={4}>
      <Card>
        <CardBody>
          <div className="position-relative">
            <Image src={properties1} alt="properties" className="img-fluid rounded bg-light" />
            <span className="position-absolute top-0 end-0 p-1">
              <span className="badge bg-success text-light fs-13">For Rent</span>
            </span>
          </div>
          <div className="mt-3">
            <h4 className="mb-1">
              Dvilla Residences Batu<span className="fs-14 text-muted ms-1">(Residences)</span>
            </h4>
            <p className="mb-1">4604 , Philli Lane Kiowa U.S.A</p>
            <h5 className="text-dark fw-medium mt-3">Price :</h5>
            <h4 className="fw-semibold mt-2 text-muted">{currency}8,930.00</h4>
          </div>
          <Row className="mt-2 g-2">
            <Col lg={3} xs={3}>
              <span className="badge bg-light-subtle text-muted border fs-12">
                <span className="fs-16">
                  <IconifyIcon icon="solar:bed-broken" className="align-middle" />
                </span>
                &nbsp;5 Beds
              </span>
            </Col>
            <Col lg={3} xs={3}>
              <span className="badge bg-light-subtle text-muted border fs-12">
                <span className="fs-16">
                  <IconifyIcon icon="solar:bath-broken" className="align-middle" />
                </span>
                &nbsp;4 Bath
              </span>
            </Col>
            <Col lg={3} xs={3}>
              <span className="badge bg-light-subtle text-muted border fs-12">
                <span className="fs-16">
                  <IconifyIcon icon="solar:scale-broken" className="align-middle" />
                </span>
                &nbsp;1400ft
              </span>
            </Col>
            <Col lg={3} xs={3}>
              <span className="badge bg-light-subtle text-muted border fs-12">
                <span className="fs-16">
                  <IconifyIcon icon="solar:double-alt-arrow-up-broken" className="align-middle" />
                </span>
                &nbsp;3 Floor
              </span>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="bg-light-subtle">
          <Row className="g-2">
            <Col lg={6}>
              <Button variant="outline-primary" className="w-100">
                Add Property
              </Button>
            </Col>
            <Col lg={6}>
              <Button variant="danger" className="w-100">
                Cancel
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Col>;
};
export default PropertyAddCard;