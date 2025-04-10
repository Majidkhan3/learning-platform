'use client';

import mastercard from '@/assets/images/card/mastercard.svg';
import chip from '@/assets/images/chip.png';
import contactlessImg from '@/assets/images/contactless-payment.png';
import avatar1 from '@/assets/images/users/avatar-2.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import { getAllTransaction } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import useToggle from '@/hooks/useToggle';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, Row } from 'react-bootstrap';
const TransactionData = () => {
  const transactionData = useFetchData(getAllTransaction);
  const {
    isTrue,
    toggle
  } = useToggle();
  return <>
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center border-bottom">
              <div>
                <CardTitle as={'h4'}>All Transactions List</CardTitle>
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
                      <th>Transactions ID</th>
                      <th>Customer Photo &amp; Name</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Payment Method</th>
                      <th>Agent Name</th>
                      <th>Invested Property</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionData?.slice(0, 8).map((item, idx) => <tr key={idx}>
                        <td>
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="customCheck2" />
                            <label className="form-check-label" htmlFor="customCheck2">
                              &nbsp;
                            </label>
                          </div>
                        </td>
                        <td>
                          <Link href="" onClick={toggle} className="link-primary fw-semibold" data-bs-toggle="modal" data-bs-target="#TransactionsViewModal">
                            TXN-{item.id}
                          </Link>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <Link href="" className="rounded-circle">
                              <div className="position-relative">
                                {item.user?.avatar && <Image src={item.user.avatar} alt="avatar" className="avatar-sm rounded-circle flex-shrink-0 " />}
                                <span className="position-absolute bottom-0 end-0  rounded-circle">
                                  <span>
                                    <IconifyIcon icon="ri:circle-fill" className={`fs-10 align-bottom text-${item.paymentStatus == 'Cancel' ? 'danger' : item.paymentStatus == 'Pending' ? 'warning' : 'success'} bg-light rounded-circle`} />
                                  </span>
                                </span>
                              </div>
                            </Link>
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
                        <td>${item.amount}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <div>
                              <Image src={item.paymentMethod.card} alt="card" className="avatar-xs" />
                            </div>
                            <div>
                              <p className="text-dark mb-1 fw-medium">{item.paymentMethod.name}</p>
                              <p className="mb-0">Card Payment </p>
                            </div>
                          </div>
                        </td>
                        <td>{item.agentName}</td>
                        <td>{item.investedProperty}</td>
                        <td>
                          <span className={`badge bg-${item.paymentStatus == 'Cancel' ? 'danger' : item.paymentStatus == 'Pending' ? 'warning' : 'success'}-subtle text-${item.paymentStatus == 'Cancel' ? 'danger' : item.paymentStatus == 'Pending' ? 'warning' : 'success'} py-1 px-2 fs-12`}>
                            {item.paymentStatus}
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
      <Modal centered show={isTrue} onHide={toggle} className="fade" id="TransactionsViewModal" tabIndex={-1} aria-labelledby="TransactionsViewModalLabel" aria-hidden="true">
        <ModalBody>
          <Card className="border-0 mb-0 shadow-none">
            <CardBody className="p-0 pb-3">
              <div className="d-flex align-items-center gap-3">
                <Link href="" className="rounded-circle">
                  <div className="position-relative">
                    <Image src={avatar1} alt="avatar" className="avatar-md rounded-circle flex-shrink-0 img-thumbnail" />
                    <span className="position-absolute bottom-0 end-0  rounded-circle">
                      <span>
                        <IconifyIcon icon="ri:verified-badge-fill" className="fs-18 align-bottom text-primary bg-light rounded-circle" />
                      </span>
                    </span>
                  </div>
                </Link>
                <div>
                  <Link href="" className="text-dark fw-semibold fs-18">
                    Ray C. Nichols
                  </Link>
                  <p className="mb-0">raycnichols@teleworm.us</p>
                </div>
                <div className="ms-auto">
                  <span className="badge bg-primary-subtle text-primary py-1 px-2 fs-12">Premium</span>
                </div>
              </div>
              <div className="p-3 bg-primary bg-gradient rounded-4 mt-4 border border-light border-2 shadow-sm">
                <div className="d-flex align-items-center">
                  <Image src={chip} alt="chip" className="avatar" />
                  <div className="ms-auto">
                    <Image src={mastercard} alt="mastercard" className="avatar" />
                  </div>
                </div>
                <div className="mt-5">
                  <h4 className="text-white d-flex gap-2">
                    <span className="text-white-50">XXXX</span> <span className="text-white-50">XXXX</span>{' '}
                    <span className="text-white-50">XXXX</span> 3467
                  </h4>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <div>
                    <p className="text-white-50 mb-2">Holder Name</p>
                    <h4 className="mb-0 text-white">Ray C. Nichols</h4>
                  </div>
                  <div>
                    <p className="text-white-50 mb-2">Valid</p>
                    <h4 className="mb-0 text-white">05/26</h4>
                  </div>
                  <Image src={contactlessImg} alt="contactless-payment" className="img-fluid" />
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-dark fw-medium">Transactions History (2)</h4>
                <div className="d-flex align-items-center gap-3 mt-3 border p-2 rounded">
                  <div className="avatar bg-primary bg-opacity-10 rounded">
                    <IconifyIcon icon="solar:square-transfer-horizontal-bold" className="fs-28 text-primary avatar-title" />
                  </div>
                  <div>
                    <p className="mb-1 text-dark fw-medium fs-15">Michael A. Miner</p>
                    <p className="text-muted mb-0">michaelminer@dayrep.com</p>
                  </div>
                  <div className="ms-auto">
                    <p className="mb-1 fs-16 text-dark fw-medium">
                      {currency}13,987{' '}
                      <span>
                        <IconifyIcon icon="ri:checkbox-circle-line" className=" text-success ms-1" />
                      </span>
                    </p>
                    <p className="mb-0 fs-13">TXN-341220</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 mt-3 border p-2 rounded">
                  <div className="avatar bg-primary bg-opacity-10 rounded">
                    <IconifyIcon icon="solar:square-transfer-horizontal-bold" className="fs-28 text-primary avatar-title" />
                  </div>
                  <div>
                    <p className="mb-1 text-dark fw-medium fs-15">Theresa T. Brose</p>
                    <p className="text-muted mb-0">theresbrosea@dayrep.com</p>
                  </div>
                  <div className="ms-auto">
                    <p className="mb-1 fs-16 text-dark fw-medium">
                      {currency}2,710{' '}
                      <span>
                        <IconifyIcon icon="ri:checkbox-circle-line" className=" text-success ms-1" />
                      </span>
                    </p>
                    <p className="mb-0 fs-13">TXN-836451</p>
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter className="border-top px-1">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-0 fs-15">Total Amount</p>
                </div>
                <div>
                  <p className="mb-0 text-primary fw-semibold fs-16">{currency}16,697</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </ModalBody>
      </Modal>
    </>;
};
export default TransactionData;