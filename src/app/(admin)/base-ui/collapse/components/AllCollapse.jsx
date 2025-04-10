'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import useToggle from '@/hooks/useToggle';
import Link from 'next/link';
import { Button, Card, CardBody, Col, Collapse, Row } from 'react-bootstrap';
const DefaultExample = () => {
  const {
    isTrue,
    toggle
  } = useToggle();
  return <ComponentContainerCard id="default" title="Default Example" description={<>Click the buttons below to show and hide another element via class changes:</>}>
      <ul>
        <li>
          <code>.collapse</code> hides content
        </li>
        <li>
          <code>.collapsing</code> is applied during transitions
        </li>
        <li>
          <code>.collapse.show</code> shows content
        </li>
      </ul>
      <p className="text-muted">
        Generally, we recommend using a button with the
        <code>data-bs-target</code> attribute. While not recommended from a semantic point of view, you can also use a link with the <code>href</code>{' '}
        attribute (and a <code>role=&quot;button&quot;</code>). In both cases, the
        <code>data-bs-toggle=&quot;collapse&quot;</code>
        is required.
      </p>
      <div className="hstack gap-2">
        <Button variant="primary" className="mb-2" href="#collapseExample" onClick={toggle}>
          Link with href
        </Button>
      </div>
      <Collapse in={isTrue}>
        <div>
          <Card className="mb-0">
            <CardBody>
              Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant
              trigger.
            </CardBody>
          </Card>
        </div>
      </Collapse>
    </ComponentContainerCard>;
};
const HorizontalCollapse = () => {
  const {
    isTrue,
    toggle
  } = useToggle();
  return <ComponentContainerCard id="horizontal" title="Horizontal" description={<>
          The collapse plugin also supports horizontal collapsing. Add the <code>.collapse-horizontal</code>&nbsp; modifier class to transition
          the&nbsp; <code>width</code> instead of&nbsp; <code>height</code> and set a&nbsp; <code>width</code> on the immediate child element. Feel
          free to write your own custom Sass, use inline styles, or use our width utilities.
        </>}>
      <Button variant="primary" className="mb-2" type="button" onClick={toggle}>
        Toggle width collapse
      </Button>
      <div style={{
      minHeight: 135
    }}>
        <Collapse dimension="width" in={isTrue}>
          <div>
            <CardBody className="mb-0" style={{
            width: 300
          }}>
              This is some placeholder content for a horizontal collapse. It&apos;s hidden by default and shown when triggered.
            </CardBody>
          </div>
        </Collapse>
      </div>
    </ComponentContainerCard>;
};
const MultipleTargetsCollapse = () => {
  const {
    isTrue: isOpenFirst,
    toggle: toggleFirst
  } = useToggle(false);
  const {
    isTrue: isOpenSecond,
    toggle: toggleSecond
  } = useToggle(false);
  const toggleBoth = () => {
    toggleFirst();
    toggleSecond();
  };
  return <ComponentContainerCard id="multiple-targets" title="Multiple Targets" description={<>
          A <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> can show and hide multiple elements by referencing them with a selector in its{' '}
          <code>href</code> or <code>data-bs-target</code> attribute. Multiple <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> can show and hide
          an element if they each reference it with their <code>href</code> or <code>data-bs-target</code> attribute
        </>}>
      <div className="hstack gap-2">
        <Link className="btn btn-primary" href="#multiCollapseExample1" role="button" onClick={toggleFirst}>
          Toggle first element
        </Link>
        <Button variant="primary" type="button" onClick={toggleSecond}>
          Toggle second element
        </Button>
        <Button variant="primary" type="button" onClick={toggleBoth}>
          Toggle both elements
        </Button>
      </div>
      <Row>
        <Col>
          <Collapse className="multi-collapse" in={isOpenFirst}>
            <div>
              <CardBody>
                Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed
                when the user activates the relevant trigger.
              </CardBody>
            </div>
          </Collapse>
        </Col>
        <Col>
          <Collapse className="multi-collapse" in={isOpenSecond}>
            <div>
              <CardBody>
                Some placeholder content for the second collapse component of this multi-collapse example. This panel is hidden by default but
                revealed when the user activates the relevant trigger.
              </CardBody>
            </div>
          </Collapse>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const AllCollapse = () => {
  return <>
      <DefaultExample />
      <HorizontalCollapse />
      <MultipleTargetsCollapse />
    </>;
};
export default AllCollapse;