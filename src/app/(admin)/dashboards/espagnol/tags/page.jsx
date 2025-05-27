import PageTitle from '@/components/PageTitle';
import AddTags from './components/tags/AddTags';
export const metadata = {
  title: 'Agent'
};
const AgentPage = () => {
  return <>
      <PageTitle title="Tags" subName="Dashboards" />
      <AddTags />
      
    </>;
};
export default AgentPage;