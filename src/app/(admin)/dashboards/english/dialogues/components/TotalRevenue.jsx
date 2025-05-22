import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ProgressBar, Row } from 'react-bootstrap';
import { revenueData } from '../data';
import { currency } from '@/context/constants';
const TotalRevenue = () => {
  return <Col lg={6}>
      <Card>
        <CardHeader className="d-flex  justify-content-between align-items-center border-0">
          <CardTitle as={'h4'}>Total Revenue</CardTitle>
          <Dropdown>
            <DropdownToggle as={'a'} className="btn btn-sm btn-outline-light rounded content-none icons-center" data-bs-toggle="dropdown" aria-expanded="false">
              This Month <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>Today</DropdownItem>
              <DropdownItem>Month</DropdownItem>
              <DropdownItem>Years</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h3 className="d-flex align-items-center gap-2 text-dark fw-semibold">
                {currency}15,563.786{' '}
                <span className="badge text-success bg-success-subtle px-2 py-1 fs-12 icons-center">
                  <IconifyIcon width={12} height={12} icon="ri-arrow-up-line" />
                  4.53%
                </span>
              </h3>
              <p className="mb-0 text-muted">
                Gained <span className="text-success">{currency}978.56</span> This Month !
              </p>
            </div>
            <div className="avatar-md bg-light bg-opacity-50 rounded flex-centered">
              <IconifyIcon icon="solar:bag-2-broken" width={32} height={32} className="text-primary" />
            </div>
          </div>
          <div className="p-3 rounded bg-light-subtle border border-light mt-4">
            <h5>Revenue Sources</h5>
            <Row className="my-3 g-lg-0 g-2">
              {revenueData.map((item, idx) => <Col lg={3} xs={4} key={idx}>
                  <p className="mb-1 text-muted">
                    <IconifyIcon icon="ri:circle-fill" className={`fs-6 text-${item.variant}`} /> {item.title}
                  </p>
                  <p className="fs-16 text-dark fw-medium mb-1">{item.amount}</p>
                </Col>)}
            </Row>
            <ProgressBar>
              {revenueData.map((item, idx) => <>
                  <ProgressBar style={{
                height: '10px'
              }} variant={item.variant} className="rounded-pill rounded-0 gap-2 overflow-visible " now={item.progress} key={idx} />
                  &nbsp;
                </>)}
            </ProgressBar>
          </div>
        </CardBody>
      </Card>
    </Col>;
};
export default TotalRevenue;