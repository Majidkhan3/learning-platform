import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import UIExamplesList from '@/components/UIExamplesList';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { colorVariants } from '@/context/constants';
import { toSentenceCase } from '@/utils/change-casing';
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Buttons'
};
const DefaultButtons = () => {
  return <ComponentContainerCard id="default" title="Default Buttons" description={<>
          Use the button classes on an&nbsp; <code>&lt;a&gt;</code>, <code>&lt;button&gt;</code> or <code>&lt;input&gt;</code> element.
        </>}>
      <div className="button-list gap-1 icons-center flex-wrap">
        {colorVariants.map((color, idx) => <Button variant={color} type="button" key={idx}>
            {toSentenceCase(color)}
          </Button>)}
      </div>
    </ComponentContainerCard>;
};
const RoundedButtons = () => {
  return <ComponentContainerCard id="rounded" description={<>
          Add <code>.rounded-pill</code> to default button to get rounded corners.
        </>} title="Rounded Buttons">
      <div className="button-list">
        {colorVariants.map((color, idx) => <Button variant={color} className="rounded-pill me-1" type="button" key={idx}>
            {toSentenceCase(color)}
          </Button>)}
      </div>
    </ComponentContainerCard>;
};
const OutlineButtons = () => {
  return <ComponentContainerCard id="outline" title="Outline Buttons" description={<>
          {' '}
          Use a classes <code>.btn-outline-**</code> to quickly create a bordered buttons.
        </>}>
      <div className="button-list">
        {colorVariants.slice(0, 9).map((color, idx) => <Button type="button" variant={`outline-${color}`} key={idx}>
            {toSentenceCase(color)}
          </Button>)}
      </div>
    </ComponentContainerCard>;
};
const OutlineRoundedButtons = () => {
  return <ComponentContainerCard id="outline-rounded" title="Outline Rounded Buttons" description={<>
          Use a classes <code>.btn-outline-**</code> to quickly create a bordered buttons.
        </>}>
      <div className="button-list">
        {colorVariants.slice(0, 6).map((color, idx) => <Button type="button" variant={`outline-${color}`} className="rounded-pill" key={idx}>
            {toSentenceCase(color)}
          </Button>)}
      </div>
    </ComponentContainerCard>;
};
const SoftButtons = () => {
  return <ComponentContainerCard id="soft" title="Soft Buttons" description={<>
          {' '}
          Use a classes <code>.btn-soft-**</code> to quickly create buttons with soft background.
        </>}>
      <div className="button-list">
        {colorVariants.slice(0, 6).map((color, idx) => <Button type="button" variant={`soft-${color}`} key={idx}>
            {toSentenceCase(color)}
          </Button>)}
      </div>
    </ComponentContainerCard>;
};
const SoftRoundedButtons = () => {
  return <ComponentContainerCard id="soft-rounded" title="Soft Rounded Buttons" description={<>
          Use a classes <code>.rounded-pill**</code> with <code>.btn-soft-**</code> to quickly create a Outline Soft buttons.
        </>}>
      <div className="button-list">
        {colorVariants.slice(0, 6).map((color, idx) => <Button type="button" variant={`soft-${color}`} className="rounded-pill" key={idx}>
            {toSentenceCase(color)}
          </Button>)}
      </div>
    </ComponentContainerCard>;
};
const ButtonsWidth = () => {
  return <ComponentContainerCard id="width" title="Button Width" description={<>
          {' '}
          Create buttons with minimum width by adding add <code>.width-xs</code>, <code>.width-sm</code>, <code>.width-md</code>,{' '}
          <code>.width-lg</code> or <code>.width-xl</code>.
        </>}>
      <div className="button-list">
        <Button variant="primary" className="width-xl">
          Extra Large
        </Button>
        <Button variant="secondary" className="width-lg">
          Large
        </Button>
        <Button variant="success" className="width-md">
          Middle
        </Button>
        <Button variant="info" className="width-sm">
          Small
        </Button>
        <Button variant="warning" className="width-xs">
          Xs
        </Button>
      </div>
    </ComponentContainerCard>;
};
const ButtonSizes = () => {
  return <ComponentContainerCard id="sizes" title="Button Sizes" description={<>
          Add <code>.btn-lg</code>, <code>.btn-sm</code> for additional sizes.
        </>}>
      <div className="button-list">
        <button type="button" className="btn btn-primary btn-lg">
          Large
        </button>
        <button type="button" className="btn btn-secondary">
          Normal
        </button>
        <button type="button" className="btn btn-success btn-sm">
          Small
        </button>
      </div>
    </ComponentContainerCard>;
};
const DisabledButton = () => {
  return <ComponentContainerCard id="disabled" title="Disabled Button" description={<>
          Add <code>disabled</code> attribute to buttons.
        </>}>
      <div className="button-list">
        {colorVariants.slice(0, 6).map((color, idx) => <Button type="button" variant={color} key={idx} disabled>
            {toSentenceCase(color)}
          </Button>)}
      </div>
    </ComponentContainerCard>;
};
const IconButtons = () => {
  return <ComponentContainerCard id="icon" title="Icon Button" description={<>Icon only Button.</>}>
      <div className="button-list">
        <Button variant="primary" type="button">
          <IconifyIcon icon="bx-heart" />
        </Button>
        <Button variant="secondary" type="button">
          <IconifyIcon icon="bx-user-voice" />
        </Button>
        <Button variant="success" type="button">
          <IconifyIcon icon="bx-check-double" />
        </Button>
        <Button variant="info" type="button" className="icons-center">
          <IconifyIcon icon="bx-cloud" className="me-1" />
          Cloude Hosting
        </Button>
        <Button variant="warning" type="button" className="icons-center">
          <IconifyIcon icon="bx-info-circle" className="me-1" />
          Warning
        </Button>
      </div>
    </ComponentContainerCard>;
};
const ButtonGroup = () => {
  return <ComponentContainerCard id="group" title="Button Group" description={<>
          Wrap a series of buttons with <code>.btn</code> in <code>.btn-group</code>.
        </>}>
      <Row>
        <Col md={6}>
          <div className="btn-group mb-1 me-1">
            <Button variant="light">Left</Button>
            <Button variant="light">Middle</Button>
            <Button variant="light">Right</Button>
          </div>
          <div className="btn-group mb-1 me-1">
            <Button variant="light">1</Button>
            <Button variant="light">2</Button>
            <Button variant="secondary">3</Button>
            <Button variant="light">4</Button>
          </div>
          <div className="btn-group mb-1 me-1">
            <Button variant="light">5</Button>
            <Button variant="secondary">6</Button>
            <Button variant="light">7</Button>
            <Dropdown>
              <DropdownToggle id="dropdown" type="button" className="btn btn-light arrow-none">
                Dropdown <IconifyIcon icon="bx:bx-chevron-down" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <li>
                  <DropdownItem>Dropdown link</DropdownItem>
                </li>
                <li>
                  <DropdownItem>Dropdown link</DropdownItem>
                </li>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Col>
        <Col md={6}>
          <div className="btn-group-vertical me-4">
            <Button variant="light">Top</Button>
            <Button variant="light">Middle</Button>
            <Button variant="light">Bottom</Button>
          </div>
          <div className="btn-group-vertical">
            <Button variant="light">Button 1</Button>
            <Button variant="light">Button 2</Button>
            <Dropdown>
              <DropdownToggle id="dropdown" type="button" className="btn btn-light arrow-none">
                Button 3 <IconifyIcon icon="bx:bx-chevron-down" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <li>
                  <DropdownItem>Dropdown link</DropdownItem>
                </li>
                <li>
                  <DropdownItem>Dropdown link</DropdownItem>
                </li>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const BlockButtons = () => {
  return <ComponentContainerCard id="block" title="Block Button" description={<>
          Create block level buttons by adding class <code>.d-grid</code> to parent div.
        </>}>
      <div className="d-grid gap-2">
        <button type="button" className="btn btn-primary btn-lg">
          Block Button
        </button>
        <button type="button" className="btn btn-secondary">
          Block Button
        </button>
        <button type="button" className="btn btn-light btn-sm">
          Block Button
        </button>
      </div>
    </ComponentContainerCard>;
};
const Buttons = () => {
  return <>
      <PageTitle subName="UI" title="Buttons" />
      <Row>
        <Col xl={9}>
          <DefaultButtons />
          <RoundedButtons />
          <OutlineButtons />
          <OutlineRoundedButtons />
          <SoftButtons />
          <SoftRoundedButtons />
          <ButtonsWidth />
          <ButtonSizes />
          <DisabledButton />
          <IconButtons />
          <ButtonGroup />
          <BlockButtons />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          label: 'Default Example',
          link: '#default'
        }, {
          label: 'Rounded Buttons',
          link: '#rounded'
        }, {
          label: 'Outline Buttons',
          link: '#outline'
        }, {
          label: 'Outline Rounded Buttons',
          link: '#outline-rounded'
        }, {
          label: 'Soft Buttons',
          link: '#soft'
        }, {
          label: 'Soft Rounded Buttons',
          link: '#soft-rounded '
        }, {
          label: 'Button Width',
          link: '#width '
        }, {
          label: 'Button Sizes',
          link: '#sizes '
        }, {
          label: 'Disabled Button',
          link: '#disabled '
        }, {
          label: 'Icon Button',
          link: '#icon '
        }, {
          label: 'Button Group',
          link: '#group '
        }, {
          label: 'Block Button',
          link: '#block '
        }]} />
        </Col>
      </Row>
    </>;
};
export default Buttons;