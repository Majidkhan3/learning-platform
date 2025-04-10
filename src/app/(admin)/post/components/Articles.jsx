import smallImg from '@/assets/images/small/img-3.jpg';
import avatar1 from '@/assets/images/users/avatar-8.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { articleData } from '../data';
const Articles = () => {
  return <Col xl={7} lg={12}>
      <Card>
        <CardBody>
          {articleData.map((item, idx) => <div className={`border-bottom pb-3 ${idx != 0 && 'py-3'} `} key={idx}>
              <span className="text-dark">
                <Link href="" className="text-dark fs-18 fw-medium">
                  {item.title}
                </Link>
              </span>
              <div className="mb-2 mt-1">
                {item.tags.map((tag, idx) => <>
                    <span className={`badge px-2 py-1 bg-${tag == 'Tutorials' ? 'success' : tag == 'Blog' ? 'danger' : 'primary'}-subtle text-${tag == 'Tutorials' ? 'success' : tag == 'Blog' ? 'danger' : 'primary'} ms-1`} key={idx}>
                      {tag}
                    </span>
                    &nbsp;
                  </>)}
              </div>
              <p className="mt-2 text-muted">{item.description}</p>
              <div className="d-flex align-items-center gap-1">
                <div className="position-relative">
                  <Image src={item.image} alt="avatar" className="avatar rounded-circle flex-shrink-0" />
                </div>
                <div className="d-block ms-2 flex-grow-1">
                  <span className="text-dark">
                    <Link href="" className="text-dark fw-medium">
                      {item.name}
                    </Link>
                  </span>
                  <p className="text-muted mb-0">
                    <IconifyIcon icon="ti:calendar-due" />
                    {item.date.toLocaleString('en-us', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric'
                })}
                  </p>
                </div>
                <div className="ms-auto">
                  <span>
                    <button type="button" className="btn btn-soft-danger avatar-sm d-inline-flex align-items-center justify-content-center fs-20 rounded-circle">
                      <span>
                        {' '}
                        <IconifyIcon icon="solar:heart-broken" />
                      </span>
                    </button>
                  </span>
                </div>
              </div>
            </div>)}
          <div className="pt-3">
            <span className="text-dark">
              <Link href="" className="text-dark fs-18 fw-medium">
                The Future of Smart Homes: Technology Trends in Real Estate
              </Link>
              &nbsp;
              <span className="badge px-2 py-1 bg-danger-subtle text-danger ms-1">Blog</span>&nbsp;
              <span className="badge px-2 py-1 bg-warning-subtle text-warning ms-1">News</span>
            </span>
            <Row className="my-2 align-items-center">
              <Col lg={3}>
                <Image alt="small" src={smallImg} className="rounded-3 img-fluid" />
              </Col>
              <Col lg={9}>
                <p className="my-2 text-muted">
                  The concept of smart homes has evolved rapidly over the past few years, driven by advancements in technology and an increasing
                  demand for convenience, security, and energy efficiency.{' '}
                </p>
                <p className="mb-3 text-muted">
                  <span className="text-dark fw-semibold mb-0">Seamless Integration : </span>The Internet of Things (IoT) is the backbone of smart
                  home technology, enabling devices and systems to communicate and work together seamlessly. In the future, the integration of IoT
                  will become more sophisticated.
                </p>
                <Link href="" className="link-primary">
                  View More
                </Link>
              </Col>
            </Row>
            <div className="d-flex align-items-center gap-1 mt-2 pt-1">
              <div className="position-relative">
                <Image src={avatar1} alt="avatar" className="avatar rounded-circle flex-shrink-0" />
              </div>
              <div className="d-block ms-2 flex-grow-1">
                <span className="text-dark">
                  <Link href="" className="text-dark fw-medium">
                    Gabriela E. Phelps
                  </Link>
                </span>
                <p className="text-muted mb-0">
                  <IconifyIcon icon="ti:calendar-due" /> March 14, 2023
                </p>
              </div>
              <div className="ms-auto">
                <span>
                  <button type="button" className="btn btn-soft-danger avatar-sm d-inline-flex align-items-center justify-content-center fs-20 rounded-circle">
                    {' '}
                    <span>
                      {' '}
                      <IconifyIcon icon="solar:heart-broken" />
                    </span>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>;
};
export default Articles;