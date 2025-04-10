import PasswordFormInput from '@/components/from/PasswordFormInput';
import TextFormInput from '@/components/from/TextFormInput';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
const Account = () => {
  const {
    control
  } = useForm();
  return <>
      <h4 className="fs-16 fw-semibold mb-1">Account Information</h4>
      <p className="text-muted">Setup your account information</p>
      <Row>
        <Col lg={6}>
          <TextFormInput name="user" label="User" control={control} placeholder="Enter User Name" containerClassName="mb-3" />
        </Col>
        <Col lg={6}>
          <TextFormInput name="email" label="Email" type="email" control={control} placeholder="Enter your email" containerClassName="mb-3" />
        </Col>
        <Col lg={6}>
          <PasswordFormInput name="password" label="Password" control={control} containerClassName="mb-3" placeholder="Enter Password" />
        </Col>
        <Col lg={6}>
          <PasswordFormInput name="confirmPassword" label="Confirm Password" control={control} containerClassName="mb-3" placeholder="Confirm a Password" />
        </Col>
      </Row>
    </>;
};
export default Account;