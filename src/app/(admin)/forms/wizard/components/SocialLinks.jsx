import TextFormInput from '@/components/from/TextFormInput';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
const SocialLinks = () => {
  const {
    control
  } = useForm();
  return <>
      <h4 className="fs-16 fw-semibold mb-1">Social Media Links</h4>
      <p className="text-muted">Fill your social media links</p>
      <Row>
        <Col lg={6}>
          <TextFormInput name="github" label="GitHub" control={control} placeholder="GitHub Link" containerClassName="mb-3" />
        </Col>
        <Col lg={6}>
          <TextFormInput name="google" label="Google" control={control} placeholder="Google Link" containerClassName="mb-3" />
        </Col>
        <Col lg={6}>
          <TextFormInput name="instagram" label="Instagram" control={control} placeholder="Instagram Link" containerClassName="mb-3" />
        </Col>
        <Col lg={6}>
          <TextFormInput name="skype" label="Skype" control={control} placeholder="Skype Link" containerClassName="mb-3" />
        </Col>
      </Row>
    </>;
};
export default SocialLinks;