import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Col, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { faqData } from './data';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'FAQs'
};
const GeneralFaq = () => {
  return <>
      <h4 className="mb-3 fw-semibold fs-16">General</h4>
      <Accordion alwaysOpen defaultActiveKey={'0'}>
        {faqData.General.map((faq, idx) => <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader>
              <div className="fw-medium">{faq.question}</div>
            </AccordionHeader>
            <AccordionBody>{faq.answer}</AccordionBody>
          </AccordionItem>)}
      </Accordion>
    </>;
};
const RefundFaqs = () => {
  return <>
      <h4 className="mb-3 mt-4 fw-semibold fs-16">Refunds</h4>
      <Accordion alwaysOpen defaultActiveKey={'0'}>
        {faqData.Refunds.map((faq, idx) => <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader>
              <div className="fw-medium">{faq.question}</div>
            </AccordionHeader>
            <AccordionBody>{faq.answer}</AccordionBody>
          </AccordionItem>)}
      </Accordion>
    </>;
};
const PaymentsFaqs = () => {
  return <>
      <h4 className="mb-3 fw-semibold fs-16">Payments</h4>
      <Accordion alwaysOpen defaultActiveKey={'0'}>
        {faqData.Payments.map((faq, idx) => <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader>
              <div className="fw-medium">{faq.question}</div>
            </AccordionHeader>
            <AccordionBody>{faq.answer}</AccordionBody>
          </AccordionItem>)}
      </Accordion>
    </>;
};
const SupportFaqs = () => {
  return <>
      <h4 className="mb-3 mt-4 fw-semibold fs-16">Support</h4>
      <Accordion alwaysOpen defaultActiveKey={'0'}>
        {faqData.Support.map((faq, idx) => <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader>
              <div className="fw-medium">{faq.question}</div>
            </AccordionHeader>
            <AccordionBody>{faq.answer}</AccordionBody>
          </AccordionItem>)}
      </Accordion>
    </>;
};
const FAQs = () => {
  return <>
      <PageTitle title="FAQs" subName="Pages" />
      <Row>
        <Col>
          <Row className="g-xl-4">
            <Col xl={6}>
              <GeneralFaq />
              <RefundFaqs />
            </Col>
            <Col xl={6}>
              <PaymentsFaqs />
              <SupportFaqs />
            </Col>
          </Row>
          <Row className="my-5">
            <Col xs={12} className="text-center">
              <h4>Can&apos;t find a questions?</h4>
              <div className="icons-center gap-1">
                <Button variant="success" type="button" className="mt-2">
                  <IconifyIcon icon="bx:envelope" className="me-2" />
                  Email us your question
                </Button>
                <Button variant="info" type="button" className="mt-2 ms-1">
                  <IconifyIcon icon="bxl:twitter" className="me-2" />
                  Send us a tweet
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>;
};
export default FAQs;