import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import UIExamplesList from '@/components/UIExamplesList';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Row } from 'react-bootstrap';
const accordionData = ['first', 'second', 'third'];
const BasicAccordion = () => {
  return <ComponentContainerCard id="default" title="Basic Example" description={<>
          {' '}
          Using the card component, you can extend the default collapse behavior to create an accordion. To properly achieve the accordion style, be
          sure to use <code>.accordion</code> as a wrapper.
        </>}>
      <Accordion defaultActiveKey={'0'} id="accordionExample">
        {accordionData.map((item, idx) => <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader id="headingOne">
              <div className="fw-medium">Accordion Item #{idx + 1}</div>
            </AccordionHeader>
            <AccordionBody>
              <strong>This is the {item}&nbsp; item&apos;s accordion body.</strong>
              It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It&apos;s also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
            </AccordionBody>
          </AccordionItem>)}
      </Accordion>
    </ComponentContainerCard>;
};
const FlushAccordion = () => {
  return <ComponentContainerCard id="flush" title="Flush Accordion" description={<>
          Add <code>.accordion-flush</code> to remove the default <code>background-color</code>, some borders, and some rounded corners to render
          accordions edge-to-edge with their parent container.
        </>}>
      <Accordion defaultActiveKey={'0'} flush id="accordionExample">
        {accordionData.map((item, idx) => <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader id="headingOne">
              <div className="fw-medium">Accordion Item #{idx + 1}</div>
            </AccordionHeader>
            <AccordionBody>
              Placeholder content for this accordion, which is intended to demonstrate the
              <code>.accordion-flush</code>&nbsp; class. This is the {item}&nbsp; item&apos;s accordion body.
            </AccordionBody>
          </AccordionItem>)}
      </Accordion>
    </ComponentContainerCard>;
};
const AlwaysOpenAccordion = () => {
  return <ComponentContainerCard id="always-open" title="Always Open Accordion" description={<>
          Omit the <code>data-bs-parent</code> attribute on each <code>.accordion-collapse</code> to make accordion items stay open when another item
          is opened.
        </>}>
      <Accordion defaultActiveKey={'0'} alwaysOpen id="accordionExample">
        {accordionData.map((item, idx) => <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader id="headingOne">
              <div className="fw-medium">Accordion Item #{idx + 1}</div>
            </AccordionHeader>
            <AccordionBody>
              <strong>This is the {item}&nbsp; item&apos;s accordion body.</strong>
              It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It&apos;s also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
            </AccordionBody>
          </AccordionItem>)}
      </Accordion>
    </ComponentContainerCard>;
};
export const metadata = {
  title: 'Accordions'
};
const Accordions = () => {
  return <>
      <PageTitle subName="UI" title="Accordion" />
      <Row>
        <Col xl={9}>
          <BasicAccordion />
          <FlushAccordion />
          <AlwaysOpenAccordion />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          label: 'Default Example',
          link: '#default'
        }, {
          label: 'Flush Accordion',
          link: '#flush'
        }, {
          label: 'Always Open',
          link: '#always-open'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Accordions;