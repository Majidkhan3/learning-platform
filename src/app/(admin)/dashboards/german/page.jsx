import PageTitle from '@/components/PageTitle';
import { Card, CardHeader, Col, Row } from 'react-bootstrap';

import PageWithFilters from '@/app/(admin)/dashboards/german/components/german/PageWithFilters';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';
export const metadata = {
  title: 'German'
  // description: 'Espagnol',
};
const AnalyticsPage = () => {
  return <>
      <PageTitle title="German" subName="Dashboard" />
      {/* <Statistics />
      <Row>
        <SalesChart />
        <BalanceCard />
      </Row>
      <SocialSource />
      <Transaction /> */}
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <Row className="justify-content-between">
                <Col lg={12}>
                  <div className="text-md-end mt-3 mt-md-0">
                    <a href="/dashboards/german/tags">

                    <button type="button"  className="btn btn-outline-primary me-2">
                      <IconifyIcon icon="ri:settings-2-line" className="me-1" />
                     Tags verwalten
                    </button>
                    </a>
                    <a href="/dashboards/german/word">
                    <button type="button" className="btn btn-outline-primary me-2">
                      <IconifyIcon icon="ri:add-line" className="me-1" />Füge ein Wort hinzu
                    </button>
                    </a>
                    <a href="/dashboards/german/add-multiple-words">
                    <button type="button" className="btn btn-success me-1">
                      <IconifyIcon icon="ri:add-line" /> Fügen Sie einige Wörter hinzu
                    </button>
                    </a>
                  </div>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <PageWithFilters/>
    </>;
};
export default AnalyticsPage;