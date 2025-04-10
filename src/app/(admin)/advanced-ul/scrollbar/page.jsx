import { Col, Row } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import UIExamplesList from '@/components/UIExamplesList';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Scrollbar'
};
const DefaultScrollbar = () => {
  return <ComponentContainerCard id="default" title="Default Scroll Example" description={<>
          Just use data attribute <code>data-simplebar</code> and add <code>max-height: **px</code> oh fix height
        </>}>
      <div className="border rounded py-3">
        <SimplebarReactClient className="px-3" style={{
        maxHeight: 250
      }}>
          SimpleBar does only one thing: replace the browser&apos;s default scrollbar with a custom CSS-styled one without losing performances. Unlike
          some popular plugins, SimpleBar doesn&apos;t mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep the
          awesomeness of native scrolling...with a custom scrollbar!
          <p>
            SimpleBar&nbsp;
            <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the
            <strong>&nbsp;native&nbsp;</strong>
            <code>overflow: auto</code>
            &nbsp;scroll and
            <strong>&nbsp;only</strong> replace the scrollbar visual appearance.
          </p>
          <h5>Design it as you want</h5>
          <p>
            SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or
            just keep the default style (&quot;Mac OS&quot; scrollbar style).
          </p>
          <h5>Lightweight and performant</h5>
          <p>
            Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.
          </p>
          <h5>Supported everywhere</h5>
          <p>SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</p>
        </SimplebarReactClient>
      </div>
    </ComponentContainerCard>;
};
const RTLPosition = () => {
  return <ComponentContainerCard id="rtl" title="RTL Position" description={<>
          Just use data attribute&nbsp;<code>data-simplebar data-simplebar-direction=&apos;rtl&apos;</code> and add <code>max-height: **px</code> oh
          fix height
        </>}>
      <div className="border rounded py-3">
        <SimplebarReactClient className="px-3" data-simplebar-direction="rtl" style={{
        maxHeight: 250
      }}>
          SimpleBar does only one thing: replace the browser&apos;s default scrollbar with a custom CSS-styled one without losing performances. Unlike
          some popular plugins, SimpleBar doesn&apos;t mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep the
          awesomeness of native scrolling...with a custom scrollbar!
          <p>
            SimpleBar
            <strong>&nbsp;does NOT implement a custom scroll behaviour</strong>. It keeps the
            <strong>&nbsp;native&nbsp;</strong>
            <code>overflow: auto</code>
            &nbsp;scroll and&nbsp;
            <strong>only</strong> replace the scrollbar visual appearance.
          </p>
          <h5>Design it as you want</h5>
          <p>
            SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or
            just keep the default style (&quot;Mac OS&quot; scrollbar style).
          </p>
          <h5>Lightweight and performant</h5>
          <p>
            Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.
          </p>
          <h5>Supported everywhere</h5>
          <p>SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</p>
        </SimplebarReactClient>
      </div>
    </ComponentContainerCard>;
};
const ScrollSize = () => {
  return <ComponentContainerCard id="size" title="Scroll Size" description={<>
          {' '}
          Just use data attribute <code>data-simplebar</code>, <code>data-simplebar-lg</code> and add <code>max-height: **px</code> oh fix height
        </>}>
      <div className="border rounded py-3">
        <SimplebarReactClient className="px-3" data-simplebar-lg style={{
        maxHeight: 250
      }}>
          SimpleBar does only one thing: replace the browser&apos;s default scrollbar with a custom CSS-styled one without losing performances. Unlike
          some popular plugins, SimpleBar doesn&apos;t mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep the
          awesomeness of native scrolling...with a custom scrollbar!
          <p>
            SimpleBar&nbsp;
            <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the
            <strong>&nbsp;native&nbsp;</strong>
            <code>overflow: auto&nbsp;</code>
            scroll and
            <strong>only</strong> replace the scrollbar visual appearance.
          </p>
          <h5>Design it as you want</h5>
          <p>
            SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or
            just keep the default style (&quot;Mac OS&quot; scrollbar style).
          </p>
          <h5>Lightweight and performant</h5>
          <p>
            Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.
          </p>
          <h5>Supported everywhere</h5>
          <p>SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</p>
        </SimplebarReactClient>
      </div>
    </ComponentContainerCard>;
};
const ScrollColor = () => {
  return <ComponentContainerCard id="color" title="Scroll Color" description={<>
          Just use data attribute <code>data-simplebar data-simplebar-*</code> and add <code>max-height: **px</code> oh fix height
        </>}>
      <div className="border rounded py-3">
        <SimplebarReactClient className="px-3" data-simplebar-primary style={{
        maxHeight: 250
      }}>
          SimpleBar does only one thing: replace the browser&apos;s default scrollbar with a custom CSS-styled one without losing performances. Unlike
          some popular plugins, SimpleBar doesn&apos;t mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep the
          awesomeness of native scrolling...with a custom scrollbar!
          <p>
            SimpleBar&nbsp;
            <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the
            <strong>&nbsp;native&nbsp;</strong>
            <code>overflow: auto&nbsp;</code>
            scroll and&nbsp;
            <strong>only</strong> replace the scrollbar visual appearance.
          </p>
          <h5>Design it as you want</h5>
          <p>
            SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or
            just keep the default style (&quot;Mac OS&quot; scrollbar style).
          </p>
          <h5>Lightweight and performant</h5>
          <p>
            Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.
          </p>
          <h5>Supported everywhere</h5>
          <p>SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</p>
        </SimplebarReactClient>
      </div>
    </ComponentContainerCard>;
};
const ScrollBars = () => {
  return <>
      <PageTitle subName="Extended" title="Scrollbar" />
      <Row>
        <Col xl={9}>
          <DefaultScrollbar />
          <RTLPosition />
          <ScrollSize />
          <ScrollColor />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#default',
          label: 'Default Scroll Example'
        }, {
          link: '#rtl',
          label: 'RTL Position'
        }, {
          link: '#size',
          label: 'Scroll Size'
        }, {
          link: '#color',
          label: 'Scroll Color'
        }]} />
        </Col>
      </Row>
    </>;
};
export default ScrollBars;