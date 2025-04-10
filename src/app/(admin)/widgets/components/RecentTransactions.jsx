import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getAllTransaction } from '@/helpers/data';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
const RecentTransactions = async () => {
  const transactionsData = await getAllTransaction();
  return <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle as={'h4'}>Recent Transactions</CardTitle>
        <div>
          <Button variant="primary" size="sm">
            <IconifyIcon icon="ri:add-line" className="me-1" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        <SimplebarReactClient className="px-3" style={{
        maxHeight: 406
      }}>
          <table className="table table-hover mb-0 table-centered">
            <tbody>
              {transactionsData.map((item, idx) => <tr key={idx}>
                  <td>{item.purchaseDate.toLocaleString('en-us', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}</td>
                  <td>${item.amount}</td>
                  <td>
                    <span className={`badge bg-${item.status == 'Dr' ? 'danger' : 'success'}`}>{item.status}</span>
                  </td>
                  <td>{item.description} </td>
                </tr>)}
            </tbody>
          </table>
        </SimplebarReactClient>
      </CardBody>
    </Card>;
};
export default RecentTransactions;