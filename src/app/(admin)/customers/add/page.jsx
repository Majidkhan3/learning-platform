import FileUpload from '@/components/FileUpload';
import PageTitle from '@/components/PageTitle';
import CustomerAddCard from './components/CustomerAddCard';
import AddCustomer from './components/AddCustomer';
import { Col, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Customers Add'
};
const CustomerAddPage = () => {
  return <>
      <PageTitle title="Customers Add" subName="Real Estate" />
      <Row>
        <CustomerAddCard />
        <Col xl={9} lg={12}>
          <FileUpload title="Add Customer Photo" />
          <AddCustomer />
        </Col>
      </Row>
    </>;
};
export default CustomerAddPage;