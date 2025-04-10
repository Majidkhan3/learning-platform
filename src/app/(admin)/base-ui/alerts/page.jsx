import { Alert, Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import UIExamplesList from '@/components/UIExamplesList';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Alerts'
};
const BasicAlerts = () => {
  return <ComponentContainerCard id="overview" title="Basic Example" description={<>
          Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages. Alerts are
          available for any length of text, as well as an optional dismiss button.
        </>}>
      <Alert variant="primary" role="alert">
        A simple primary alert—check it out!
      </Alert>
      <Alert variant="secondary" role="alert">
        A simple secondary alert—check it out!
      </Alert>
      <Alert variant="success" role="alert">
        A simple success alert—check it out!
      </Alert>
      <Alert variant="danger" role="alert">
        A simple danger alert—check it out!
      </Alert>
      <Alert variant="warning" role="alert">
        A simple warning alert—check it out!
      </Alert>
      <Alert variant="info" role="alert">
        A simple info alert—check it out!
      </Alert>
      <Alert variant="light" role="alert">
        A simple light alert—check it out!
      </Alert>
      <Alert variant="dark" className="mb-0" role="alert">
        A simple dark alert—check it out!
      </Alert>
    </ComponentContainerCard>;
};
const DismissibleAlerts = () => {
  return <ComponentContainerCard id="alert-dismissible" title="Dismissible Alerts Example" description={<>
          {' '}
          Add a dismiss button and the <code>.alert-dismissible</code> class, which adds extra padding to the right of the alert and positions the{' '}
          <code>.btn-close</code> button.
        </>}>
      <Alert variant="primary" dismissible className="fade show" role="alert">
        A simple primary alert—check it out!
      </Alert>
      <Alert variant="secondary" dismissible className="fade show" role="alert">
        A simple secondary alert—check it out!
      </Alert>
      <Alert variant="success" dismissible className="fade show" role="alert">
        A simple success alert—check it out!
      </Alert>
      <Alert variant="danger" dismissible className="fade show" role="alert">
        A simple danger alert—check it out!
      </Alert>
      <Alert variant="warning" dismissible className="fade show" role="alert">
        A simple warning alert—check it out!
      </Alert>
      <Alert variant="info" dismissible className="fade show" role="alert">
        A simple info alert—check it out!
      </Alert>
      <Alert variant="light" dismissible className="fade show" role="alert">
        A simple light alert—check it out!
      </Alert>
      <Alert variant="dark" dismissible className="fade show mb-0" role="alert">
        A simple dark alert—check it out!
      </Alert>
    </ComponentContainerCard>;
};
const LinkAlerts = () => {
  return <ComponentContainerCard id="alert-link" title="Alert Link Example" description={<>
          Use the <code>.alert-link</code> utility class to quickly provide matching colored links within any alert.
        </>}>
      <Alert variant="primary" role="alert">
        A simple primary alert with
        <Link href="" className="alert-link">
          &nbsp;an example link
        </Link>
        . Give it a click if you like.
      </Alert>
      <Alert variant="secondary" role="alert">
        A simple secondary alert with
        <Link href="" className="alert-link">
          &nbsp;an example link
        </Link>
        . Give it a click if you like.
      </Alert>
      <Alert variant="success" role="alert">
        A simple success alert with
        <Link href="" className="alert-link">
          &nbsp;an example link
        </Link>
        . Give it a click if you like.
      </Alert>
      <Alert variant="danger" className="mb-0" role="alert">
        A simple danger alert with
        <Link href="" className="alert-link">
          &nbsp;an example link
        </Link>
        . Give it a click if you like.
      </Alert>
    </ComponentContainerCard>;
};
const IconAlerts = () => {
  return <ComponentContainerCard id="alert-icon" title="Icons Alert Example" description={<>You can also include additional elements like icons, heading, etc along side the actual message.</>}>
      <Alert variant="primary" className="alert-icon" role="alert">
        <div className="d-flex align-items-center">
          <div className="avatar-sm rounded bg-primary d-flex justify-content-center align-items-center fs-18 me-2 flex-shrink-0">
            <IconifyIcon icon="bx:info-circle" className="text-white" />
          </div>
          <div className="flex-grow-1">A simple primary alert—check it out!</div>
        </div>
      </Alert>
      <Alert variant="secondary" className="alert-icon" role="alert">
        <div className="d-flex align-items-center">
          <div className="avatar-sm rounded bg-secondary d-flex justify-content-center align-items-center fs-18 me-2 flex-shrink-0">
            <IconifyIcon icon="bx:x-circle" className="text-white" />
          </div>
          <div className="flex-grow-1">A simple secondary alert—check it out!</div>
        </div>
      </Alert>
      <Alert variant="success" className="alert-icon" role="alert">
        <div className="d-flex align-items-center">
          <div className="avatar-sm rounded bg-success d-flex justify-content-center align-items-center fs-18 me-2 flex-shrink-0">
            <IconifyIcon icon="bx:check-shield" className="text-white" />
          </div>
          <div className="flex-grow-1">A simple success alert—check it out!</div>
        </div>
      </Alert>
      <Alert variant="danger" className="alert-icon mb-0" role="alert">
        <div className="d-flex align-items-center">
          <div className="avatar-sm rounded bg-danger d-flex justify-content-center align-items-center fs-18 me-2 flex-shrink-0">
            <IconifyIcon icon="bx:info-circle" className="text-white" />
          </div>
          <div className="flex-grow-1">A simple danger alert—check it out!</div>
        </div>
      </Alert>
    </ComponentContainerCard>;
};
const AdditionalContentAlerts = () => {
  return <ComponentContainerCard id="alert-additional" title="Additional Content Alert Example" description={<>Alerts can also contain additional HTML elements like headings, paragraphs and dividers.</>}>
      <Row>
        <Col xl={6}>
          <Alert variant="primary" className="mb-3 p-3 mb-xl-0" role="alert">
            <h4 className="alert-heading">Well done!</h4>
            <p className="mb-0">
              Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how
              spacing within an alert works with this kind of content.
            </p>
            <hr />
            <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
          </Alert>
        </Col>
        <Col xl={6}>
          <Alert variant="secondary" className="p-3 mb-0" role="alert">
            <h4 className="alert-heading">Well done!</h4>
            <p className="mb-0">
              Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how
              spacing within an alert works with this kind of content.
            </p>
            <hr />
            <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
          </Alert>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const Alerts = () => {
  return <>
      <PageTitle subName="UI" title="Alerts" />
      <Row>
        <Col xl={9}>
          <BasicAlerts />
          <DismissibleAlerts />
          <LinkAlerts />
          <IconAlerts />
          <AdditionalContentAlerts />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          label: 'Basic Example',
          link: '#overview'
        }, {
          label: 'Alert Dismissible',
          link: '#alert-dismissible'
        }, {
          label: 'Alert Link',
          link: '#alert-link'
        }, {
          label: 'Icons Alert',
          link: '#alert-icon'
        }, {
          label: 'Additional Content Alert',
          link: '#alert-additional'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Alerts;