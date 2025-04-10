import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Col, Row } from 'react-bootstrap';
const Finish = () => {
  return <Row>
      <Col xs={12}>
        <div className="text-center">
          <div className="avatar-md mx-auto mb-3">
            <div className="avatar-title bg-primary bg-opacity-10 text-primary rounded-circle">
              <IconifyIcon icon="iconamoon:like-duotone" className="fs-36" />
            </div>
          </div>
          <h3 className="mt-0">Finished !</h3>
          <p className="w-75 mb-2 mx-auto">Filled Data Successfully.</p>
          <div className="mb-3">
            <div className="form-check d-inline-block">
              <input type="checkbox" className="form-check-input" id="customCheck1" />
              <label className="form-check-label" htmlFor="customCheck1">
                I agree with the Terms and Conditions
              </label>
            </div>
          </div>
        </div>
      </Col>
    </Row>;
};
export default Finish;