import FileUpload from '@/components/FileUpload';
import PageTitle from '@/components/PageTitle';
import { Col, Row } from 'react-bootstrap';
import CreatePost from './components/CreatePost';
import CreatePostCard from './components/CreatePostCard';
export const metadata = {
  title: 'Blog Create'
};
const PostCreatePage = () => {
  return <>
      <PageTitle title="Blog Create" subName="Blog" />
      <Row>
        <Col xl={3} lg={4}>
          <CreatePostCard />
        </Col>
        <Col xl={9} lg={8}>
          <FileUpload title="" />
          <CreatePost />
        </Col>
      </Row>
    </>;
};
export default PostCreatePage;