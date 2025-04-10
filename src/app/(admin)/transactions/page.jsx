import PageTitle from '@/components/PageTitle';
import TransactionData from './components/TransactionData';
export const metadata = {
  title: 'Transactions'
};
const TransactionsPage = () => {
  return <>
      <PageTitle title="Transactions" subName="Real Estate" />
      <TransactionData />
    </>;
};
export default TransactionsPage;