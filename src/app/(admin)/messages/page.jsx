import { Row } from 'react-bootstrap';
import PageTitle from '@/components/PageTitle';
import { ChatProvider } from '@/context/useChatContext';
import ChatApp from './components/ChatApp';
export const metadata = {
  title: 'Messages'
};
const ChatPage = () => {
  return <>
      <PageTitle title="Messages" subName="Real Estate" />
      <Row className="g-1">
        <ChatProvider>
          <ChatApp />
        </ChatProvider>
      </Row>
    </>;
};
export default ChatPage;