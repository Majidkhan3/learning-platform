import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import UIExamplesList from '@/components/UIExamplesList';
import Link from 'next/link';
import { Col, Row, ListGroup as BSListGroup, Badge, ListGroupItem } from 'react-bootstrap';
export const metadata = {
  title: 'List Group'
};
const Basic = () => {
  return <ComponentContainerCard id="basic" title="Basic" description={<>
          The most basic list group is an unordered list with list items and the proper classes. Build upon it with the options that follow, or with
          your own CSS as needed.
        </>}>
      <Row>
        <Col lg={6}>
          <BSListGroup>
            <ListGroupItem>An item</ListGroupItem>
            <ListGroupItem>A second item</ListGroupItem>
            <ListGroupItem>A third item</ListGroupItem>
            <ListGroupItem>A fourth item</ListGroupItem>
            <ListGroupItem>And a fifth one</ListGroupItem>
          </BSListGroup>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const ActiveItems = () => {
  return <ComponentContainerCard id="active" title="Active items" description={<>
          Add <code>.active</code> to a <code>.list-group-item</code> to indicate the current active selection.
        </>}>
      <Row>
        <Col lg={6}>
          <BSListGroup>
            <ListGroupItem active>An item</ListGroupItem>
            <ListGroupItem>A second item</ListGroupItem>
            <ListGroupItem>A third item</ListGroupItem>
            <ListGroupItem>A fourth item</ListGroupItem>
            <ListGroupItem>And a fifth one</ListGroupItem>
          </BSListGroup>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const DisabledItems = () => {
  return <ComponentContainerCard id="disabled" title="Disabled items" description={<>
          Add <code>.disabled</code> to a <code>.list-group-item</code> to make it <em>appear</em> disabled. Note that some elements with{' '}
          <code>.disabled</code> will also require custom JavaScript to fully disable their click events (e.g., links).
        </>}>
      <Row>
        <Col lg={6}>
          <BSListGroup>
            <ListGroupItem disabled>An item</ListGroupItem>
            <ListGroupItem>A second item</ListGroupItem>
            <ListGroupItem>A third item</ListGroupItem>
            <ListGroupItem>A fourth item</ListGroupItem>
            <ListGroupItem>And a fifth one</ListGroupItem>
          </BSListGroup>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const LinksButtons = () => {
  return <ComponentContainerCard id="links-buttons" title="Links and buttons" description={<>
          {' '}
          Use <code>&lt;a&gt;</code>s or <code>&lt;button&gt;</code>s to create <em>actionable</em> list group items with hover, disabled, and active
          states by adding <code>.list-group-item-action</code>. We separate these pseudo-classes to ensure list groups made of non-interactive
          elements (like <code>&lt;li&gt;</code>s or <code>&lt;div&gt;</code>s) don’t provide a click or tap affordance.
        </>}>
      <Row>
        <Col md={6}>
          <BSListGroup>
            <ListGroupItem action active>
              The current link item
            </ListGroupItem>
            <ListGroupItem action>A second link item</ListGroupItem>
            <ListGroupItem action>A third link item</ListGroupItem>
            <ListGroupItem action>A fourth link item</ListGroupItem>
            <ListGroupItem action disabled>
              A disabled link item
            </ListGroupItem>
          </BSListGroup>
        </Col>
        <Col md={6}>
          <BSListGroup>
            <ListGroupItem as={'button'} action active>
              The current button
            </ListGroupItem>
            <ListGroupItem as={'button'} action>
              A second button item
            </ListGroupItem>
            <ListGroupItem as={'button'} action>
              A third button item
            </ListGroupItem>
            <ListGroupItem as={'button'} action>
              A fourth button item
            </ListGroupItem>
            <ListGroupItem as={'button'} action disabled>
              A disabled button item
            </ListGroupItem>
          </BSListGroup>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const FlushListGroup = () => {
  return <ComponentContainerCard id="flush" title="Flush" description={<>
          Add <code>.list-group-flush</code> to remove some borders and rounded corners to render list group items edge-to-edge in a parent container
          (e.g., cards).
        </>}>
      <Row>
        <Col lg={6}>
          <BSListGroup variant="flush">
            <ListGroupItem>An item</ListGroupItem>
            <ListGroupItem>A second item</ListGroupItem>
            <ListGroupItem>A third item</ListGroupItem>
            <ListGroupItem>A fourth item</ListGroupItem>
            <ListGroupItem>And a fifth one</ListGroupItem>
          </BSListGroup>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const NumberedListGroup = () => {
  return <ComponentContainerCard id="numbered" title="Numbered" description={<>
          Add the <code>.list-group-numbered</code> modifier class (and optionally use an <code>&lt;ol&gt;</code> element) to opt into numbered list
          group items. Numbers are generated via CSS (as opposed to a <code>&lt;ol&gt;</code>s default browser styling) for better placement inside
          list group items and to allow for better customization.
        </>}>
      <p className="taext-muted">
        Numbers are generated by
        <code>counter-reset</code> on the
        <code>&lt;ol&gt;</code>, and then styled and placed with a<code>::before</code> pseudo-element on the <code>&lt;li&gt;</code> with
        <code>counter-increment</code> and
        <code>content</code>.
      </p>
      <Row>
        <Col md={6}>
          <BSListGroup as="ol" numbered>
            <ListGroupItem as="li">A list item</ListGroupItem>
            <ListGroupItem as="li">A list item</ListGroupItem>
            <ListGroupItem as="li">A list item</ListGroupItem>
          </BSListGroup>
        </Col>
        <Col md={6}>
          <BSListGroup as="ol" numbered>
            <ListGroupItem className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Content for list item
              </div>
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Content for list item
              </div>
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Content for list item
              </div>
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroupItem>
          </BSListGroup>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const HorizontalListGroup = () => {
  return <ComponentContainerCard id="horizontal" title="Horizontal" description={<>
          {' '}
          Add <code>.list-group-horizontal</code> to change the layout of list group items from vertical to horizontal across all breakpoints.
          Alternatively, choose a responsive variant{' '}
          <code>
            .list-group-horizontal-{'{'}sm|md|lg|xl|xxl{'}'}
          </code>{' '}
          to make a list group horizontal starting at that breakpoint’s <code>min-width</code>. Currently{' '}
          <strong>horizontal list groups cannot be combined with flush list groups.</strong>
        </>}>
      <p className="text-muted">
        <strong>ProTip:</strong> Want equal-width list group items when horizontal? Add
        <code>.flex-fill</code> to each list group item.
      </p>
      <Row>
        <Col lg={6}>
          <div className="d-flex flex-column gap-2">
            <BSListGroup horizontal>
              <ListGroupItem>An item</ListGroupItem>
              <ListGroupItem>A second item</ListGroupItem>
              <ListGroupItem>A third item</ListGroupItem>
            </BSListGroup>

            <BSListGroup horizontal="sm">
              <ListGroupItem>An item</ListGroupItem>
              <ListGroupItem>A second item</ListGroupItem>
              <ListGroupItem>A third item</ListGroupItem>
            </BSListGroup>

            <BSListGroup horizontal="md">
              <ListGroupItem>An item</ListGroupItem>
              <ListGroupItem>A second item</ListGroupItem>
              <ListGroupItem>A third item</ListGroupItem>
            </BSListGroup>

            <BSListGroup horizontal="md">
              <ListGroupItem>An item</ListGroupItem>
              <ListGroupItem>A second item</ListGroupItem>
              <ListGroupItem>A third item</ListGroupItem>
            </BSListGroup>

            <BSListGroup horizontal="xl">
              <ListGroupItem>An item</ListGroupItem>
              <ListGroupItem>A second item</ListGroupItem>
              <ListGroupItem>A third item</ListGroupItem>
            </BSListGroup>

            <BSListGroup horizontal="xxl">
              <ListGroupItem>An item</ListGroupItem>
              <ListGroupItem>A second item</ListGroupItem>
              <ListGroupItem>A third item</ListGroupItem>
            </BSListGroup>
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const ContextualListGroup = () => {
  return <ComponentContainerCard id="contextual-classes" title="Contextual classes" description={<>Use contextual classes to style list items with a stateful background and color.</>}>
      <Row>
        <Col lg={6}>
          <BSListGroup>
            <ListGroupItem>A simple default list group item</ListGroupItem>
            <ListGroupItem variant="primary">A simple primary list group item</ListGroupItem>
            <ListGroupItem variant="secondary">A simple secondary list group item</ListGroupItem>
            <ListGroupItem variant="success">A simple success list group item</ListGroupItem>
            <ListGroupItem variant="danger">A simple danger list group item</ListGroupItem>
            <ListGroupItem variant="warning">A simple warning list group item</ListGroupItem>
            <ListGroupItem variant="info">A simple info list group item</ListGroupItem>
            <ListGroupItem variant="light">A simple light list group item</ListGroupItem>
            <ListGroupItem variant="dark">A simple dark list group item</ListGroupItem>
          </BSListGroup>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const CustomContentListGroup = () => {
  return <ComponentContainerCard id="custom-content" title="Custom content" description={<>
          Add nearly any HTML within, even for linked list groups like the one below, with the help of <Link href="">flexbox utilities</Link>.
        </>}>
      <Row>
        <Col lg={6}>
          <BSListGroup>
            <ListGroupItem action active href="#" aria-current="true">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1 text-reset">List group item heading</h5>
                <small>3 days ago</small>
              </div>
              <p className="mb-1">Some placeholder content in a paragraph.</p>
              <small>And some small print.</small>
            </ListGroupItem>
            <ListGroupItem action href="#">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">List group item heading</h5>
                <small className="text-muted">3 days ago</small>
              </div>
              <p className="mb-1">Some placeholder content in a paragraph.</p>
              <small className="text-muted">And some muted small print.</small>
            </ListGroupItem>
            <ListGroupItem href="#" action>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">List group item heading</h5>
                <small className="text-muted">3 days ago</small>
              </div>
              <p className="mb-1">Some placeholder content in a paragraph.</p>
              <small className="text-muted">And some muted small print.</small>
            </ListGroupItem>
          </BSListGroup>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const CheckboxesAndRadiosListGroup = () => {
  return <ComponentContainerCard id="checkboxes-radios" title="Checkboxes and radios" description={<>
          Place Bootstrap’s checkboxes and radios within list group items and customize as needed. You can use them without <code>&lt;label&gt;</code>
          s, but please remember to include an <code>aria-label</code> attribute and value for accessibility.
        </>}>
      <Row>
        <Col lg={6}>
          <BSListGroup>
            <ListGroupItem>
              <input className="form-check-input me-1" type="checkbox" id="firstCheckbox" />
              <label className="form-check-label" htmlFor="firstCheckbox">
                First checkbox
              </label>
            </ListGroupItem>
            <ListGroupItem>
              <input className="form-check-input me-1" type="checkbox" id="secondCheckbox" />
              <label className="form-check-label" htmlFor="secondCheckbox">
                Second checkbox
              </label>
            </ListGroupItem>
            <ListGroupItem>
              <input className="form-check-input me-1" type="checkbox" id="thirdCheckbox" />
              <label className="form-check-label" htmlFor="thirdCheckbox">
                Third checkbox
              </label>
            </ListGroupItem>
          </BSListGroup>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const ListGroup = () => {
  return <>
      <PageTitle subName="UI" title="List Group" />
      <Row>
        <Col xl={9}>
          <Basic />
          <ActiveItems />
          <DisabledItems />
          <LinksButtons />
          <FlushListGroup />
          <NumberedListGroup />
          <HorizontalListGroup />
          <ContextualListGroup />
          <CustomContentListGroup />
          <CheckboxesAndRadiosListGroup />
        </Col>

        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#basic',
          label: 'Basic'
        }, {
          link: '#active',
          label: 'Active items'
        }, {
          link: '#disabled',
          label: 'Disabled items'
        }, {
          link: '#links-buttons',
          label: 'Links and buttons'
        }, {
          link: '#flush',
          label: 'Flush'
        }, {
          link: '#numbered',
          label: 'Numbered'
        }, {
          link: '#horizontal',
          label: 'Horizontal'
        }, {
          link: '#contextual-classes',
          label: 'Contextual classes'
        }, {
          link: '#custom-content',
          label: 'Custom content'
        }, {
          link: '#checkboxes-radios',
          label: 'Checkboxes and Radios'
        }]} />
        </Col>
      </Row>
    </>;
};
export default ListGroup;