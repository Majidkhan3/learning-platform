import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllTransaction } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const Transaction = async () => {
  const transaction = await getAllTransaction();
  return <Row>
      <Col xl={12}>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <div>
              <CardTitle as={'h4'}>Latest Transaction</CardTitle>
            </div>
            <Dropdown>
              <DropdownToggle as={'a'} className="btn btn-sm btn-outline-light rounded content-none icons-center" data-bs-toggle="dropdown" aria-expanded="false">
                This Month <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Week</DropdownItem>
                <DropdownItem>Months</DropdownItem>
                <DropdownItem>Years</DropdownItem>
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
                    <th>Purchase ID</th>
                    <th>Buyer Name</th>
                    <th>Invoice</th>
                    <th>Purchase Date</th>
                    <th>Total Amount</th>
                    <th>Payment Method</th>
                    <th>Payment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction.slice(0, 6).map((item, idx) => <tr key={idx}>
                      <td>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="customCheck2" />
                          <label className="form-check-label" htmlFor="customCheck2">
                            &nbsp;
                          </label>
                        </div>
                      </td>
                      <td>
                        <Link href="" className="text-dark fw-medium">
                          #{item.id}
                        </Link>{' '}
                      </td>
                      <td>
                        {item.user?.avatar && <Image src={item.user.avatar} className="avatar-sm rounded-circle me-2" alt="..." />}
                        {item.user?.name}
                      </td>
                      <td>IN-4563</td>
                      <td> {item.purchaseDate.toLocaleString('en-us', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</td>
                      <td> ${item.amount}</td>
                      <td> {item.paymentType}</td>
                      <td>
                        {' '}
                        <span className={`badge bg-${item.paymentStatus == 'Cancel' ? 'danger' : item.paymentStatus == 'Pending' ? 'warning' : 'success'}-subtle text-${item.paymentStatus == 'Cancel' ? 'danger' : item.paymentStatus == 'Pending' ? 'warning' : 'success'} py-1 px-2 fs-12`}>
                          {item.paymentStatus}
                        </span>{' '}
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
        </Card>
      </Col>
    </Row>;
};
export default Transaction;