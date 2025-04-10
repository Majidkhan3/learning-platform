import properties11 from '@/assets/images/properties/p-11.jpg';
import properties13 from '@/assets/images/properties/p-13.jpg';
import properties14 from '@/assets/images/properties/p-14.jpg';
import properties15 from '@/assets/images/properties/p-15.jpg';
import avatar2 from '@/assets/images/users/avatar-2.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardTitle, Carousel, CarouselItem, Col, Row } from 'react-bootstrap';
const CustomersDetails = () => {
  return <Card>
      <CardBody>
        <Carousel indicators={false}>
          <CarouselItem className="active">
            <Image src={properties14} height={425} className="d-block w-100 h-100 rounded" alt="img-6" />
            <div className="carousel-caption"></div>
          </CarouselItem>
          <CarouselItem className="carousel-item">
            <Image height={425} src={properties13} className="d-block w-100 h-100 rounded" alt="img-7" />
            <div className="carousel-caption"></div>
          </CarouselItem>
          <CarouselItem className="carousel-item">
            <Image height={425} src={properties11} className="d-block w-100 h-100 rounded" alt="img-5" />
            <div className="carousel-caption"></div>
          </CarouselItem>
          <CarouselItem className="carousel-item">
            <Image height={425} src={properties15} className="d-block w-100 h-100 rounded" alt="img-5" />
            <div className="carousel-caption"></div>
          </CarouselItem>
        </Carousel>
        <div className="d-flex align-items-center my-3 gap-3">
          <Image src={avatar2} alt="avatar" className="rounded-circle avatar-xl img-thumbnail" />
          <div>
            <h3 className="fw-semibold mb-1">Daavid Nummi</h3>
            <Link href="" className="link-primary fw-medium fs-14">
              EastTribune.nl
            </Link>
          </div>
        </div>
        <div className="d-flex flex-wrap align-items-start justify-content-between gap-3 mt-3">
          <div>
            <Button variant="primary">
              <IconifyIcon icon="ri:chat-1-fill" /> Chat Us
            </Button>
            &nbsp;
            <Button variant="outline-primary">
              <IconifyIcon icon="ri:phone-fill" /> Phone
            </Button>
          </div>
          <div className="d-flex gap-1">
            <Button variant="dark" className="avatar-sm d-flex align-items-center justify-content-center fs-20">
              <span>
                {' '}
                <IconifyIcon icon="ri:edit-fill" />
              </span>
            </Button>
            <Button variant="primary" className="avatar-sm d-flex align-items-center justify-content-center fs-20">
              <span>
                {' '}
                <IconifyIcon icon="ri:share-fill" />
              </span>
            </Button>
          </div>
        </div>
        <Row className="my-4">
          <Col lg={3}>
            <p className="text-dark fw-semibold fs-16 mb-1">Email Address :</p>
            <p className="mb-0">daavidnumminen@teleworm.us</p>
          </Col>
          <Col lg={3}>
            <p className="text-dark fw-semibold fs-16 mb-1">Phone Number :</p>
            <p className="mb-0">+231 06-75820711</p>
          </Col>
          <Col lg={4}>
            <p className="text-dark fw-semibold fs-16 mb-1">Location :</p>
            <p className="mb-0">Schoolstraat 161 5151 HH Drunen </p>
          </Col>
          <Col lg={2}>
            <p className="text-dark fw-semibold fs-16 mb-1">Status :</p>
            <p className="mb-0">
              <span className="badge bg-success text-white fs-12 px-2 py-1">Available</span>{' '}
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <CardTitle as={'h4'} className="mb-2">
              Social Media :
            </CardTitle>
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
          </Col>
          <Col lg={8}>
            <CardTitle as={'h4'} className="mb-2">
              Preferences :
            </CardTitle>
            <p className="mb-0">
              <IconifyIcon icon="ri:circle-fill" className="fs-10 me-2 text-success" /> 3-4 bedrooms, 2-3 bathrooms
            </p>
            <p className="mb-0">
              <IconifyIcon icon="ri:circle-fill" className="fs-10 me-2 text-success" /> Close to public transportation, good school district,
              backyard, modern kitchen
            </p>
          </Col>
        </Row>
      </CardBody>
    </Card>;
};
export default CustomersDetails;