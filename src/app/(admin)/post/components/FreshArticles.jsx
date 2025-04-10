import properties16 from '@/assets/images/properties/p-16.jpg';
import avatar2 from '@/assets/images/users/avatar-2.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardTitle, Col } from 'react-bootstrap';
const FreshArticles = () => {
  return <Col xl={5} lg={12}>
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Fresh Articles, News &amp; Updates</CardTitle>
        </CardHeader>
        <CardBody>
          <Image src={properties16} alt="properties" className="rounded-3 img-fluid" />
          <div className="mt-3">
            <span>
              <Link href="" className="text-dark fs-18 fw-medium">
                The Pros and Cons of Urban vs. Suburban Living: Finding the Right Fit for Your Lifestyle
              </Link>
              &nbsp;
              <span className="badge px-2 py-1 bg-primary-subtle text-primary ms-1">Homes</span>&nbsp;
              <span className="badge px-2 py-1 bg-danger-subtle text-danger ms-1">Blog</span>
            </span>
            <p className="mt-2 text-muted">
              Deciding where to live is a major life choice that can significantly impact your lifestyle, finances, and overall happiness. One of the
              most common dilemmas people face is choosing between urban and suburban living. Both options offer unique benefits and challenges, and
              the right choice often depends on your personal preferences...{' '}
              <a href="#!" className="link-primary fw-medium">
                Read More
              </a>
            </p>
            <div className="d-flex align-items-center gap-1">
              <div className="position-relative">
                <Image src={avatar2} alt="avatar2" className="avatar rounded-circle flex-shrink-0" />
              </div>
              <div className="d-block ms-2 flex-grow-1">
                <span className="text-dark">
                  <Link href="" className="text-dark fw-medium">
                    David D. McGlynn
                  </Link>
                </span>
                <p className="text-muted mb-0">
                  <IconifyIcon icon="ti:calendar-due" /> April 18, 2023
                </p>
              </div>
              <div className="ms-auto">
                <span>
                  <button type="button" className="btn btn-soft-danger avatar-sm d-inline-flex align-items-center justify-content-center fs-20 rounded-circle">
                    {' '}
                    <span>
                      {' '}
                      <IconifyIcon icon="solar:heart-broken" />{' '}
                    </span>{' '}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>;
};
export default FreshArticles;