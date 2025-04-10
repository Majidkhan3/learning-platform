import propertiesImg from '@/assets/images/properties/p-12.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
const AgentsDetailsBanner = () => {
  return <Row>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center justify-content-between bg-light-subtle flex-wrap">
            <CardTitle as={'h4'}>Agent</CardTitle>
            <div className="w-25">
              <form className="app-search d-none d-md-block">
                <div className="position-relative">
                  <input type="search" className="form-control" placeholder="Search" autoComplete="off" />
                  <IconifyIcon icon="solar:magnifer-broken" className="search-widget-icon" />
                </div>
              </form>
            </div>
          </CardHeader>
          <CardBody>
            <Row>
              <Col lg={12}>
                <div className="position-relative">
                  <Image src={propertiesImg} alt="properties" className="img-fluid rounded border border-light border-4" />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>;
};
export default AgentsDetailsBanner;