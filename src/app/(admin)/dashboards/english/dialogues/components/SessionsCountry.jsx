import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ProgressBar, Row } from 'react-bootstrap';
import { countryData } from '../data';
const SessionsCountry = () => {
  return <Col lg={7}>
      <Card>
        <CardHeader className="d-flex  justify-content-between align-items-center border-0">
          <CardTitle as={'h4'}>Sessions by Country</CardTitle>
          <Dropdown>
            <DropdownToggle as={'a'} className="btn btn-sm btn-outline-light rounded content-none icons-center" data-bs-toggle="dropdown" aria-expanded="false">
              Asia <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>U.S.A</DropdownItem>
              <DropdownItem>Russia</DropdownItem>
              <DropdownItem>China</DropdownItem>
              <DropdownItem>Canada</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody>
          <Row className="justify-content-between mt-1">
            <Col lg={6}>
              <div className="d-flex align-items-center gap-2">
                <div className="avatar-md bg-light bg-opacity-50 rounded flex-centered">
                  <IconifyIcon icon="solar:user-rounded-broken" width={32} height={32} className="fs-32 text-primary" />
                </div>
                <div>
                  <p className="mb-0 fs-20 text-dark fw-medium">145.678</p>
                  <small>(Total Visitors)</small>
                </div>
              </div>
              <div id="world-map-markers" className="mt-4" style={{
              height: 235
            }}></div>
            </Col>
            <Col lg={5} dir="ltr">
              <div className="p-3 bg-light-subtle rounded border border-light">
                {countryData.map((item, idx) => <>
                    <div className="d-flex justify-content-between align-items-center" key={idx}>
                      <p className="mb-1">
                        <IconifyIcon icon={item.icon} className="fs-16 align-middle me-1" /> <span className="align-middle">{item.country}</span>
                      </p>
                      <p className="mb-0 fs-13 fw-semibold">{item.view}k</p>
                    </div>
                    <Row className="align-items-center mb-3">
                      <Col>
                        <ProgressBar now={item.progress} variant={item.variant} className="mt-2 progress-soft progress-sm" role="progressbar" />
                      </Col>
                      <Col xs={'auto'}>
                        <p className="mb-0 fs-12 text-muted fw-medium">{item.progress}%</p>
                      </Col>
                    </Row>
                  </>)}
                <div className="mt-2 pt-1 text-center">
                  <Link href="" className="link-primary icons-center">
                    Add Other&nbsp;
                    <IconifyIcon icon="ri:add-line" />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>;
};
export default SessionsCountry;