import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllTransaction } from '@/helpers/data';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
const TopCustomer = async () => {
  const customerData = await getAllTransaction();
  const joinDataLength = customerData.slice(0, 5).length - 1;
  return <Col xl={4} lg={6}>
      <Card>
        <CardHeader className="d-flex  justify-content-between align-items-center border-0">
          <div>
            <CardTitle as={'h4'} className="mb-1">
              Top Customer
            </CardTitle>
            <p className="mb-0 fs-13">390 Customer</p>
          </div>
          <Dropdown>
            <DropdownToggle as={'a'} className="rounded  arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
              <IconifyIcon icon="ri:edit-box-line" className="fs-20 text-dark" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>New Agent</DropdownItem>
              <DropdownItem>Old Agent</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody>
          {customerData.slice(0, 5).map((item, idx) => <div className={clsx(`d-flex align-items-center justify-content-between  ${joinDataLength == idx ? '' : 'border-bottom'}  ${joinDataLength == idx || idx == 0 ? '' : 'py-3'} gap-2 ${idx == 0 && 'pb-3'} ${joinDataLength == idx && 'pt-3'}`)} key={idx}>
              <div className="d-flex align-items-center gap-2">
                <div className="avatar">
                  {item.user?.avatar && <Image src={item.user?.avatar} alt="avatar-3" className="img-fluid rounded-circle" />}
                </div>
                <div className="d-block">
                  <span className="text-dark">
                    <Link href="" className="text-dark fw-medium fs-15">
                      {item.user?.name}
                    </Link>
                  </span>
                  <p className="mb-0 fs-14 text-muted">{item.user?.email}</p>
                </div>
              </div>
              <div>
                <p className="text-muted fw-medium mb-0">${item.amount}</p>
              </div>
            </div>)}
        </CardBody>
        <CardFooter className="border-top">
          <Button variant="primary" className="w-100">
            View All
          </Button>
        </CardFooter>
      </Card>
    </Col>;
};
export default TopCustomer;