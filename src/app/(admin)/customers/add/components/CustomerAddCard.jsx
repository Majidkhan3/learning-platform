import avatar2 from '@/assets/images/users/avatar-2.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import Image from 'next/image';
import { Button, Card, CardBody, Col, Row } from 'react-bootstrap';
const CustomerAddCard = () => {
  return <Col xl={3} lg={12}>
      <Card className="overflow-hidden">
        <CardBody>
          <div className="customer-bg rounded position-relative">
            <Image src={avatar2} alt="avatar" className="avatar-xl border border-light border-3 rounded-circle position-absolute top-100 start-0 translate-middle ms-5" />
          </div>
          <div className="mt-5 pt-3 ms-1">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0 text-dark fw-semibold">Daavid Nummi</h4>
              <div>
                <span className="badge bg-success text-white fs-12 px-2 py-1">Available</span>
              </div>
            </div>
            <p className="text-muted fw-medium fs-14 mb-1">
              <span className="text-dark me-1">Email Address : </span> daavidnumminen@teleworm.us
            </p>
            <p className="text-muted fw-medium fs-14 mb-1">
              <span className="text-dark me-1">Contact Number : </span> +231 06-75820711
            </p>
            <p className="text-muted fw-medium fs-14 mb-1">
              <span className="text-dark me-1">Address : </span> Schoolstraat 161 5151 HH Drunen
            </p>
            <Row className="mt-3 justify-content-between">
              <Col lg={4}>
                <p className="fw-medium mb-2">View Property</p>
                <h5 className="mb-0 fw-semibold text-dark">231</h5>
              </Col>
              <Col lg={4}>
                <p className="fw-medium mb-2">Own Property</p>
                <h5 className="mb-0 fw-semibold text-dark">27</h5>
              </Col>
              <Col lg={4}>
                <p className="fw-medium mb-2">Invest Property</p>
                <h5 className="mb-0 fw-semibold text-dark">{currency}142,465</h5>
              </Col>
            </Row>
            <h4 className="mt-3 fs-17">Social Information :</h4>
            <ul className="list-inline d-flex gap-1 mb-0 align-items-center mt-3">
              <li className="list-inline-item">
                <Button variant="soft-primary" href="" className="avatar-sm d-flex align-items-center justify-content-center fs-20">
                  <span>
                    {' '}
                    <IconifyIcon icon="ri:facebook-fill" />{' '}
                  </span>
                </Button>
              </li>
              <li className="list-inline-item">
                <Button variant="soft-danger" href="" className="avatar-sm d-flex align-items-center justify-content-center fs-20">
                  <span>
                    {' '}
                    <IconifyIcon icon="ri:instagram-fill" />{' '}
                  </span>
                </Button>
              </li>
              <li className="list-inline-item">
                <Button variant="soft-info" href="" className="avatar-sm d-flex align-items-center justify-content-center  fs-20">
                  <span>
                    {' '}
                    <IconifyIcon icon="ri:twitter-fill" />{' '}
                  </span>
                </Button>
              </li>
              <li className="list-inline-item">
                <Button variant="soft-success" href="" className="avatar-sm d-flex align-items-center justify-content-center fs-20">
                  <span>
                    {' '}
                    <IconifyIcon icon="ri:whatsapp-fill" />{' '}
                  </span>
                </Button>
              </li>
              <li className="list-inline-item">
                <Button variant="soft-warning" href="" className="avatar-sm d-flex align-items-center justify-content-center fs-20">
                  <span>
                    {' '}
                    <IconifyIcon icon="ri:mail-fill" />{' '}
                  </span>
                </Button>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </Col>;
};
export default CustomerAddCard;