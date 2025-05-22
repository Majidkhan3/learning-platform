import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllUsers } from '@/helpers/data';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
const JoinAgent = async () => {
  const joinAgentData = await getAllUsers();
  const joinDataLength = joinAgentData.slice(0, 4).length - 1;
  return <Card>
      <CardHeader className="d-flex  justify-content-between align-items-center border-0">
        <div>
          <CardTitle as={'h4'} className="mb-1">
            Recent Join Agent
          </CardTitle>
          <p className="mb-0 fs-13">190 Agent Join</p>
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
      <CardBody className="pt-2">
        {joinAgentData.slice(0, 4).map((item, idx) => <div className={clsx(`d-flex flex-wrap align-items-center justify-content-between ${joinDataLength == idx ? '' : 'border-bottom'}  ${joinDataLength == idx || idx == 0 ? '' : 'py-3'} gap-2 ${idx == 0 && 'pb-3'} ${joinDataLength == idx && 'pt-3'}`)} key={idx}>
            <div className="d-flex align-items-center gap-2">
              <div className="avatar">
                <Image src={item.avatar} alt="avatar-3" className="img-fluid rounded-circle" />
              </div>
              <div className="d-block">
                <span className="text-dark">
                  <Link href="" className="text-dark fw-medium fs-15">
                    {item.name}
                  </Link>
                </span>
                <p className="mb-0 fs-13 text-muted">{item.email}</p>
              </div>
            </div>
            <div>
              <p className="text-muted fw-medium mb-0">May 2024</p>
            </div>
          </div>)}
      </CardBody>
      <CardFooter className="border-top">
        <Button variant="primary" className="w-100">
          View All
        </Button>
      </CardFooter>
    </Card>;
};
export default JoinAgent;