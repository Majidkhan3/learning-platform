import avatar2 from '@/assets/images/users/avatar-2.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, Col, Row } from 'react-bootstrap';
const AgentAddCard = () => {
  return <Col xl={3} lg={4}>
      <Card>
        <CardBody>
          <div className="d-flex align-items-center gap-2 border-bottom pb-3">
            <Image src={avatar2} alt="avatar" className="avatar-lg rounded-3 border border-light border-3" />
            <div className="d-block">
              <Link href="" className="text-dark fw-medium fs-16">
                Michael A. Miner
              </Link>
              <p className="mb-0">michaelminer@dayrep.com</p>
              <p className="mb-0 text-primary"># 1</p>
            </div>
          </div>
          <p className="mt-3 d-flex align-items-center gap-2 mb-2">
            <IconifyIcon icon="solar:home-bold-duotone" className="fs-18 text-primary" />
            243 Properties
          </p>
          <p className="d-flex align-items-center gap-2 mt-2">
            <IconifyIcon icon="solar:map-point-wave-bold-duotone" className="fs-18 text-primary" />
            Lincoln Drive Harrisburg, PA 17101 U.S.A
          </p>
          <h5 className="my-3">Social Media :</h5>
          <ul className="list-inline d-flex gap-1 mb-0 align-items-center">
            <li className="list-inline-item">
              <Link href="" className="btn btn-soft-primary  avatar-sm d-flex align-items-center justify-content-center">
                <span>
                  {' '}
                  <IconifyIcon width={20} height={20} icon="ri:facebook-fill" />
                </span>
              </Link>
            </li>
            <li className="list-inline-item">
              <Button variant="soft-danger" className="avatar-sm d-flex align-items-center justify-content-center">
                <span>
                  {' '}
                  <IconifyIcon width={20} height={20} icon="ri:instagram-line" />
                </span>
              </Button>
            </li>
            <li className="list-inline-item">
              <Button variant="soft-info" className="avatar-sm d-flex align-items-center justify-content-center ">
                <span>
                  {' '}
                  <IconifyIcon width={20} height={20} icon="ri:twitter-line" />
                </span>
              </Button>
            </li>
            <li className="list-inline-item">
              <Button variant="soft-success" className="avatar-sm d-flex align-items-center justify-content-center">
                <span>
                  {' '}
                  <IconifyIcon width={20} height={20} icon="ri:whatsapp-line" />
                </span>
              </Button>
            </li>
            <li className="list-inline-item">
              <Button variant="soft-warning" className="avatar-sm d-flex align-items-center justify-content-center">
                <span>
                  {' '}
                  <IconifyIcon width={20} height={20} icon="ri:mail-line" />
                </span>
              </Button>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="bg-light-subtle">
          <Row className="g-2">
            <Col lg={6}>
              <Button variant="outline-primary" className="w-100">
                Add Agent
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
export default AgentAddCard;