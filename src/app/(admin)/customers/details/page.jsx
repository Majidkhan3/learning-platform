import PageTitle from '@/components/PageTitle';
import { getAllProperty } from '@/helpers/data';
import CustomerCard from './components/CustomerCard';
import CustomersDetails from './components/CustomersDetails';
import { customerData } from './data';
import PropertyCard from './components/PropertyCard';
import WeeklyInquiry from './components/WeeklyInquiry';
import Transactions from './components/Transactions';
import OwnProperty from './components/OwnProperty';
import TransactionHistory from './components/TransactionHistory';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Customer Overview'
};
const CustomerDetailsPage = async () => {
  const propertyData = await getAllProperty();
  return <>
      <PageTitle subName="Customers" title="Customer Overview" />
      <Row>
        <Col xl={8} lg={12}>
          <CustomersDetails />
          <Card>
            <CardBody>
              <Row>
                {customerData.map((customer, idx) => <Col lg={4} key={idx}>
                    <CustomerCard customer={customer} />
                  </Col>)}
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle as={'h4'}>Interested Properties (3)</CardTitle>
            </CardHeader>
          </Card>
          <Row className="mt-3">
            {propertyData.slice(0, 3).map((property, idx) => <Col lg={4} key={idx}>
                <PropertyCard property={property} />
              </Col>)}
          </Row>
        </Col>
        <Col xl={4} lg={12}>
          <WeeklyInquiry />
          <Transactions />
          <OwnProperty />
        </Col>
      </Row>
      <TransactionHistory />
    </>;
};
export default CustomerDetailsPage;