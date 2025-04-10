'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Button, Card, CardBody, CardTitle, Col, Placeholder, PlaceholderButton, Row } from 'react-bootstrap';
const DefaultPlaceholders = () => {
  return <ComponentContainerCard id="default" title="Default" description={<>A progress bar can be used to show a user how far along he/she is in a process.</>}>
      <Row className="g-4">
        <Col md={4}>
          <Card>
            <svg className="bd-placeholder-img card-img-top" width="100%" height={180} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#20c997" />
            </svg>
            <CardBody>
              <CardTitle as={'h5'} className="mb-2">
                Card title
              </CardTitle>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</p>
              <Button variant="primary">Go somewhere</Button>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card aria-hidden="true">
            <svg className="bd-placeholder-img card-img-top" width="100%" height={180} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#868e96" />
            </svg>
            <CardBody>
              <CardTitle as={'h5'} className="placeholder-glow">
                <span className="placeholder col-6" />
              </CardTitle>
              <p className="card-text placeholder-glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />
                <Placeholder xs={4} /> <Placeholder xs={6} />
                <Placeholder xs={8} />
              </p>
              <Button variant="primary" tabIndex={-1} className="disabled placeholder col-6" />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const PlaceholdersConcept = () => {
  return <ComponentContainerCard id="how-works" title="How it works" description={<>
          Create placeholders with the <code>.placeholder</code> class and a grid column class (e.g., <code>.col-6</code>) to set the{' '}
          <code>width</code>. They can replace the text inside an element or be added as a modifier class to an existing component.
        </>}>
      <p aria-hidden="true">
        <Placeholder xs={6} />
      </p>
      <PlaceholderButton xs={4} tabIndex={-1} className="disabled" aria-hidden="true" />
    </ComponentContainerCard>;
};
const PlaceholdersWidth = () => {
  return <ComponentContainerCard id="width" title="Width" description={<>
          You can change the <code>width</code> through grid column classes, width utilities, or inline styles.
        </>}>
      <Placeholder xs={6} />
      <Placeholder className="w-75" />
      <Placeholder style={{
      width: '25%'
    }} />
    </ComponentContainerCard>;
};
const PlaceholdersWithColor = () => {
  return <ComponentContainerCard id="color" title="Color" description={<>
          By default, the <code>placeholder</code> uses <code>currentColor</code>. This can be overridden with a custom color or utility class.
        </>}>
      <Placeholder xs={12} />
      <Placeholder xs={12} bg="primary" />
      <Placeholder xs={12} bg="secondary" />
      <Placeholder xs={12} bg="success" />
      <Placeholder xs={12} bg="danger" />
      <Placeholder xs={12} bg="warning" />
      <Placeholder xs={12} bg="info" />
      <Placeholder xs={12} bg="light" />
      <Placeholder xs={12} bg="dark" />
    </ComponentContainerCard>;
};
const AllPlaceholders = () => {
  return <>
      <DefaultPlaceholders />
      <PlaceholdersConcept />
      <PlaceholdersWidth />
      <PlaceholdersWithColor />
    </>;
};
export default AllPlaceholders;