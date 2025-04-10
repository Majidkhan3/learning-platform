import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllCustomer } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, Col, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Customer Grid'
};
const CustomerGridCard = ({
  user,
  status,
  propertyOwn,
  propertyView,
  invest
}) => {
  return <Card className="overflow-hidden">
      <CardBody>
        <div className="customer-bg rounded position-relative">
          {user?.avatar && <Image src={user.avatar} alt="avatar2" className="avatar-xl border border-light border-3 rounded-circle position-absolute top-100 start-0 translate-middle ms-5" />}
          <span className="position-absolute top-0 end-0 p-1">
            <button type="button" className="btn btn-dark avatar-sm d-inline-flex align-items-center justify-content-center fs-20 rounded text-light">
              {' '}
              <span>
                <IconifyIcon icon="solar:pen-new-square-broken" />
              </span>
            </button>
          </span>
        </div>
        <div className="mt-5 pt-3 ms-1">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link href="/customers/details" className="fs-18 link-primary fw-semibold">
              {user?.name}
            </Link>
            <div>
              <span className={`badge bg-${status == 'Available' ? 'success' : 'danger'} text-white fs-12 px-2 py-1`}>{status}</span>
            </div>
          </div>
          <p className="text-muted fw-medium fs-14 mb-1">
            <span className="text-dark me-1">Email Address : </span> {user?.email}
          </p>
          <p className="text-muted fw-medium fs-14 mb-1">
            <span className="text-dark me-1">Contact Number : </span> {user?.contact}
          </p>
          <p className="text-muted fw-medium fs-14 mb-1">
            <span className="text-dark me-1">Address : </span> {user?.address}
          </p>
          <Row className="mt-3 justify-content-between">
            <Col lg={3}>
              <p className="fw-medium mb-2">View Property</p>
              <h5 className="mb-0 fw-semibold text-dark">{propertyView}</h5>
            </Col>
            <Col lg={3}>
              <p className="fw-medium mb-2">Own Property</p>
              <h5 className="mb-0 fw-semibold text-dark">{propertyOwn}</h5>
            </Col>
            <Col lg={4}>
              <p className="fw-medium mb-2">Invest On Property</p>
              <h5 className="mb-0 fw-semibold text-dark">${invest}</h5>
            </Col>
          </Row>
          <h4 className="mt-3 fs-17">Social Information :</h4>
          <ul className="list-inline d-flex gap-1 mb-0 align-items-center mt-3">
            <li className="list-inline-item">
              <Button variant="soft-primary" className="avatar-sm d-flex align-items-center justify-content-center fs-20">
                <span>
                  {' '}
                  <IconifyIcon icon="ri:facebook-fill" />
                </span>
              </Button>
            </li>
            <li className="list-inline-item">
              <Button variant="soft-danger" className="avatar-sm d-flex align-items-center justify-content-center fs-20">
                <span>
                  {' '}
                  <IconifyIcon icon="ri:instagram-fill" />
                </span>
              </Button>
            </li>
            <li className="list-inline-item">
              <Button variant="soft-info" className="avatar-sm d-flex align-items-center justify-content-center  fs-20">
                <span>
                  {' '}
                  <IconifyIcon icon="ri:twitter-fill" />
                </span>
              </Button>
            </li>
            <li className="list-inline-item">
              <Button variant="soft-success" className="avatar-sm d-flex align-items-center justify-content-center fs-20">
                <span>
                  {' '}
                  <IconifyIcon icon="ri:whatsapp-fill" />
                </span>
              </Button>
            </li>
            <li className="list-inline-item">
              <Button variant="soft-warning" className="avatar-sm d-flex align-items-center justify-content-center fs-20">
                <span>
                  {' '}
                  <IconifyIcon icon="ri:mail-fill" />
                </span>
              </Button>
            </li>
          </ul>
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
    </Card>;
};
const CustomerGridPage = async () => {
  const customerGridData = await getAllCustomer();
  return <>
      <PageTitle subName="Customers" title="Customer Grid" />
      <Row>
        {customerGridData.slice(0, 6).map((item, idx) => <Col md={6} xl={4} key={idx}>
            <CustomerGridCard {...item} />
          </Col>)}
      </Row>
    </>;
};
export default CustomerGridPage;