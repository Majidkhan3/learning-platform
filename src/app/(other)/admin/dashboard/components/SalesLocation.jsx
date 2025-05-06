import WorldVectorMap from '@/components/VectorMap/WorldMap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const SalesLocation = () => {
  const salesLocationOptions = {
    map: 'world',
    zoomOnScroll: true,
    zoomButtons: false,
    markersSelectable: true,
    markers: [{
      name: 'Canada',
      coords: [56.1304, -106.3468]
    }, {
      name: 'Brazil',
      coords: [-14.235, -51.9253]
    }, {
      name: 'Russia',
      coords: [61, 105]
    }, {
      name: 'China',
      coords: [35.8617, 104.1954]
    }, {
      name: 'United States',
      coords: [37.0902, -95.7129]
    }],
    markerStyle: {
      initial: {
        fill: '#7f56da'
      },
      selected: {
        fill: '#1bb394'
      }
    },
    regionStyle: {
      initial: {
        fill: 'rgba(169,183,197, 0.3)',
        fillOpacity: 1
      }
    }
  };
  return <Col xl={6} lg={6}>
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center pb-1">
          <div>
            <CardTitle as={'h4'}>Most Sales Location</CardTitle>
          </div>
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
          <Row>
            <Col xl={12}>
              <div id="most-sales-location" className="mt-3" style={{
              height: 322
            }}>
                <WorldVectorMap height="322" width="100%" options={salesLocationOptions} />
              </div>
            </Col>
          </Row>
          <div className="progress mt-5 overflow-visible" style={{
          height: 25
        }}>
            <div className="progress-bar bg-primary  position-relative overflow-visible rounded-start" role="progressbar" style={{
            width: '20%'
          }} aria-valuenow={15} aria-valuemin={0} aria-valuemax={100}>
              <p className="progress-value text-start text-dark mb-0 mt-1 fs-14 fw-medium" style={{
              left: '0%',
              top: '-50px'
            }}>
                Canada
              </p>
              <p className="progress-value text-start text-light mb-0 mt-1 fs-14 fw-medium" style={{
              left: '0%',
              top: '-30px'
            }}>
                |
              </p>
              <p className="mb-0  text-start ps-1 ps-lg-2 text-white fs-14">71.1%</p>
            </div>
            <div className="progress-bar bg-primary bg-opacity-75 position-relative overflow-visible" role="progressbar" style={{
            width: '20%'
          }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}>
              <p className="progress-value text-start text-dark mb-0 mt-1 fs-14 fw-medium" style={{
              left: '0%',
              top: '-50px'
            }}>
                USA{' '}
              </p>
              <p className="progress-value text-start text-light mb-0 mt-1 fs-14 fw-medium" style={{
              left: '0%',
              top: '-30px'
            }}>
                |{' '}
              </p>
              <p className="mb-0  text-start ps-1 ps-lg-2 text-white fs-14">67.0%</p>
            </div>
            <div className="progress-bar bg-primary bg-opacity-50 position-relative overflow-visible" role="progressbar" style={{
            width: '20%'
          }} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
              <p className="progress-value text-start text-dark mb-0 mt-1 fs-14 fw-medium" style={{
              left: '0%',
              top: '-50px'
            }}>
                Brazil
              </p>
              <p className="progress-value text-start text-light mb-0 mt-1 fs-14 fw-medium" style={{
              left: '0%',
              top: '-30px'
            }}>
                |
              </p>
              <p className="mb-0  text-start ps-1 ps-lg-2 text-white fs-14">53.9%</p>
            </div>
            <div className="progress-bar bg-primary bg-opacity-25 position-relative overflow-visible" role="progressbar" style={{
            width: '20%'
          }} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
              <p className="progress-value text-start text-dark mb-0 mt-1 fs-14 fw-medium" style={{
              left: '0%',
              top: '-50px'
            }}>
                Russia
              </p>
              <p className="progress-value text-start text-light mb-0 mt-1 fs-14 fw-medium" style={{
              left: '0%',
              top: '-30px'
            }}>
                |{' '}
              </p>
              <p className="mb-0  text-start ps-1 ps-lg-2 text-white fs-14">49.2%</p>
            </div>
            <div className="progress-bar bg-primary bg-opacity-10 position-relative overflow-visible rounded-end" role="progressbar" style={{
            width: '20%'
          }} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
              <p className="progress-value text-start text-dark mb-0 mt-1 fs-14 fw-medium" style={{
              left: '0%',
              top: '-50px'
            }}>
                China{' '}
              </p>
              <p className="progress-value text-start text-light mb-0 mt-1 fs-14 fw-medium" style={{
              left: '0%',
              top: '-30px'
            }}>
                |{' '}
              </p>
              <p className="mb-0  text-start ps-1 ps-lg-2 text-white fs-14">38.8%</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>;
};
export default SalesLocation;