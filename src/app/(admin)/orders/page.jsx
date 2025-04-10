import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllTransaction } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Orders'
};
const OrdersPage = async () => {
  const orderData = await getAllTransaction();
  return <>
      <PageTitle title="Orders" subName="Real Estate" />
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center border-bottom">
              <div>
                <CardTitle as={'h4'}>All Order List</CardTitle>
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
                <table className="table align-middle text-nowrap table-hover table-centered mb-0">
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
                      <th>Customer Photo &amp; Name</th>
                      <th>Purchase Date</th>
                      <th>Contact</th>
                      <th>Property Type</th>
                      <th>Amount</th>
                      <th>Purchase Properties</th>
                      <th>Amount Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.map((item, idx) => {
                    return <tr key={idx}>
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
                              <div>{item.user?.avatar && <Image src={item.user?.avatar} alt="avatar" className="avatar-sm rounded-circle" />}</div>
                              <div>
                                <Link href="" className="text-dark fw-medium fs-15">
                                  {item.user?.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>{item.purchaseDate.toLocaleString('en-us', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}</td>
                          <td>{item.user?.contact}</td>
                          <td>{item.property?.propertyType}</td>
                          <td>${item.amount}</td>
                          <td>{item.property?.location}</td>
                          <td>
                            <span className={`badge bg-${item.amountStatus == 'Pending' ? 'warning' : item.amountStatus == 'Unpaid' ? 'danger' : 'success'} text-white fs-11`}>
                              {item.amountStatus}
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
                        </tr>;
                  })}
                  </tbody>
                </table>
              </div>
            </CardBody>
            <CardFooter className="border-top">
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
export default OrdersPage;