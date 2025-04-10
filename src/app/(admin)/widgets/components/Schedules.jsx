import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Alert, Card, CardBody, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import clsx from 'clsx';
import { scheduleData } from '../data';
const Schedules = () => {
  return <Card>
      <CardBody>
        <Dropdown className="float-end">
          <DropdownToggle as={'a'} role="button" className="arrow-none">
            <IconifyIcon icon="bx:dots-vertical-rounded" className="fs-18 text-dark" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem>
              <IconifyIcon icon="bx:list-ul" className="me-2" />
              To Do
            </DropdownItem>
            <DropdownItem>
              <IconifyIcon icon="bx:line-chart" className="me-2" />
              In Progress
            </DropdownItem>
            <DropdownItem>
              <IconifyIcon icon="bx:check-square" className="me-2" />
              Completed
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <CardTitle as={'h5'} className="mb-3">
          Today&apos;s Schedules
        </CardTitle>
        {scheduleData.map((schedule, idx) => <Row className="align-items-center" key={idx}>
            <Col sm={2} xs={3}>
              <p>{schedule.time}</p>
            </Col>
            <Col sm={10} xs={9}>
              <Alert variant={schedule.variant} className={clsx('px-2', scheduleData.length - 1 === idx && 'mb-0')} role="alert">
                <p className="mb-0">{schedule.title}</p>
                <p className="mb-0">{schedule.duration}</p>
              </Alert>
            </Col>
          </Row>)}
      </CardBody>
    </Card>;
};
export default Schedules;