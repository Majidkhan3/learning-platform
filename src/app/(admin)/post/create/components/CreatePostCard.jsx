import blogImg from '@/assets/images/blog/blog.jpg';
import avatar6 from '@/assets/images/users/avatar-6.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, Col, Row } from 'react-bootstrap';
const CreatePostCard = () => {
  return <Card>
      <CardBody>
        <div className="position-relative">
          <Image src={blogImg} alt="blog" className="img-fluid rounded bg-light" />
          <span className="position-absolute top-0 end-0 p-1">
            <span className="badge bg-danger text-light fs-13">Blog</span>
          </span>
        </div>
        <div className="mt-3">
          <h4 className="lh-base">Essential Home Staging Tips: How to Showcase Your Property for Maximum Buyer Appeal</h4>
          <p className="mb-0">
            Home staging is a crucial step in the selling process that involves preparing your home to appeal to a wide range of potential buyers.
          </p>
        </div>
        <div className="d-flex align-items-center gap-1 mt-3">
          <div className="position-relative">
            <Image src={avatar6} alt="avatar" className="avatar rounded-circle flex-shrink-0" />
          </div>
          <div className="d-block ms-2 flex-grow-1">
            <span>
              <Link href="" className="text-dark fw-medium">
                Danial D. Mitzel
              </Link>
            </span>
            <p className="text-muted mb-0">
              <IconifyIcon icon="ti:calendar-due" /> Jun 6, 2023
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
      </CardBody>
      <CardFooter className="bg-light-subtle">
        <Row className="g-2">
          <Col lg={6}>
            <Button variant="outline-primary" className="w-100">
              Create Blog
            </Button>
          </Col>
          <Col lg={6}>
            <Button variant="danger" className="w-100">
              Cancel
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>;
};
export default CreatePostCard;