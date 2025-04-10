import PageTitle from '@/components/PageTitle';
import PropertyList from './components/PropertyList';
import PropertyStat from './components/PropertyStat';
export const metadata = {
  title: 'Listing List'
};
const PropertyListPage = () => {
  return <>
      <PageTitle title="Listing List" subName="Real Estate" />
      <PropertyStat />
      <PropertyList />
    </>;
};
export default PropertyListPage;