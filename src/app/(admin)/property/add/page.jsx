import FileUpload from '@/components/FileUpload';
import PageTitle from '@/components/PageTitle';
import { Col, Row } from 'react-bootstrap';
import PropertyAdd from './components/PropertyAdd';
import PropertyAddCard from './components/PropertyAddCard';
export const metadata = {
  title: 'Add Property'
};
const PropertyAddPage = () => {
  return <>
      <PageTitle title="Add Property" subName="Real Estate" />
      <Row>
        <PropertyAddCard />
        <Col xl={9} lg={8}>
          <FileUpload title="Add Property Photo" />
          <PropertyAdd />
        </Col>
      </Row>
    </>;
};
export default PropertyAddPage;