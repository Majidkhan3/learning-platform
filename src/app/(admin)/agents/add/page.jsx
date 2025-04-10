import FileUpload from '@/components/FileUpload';
import PageTitle from '@/components/PageTitle';
import { Col, Row } from 'react-bootstrap';
import AgentAdd from './components/AgentAdd';
import AgentAddCard from './components/AgentAddCard';
export const metadata = {
  title: 'Add Agent'
};
const AgentAddPage = () => {
  return <>
      <PageTitle subName="Real Estate" title="Add Agent" />
      <Row>
        <AgentAddCard />
        <Col xl={9} lg={8}>
          <FileUpload title="Add Agent Photo" />
          <AgentAdd />
        </Col>
      </Row>
    </>;
};
export default AgentAddPage;