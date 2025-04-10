import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import UIExamplesList from '@/components/UIExamplesList';
import { Button, Col, OverlayTrigger, Popover, PopoverBody, PopoverHeader, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Popovers'
};
const LiveDemo = () => {
  const basicPopover = <Popover id="popover-basic">
      <PopoverHeader as="h3">Popover title</PopoverHeader>
      <PopoverBody>And here&apos;s some amazing content. It&apos;s very engaging. Right?</PopoverBody>
    </Popover>;
  return <ComponentContainerCard id="live-demo" title="Live demo" description={<>
          {' '}
          We use JavaScript similar to the snippet above to render the following live popover. Titles are set via <code>data-bs-title</code> and body
          content is set via <code>data-bs-content</code>.
        </>}>
      <OverlayTrigger trigger={'click'} placement="right" overlay={basicPopover}>
        <Button type="button" variant="danger">
          Click to toggle popover
        </Button>
      </OverlayTrigger>
    </ComponentContainerCard>;
};
const PopoverDirection = () => {
  const directions = ['top', 'bottom', 'left', 'right'];
  return <ComponentContainerCard id="popover-directions" title="Popover Directions" description={<>Four options are available: top, right, bottom, and left aligned.</>}>
      <div className="d-flex flex-wrap gap-2">
        {directions.map((direction, idx) => <OverlayTrigger trigger="click" key={idx} placement={direction} overlay={<Popover id={`popover-positioned-${direction}`}>
                <PopoverBody>Vivamus sagittis lacus vel augue laoreet rutrum faucibus.</PopoverBody>
              </Popover>}>
            <Button variant="primary">Popover on {direction}</Button>
          </OverlayTrigger>)}
      </div>
    </ComponentContainerCard>;
};
const DismissOnNextClick = () => {
  const dismissiblePopover = <Popover>
      <PopoverHeader as="h3">Dismissible popover</PopoverHeader>
      <PopoverBody>And here&apos;s some amazing content. It&apos;s very engaging. Right?</PopoverBody>
    </Popover>;
  return <ComponentContainerCard id="" title="Dismiss on Next Click" description={<>
          {' '}
          Use the <code>focus</code> trigger to dismiss popovers on the user’s next click of a different element than the toggle element.
        </>}>
      <OverlayTrigger trigger="focus" placement="right" overlay={dismissiblePopover}>
        <Button variant="success" tabIndex={0}>
          Dismissible popover
        </Button>
      </OverlayTrigger>
    </ComponentContainerCard>;
};
const HoverPopover = () => {
  const hoverPopover = <Popover>
      <PopoverHeader as="h3">Ohh Wow !</PopoverHeader>
      <PopoverBody>And here&apos;s some amazing content. It&apos;s very engaging. Right?</PopoverBody>
    </Popover>;
  return <ComponentContainerCard id="" title="Hover" description={<>
          Use the <code>data-bs-trigger=&quot;hover&quot;</code> trigger Hover to show popover.
        </>}>
      <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={hoverPopover}>
        <Button variant="dark"> Please Hover Me</Button>
      </OverlayTrigger>
    </ComponentContainerCard>;
};
const CustomPopovers = () => {
  const customPopover = variant => <Popover className={`${variant}-popover`}>
      <PopoverHeader as="h3">{variant.charAt(0).toUpperCase() + variant.slice(1)} popover</PopoverHeader>
      <PopoverBody>This popover is themed via CSS variables.</PopoverBody>
    </Popover>;
  return <ComponentContainerCard id="" title="Custom Popovers" description={<>
          ou can customize the appearance of popovers using CSS variables. We set a custom class with{' '}
          <code>data-bs-custom-class=&quot;primary-popover&quot;</code> to scope our custom appearance and use it to override some of the local CSS
          variables.
        </>}>
      <div className="button-list">
        <OverlayTrigger trigger="click" placement="top" overlay={customPopover('primary')}>
          <Button variant="primary">Primary popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="top" overlay={customPopover('success')}>
          <Button variant="success">Success popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="top" overlay={customPopover('danger')}>
          <Button variant="danger">Danger popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="top" overlay={customPopover('info')}>
          <Button variant="info">Info popover</Button>
        </OverlayTrigger>
      </div>
    </ComponentContainerCard>;
};
const DisabledPopover = () => {
  const disabledPopover = <Popover>
      <PopoverBody>Disabled popover</PopoverBody>
    </Popover>;
  return <ComponentContainerCard title="Disabled Elements" id="disabled" description={<>
          Elements with the <code>disabled</code> attribute aren’t interactive, meaning users cannot hover or click them to trigger a popover (or
          tooltip). As a workaround, you’ll want to trigger the popover from a wrapper <code>&lt;div&gt;</code> or <code>&lt;span&gt;</code> and
          override the <code>pointer-events</code> on the disabled element.
        </>}>
      <OverlayTrigger placement="right" overlay={disabledPopover}>
        <span className="d-inline-block">
          <Button disabled style={{
          pointerEvents: 'none'
        }}>
            Disabled button
          </Button>
        </span>
      </OverlayTrigger>
    </ComponentContainerCard>;
};
const Popovers = () => {
  return <>
      <PageTitle subName="UI" title="Popovers" />
      <Row>
        <Col xl={9}>
          <LiveDemo />
          <PopoverDirection />
          <DismissOnNextClick />
          <HoverPopover />
          <CustomPopovers />
          <DisabledPopover />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#live-demo',
          label: 'Live demo'
        }, {
          link: '#popover-directions',
          label: 'Popover Directions'
        }, {
          link: '#dismiss',
          label: 'Dismiss on Next Click'
        }, {
          link: '#hover',
          label: 'Hover'
        }, {
          link: '#custom-popovers',
          label: 'Custom Popovers'
        }, {
          link: '#disabled',
          label: 'Disabled'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Popovers;