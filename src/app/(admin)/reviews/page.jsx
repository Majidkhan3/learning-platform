import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllReview } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Reviews'
};
const ReviewsPage = async () => {
  const reviewData = await getAllReview();
  return <>
      <PageTitle title="Reviews" subName="Real Estate" />
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center border-bottom">
              <div>
                <CardTitle as={'h4'}>All Reviews</CardTitle>
              </div>
              <Dropdown>
                <DropdownToggle as={'a'} className=" btn btn-sm btn-outline-light rounded content-none icons-center" data-bs-toggle="dropdown" aria-expanded="false">
                  This Month <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem>Download</DropdownItem>
                  <DropdownItem>Export</DropdownItem>
                  <DropdownItem>Import</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <CardBody className="p-0">
              <div className="table-responsive">
                <table className="table align-middle text-nowrap table-hover table-centered border-bottom mb-0">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th style={{
                      width: 20
                    }}>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="customCheck1" />
                          <label className="form-check-label" htmlFor="customCheck1" />
                        </div>
                      </th>
                      <th>Properties Photo &amp; Name</th>
                      <th>Date</th>
                      <th>Customer Name</th>
                      <th>Property Address</th>
                      <th>Rating</th>
                      <th className="w-25">Review</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviewData.map((item, idx) => <tr key={idx}>
                        <td>
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="customCheck2" />
                            <label className="form-check-label" htmlFor="customCheck2">
                              &nbsp;
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div>
                              {item.property?.image && <Image src={item.property.image} alt="Property" className="avatar-md rounded border border-light border-3" />}
                            </div>
                            <div>
                              <Link href="" className="text-dark fw-medium fs-15">
                                {item.property?.name}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>{item.date.toLocaleString('en-us', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}</td>
                        <td>{item.user?.name}</td>
                        <td>{item.property?.location}</td>
                        <td>{item.rating}/5</td>
                        <td>
                          <ul className="d-flex text-warning m-0 fs-5 list-unstyled">
                            {Array(Math.floor(item.rating)).fill(0).map((_star, idx) => <li className="icons-center" key={idx}>
                                  <IconifyIcon icon="ri:star-fill" />
                                </li>)}
                            {!Number.isInteger(item.rating) && <li className="icons-center">
                                <IconifyIcon icon="ri:star-half-fill" />{' '}
                              </li>}
                            {item.rating < 5 && Array(5 - Math.ceil(item.rating)).fill(0).map((_star, idx) => <li className="icons-center" key={idx}>
                                    <IconifyIcon icon="ri:star-s-line" />
                                  </li>)}
                          </ul>
                          <p className="my-1 text-dark fw-semibold">{item.review.title}</p>
                          <p className="text-wrap mb-0">&quot;{item.review.description}&quot;</p>
                        </td>
                        <td>
                          <span className={`badge bg-${item.reviewStatus == 'Pending' ? 'warning' : 'success'}-subtle text-${item.reviewStatus == 'Pending' ? 'warning' : 'success'} py-1 px-2 fs-12`}>
                            {item.reviewStatus}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button variant="light" size="sm">
                              <IconifyIcon icon="solar:eye-broken" className="align-middle fs-18" />
                            </Button>
                            <Button variant="soft-primary" size="sm">
                              <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                            </Button>
                            <Button variant="soft-danger" size="sm">
                              <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                            </Button>
                          </div>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </CardBody>
            <CardFooter>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mb-0">
                  <li className="page-item">
                    <Link className="page-link" href="">
                      Previous
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="">
                      Next
                    </Link>
                  </li>
                </ul>
              </nav>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </>;
};
export default ReviewsPage;