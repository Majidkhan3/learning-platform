import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllTransaction } from '@/helpers/data';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const TransactionHistory = async () => {
  const transactionData = await getAllTransaction();
  return <Row>
      <Col xl={12}>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <div>
              <CardTitle as={'h4'}>Transaction History</CardTitle>
            </div>
            <Dropdown>
              <DropdownToggle as={'a'} className="btn btn-sm btn-outline-light rounded content-none icons-center" data-bs-toggle="dropdown" aria-expanded="false">
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
                    <th>Order ID</th>
                    <th>Transaction Date</th>
                    <th>Property Type</th>
                    <th>Properties Address</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Agent Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.slice(0, 4).map((item, idx) => <tr key={idx}>
                      <td>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="customCheck2" />
                          <label className="form-check-label" htmlFor="customCheck2">
                            &nbsp;
                          </label>
                        </div>
                      </td>
                      <td>{item.orderId}</td>
                      <td>{item.purchaseDate.toLocaleString('en-us', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}</td>
                      <td>{item.property?.propertyType}</td>
                      <td>{item.property?.location}</td>
                      <td>${item.amount}</td>
                      <td>
                        <span className="badge bg-success text-white fs-11">Paid</span>
                      </td>
                      <td>{item.agentName}</td>
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
    </Row>;
};
export default TransactionHistory;