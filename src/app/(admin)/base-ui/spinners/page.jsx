import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import Spinner from '@/components/Spinner';
import UIExamplesList from '@/components/UIExamplesList';
import { colorVariants } from '@/context/constants';
import { Button, Col, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Spinners'
};
const BorderedSpinners = () => {
  return <ComponentContainerCard id="border_spinner" title="Border Spinners" description={<>Use the border spinners for a lightweight loading indicator.</>}>
      <Spinner />
    </ComponentContainerCard>;
};
const ColorsSpinners = () => {
  return <ComponentContainerCard id="color_spinners" title="Color Spinners" description={<>You can use any of our text color utilities on the standard spinner.</>}>
      {colorVariants.slice(0, 6).map((color, idx) => <Spinner key={idx} className="me-3" color={color} />)}
    </ComponentContainerCard>;
};
const GrowingSpinners = () => {
  return <ComponentContainerCard id="growing_spinners" title="Growing Spinners" description={<>If you don’t fancy a border spinner, switch to the grow spinner. While it doesn’t technically spin, it does repeatedly grow!</>}>
      <Spinner type="grow" />
    </ComponentContainerCard>;
};
const ColorGrowingSpinners = () => {
  return <ComponentContainerCard id="color_growing" title="Color Growing Spinners" description={<> You can use any of our text color utilities on the standard spinner.</>}>
      {colorVariants.slice(0, 6).map((color, idx) => <Spinner key={idx} className="m-2" type="grow" color={color} />)}
    </ComponentContainerCard>;
};
const AlignmentSpinner = () => {
  return <ComponentContainerCard id="alignment" title="Alignment" description={<>Use flexbox utilities, float utilities, or text alignment utilities to place spinners exactly where you need them in any situation.</>}>
      <div className="d-flex justify-content-center border p-2">
        <Spinner />
      </div>
    </ComponentContainerCard>;
};
const SpinnersSize = () => {
  return <ComponentContainerCard id="size" title="Size" description={<>
          {' '}
          Add <code>.spinner-border-sm</code> and <code>.spinner-border.sm-**</code> to make a smaller spinner that can quickly be used within other
          components.
        </>}>
      <Spinner className="spinner-border-sm me-3"></Spinner>
      <Spinner type="grow" className="spinner-grow-sm me-3" />
      <Spinner className="text-primary me-3" color="primary" size="sm" />
      <Spinner className="me-3" type="grow" size="sm" color="primary" />
    </ComponentContainerCard>;
};
const PlacementSpinners = () => {
  return <ComponentContainerCard id="placement" title="Placement" description={<>
          Use <code>flexbox utilities</code>,<code>float utilities</code>, or <code>text alignment</code> utilities to place spinners exactly where
          you need them in any situation.
        </>}>
      <div className="d-flex align-items-center border p-2">
        <strong>Loading...</strong>
        <Spinner className="ms-auto" />
      </div>
    </ComponentContainerCard>;
};
const ButtonSpinners = () => {
  return <ComponentContainerCard id="button_spinner" title="Buttons Spinner" description={<>
          Use spinners within buttons to indicate an action is currently processing or taking place. You may also swap the text out of the spinner
          element and utilize button text as needed.
        </>}>
      <Button variant="primary" disabled className="me-1">
        <Spinner color="white" className="spinner-border-sm me-1" />
        Loading...
      </Button>
      <Button variant="primary" disabled>
        <Spinner className="spinner-grow-sm me-1" tag="span" color="white" type="grow" />
        Loading...
      </Button>
    </ComponentContainerCard>;
};
const Spinners = () => {
  return <>
      <PageTitle subName="UI" title="Spinners" />
      <Row>
        <Col xl={9}>
          <BorderedSpinners />
          <ColorsSpinners />
          <GrowingSpinners />
          <ColorGrowingSpinners />
          <AlignmentSpinner />
          <SpinnersSize />
          <PlacementSpinners />
          <ButtonSpinners />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#border_spinner',
          label: 'Border spinner'
        }, {
          link: '#color_spinners',
          label: 'Color Spinners'
        }, {
          link: '#growing_spinners',
          label: 'Growing Spinners'
        }, {
          link: '#color_growing',
          label: 'Color Growing Spinners'
        }, {
          link: '#alignment',
          label: 'Alignment'
        }, {
          link: '#size',
          label: 'Size'
        }, {
          link: '#placement',
          label: 'Placement'
        }, {
          link: '#button_spinner',
          label: 'Buttons Spinner'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Spinners;