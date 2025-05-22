import PageTitle from '@/components/PageTitle';
import { Col, Row } from 'react-bootstrap';
import CollectionRent from './components/CollectionRent';
import Goals from './components/Goals';
import JoinAgent from './components/JoinAgent';
import RecentAgent from './components/RecentAgent';
import SalesFunnel from './components/SalesFunnel';
import SessionsCountry from './components/SessionsCountry';
import Statistics from './components/Statistics';
import TopAgents from './components/TopAgents';
import TotalRevenue from './components/TotalRevenue';
import AddTags from './components/tags/AddTags';
export const metadata = {
  title: 'Agent'
};
const AgentPage = () => {
  return <>
      <PageTitle title="Tags" subName="Dashboards" />
      <AddTags />
      {/* <Row>
        <Statistics />
      </Row>
      <Row>
        <Col xl={9}>
          <Row>
            <SalesFunnel />
            <TotalRevenue />
          </Row>
          <Row>
            <RecentAgent />
          </Row>
          <Row>
            <CollectionRent />
            <SessionsCountry />
          </Row>
        </Col>
        <Col xl={3}>
          <TopAgents />
          <Goals />
          <JoinAgent />
        </Col>
      </Row> */}
    </>;
};
export default AgentPage;