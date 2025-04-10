import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllAgent } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const AgentList = async () => {
  const agentData = await getAllAgent();
  return <Row>
      <Col xl={12}>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center border-bottom">
            <div>
              <CardTitle as={'h4'}>All Agent List</CardTitle>
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
                    <th>Agent Photo &amp; Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Experience</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {agentData.slice(0, 8).map((item, idx) => <tr key={idx}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div>{item.user?.avatar && <Image src={item.user.avatar} alt="avatar" className="avatar-sm rounded-circle" />}</div>
                          <div>
                            <Link href="" className="text-dark fw-medium fs-15">
                              {item.user?.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td>{item.address}</td>
                      <td>{item.user?.email}</td>
                      <td>{item.user?.contact}</td>
                      <td>{item.experience}&nbsp;Year</td>
                      <td>{item.date.toLocaleString('en-us', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</td>
                      <td>
                        <span className={`badge bg-${item.user?.status == 'Active' ? 'success' : 'danger'}-subtle text-${item.user?.status == 'Active' ? 'success' : 'danger'} py-1 px-2 fs-13`}>
                          {item.user?.status}
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
    </Row>;
};
export default AgentList;