'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Nav, NavItem, NavLink, Row, Tab, TabContainer, TabContent, TabPane, Tabs } from 'react-bootstrap';
import Account from './Account';
import Profile from './Profile';
import SocialLinks from './SocialLinks';
import Finish from './Finish';
import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
const wizardSteps = [{
  index: 1,
  name: 'Account',
  icon: 'iconamoon:profile-circle-duotone',
  tab: <Account />
}, {
  index: 2,
  name: 'Profile',
  icon: 'iconamoon:profile-duotone',
  tab: <Profile />
}, {
  index: 3,
  name: 'Social Links',
  icon: 'iconamoon:link-fill',
  tab: <SocialLinks />
}, {
  index: 4,
  name: 'Finish',
  icon: 'iconamoon:check-circle-1-duotone',
  tab: <Finish />
}];
const HorizontalWizard = () => {
  const [activeStep, setActiveStep] = useState(1);
  return <Card>
      <CardHeader>
        <CardTitle as={'h5'} className="anchor" id="basic-wizard">
          Horizontal Wizard
          <Link className="anchor-link" href="#horizontal-wizard">
            #
          </Link>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="mb-5">
          <form>
            <div id="horizontalwizard">
              <Tabs onSelect={e => setActiveStep(Number(e))} activeKey={activeStep} variant="pills" justify className="icon-wizard form-wizard-header bg-light p-1">
                {wizardSteps.map(step => <Tab key={step.index} as={'span'} className="rounded-0 py-2" eventKey={step.index} title={<>
                        <IconifyIcon icon={step.icon} className="fs-26" />
                        {step.name}
                      </>}>
                    <>{step.tab}</>
                  </Tab>)}
              </Tabs>
              <div className="d-flex flex-wrap align-items-center wizard justify-content-between gap-3 mt-3">
                <div className="first">
                  <Button variant="soft-primary" onClick={() => setActiveStep(1)}>
                    First
                  </Button>
                </div>
                <div className="d-flex gap-2">
                  <div className="previous">
                    <Button onClick={() => setActiveStep(() => activeStep - 1)} variant="primary" className={clsx({
                    disabled: activeStep === 1
                  })}>
                      <IconifyIcon icon="bx:left-arrow-alt" className="me-2" />
                      Back To Previous
                    </Button>
                  </div>
                  <div className="next">
                    <Button variant="primary" onClick={() => setActiveStep(() => activeStep + 1)} className={clsx({
                    disabled: wizardSteps.length === activeStep
                  })}>
                      Next Step
                      <IconifyIcon icon="bx:right-arrow-alt" className="ms-2" />
                    </Button>
                  </div>
                </div>
                <div className="last">
                  <Button variant="soft-primary" onClick={() => setActiveStep(wizardSteps.length)}>
                    Finish
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </CardBody>
    </Card>;
};
const VerticalWizard = () => {
  const [activeStep, setActiveStep] = useState(1);
  return <Card>
      <CardHeader>
        <CardTitle as={'h5'} className="anchor" id="basic-wizard">
          Vertical Wizard
          <Link className="anchor-link" href="#vertical-wizard">
            #
          </Link>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="mb-5">
          <form id="verticalwizard">
            <TabContainer activeKey={activeStep} onSelect={e => setActiveStep(Number(e))}>
              <Row>
                <Col lg={3}>
                  <Nav variant="pills" justify className="nav-justified flex-column icon-wizard form-wizard-header bg-light p-1" role="tablist">
                    {wizardSteps.map(step => <NavItem key={step.index}>
                        <NavLink eventKey={step.index} className="rounded-0 py-2" aria-selected="true" role="tab">
                          <IconifyIcon icon={step.icon} className="fs-26" />
                          {step.name}{' '}
                        </NavLink>
                      </NavItem>)}
                  </Nav>
                </Col>
                <Col lg={9}>
                  <TabContent className="mb-0">
                    {wizardSteps.map(step => <TabPane eventKey={step.index} key={step.index}>
                        <>{step.tab}</>
                      </TabPane>)}
                    <div className="d-flex flex-wrap align-items-center wizard justify-content-between gap-3 mt-3">
                      <div className="first">
                        <Button variant="soft-primary" onClick={() => setActiveStep(1)}>
                          First
                        </Button>
                      </div>
                      <div className="d-flex gap-2">
                        <div className="previous">
                          <Button onClick={() => setActiveStep(() => activeStep - 1)} variant="primary" className={clsx({
                          disabled: activeStep === 1
                        })}>
                            <IconifyIcon icon="bx:left-arrow-alt" className="me-2" />
                            Back To Previous
                          </Button>
                        </div>
                        <div className="next">
                          <Button variant="primary" onClick={() => setActiveStep(() => activeStep + 1)} className={clsx({
                          disabled: wizardSteps.length === activeStep
                        })}>
                            Next Step
                            <IconifyIcon icon="bx:right-arrow-alt" className="ms-2" />
                          </Button>
                        </div>
                      </div>
                      <div className="last">
                        <Button variant="soft-primary" onClick={() => setActiveStep(wizardSteps.length)}>
                          Finish
                        </Button>
                      </div>
                    </div>
                  </TabContent>
                </Col>
              </Row>
            </TabContainer>
          </form>
        </div>
      </CardBody>
    </Card>;
};
const AllWizard = () => {
  return <Row>
      <Col xs={12}>
        <HorizontalWizard />
        <VerticalWizard />
      </Col>
    </Row>;
};
export default AllWizard;