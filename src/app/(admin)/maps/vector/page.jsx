import UIExamplesList from '@/components/UIExamplesList';
import { Col, Row } from 'react-bootstrap';
import AllVectorMaps from './components/AllVectorMaps';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Vector Maps'
};
const VectorMaps = () => {
  return <>
      <PageTitle title="Vector Maps" subName="Maps" />
      <Row>
        <Col xl={9}>
          <AllVectorMaps />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#world_vector_map',
          label: 'World Vector Map'
        }, {
          link: '#canada_vector_map',
          label: 'Canada Vector Map'
        }, {
          link: '#russia_vector_map',
          label: 'Russia Vector Map'
        }, {
          link: '#iraq_vector_map',
          label: 'Iraq Vector Map'
        }, {
          link: '#spain_vector_map',
          label: 'Spain Vector Map'
        }]} />
        </Col>
      </Row>
    </>;
};
export default VectorMaps;