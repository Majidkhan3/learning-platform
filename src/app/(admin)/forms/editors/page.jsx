import { Button, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import AllEditors from './components/AllEditors';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Editors'
};
const Editors = () => {
  return <>
      <PageTitle title="Editors" subName="Form" />
      <Row>
        <Col xl={12}>
          <Card>
            <CardBody>
              <CardTitle as={'h5'} className="mb-1 anchor" id="overview">
                Overview
                <Button variant="outline-success" size="sm" className="rounded-2 float-end" href="https://quilljs.com/" target="_blank">
                  Official Website
                </Button>
              </CardTitle>
              <p className="text-muted mb-3">Quilljs is a lightweight and powerful datetime picker.</p>
            </CardBody>
          </Card>
          <AllEditors />
        </Col>
      </Row>
    </>;
};
export default Editors;