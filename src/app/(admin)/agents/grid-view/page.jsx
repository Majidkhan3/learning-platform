import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Link from 'next/link';
import { Card, CardHeader, Col, Row } from 'react-bootstrap';
import AgentData from './Components/AgentData';
import AgentGridCard from './Components/AgentGridCard';
export const metadata = {
  title: 'Agent Grid'
};
const GridViewPage = () => {
  console.log("GridViewPage");
  return <>
      <PageTitle subName="Real Estate" title="Agent Grid" />
      <AgentGridCard />
      <Row>
        <Col lg={12}>
          <Card className="bg-body shadow-none">
            <CardHeader className="border-0">
              <Row className="justify-content-between align-items-center">
                <Col lg={6}>
                  <p className="mb-0 text-muted">
                    Showing all <span className="text-dark fw-semibold">311</span> Agent
                  </p>
                </Col>
                <Col lg={6}>
                  <div className="text-md-end mt-3 mt-md-0">
                    <button type="button" className="btn btn-outline-primary me-1">
                      <IconifyIcon icon="ri:settings-2-line" className="me-1" />
                      More Setting
                    </button>
                    <button type="button" className="btn btn-outline-primary me-1">
                      <IconifyIcon icon="ri:filter-line" className="me-1" /> Filters
                    </button>
                    <button type="button" className="btn btn-success me-1">
                      <IconifyIcon icon="ri-add-line" /> New Agent
                    </button>
                  </div>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <AgentData />
      <div className="p-3 border-top">
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
      </div>
    </>;
};
export default GridViewPage;