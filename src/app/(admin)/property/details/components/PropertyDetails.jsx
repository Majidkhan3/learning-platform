import properties11 from '@/assets/images/properties/p-11.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const PropertyDetails = () => {
  return <Col xl={9} lg={8}>
      <Card>
        <CardBody>
          <div className="position-relative">
            <Image src={properties11} alt="properties" className="img-fluid rounded" />
            <span className="position-absolute top-0 start-0 p-2">
              <span className="badge bg-warning text-light px-2 py-1 fs-13">For Sale</span>
            </span>
          </div>
          <div className="d-flex flex-wrap justify-content-between my-3 gap-2">
            <div>
              <Link href="" className="fs-18 text-dark fw-medium">
                Hayfield Ashton Place Residences at Willow Brook Valley
              </Link>
              <p className="d-flex align-items-center gap-1 mt-1 mb-0">
                <IconifyIcon icon="solar:map-point-wave-bold-duotone" className="fs-18 text-primary" />
                1668 Lincoln Drive Harrisburg, PA 17101 U.S.A
              </p>
            </div>
            <div>
              <ul className="list-inline float-end d-flex gap-1 mb-0 align-items-center">
                <li className="list-inline-item fs-20 dropdown">
                  <Button variant="light" className="avatar-sm d-flex align-items-center justify-content-center text-dark fs-20" data-bs-toggle="modal" data-bs-target="#videocall">
                    <span>
                      {' '}
                      <IconifyIcon icon="solar:share-bold-duotone" />
                    </span>
                  </Button>
                </li>
                <li className="list-inline-item fs-20 dropdown">
                  <Button variant="light" className="avatar-sm d-flex align-items-center justify-content-center text-danger fs-20" data-bs-toggle="modal" data-bs-target="#voicecall">
                    <span>
                      {' '}
                      <IconifyIcon icon="solar:heart-angle-bold-duotone" />
                    </span>
                  </Button>
                </li>
                <li className="list-inline-item fs-20 dropdown">
                  <Button variant="light" data-bs-toggle="offcanvas" href="#user-profile" className="avatar-sm icons-center d-flex align-items-center justify-content-center text-warning fs-20">
                    <span>
                      {' '}
                      <IconifyIcon icon="solar:star-bold-duotone" />
                    </span>
                  </Button>
                </li>
                <Dropdown as={'li'} className="list-inline-item fs-20 d-none d-md-flex">
                  <DropdownToggle as={'a'} className="arrow-none text-dark" data-bs-toggle="dropdown" aria-expanded="false">
                    <IconifyIcon icon="ri-more-2-fill" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem>
                      <IconifyIcon icon="ri:user-6-line" className=" me-2" />
                      View Profile
                    </DropdownItem>
                    <DropdownItem>
                      <IconifyIcon icon="ri:music-2-line" className=" me-2" />
                      Media, Links and Docs
                    </DropdownItem>
                    <DropdownItem>
                      <IconifyIcon icon="ri:search-2-line" className=" me-2" />
                      Search
                    </DropdownItem>
                    <DropdownItem>
                      <IconifyIcon icon="ri:image-line" className=" me-2" />
                      Wallpaper
                    </DropdownItem>
                    <DropdownItem>
                      <IconifyIcon icon="ri:arrow-right-circle-line" className=" me-2" />
                      More
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ul>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="avatar-sm bg-success-subtle rounded flex-centered">
              <IconifyIcon icon="solar:wallet-money-bold-duotone" width={24} height={24} className="fs-24 text-success" />
            </div>
            <p className="fw-medium text-dark fs-18 mb-0">{currency}80,675.00 </p>
          </div>
          <div className="bg-light-subtle p-2 mt-3 rounded border border-dashed">
            <Row className="align-items-center text-center g-2">
              <Col xl={2} lg={3} md={6} xs={6} className="border-end">
                <p className="text-muted mb-0 fs-15 fw-medium d-flex align-items-center justify-content-center gap-1">
                  <IconifyIcon icon="solar:bed-broken" className="fs-18 text-primary" /> 5 Bedroom
                </p>
              </Col>
              <Col xl={2} lg={3} md={6} xs={6} className="border-end">
                <p className="text-muted mb-0 fs-15 fw-medium d-flex align-items-center justify-content-center gap-1">
                  <IconifyIcon icon="solar:bath-broken" className="fs-18 text-primary" /> 4 Bathrooms
                </p>
              </Col>
              <Col xl={2} lg={3} md={6} xs={6} className="border-end">
                <p className="text-muted mb-0 fs-15 fw-medium d-flex align-items-center justify-content-center gap-1">
                  <IconifyIcon icon="solar:scale-broken" className="fs-18 text-primary" /> 1800sqft
                </p>
              </Col>
              <Col xl={2} lg={3} md={6} xs={6} className="border-end">
                <p className="text-muted mb-0 fs-15 fw-medium d-flex align-items-center justify-content-center gap-1">
                  <IconifyIcon icon="solar:double-alt-arrow-up-broken" className="fs-18 text-primary" /> 3 Floor
                </p>
              </Col>
              <Col xl={2} lg={3} md={6} xs={6} className="border-end">
                <p className="text-muted mb-0 fs-15 fw-medium d-flex align-items-center justify-content-center gap-1">
                  <span className="badge p-1 bg-light fs-12 text-dark">
                    <IconifyIcon icon="ri:star-fill" className="align-text-top fs-14 text-warning me-1" /> 4.4
                  </span>{' '}
                  Review
                </p>
              </Col>
              <Col xl={2} lg={3} md={6} xs={6}>
                <p className="text-muted mb-0 fs-15 fw-medium d-flex align-items-center justify-content-center gap-1">
                  <IconifyIcon icon="solar:check-circle-broken" className="fs-18 text-primary" /> For Sale
                </p>
              </Col>
            </Row>
          </div>
          <h5 className="text-dark fw-medium mt-3">Some Facility :</h5>
          <div className="d-flex flex-wrap align-items-center gap-2 mt-3">
            <span className="badge bg-light-subtle text-muted border fw-medium fs-13 px-2 py-1">Big Swimming pool </span>
            <span className="badge bg-light-subtle text-muted border fw-medium fs-13 px-2 py-1">Near Airport </span>
            <span className="badge bg-light-subtle text-muted border fw-medium fs-13 px-2 py-1">Big Size Garden </span>
            <span className="badge bg-light-subtle text-muted border fw-medium fs-13 px-2 py-1">4 Car Parking </span>
            <span className="badge bg-light-subtle text-muted border fw-medium fs-13 px-2 py-1">24/7 Electricity </span>
            <span className="badge bg-light-subtle text-muted border fw-medium fs-13 px-2 py-1">Personal Theater </span>
          </div>
          <h5 className="text-dark fw-medium mt-3">Property Details :</h5>
          <p className="mt-2">
            Property refers to any item that an individual or a business holds legal title to. This can include tangible items, such as houses, cars,
            or appliances, as well as intangible items that hold potential future value, such as stock and bond certificates. Legally, property is
            classified into two categories: personal property and real property. This distinction originates from English common law, and our
            contemporary legal system continues to differentiate between these two types.
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <Link href="" className="link-primary fw-medium">
              View More Detail <IconifyIcon icon="ri:arrow-right-line" />
            </Link>
            <div>
              <p className="mb-0 d-flex align-items-center gap-1">
                <IconifyIcon icon="solar:calendar-date-broken" className="fs-18 text-primary" /> 10 May 2024
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>;
};
export default PropertyDetails;