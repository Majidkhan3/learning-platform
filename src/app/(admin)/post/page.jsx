import PageTitle from '@/components/PageTitle';
import { Row } from 'react-bootstrap';
import Articles from './components/Articles';
import FreshArticles from './components/FreshArticles';
import Posts from './components/Posts';
export const metadata = {
  title: 'Blog Grid'
};
const PostPage = () => {
  return <>
      <PageTitle title="Blog Grid" subName="Blog" />
      <Row>
        <FreshArticles />
        <Articles />
      </Row>
      <Row>
        <Posts />
      </Row>
    </>;
};
export default PostPage;