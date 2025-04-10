import UIExamplesList from '@/components/UIExamplesList';
// import { getAllDataTableRecords } from '@/helpers/data'

import { Col, Row } from 'react-bootstrap';
import AllDataTables from './components/AllDataTables';
import { getAllDataTableRecords } from '@/helpers/data';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'GridJs Tables'
};
const GridJS = async () => {
  const dataTableRecords = await getAllDataTableRecords();
  return <>
      <PageTitle title="Grid JS" subName="Table" />
      <Row>
        <Col xl={10}>
          {' '}
          <AllDataTables dataTableRecords={dataTableRecords} />
        </Col>
        <Col xl={2}>
          {dataTableRecords && <UIExamplesList examples={[{
          link: '#overview',
          label: 'Overview'
        }, {
          link: '#basic',
          label: 'Basic'
        }, {
          link: '#pagination',
          label: 'Pagination'
        }, {
          link: '#search',
          label: 'Search'
        }, {
          link: '#sorting',
          label: 'Sorting'
        }, {
          link: '#loading_state',
          label: 'Loading State'
        }, {
          link: '#fixed_header',
          label: 'Fixed Header'
        }, {
          link: '#hidden_column',
          label: 'Hidden Columns'
        }]} />}
        </Col>
      </Row>
    </>;
};
export default GridJS;