import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import UIExamplesList from '@/components/UIExamplesList';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { colorVariants } from '@/context/constants';
import { toSentenceCase } from '@/utils/change-casing';
import { Button, ButtonGroup, Col, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle, FormCheck, FormControl, FormLabel, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Dropdowns'
};
const SingleButtonDropdown = () => {
  return <ComponentContainerCard id="single-button" title="Single button dropdowns" description={<>
          Any single <code>.btn</code> can be turned into a dropdown toggle with some markup changes. Here&apos;s how you can put them to work with
          either <code>&lt;button&gt;</code> elements:
        </>}>
      <Row>
        <Col xs="auto" className="mb-2 mb-sm-0">
          <Dropdown>
            <DropdownToggle variant="secondary" className="arrow-none icons-center gap-1">
              Dropdown button <IconifyIcon icon="bx:bx-chevron-down" />
            </DropdownToggle>

            <DropdownMenu>
              <DropdownItem href="#">Action</DropdownItem>
              <DropdownItem href="#">Another action</DropdownItem>
              <DropdownItem href="#">Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>

        <Col xs="auto">
          <Dropdown>
            <DropdownToggle variant="secondary" className="arrow-none icons-center gap-1">
              Dropdown link <IconifyIcon icon="bx:bx-chevron-down" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="#">Action</DropdownItem>
              <DropdownItem href="#">Another action</DropdownItem>
              <DropdownItem href="#">Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const DropdownVariant = () => {
  return <ComponentContainerCard id="single-button-variant" title="Single Button Variant Dropdowns" description={<>
          Any single <code>.btn</code> can be turned into a dropdown toggle with some markup changes. Here&apos;s how you can put them to work with
          either <code>&lt;button&gt;</code> elements.
        </>}>
      <div className="d-flex flex-wrap gap-2">
        {colorVariants.slice(0, 4).map((color, idx) => <Dropdown key={idx} as={ButtonGroup} className="mb-2 me-1">
            <DropdownToggle variant={color} className="arrow-none icons-center gap-1">
              {toSentenceCase(color)} <IconifyIcon icon="bx:bx-chevron-down" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="#">Action</DropdownItem>
              <DropdownItem href="#">Another action</DropdownItem>
              <DropdownItem href="#">Something else here</DropdownItem>
              <DropdownDivider />
              <DropdownItem href="#">Separated link</DropdownItem>
            </DropdownMenu>
          </Dropdown>)}
      </div>
    </ComponentContainerCard>;
};
const SplitButtonDropdown = () => {
  return <ComponentContainerCard id="split-button" title="Split Button Dropdowns" description={<>
          Similarly, create split button dropdowns with virtually the same markup as single button dropdowns, but with the addition of{' '}
          <code>.dropdown-toggle-split</code> for proper spacing around the dropdown caret.
        </>}>
      <div className="d-flex flex-wrap gap-2">
        {colorVariants.slice(0, 4).map((color, idx) => <Dropdown key={idx} as={ButtonGroup} className="mb-2 me-1">
            <Button variant={color}>{toSentenceCase(color)}</Button>
            <DropdownToggle variant={color} className="dropdown-toggle-split arrow-none">
              <IconifyIcon icon="bx:bx-chevron-down" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="#">Action</DropdownItem>
              <DropdownItem href="#">Another action</DropdownItem>
              <DropdownItem href="#">Something else here</DropdownItem>
              <DropdownDivider></DropdownDivider>
              <DropdownItem href="#">Separated link</DropdownItem>
            </DropdownMenu>
          </Dropdown>)}
      </div>
    </ComponentContainerCard>;
};
const DarkDropdown = () => {
  return <ComponentContainerCard id="dark-dropdown" title="Dark Dropdowns" description={<>
          {' '}
          Opt into darker dropdowns to match a dark navbar or custom style by adding <code>.dropdown-menu-dark</code> onto an existing{' '}
          <code>.dropdown-menu</code>. No changes are required to the dropdown items.
        </>}>
      <Dropdown>
        <DropdownToggle variant="secondary" className="arrow-none icons-center gap-1">
          Dropdown button <IconifyIcon icon="bx:bx-chevron-down" />
        </DropdownToggle>
        <DropdownMenu as="ul" variant="dark">
          <li>
            <DropdownItem href="#">Action</DropdownItem>
          </li>
          <li>
            <DropdownItem href="#">Another action</DropdownItem>
          </li>
          <li>
            <DropdownItem href="#">Something else here</DropdownItem>
          </li>
          <li>
            <DropdownDivider />
          </li>
          <li>
            <DropdownItem href="#">Separated link</DropdownItem>
          </li>
        </DropdownMenu>
      </Dropdown>
    </ComponentContainerCard>;
};
const DropdownDirection = () => {
  return <ComponentContainerCard id="direction" title="Dropdown Direction" description={<>
          Trigger dropdown menus above elements by adding <code>.dropup</code>, dropdown menus at the left of the elements by adding{' '}
          <code>.dropstart</code> or dropdown menus at the right of the elements by adding <code>.dropend</code>.
        </>}>
      <div className="d-flex flex-wrap gap-2">
        <Dropdown as={ButtonGroup}>
          <DropdownToggle variant="primary" className="arrow-none icons-center gap-1">
            Drop Down <IconifyIcon icon="bx:bx-chevron-down" />
          </DropdownToggle>

          <DropdownMenu>
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Another action</DropdownItem>
            <DropdownItem href="#">Something else here</DropdownItem>
            <DropdownDivider></DropdownDivider>
            <DropdownItem href="#">Separated link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown as={ButtonGroup} drop="up">
          <DropdownToggle variant="secondary" className="arrow-none icons-center gap-1">
            Drop Up <IconifyIcon icon="bx:bx-chevron-up" />
          </DropdownToggle>

          <DropdownMenu>
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Another action</DropdownItem>
            <DropdownItem href="#">Something else here</DropdownItem>
            <DropdownDivider></DropdownDivider>
            <DropdownItem href="#">Separated link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown as={ButtonGroup} drop="start">
          <DropdownToggle variant="info" className="content-none icons-center gap-1">
            <IconifyIcon icon="bx:bx-chevron-left" /> Drop Left
          </DropdownToggle>

          <DropdownMenu>
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Another action</DropdownItem>
            <DropdownItem href="#">Something else here</DropdownItem>
            <DropdownDivider></DropdownDivider>
            <DropdownItem href="#">Separated link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown as={ButtonGroup} drop="end">
          <DropdownToggle variant="success" className="arrow-none icons-center gap-1">
            Drop Right <IconifyIcon icon="bx:bx-chevron-right" />
          </DropdownToggle>

          <DropdownMenu>
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Another action</DropdownItem>
            <DropdownItem href="#">Something else here</DropdownItem>
            <DropdownDivider></DropdownDivider>
            <DropdownItem href="#">Separated link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </ComponentContainerCard>;
};
const DropdownMenuItems = () => {
  return <ComponentContainerCard id="menu-items" title="Dropdown Menu Items" description={<>
          Add <code>.active</code> to items in the dropdown to <strong>style them as active</strong>. To convey the active state to assistive
          technologies, use the <code>aria-current</code> attribute — using the <code>page</code> value for the current page, or <code>true</code> for
          the current item in a set.
        </>}>
      <p className="text-muted">
        Add <code>.disabled</code> to items in the dropdown to
        <strong>style them as disabled</strong>.
      </p>
      <div className="d-flex flex-wrap gap-2">
        <ul className="dropdown-menu show block position-static">
          <li>
            <DropdownItem href="#">Regular link</DropdownItem>
          </li>
          <li>
            <DropdownItem active href="#" aria-current="true">
              Active link
            </DropdownItem>
          </li>
          <li>
            <DropdownItem href="#">Another link</DropdownItem>
          </li>
        </ul>
        <ul className="dropdown-menu show block position-static">
          <li>
            <DropdownItem href="#">Regular link</DropdownItem>
          </li>
          <li>
            <DropdownItem disabled href="#" aria-current="true">
              Active link
            </DropdownItem>
          </li>
          <li>
            <DropdownItem href="#">Another link</DropdownItem>
          </li>
        </ul>
      </div>
    </ComponentContainerCard>;
};
const AutoCloseBehaviorDropdown = () => {
  return <ComponentContainerCard id="auto-close-behavior" title="Auto close behavior" description={<>
          By default, the dropdown menu is closed when clicking inside or outside the dropdown menu. You can use the <code>autoClose</code> option to
          change this behavior of the Dropdown
        </>}>
      <div className="d-flex flex-wrap gap-2">
        <Dropdown autoClose as={ButtonGroup}>
          <DropdownToggle variant="secondary" className="arrow-none icons-center gap-1">
            Default dropdown <IconifyIcon icon="bx:bx-chevron-down" />
          </DropdownToggle>
          <DropdownMenu as="ul">
            <li>
              <DropdownItem href="#">Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem href="#">Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem href="#">Menu item</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>

        <Dropdown autoClose="outside" as={ButtonGroup}>
          <DropdownToggle variant="secondary" className="arrow-none icons-center gap-1">
            Clickable outside <IconifyIcon icon="bx:bx-chevron-down" />
          </DropdownToggle>
          <DropdownMenu as="ul">
            <li>
              <DropdownItem href="#">Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem href="#">Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem href="#">Menu item</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>

        <Dropdown autoClose="inside" as={ButtonGroup}>
          <DropdownToggle variant="secondary" className="arrow-none icons-center gap-1">
            Clickable inside <IconifyIcon icon="bx:bx-chevron-down" />
          </DropdownToggle>
          <DropdownMenu as="ul">
            <li>
              <DropdownItem href="#">Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem href="#">Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem href="#">Menu item</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>

        <Dropdown autoClose="inside" as={ButtonGroup}>
          <DropdownToggle variant="secondary" className="arrow-none icons-center gap-1" type="button">
            Manual close <IconifyIcon icon="bx:bx-chevron-down" />
          </DropdownToggle>
          <DropdownMenu as="ul">
            <li>
              <DropdownItem href="#">Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem href="#">Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem href="#">Menu item</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>
      </div>
    </ComponentContainerCard>;
};
const DropdownMenuContent = () => {
  return <ComponentContainerCard id="menu-content" title="Menu Content">
      <p>Add a header to label sections of actions in any dropdown menu.</p>
      <p>Separate groups of related menu items with a divider.</p>
      <p>
        Place any freeform text within a dropdown menu with text and use spacing utilities. Note that you’ll likely need additional sizing styles to
        constrain the menu width.
      </p>
      <p>
        Put a form within a dropdown menu, or make it into a dropdown menu, and use margin or padding utilities to give it the negative space you
        require.
      </p>
      <div className="d-flex flex-wrap gap-2">
        <Dropdown>
          <DropdownToggle variant="primary" type="button" className="arrow-none icons-center gap-1">
            Dropdown Header <IconifyIcon icon="bx:bx-chevron-down" />
          </DropdownToggle>
          <DropdownMenu>
            <li>
              <DropdownHeader>Dropdown header</DropdownHeader>
            </li>
            <li>
              <DropdownItem href="">Action</DropdownItem>
            </li>
            <li>
              <DropdownItem href="">Another action</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownToggle variant="info" className="arrow-none icons-center gap-1">
            Dropdown Divider <IconifyIcon icon="bx:bx-chevron-down" />
          </DropdownToggle>
          <DropdownMenu>
            <li>
              <DropdownItem href="#">Action</DropdownItem>
            </li>
            <li>
              <DropdownItem href="#">Another action</DropdownItem>
            </li>
            <li>
              <DropdownItem href="#">Something else here</DropdownItem>
            </li>
            <li>
              <DropdownDivider />
            </li>
            <li>
              <DropdownItem href="#">Separated link</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownToggle variant="secondary" className="arrow-none icons-center gap-1">
            Dropdown Text <IconifyIcon icon="bx:bx-chevron-down" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-lg p-3">
            <p>Some example text that&apos;s free-flowing within the dropdown menu.</p>
            <p className="mb-0">And this is more example text.</p>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownToggle variant="success" className="arrow-none icons-center gap-1">
            Dropdown Menu Forms <IconifyIcon icon="bx:bx-chevron-down" />
          </DropdownToggle>
          <DropdownMenu as={'form'} className="dropdown-lg p-3">
            <div className="mb-3">
              <FormLabel htmlFor="exampleDropdownFormEmail">Email address</FormLabel>
              <FormControl type="email" id="exampleDropdownFormEmail" placeholder="email@example.com" />
            </div>
            <div className="mb-3">
              <FormLabel htmlFor="exampleDropdownFormPassword">Password</FormLabel>
              <FormControl type="password" id="exampleDropdownFormPassword" placeholder="Password" />
            </div>
            <div className="mb-3">
              <FormCheck label="Remember me" id="remember1" />
            </div>
            <Button variant="primary" type="submit">
              Sign in
            </Button>
          </DropdownMenu>
        </Dropdown>
      </div>
    </ComponentContainerCard>;
};
const Dropdowns = () => {
  return <>
      <PageTitle subName="UI" title="Dropdowns" />
      <Row>
        <Col xl={9}>
          <SingleButtonDropdown />
          <DropdownVariant />
          <SplitButtonDropdown />
          <DarkDropdown />
          <DropdownDirection />
          <DropdownMenuItems />
          <AutoCloseBehaviorDropdown />
          <DropdownMenuContent />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#single-button',
          label: 'Single Button Dropdowns'
        }, {
          link: '#single-button-variant',
          label: 'Single Button Variant Dropdowns'
        }, {
          link: '#split-button',
          label: 'Split Button Dropdowns'
        }, {
          link: '#dark-dropdown',
          label: 'Dark Dropdown'
        }, {
          link: '#direction',
          label: 'Dropdown Direction'
        }, {
          link: '#menu-items',
          label: 'Dropdown Menu Items'
        }, {
          link: '#dropdown-options',
          label: 'Dropdown Options'
        }, {
          link: '#auto-close-behavior',
          label: 'Auto Close Behavior'
        }, {
          link: '#menu-content',
          label: 'Menu content'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Dropdowns;