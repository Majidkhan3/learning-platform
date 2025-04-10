import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllPricingPlans } from '@/helpers/data';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Pricing'
};
const PricingCard = ({
  plan
}) => {
  const {
    features,
    name,
    price,
    isPopular,
    subscribed
  } = plan;
  return <Card className="card-pricing">
      <CardBody className="rounded-top text-center bg-gradient bg-primary">
        {isPopular && <div className="pricing-ribbon pricing-ribbon-primary float-end">Popular</div>}
        <h5 className="mt-0 mb-3 fs-14 text-uppercase fw-semibold text-white">{name}</h5>
        <h2 className="mt-0 mb-0 fw-bold text-white">
          ${price} <span className="fs-14 fw-medium text-white text-opacity-50">/ Month</span>
        </h2>
      </CardBody>
      <CardBody className="pt-0">
        <ul className="card-pricing-features text-muted ps-0 list-unstyled">
          {features.map((feature, idx) => <li className="text-dark d-flex" key={idx}>
              <span className="icons-center">
                <IconifyIcon icon="solar:check-circle-bold-duotone" height={20} width={20} className="text-primary align-middle me-2" />
                {feature}
              </span>
            </li>)}
        </ul>
        <div className="mt-4 text-center">
          {subscribed ? <button className="btn btn-primary px-sm-4 disabled w-100">Current Plan</button> : <button className="btn btn-primary px-sm-4 w-100">Get Started</button>}
        </div>
      </CardBody>
    </Card>;
};
const PricingPage = async () => {
  const pricingPlans = await getAllPricingPlans();
  return <>
      <PageTitle title="Pricing" subName="Pages" />
      <Row className="justify-content-center">
        <Col xxl={11}>
          <div className="text-center my-4">
            <h3>Simple Pricing Plans</h3>
            <p className="text-muted text-center">Get the power and control you need to manage your organization&apos;s technical documentation</p>
          </div>
          <Row className="justify-content-center pt-3">
            {pricingPlans && pricingPlans.map((plan, idx) => <Col lg={3} key={idx}>
                  <PricingCard plan={plan} />
                </Col>)}
          </Row>
        </Col>
      </Row>
    </>;
};
export default PricingPage;