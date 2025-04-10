import blogImg from '@/assets/images/blog/blog.jpg';
import avatarImg from '@/assets/images/users/avatar-6.jpg';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import Blogs from './components/Blogs';
import Comments from './components/Comments';
import PhotoCard from './components/PhotoCard';
export const metadata = {
  title: 'Blog Details'
};
const PostDetailsPage = () => {
  return <>
      <PageTitle title="Blog Details" subName="Blog" />
      <Row>
        <Col lg={8}>
          <Card>
            <CardBody>
              <div className="position-relative">
                <Image src={blogImg} alt="blog" className="img-fluid rounded" />
              </div>
              <div className="d-flex align-items-center gap-1 my-3">
                <div className="position-relative">
                  <Image src={avatarImg} alt="avatar" className="avatar rounded-circle flex-shrink-0" />
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
                  <div>
                    <ul className="list-inline float-end d-flex gap-1 mb-0 align-items-center">
                      <li className="list-inline-item fs-20 dropdown">
                        <Button variant="light" className="avatar-sm d-flex align-items-center justify-content-center text-dark fs-20 icons-center" data-bs-toggle="modal" data-bs-target="#videocall">
                          <span>
                            {' '}
                            <IconifyIcon icon="solar:share-bold-duotone" />{' '}
                          </span>
                        </Button>
                      </li>
                      <li className="list-inline-item fs-20 dropdown">
                        <Button variant="light" className=" avatar-sm d-flex align-items-center justify-content-center text-danger fs-20 icons-center" data-bs-toggle="modal" data-bs-target="#voicecall ">
                          <span>
                            {' '}
                            <IconifyIcon icon="solar:heart-angle-bold-duotone" />{' '}
                          </span>
                        </Button>
                      </li>
                      <li className="list-inline-item fs-20 dropdown">
                        <a data-bs-toggle="offcanvas" href="#user-profile" className="btn btn-light avatar-sm d-flex align-items-center justify-content-center text-warning fs-20 icons-center">
                          <span>
                            {' '}
                            <IconifyIcon icon="solar:star-bold-duotone" />{' '}
                          </span>
                        </a>
                      </li>
                      <Dropdown as={'li'} className="list-inline-item fs-20 d-none d-md-flex">
                        <DropdownToggle as={'a'} className="arrow-none text-dark icons-center" data-bs-toggle="dropdown" aria-expanded="false">
                          <span>
                            {' '}
                            <IconifyIcon icon="ri:more-2-fill" />{' '}
                          </span>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem>
                            <IconifyIcon icon="ri:user-6-line" className="me-2" />
                            View Profile
                          </DropdownItem>
                          <DropdownItem>
                            <IconifyIcon icon="ri:music-2-line" className="me-2" />
                            Media, Links and Docs
                          </DropdownItem>
                          <DropdownItem>
                            <IconifyIcon icon="ri:search-2-line" className="me-2" />
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
              </div>
              <div className="d-flex gap-2 flex-wrap my-2">
                <span className="badge bg-light text-dark px-2 py-1 fs-12">Home</span>
                <span className="badge bg-light text-dark px-2 py-1 fs-12">Tutorials</span>
                <span className="badge bg-light text-dark px-2 py-1 fs-12">Blog</span>
                <span className="badge bg-light text-dark px-2 py-1 fs-12">Real Estate</span>
                <span className="badge bg-light text-dark px-2 py-1 fs-12">Business</span>
              </div>
              <span className="text-dark d-inline-block mb-2 mt-1">
                <Link href="" className="text-dark fs-4 fw-medium">
                  Essential Home Staging Tips: How to Showcase Your Property for Maximum Buyer Appeal
                </Link>
              </span>
              <p className="text-muted">
                Home staging is a crucial step in the selling process that involves preparing your home to appeal to a wide range of potential buyers.
                The goal is to highlight the property&apos;s best features and create a welcoming atmosphere that resonates with buyers&apos;
                emotions. Here are essential home staging tips to help you showcase your property effectively:
              </p>
              <p className="mb-2 text-muted">
                <span className="text-dark fw-semibold mb-0">Declutter and Depersonalize : </span>Start by removing excess clutter and personal items
                such as family photos and personal memorabilia. This helps buyers envision themselves living in the space and allows them to focus on
                the home&apos;s features.
              </p>
              <p className="mb-2 text-muted">
                <span className="text-dark fw-semibold mb-0">Enhance Curb Appeal : </span>Improve the exterior of your home to create a positive first
                impression. This includes landscaping, cleaning the driveway and walkways, and adding inviting elements like potted plants or a fresh
                coat of paint to the front door.
              </p>
              <div className="border-start border-primary border-2 p-3 bg-primary bg-opacity-10 rounded mt-3">
                <h5>We Are Best</h5>
                <p className="mb-0">
                  A business consulting agency is involved in the planning, implementation, and education of businesses. We work directly
                </p>
              </div>
              <div className="d-flex bg-light border border-dashed gap-3 rounded my-4 p-3">
                <Link href="" className="d-flex align-items-center fs-16 text-dark">
                  <IconifyIcon icon="solar:like-bold-duotone" className="me-1" /> 3,422
                </Link>
                <Link href="" className="d-flex align-items-center fs-16 text-dark">
                  <IconifyIcon icon="solar:eye-bold" className="me-1" /> 4,565
                </Link>
                <Link href="" className="d-flex align-items-center fs-16 text-dark">
                  <IconifyIcon icon="solar:chat-square-call-bold" className="me-1" /> 356
                </Link>
              </div>
              <CardTitle as={'h4'}>Post Comments</CardTitle>
              <textarea className="form-control my-3" rows={5} placeholder="Write Comment ......" defaultValue={''} />
              <div className="d-flex justify-content-end">
                <Button variant="primary">Post Comment</Button>
              </div>
              <CardTitle as={'h4'} className="d-flex align-items-center mt-3">
                <IconifyIcon icon="solar:chat-square-like-outline" className="me-1" /> Comment
              </CardTitle>
              <Comments />
            </CardBody>
          </Card>
        </Col>
        <Col lg={4} md={6}>
          <Blogs />
          <PhotoCard />
        </Col>
      </Row>
    </>;
};
export default PostDetailsPage;