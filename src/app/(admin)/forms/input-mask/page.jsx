import { Button, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import AllInputMasks from './components/AllInputMasks';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Input Mask'
};
const InputMasks = () => {
  return <>
      <PageTitle title="Input Mask" subName="Form" />
      <Row>
        <Col xl={12}>
          <Card>
            <CardBody>
              <CardTitle as={'h5'} className="anchor" id="overview">
                Overview{' '}
                <Button variant="outline-success" size="sm" className="rounded-2 float-end" href="https://github.com/RobinHerbots/Inputmask" target="_blank">
                  {' '}
                  Official Website{' '}
                </Button>
              </CardTitle>
              <p className="text-muted mb-3">Inputmask is a javascript library that creates an input mask.</p>
            </CardBody>
          </Card>
          <AllInputMasks />
        </Col>
      </Row>
    </>;
};
export default InputMasks;