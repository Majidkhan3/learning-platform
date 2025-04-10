'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Col, Nav, NavItem, NavLink, Row, Tab, TabContainer, TabContent, TabPane, Tabs } from 'react-bootstrap';
import { tabContents } from '../data';
import ComponentContainerCard from '@/components/ComponentContainerCard';
const NavTabs = () => {
  return <ComponentContainerCard id="default" title="Nav Tabs" description={<>
          Use the <code>.nav-tabs</code> class to generate a tabbed interface.
        </>}>
      <Tabs defaultActiveKey={'2'} variant="underline" className="card-tabs border-bottom">
        {tabContents.map((tab, idx) => <Tab className="nav-item" eventKey={tab.id} key={idx} title={<div className="fw-semibold">
                <span className="d-block d-sm-none">
                  <IconifyIcon icon={tab.icon} />
                </span>
                <span className="d-none d-sm-block">{tab.title}</span>
              </div>}>
            {tab.description}
          </Tab>)}
      </Tabs>
    </ComponentContainerCard>;
};
const TabsJustified = () => {
  return <ComponentContainerCard id="tab-justify" title="Tabs Justified" description={<>
          Using class <code>.nav-justified</code>, you can force your tabs menu items to use the full available width.
        </>}>
      <Tabs justify defaultActiveKey={'2'} variant="underline" className="border-bottom card-tabs">
        {tabContents.map((tab, idx) => <Tab className="nav-item" eventKey={tab.id} key={idx} title={<div className="fw-semibold">
                <span className="d-block d-sm-none">
                  <IconifyIcon icon={tab.icon} />
                </span>
                <span className="d-none d-sm-block">{tab.title}</span>
              </div>}>
            {tab.description}
          </Tab>)}
      </Tabs>
    </ComponentContainerCard>;
};
const NavPills = () => {
  return <ComponentContainerCard id="nav-pills" title="Nav Pills" description={<>
          {' '}
          Use the <code>.nav-pills</code> class to generate a pilled interface.
        </>}>
      <TabContainer defaultActiveKey={'2'}>
        <Nav as={'ul'} variant="pills">
          {tabContents.map((tab, idx) => <NavItem as={'li'} key={idx}>
              <NavLink eventKey={tab.id}>
                <span className="d-block d-sm-none">
                  <IconifyIcon icon={tab.icon} />
                </span>
                <span className="d-none d-sm-block">{tab.title}</span>
              </NavLink>
            </NavItem>)}
        </Nav>
        <TabContent className="pt-2 text-muted">
          {tabContents.map((tab, idx) => <TabPane eventKey={tab.id} key={idx}>
              <p className="mb-0">{tab.description}</p>
            </TabPane>)}
        </TabContent>
      </TabContainer>
    </ComponentContainerCard>;
};
const PillsJustified = () => {
  return <ComponentContainerCard id="pills-justify" title="Pills Justified" description={<>
          Using class <code>.nav-justified</code>, you can force your pills menu items to use the full available width.
        </>}>
      <div className="d-flex flex-wrap gap-2">
        <TabContainer defaultActiveKey={'2'}>
          <Nav as={'ul'} variant="pills" justify className="p-1">
            {tabContents.map((tab, idx) => <NavItem as={'li'} key={idx}>
                <NavLink eventKey={tab.id}>
                  <span className="d-block d-sm-none">
                    <IconifyIcon icon={tab.icon} />
                  </span>
                  <span className="d-none d-sm-block">{tab.title}</span>
                </NavLink>
              </NavItem>)}
          </Nav>
          <TabContent className="pt-2 text-muted">
            {tabContents.map((tab, idx) => <TabPane eventKey={tab.id} key={idx}>
                <p className="mb-0">{tab.description}</p>
              </TabPane>)}
          </TabContent>
        </TabContainer>
      </div>
    </ComponentContainerCard>;
};
const TabsVerticalLeft = () => {
  return <ComponentContainerCard id="tab-vertical-left" title="Tabs Vertical Left" description={<>
          {' '}
          You can stack your navigation by changing the flex item direction with the <code>.flex-column</code> utility.
        </>}>
      <Row>
        <TabContainer defaultActiveKey={'1'}>
          <Col sm={3} className="mb-2 mb-sm-0">
            <Nav variant="pills" className="flex-column">
              {tabContents.map((tab, idx) => <NavLink key={idx} eventKey={tab.id}>
                  <span>{tab.title}</span>
                </NavLink>)}
            </Nav>
          </Col>
          <Col sm={9}>
            <TabContent className="pt-0">
              {tabContents.map((tab, idx) => <TabPane className="fade" eventKey={tab.id} key={idx}>
                  <p className="mb-0">{tab.description.slice(0, 400)}</p>
                </TabPane>)}
            </TabContent>
          </Col>
        </TabContainer>
      </Row>
    </ComponentContainerCard>;
};
const TabsVerticalRight = () => {
  return <ComponentContainerCard id="tab-vertical-right" title="Tabs Vertical Right" description={<>
          {' '}
          You can stack your navigation by changing the flex item direction with the <code>.flex-column</code> utility.
        </>}>
      <Row>
        <TabContainer defaultActiveKey={'1'}>
          <Col sm={9} className="mb-2 mb-sm-0">
            <TabContent className="pt-0">
              {tabContents.map((tab, idx) => <TabPane className="fade" eventKey={tab.id} key={idx}>
                  <p className="mb-0">{tab.description.slice(0, 400)}</p>
                </TabPane>)}
            </TabContent>
          </Col>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {tabContents.map((tab, idx) => <NavLink key={idx} eventKey={tab.id}>
                  <span>{tab.title}</span>
                </NavLink>)}
            </Nav>
          </Col>
        </TabContainer>
      </Row>
    </ComponentContainerCard>;
};
const AllNavTabs = () => {
  return <>
      <NavTabs />
      <TabsJustified />
      <NavPills />
      <PillsJustified />
      <TabsVerticalLeft />
      <TabsVerticalRight />
    </>;
};
export default AllNavTabs;