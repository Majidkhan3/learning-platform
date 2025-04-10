import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllAgent } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const AgentCard = ({
  address,
  properties,
  user
}) => {
  return <Card>
      <CardBody>
        <div className="d-flex flex-wrap align-items-center gap-2 border-bottom pb-3">
          {user?.avatar && <Image src={user.avatar} alt="avatar" className="avatar-lg rounded-3 border border-light border-3" />}
          <div className="d-block">
            <Link href="" className="text-dark fw-medium fs-16">
              {user?.name}
            </Link>
            <p className="mb-0">{user?.email}</p>
            <p className="mb-0 text-primary"># {user?.id}</p>
          </div>
          <div className="ms-auto">
            <Dropdown>
              <DropdownToggle as={'a'} className="btn btn-sm btn-outline-light rounded arrow-none fs-16" data-bs-toggle="dropdown" aria-expanded="false">
                <IconifyIcon icon="ri:more-2-fill" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Download</DropdownItem>
                <DropdownItem>Export</DropdownItem>
                <DropdownItem>Import</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <p className="mt-3 d-flex align-items-center gap-2 mb-2">
          <IconifyIcon icon="solar:home-bold-duotone" className="fs-18 text-primary" />
          {properties} Properties
        </p>
        <p className="d-flex align-items-center gap-2 mt-2">
          <IconifyIcon icon="solar:map-point-wave-bold-duotone" className="fs-18 text-primary" />
          {address}
        </p>
        <h5 className="my-3">Social Media :</h5>
        <ul className="list-inline d-flex gap-1 mb-0 align-items-center">
          <li className="list-inline-item">
            <Button variant="soft-primary" className="d-flex avatar-sm align-items-center justify-content-center fs-20">
              <span>
                {' '}
                <IconifyIcon icon="ri:facebook-fill" />
              </span>
            </Button>
          </li>
          <li className="list-inline-item">
            <Button variant="soft-danger" className="d-flex avatar-sm align-items-center justify-content-center fs-20">
              <span>
                {' '}
                <IconifyIcon icon="ri:instagram-line" />
              </span>
            </Button>
          </li>
          <li className="list-inline-item">
            <Button variant="soft-info" className="d-flex avatar-sm align-items-center justify-content-center  fs-20">
              <span>
                {' '}
                <IconifyIcon icon="ri:twitter-line" />
              </span>
            </Button>
          </li>
          <li className="list-inline-item">
            <Button variant="soft-success" className="d-flex avatar-sm align-items-center justify-content-center fs-20">
              <span>
                {' '}
                <IconifyIcon icon="ri:whatsapp-line" />
              </span>
            </Button>
          </li>
          <li className="list-inline-item">
            <Button variant="soft-warning" className="d-flex avatar-sm align-items-center justify-content-center fs-20">
              <span>
                {' '}
                <IconifyIcon icon="ri:mail-line" />
              </span>
            </Button>
          </li>
        </ul>
      </CardBody>
      <CardFooter className="border-top">
        <Row className="g-2">
          <Col lg={6}>
            <Button variant="primary" className="w-100">
              <IconifyIcon icon="solar:outgoing-call-rounded-broken" className="align-middle fs-18" /> Call Us
            </Button>
          </Col>
          <Col lg={6}>
            <Button variant="light" className="w-100">
              <IconifyIcon icon="solar:chat-round-dots-broken" className="align-middle fs-16" /> Message
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>;
};
const AgentData = async () => {
  const agentCardData = await getAllAgent();
  return <>
      <Row>
        {agentCardData.map((item, idx) => <Col xl={4} lg={6} key={idx}>
            <AgentCard {...item} />
          </Col>)}
      </Row>
    </>;
};
export default AgentData;