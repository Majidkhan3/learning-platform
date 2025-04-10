import AllWizard from './components/AllWizard';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Wizard'
};
const Wizard = () => {
  return <>
      <PageTitle title="Wizard" subName="Form" />
      <AllWizard />
    </>;
};
export default Wizard;