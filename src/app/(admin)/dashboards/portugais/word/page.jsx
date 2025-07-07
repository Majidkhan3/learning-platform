import PageTitle from '@/components/PageTitle'
import CustomerByCountry from './components/CustomerByCountry'
import CustomerCountry from './components/CustomerCountry'
import CustomersInvest from './components/CustomersInvest'
import PropertyInvestor from './components/PropertyInvestor'
import TopCustomer from './components/TopCustomer'
import CustomerVisit from './components/CustomerVisit'
import PurchaseProperty from './components/PurchaseProperty'
import { Col, Row } from 'react-bootstrap'
import AddWord from './components/word/AddWord'
export const metadata = {
  title: 'Customers',
}
const CustomerPage = () => {
  return (
    <>
      <PageTitle title="Adicionar uma nova palavra" subName="Dashboards" />
      <Row className="mb-4">
        <Col xs={12}>
          <AddWord />
        </Col>
      </Row>
    </>
  )
}
export default CustomerPage
