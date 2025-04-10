import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import { blogData } from '../data';
import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import Link from 'next/link';
const Blogs = () => {
  return <Card>
      <CardBody>
        <form className="app-search d-none d-md-block me-auto">
          <div className="position-relative">
            <input type="search" className="form-control" placeholder="Search" autoComplete="off" />
            <IconifyIcon icon="solar:magnifer-broken" className="search-widget-icon" />
          </div>
        </form>
        <div>
          <div className="mt-4 border-bottom border-dashed pb-2">
            <CardTitle as={'h4'}>Categories</CardTitle>
          </div>
          <div className="my-3 ms-2">
            <div className="form-check mb-2">
              <input className="form-check-input fs-16" type="checkbox" id="flexCheckDefault" />
              <label className="form-check-label text-dark ms-2" htmlFor="flexCheckDefault">
                Fashion
              </label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input fs-16" type="checkbox" id="flexCheckChecked1" defaultChecked />
              <label className="form-check-label text-dark ms-2" htmlFor="flexCheckChecked1">
                Business
              </label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input fs-16" type="checkbox" id="flexCheckChecked2" />
              <label className="form-check-label text-dark ms-2" htmlFor="flexCheckChecked2">
                Health
              </label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input fs-16" type="checkbox" id="flexCheckChecked3" />
              <label className="form-check-label text-dark ms-2" htmlFor="flexCheckChecked3">
                Computer Software
              </label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input fs-16" type="checkbox" id="flexCheckChecked4" />
              <label className="form-check-label text-dark ms-2" htmlFor="flexCheckChecked4">
                Lifestyle blogs
              </label>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="border-bottom border-dashed pb-2">
            <CardTitle as={'h4'}>Polular Post</CardTitle>
          </div>
          <ul className="list-unstyled my-3">
            {blogData.map((item, idx) => <li className="mb-3 pb-3 border-bottom" key={idx}>
                <Row>
                  <Col lg={4}>
                    <Link className="me-3" href="">
                      <Image src={item.image} alt="small" className="img-fluid rounded" />
                    </Link>
                  </Col>
                  <Col lg={8}>
                    <Link href="" className="text-dark fw-medium fs-15">
                      {item.title}{' '}
                    </Link>
                    <p className="text-muted mb-0">
                      <IconifyIcon icon="ti:calendar-due" />
                      {item.date.toLocaleString('en-us', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                  })}
                    </p>
                  </Col>
                </Row>
              </li>)}
          </ul>
        </div>
        <div className="mt-4">
          <div className="border-bottom border-dashed pb-2">
            <CardTitle as={'h4'}>Text Widget</CardTitle>
          </div>
          <p className="mt-3 text-muted">
            Our blog delivers valuable content designed to help you excel in your role. Explore our articles, interviews, and expert commentary to
            gain valuable insights, expand your knowledge, and stay ahead of the curve. Whether you&apos;re seeking practical tips, strategic advice,
            or inspiration for your career, Admin Nexus is here to support your journey to success.
          </p>
        </div>
        <div className="mt-4">
          <div className="border-bottom border-dashed pb-2">
            <CardTitle as={'h4'}>Tags</CardTitle>
          </div>
          <div className="d-flex gap-2 flex-wrap mt-3">
            <span className="badge bg-light text-dark px-2 py-1 fs-12">Home</span>
            <span className="badge bg-light text-dark px-2 py-1 fs-12">Tutorials</span>
            <span className="badge bg-light text-dark px-2 py-1 fs-12">Blog</span>
            <span className="badge bg-light text-dark px-2 py-1 fs-12">Real Estate</span>
            <span className="badge bg-light text-dark px-2 py-1 fs-12">Business</span>
          </div>
        </div>
      </CardBody>
    </Card>;
};
export default Blogs;