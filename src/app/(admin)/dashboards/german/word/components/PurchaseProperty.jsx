import propertiesImg from '@/assets/images/properties/p-10.jpg';
import avatar6 from '@/assets/images/users/avatar-6.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
const PurchaseProperty = () => {
  return <Col xl={4} lg={6}>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle as={'h4'}>Recent Purchase Property</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="position-relative">
            <Image src={propertiesImg} alt="properties" className="img-fluid rounded-top" />
            <span className="position-absolute top-0 end-0 p-1">
              <span className="badge bg-danger text-white fs-13">Sold</span>
            </span>
          </div>
          <div className="d-flex align-items-center gap-2 mt-3 pt-1 ">
            <div className="avatar bg-light rounded flex-centered">
              <IconifyIcon icon="solar:buildings-3-bold-duotone" width={24} height={24} className="fs-24 text-primary" />
            </div>
            <div>
              <Link href="" className="text-dark fw-medium fs-16">
                Woodis B. Apartment
              </Link>
              <p className="text-muted mb-0">Bungalow Road Niobrara</p>
            </div>
            <div className="ms-auto">
              <p className="fw-medium text-dark fs-18 mb-0">{currency}80,675.00 </p>
            </div>
          </div>
          <Row className="mt-2 g-2">
            <Col lg={2} xs={4}>
              <span className="badge bg-light-subtle text-muted border fs-12">
                <span className="fs-16">
                  <IconifyIcon icon="solar:bed-broken" className="align-middle" />
                </span>
                &nbsp;4 Beds
              </span>
            </Col>
            <Col lg={2} xs={4}>
              <span className="badge bg-light-subtle text-muted border fs-12">
                <span className="fs-16">
                  <IconifyIcon icon="solar:bath-broken" className="align-middle" />
                </span>
                &nbsp;3 Bath
              </span>
            </Col>
            <Col lg={2} xs={4}>
              <span className="badge bg-light-subtle text-muted border fs-12">
                <span className="fs-16">
                  <IconifyIcon icon="solar:scale-broken" className="align-middle" />
                </span>
                &nbsp;1700ft
              </span>
            </Col>
            <Col lg={2} xs={4}>
              <span className="badge bg-light-subtle text-muted border fs-12">
                <span className="fs-16">
                  <IconifyIcon icon="solar:double-alt-arrow-up-broken" className="align-middle" />
                </span>
                &nbsp;6 Floor
              </span>
            </Col>
          </Row>
          <div className="d-flex align-items-center gap-2 mt-3 pt-2">
            <div className="avatar">
              <Image src={avatar6} alt="avatar-3" className="img-fluid rounded-circle" />
            </div>
            <div className="d-block">
              <span className="text-dark">
                <Link href="" className="text-dark fw-medium fs-15">
                  Tiia Karppinen
                </Link>
              </span>
              <p className="mb-0 fs-14 text-muted">tiiakarppinen@teleworm.us</p>
            </div>
            <div className="ms-auto">
              <IconifyIcon icon="ri:checkbox-circle-line" className=" fs-20 text-success" />
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>;
};
export default PurchaseProperty;