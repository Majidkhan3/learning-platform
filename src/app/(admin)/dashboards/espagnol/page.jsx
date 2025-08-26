import PageTitle from '@/components/PageTitle';
import { Card, CardHeader, Col, Row } from 'react-bootstrap';

import PageWithFilters from '@/app/(admin)/dashboards/espagnol/components/espagnol/PageWithFilters';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';
export const metadata = {
  title: 'Espagnol'
  // description: 'Espagnol',
};
const AnalyticsPage = () => {
  return <>
      <PageTitle title="Spanish" subName="Dashboard" />
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
                    <a href="/dashboards/espagnol/tags">

                    <button type="button"  className="btn btn-outline-primary me-2">
                      <IconifyIcon icon="ri:settings-2-line" className="me-1" />
                      Gérer les tags
                    </button>
                    </a>
                    <a href="/dashboards/espagnol/word">
                    <button type="button" className="btn btn-outline-primary me-2">
                      <IconifyIcon icon="ri:add-line" className="me-1" /> Ajouter un mot
                    </button>
                    </a>
                    <a href="/dashboards/espagnol/add-multiple-words">
                    <button type="button" className="btn btn-success me-1">
                      <IconifyIcon icon="ri:add-line" /> Ajouter plusieurs mots
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