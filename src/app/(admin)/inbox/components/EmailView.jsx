'use client';

import { EmailProvider } from '@/context/useEmailContext';
import { Col, TabContainer } from 'react-bootstrap';
import EmailArea from './EmailArea';
import EmailNavigationMenu from './EmailNavigationMenu';
import InboxMail from './InboxMail';
const EmailView = () => {
  return <>
      <EmailProvider>
        <TabContainer mountOnEnter defaultActiveKey="Inbox">
          <Col xl={2}>
            <EmailNavigationMenu />
          </Col>
          <Col xl={3}>
            <InboxMail />
          </Col>
          <Col xl={7}>
            <EmailArea />
          </Col>
        </TabContainer>
      </EmailProvider>
    </>;
};
export default EmailView;