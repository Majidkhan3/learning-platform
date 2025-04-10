import { Badge, Button, Col, Row } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import UIExamplesList from '@/components/UIExamplesList';
import PageTitle from '@/components/PageTitle';
const HeadingBadge = () => {
  return <ComponentContainerCard id="heading" title="Heading" description={<>
          Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages. Alerts are
          available for any length of text, as well as an optional dismiss button.
        </>}>
      <h1>
        h1.Example heading&nbsp;
        <Badge bg="primary" className="ms-1">
          New
        </Badge>
      </h1>
      <h2>
        h2.Example heading&nbsp;
        <Badge bg="secondary" className="ms-1">
          New
        </Badge>
      </h2>
      <h3>
        h3.Example heading&nbsp;
        <Badge bg="success" className="ms-1">
          New
        </Badge>
      </h3>
      <h4>
        h4.Example heading&nbsp;
        <Badge bg="info" className="ms-1">
          New
        </Badge>
      </h4>
      <h5>
        h5.Example heading&nbsp;
        <Badge bg="warning" className="ms-1">
          New
        </Badge>
      </h5>
      <h6 className="mb-0">
        h6.Example heading&nbsp;
        <Badge bg="danger" className="ms-1">
          New
        </Badge>
      </h6>
    </ComponentContainerCard>;
};
const DefaultAndPillBadges = () => {
  return <ComponentContainerCard id="default_pill_badges" title="Default & Pill Badges" description={<>
          {' '}
          Use our background utility classes to quickly change the appearance of a badge. And use the <code>.rounded-pill</code> class to make badges
          more rounded.
        </>}>
      <div className="mb-2">
        <Badge bg="primary" className="me-1">
          Primary
        </Badge>
        <Badge bg="secondary" className="me-1">
          Secondary
        </Badge>
        <Badge bg="success" className="me-1">
          Success
        </Badge>
        <Badge bg="info" className="me-1">
          Info
        </Badge>
        <Badge bg="warning" className="me-1">
          Warning
        </Badge>
        <Badge bg="danger" className="me-1">
          Danger
        </Badge>
        <Badge bg="dark" className="me-1">
          Dark
        </Badge>
        <Badge bg="purple" className="me-1">
          Purple
        </Badge>
        <Badge bg="pink" className="me-1">
          Pink
        </Badge>
        <Badge bg="orange" className="me-1">
          Orange
        </Badge>
      </div>
      <div>
        <Badge bg="primary" pill className="me-1">
          Primary
        </Badge>
        <Badge bg="secondary" pill className="me-1">
          Secondary
        </Badge>
        <Badge bg="success" pill className="me-1">
          Success
        </Badge>
        <Badge bg="info" pill className="me-1">
          Info
        </Badge>
        <Badge bg="warning" pill className="me-1">
          Warning
        </Badge>
        <Badge bg="danger" pill className="me-1">
          Danger
        </Badge>
        <Badge bg="dark" pill className="me-1">
          Dark
        </Badge>
        <Badge bg="purple" pill className="me-1">
          Purple
        </Badge>
        <Badge bg="pink" pill className="me-1">
          Pink
        </Badge>
        <Badge bg="orange" pill className="me-1">
          Orange
        </Badge>
      </div>
    </ComponentContainerCard>;
};
const OutlineBadges = () => {
  return <ComponentContainerCard id="outline_badges" title="Outline & Outline Pill Badges" description={<>
          {' '}
          Using the <code>.badge-outline-**</code> to quickly create a bordered badges.
        </>}>
      <div className="mb-2">
        <span className="badge badge-outline-primary me-1">Primary</span>
        <span className="badge badge-outline-secondary me-1">Secondary</span>
        <span className="badge badge-outline-success me-1">Success</span>
        <span className="badge badge-outline-info me-1">Info</span>
        <span className="badge badge-outline-warning me-1">Warning</span>
        <span className="badge badge-outline-danger me-1">Danger</span>
        <span className="badge badge-outline-dark me-1">Dark</span>
        <span className="badge badge-outline-purple me-1">Purple</span>
        <span className="badge badge-outline-pink me-1">Pink</span>
        <span className="badge badge-outline-orange me-1">Orange</span>
      </div>
      <div>
        <span className="badge badge-outline-primary rounded-pill me-1">Primary</span>
        <span className="badge badge-outline-secondary rounded-pill me-1">Secondary</span>
        <span className="badge badge-outline-success rounded-pill me-1">Success</span>
        <span className="badge badge-outline-info rounded-pill me-1">Info</span>
        <span className="badge badge-outline-warning rounded-pill me-1">Warning</span>
        <span className="badge badge-outline-danger rounded-pill me-1">Danger</span>
        <span className="badge badge-outline-dark rounded-pill me-1">Dark</span>
        <span className="badge badge-outline-purple rounded-pill me-1">Purple</span>
        <span className="badge badge-outline-pink rounded-pill me-1">Pink</span>
        <span className="badge badge-outline-orange rounded-pill me-1">Orange</span>
      </div>
    </ComponentContainerCard>;
};
const SoftBadges = () => {
  return <ComponentContainerCard id="soft_badges" title="Soft & Soft Pill Badges" description={<>
          {' '}
          Using the <code>.badge-soft-**</code> modifier class, you can have more soften variation.
        </>}>
      <div className="mb-2">
        <span className="badge badge-soft-primary me-1">Primary</span>
        <span className="badge badge-soft-secondary me-1">Secondary</span>
        <span className="badge badge-soft-success me-1">Success</span>
        <span className="badge badge-soft-info me-1">Info</span>
        <span className="badge badge-soft-warning me-1">Warning</span>
        <span className="badge badge-soft-danger me-1">Danger</span>
        <span className="badge badge-soft-dark me-1">Dark</span>
        <span className="badge badge-soft-purple me-1">Purple</span>
        <span className="badge badge-soft-pink me-1">Pink</span>
        <span className="badge badge-soft-orange me-1">Orange</span>
      </div>
      <div>
        <span className="badge badge-soft-primary rounded-pill me-1">Primary</span>
        <span className="badge badge-soft-secondary rounded-pill me-1">Secondary</span>
        <span className="badge badge-soft-success rounded-pill me-1">Success</span>
        <span className="badge badge-soft-info rounded-pill me-1">Info</span>
        <span className="badge badge-soft-warning rounded-pill me-1">Warning</span>
        <span className="badge badge-soft-danger rounded-pill me-1">Danger</span>
        <span className="badge badge-soft-dark rounded-pill me-1">Dark</span>
        <span className="badge badge-soft-purple rounded-pill me-1">Purple</span>
        <span className="badge badge-soft-pink rounded-pill me-1">Pink</span>
        <span className="badge badge-soft-orange rounded-pill me-1">Orange</span>
      </div>
    </ComponentContainerCard>;
};
const ButtonAndPosition = () => {
  return <ComponentContainerCard id="component_badges" title="Buttons & Position" description={<>Alerts can also contain additional HTML elements like headings, paragraphs and dividers.</>}>
      <div className="mb-2">
        <Button variant="primary" type="button" className="me-1 mb-1">
          Notifications
          <span className="badge bg-danger ms-1">4</span>
        </Button>
        <Button variant="outline-primary" type="button" className="me-1 mb-1">
          Notifications
          <span className="badge bg-primary ms-1">new</span>
        </Button>
        <Button variant="soft-primary" type="button" className="me-1 mb-1">
          Notifications
          <span className="badge bg-primary ms-1">11</span>
        </Button>
        <span role="button" className="btn me-1 mb-1">
          Notifications
          <span className="badge bg-primary ms-1">90+</span>
        </span>
      </div>
      <div>
        <Button variant="primary" className="position-relative me-3">
          Inbox
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">99+</span>
        </Button>
        <Button variant="primary" type="button" className="position-relative">
          Profile
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" />
        </Button>
      </div>
    </ComponentContainerCard>;
};
export const metadata = {
  title: 'Badges'
};
const Badges = () => {
  return <>
      <PageTitle subName="UI" title="Badge" />
      <Row>
        <Col xl={9}>
          <HeadingBadge />
          <DefaultAndPillBadges />
          <OutlineBadges />
          <SoftBadges />
          <ButtonAndPosition />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#heading',
          label: 'Heading'
        }, {
          link: '#default_pill_badges',
          label: 'Default & Pill Badges'
        }, {
          link: '#outline_badges',
          label: 'Outline & Outline Pill Badges'
        }, {
          link: '#soft_badges',
          label: 'Soft & Soft Pill Badges'
        }, {
          link: '#component_badges',
          label: 'Buttons & Position'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Badges;