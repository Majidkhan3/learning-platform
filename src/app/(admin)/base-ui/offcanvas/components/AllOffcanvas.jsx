'use client';

import useToggle from '@/hooks/useToggle';
import { Offcanvas as BSOffcanvas, Button, OffcanvasHeader, OffcanvasTitle, OffcanvasBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap';
import { backdropOptions, placementOptions } from '../data';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import ComponentContainerCard from '@/components/ComponentContainerCard';
const OffcanvasDropdown = () => {
  return <Dropdown className="mt-3">
      <DropdownToggle variant="primary" type="button" className="arrow-none icons-center gap-1">
        Dropdown button <IconifyIcon icon="bx:bx-chevron-down" />
      </DropdownToggle>
      <DropdownMenu>
        <li>
          <DropdownItem href="">Action</DropdownItem>
        </li>
        <li>
          <DropdownItem href="">Another action</DropdownItem>
        </li>
        <li>
          <DropdownItem href="">Something else here</DropdownItem>
        </li>
      </DropdownMenu>
    </Dropdown>;
};
const DefaultOffcanvas = () => {
  const {
    isTrue,
    toggle
  } = useToggle();
  return <ComponentContainerCard id="default" title="Default Buttons" description={<>
          You can use a link with the href attribute, or a button with the <code>data-bs-target</code> attribute. In both cases, the{' '}
          <code>data-bs-toggle=&quot;offcanvas&quot;</code> is required.
        </>}>
      <div className="button-list">
        <Button variant="primary" onClick={toggle}>
          Link with href
        </Button>
      </div>

      <BSOffcanvas show={isTrue} onHide={toggle} placement="start" tabIndex={-1}>
        <OffcanvasHeader closeButton>
          <OffcanvasTitle as="h5" className="mt-0">
            Offcanvas
          </OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          <p>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</p>
          <OffcanvasDropdown />
        </OffcanvasBody>
      </BSOffcanvas>
    </ComponentContainerCard>;
};
const OffcanvasPositions = () => {
  const OffcanvasPlacement = ({
    name,
    variant,
    ...props
  }) => {
    const {
      isTrue,
      toggle
    } = useToggle();
    return <>
        <Button variant={variant} onClick={toggle} className="mt-2 me-1 mt-md-0">
          {' '}
          Toggle {name} offcanvas
        </Button>
        <BSOffcanvas show={isTrue} onHide={toggle} {...props}>
          <OffcanvasHeader closeButton>
            <OffcanvasTitle as={'h5'} className="mt-0">
              Offcanvas {name}
            </OffcanvasTitle>
          </OffcanvasHeader>

          <OffcanvasBody>
            <p>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</p>
            <OffcanvasDropdown />
          </OffcanvasBody>
        </BSOffcanvas>
      </>;
  };
  return <ComponentContainerCard id="offcanvas-position" title="Offcanvas Position" description={<>Try the top, right, bottom and left examples out below.</>}>
      <div className="button-list">
        {placementOptions.map((props, idx) => <OffcanvasPlacement {...props} key={idx} />)}
      </div>
    </ComponentContainerCard>;
};
const OffCanvasWithBackdropOptions = () => {
  const OffCanvasWithBackdrop = ({
    name,
    variant,
    ...props
  }) => {
    const {
      isTrue,
      toggle
    } = useToggle();
    return <>
        <Button onClick={toggle} variant={variant} type="button">
          {name}
        </Button>

        <BSOffcanvas placement="start" show={isTrue} onHide={toggle} {...props}>
          <OffcanvasHeader closeButton>
            <OffcanvasTitle as="h5" className="mt-0" id="offcanvasScrollingLabel">
              {name}
            </OffcanvasTitle>
          </OffcanvasHeader>
          <OffcanvasBody>
            <p>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</p>
            <OffcanvasDropdown />
          </OffcanvasBody>
        </BSOffcanvas>
      </>;
  };
  return <ComponentContainerCard id="static-backdrop" title="Static Backdrop" description={<>
          Scrolling the <code>&lt;body&gt;</code> element is disabled when an offcanvas and its backdrop are visible. Use the{' '}
          <code>data-bs-scroll</code> attribute to toggle <code>&lt;body&gt;</code> scrolling and <code>data-bs-backdrop</code> to toggle the
          backdrop.
        </>}>
      <div className="button-list">
        {backdropOptions.map((offcanvas, idx) => <OffCanvasWithBackdrop {...offcanvas} key={idx} />)}
      </div>
    </ComponentContainerCard>;
};
const AllOffcanvas = () => {
  return <>
      <DefaultOffcanvas />
      <OffCanvasWithBackdropOptions />
      <OffcanvasPositions />
    </>;
};
export default AllOffcanvas;