import avatar1 from '@/assets/images/users/dummy-avatar.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import TextFormInput from '@/components/from/TextFormInput';
import SelectFormInput from '@/components/from/SelectFormInput';
const Profile = () => {
  const {
    control
  } = useForm();
  return <>
      <h4 className="fs-16 fw-semibold mb-1">Profile Information</h4>
      <p className="text-muted">Setup your profile information</p>
      <Row>
        <Col xs={12}>
          <div className="avatar-lg mb-3">
            <div className="avatar-title bg-body rounded-circle border border-3 border-dashed-light position-relative">
              <label htmlFor="imageInput" className="position-absolute end-0 bottom-0">
                <div className="avatar-xs cursor-pointer">
                  <span className="avatar-title bg-light text-dark rounded-circle">
                    <IconifyIcon icon="bx:camera" />
                  </span>
                </div>
              </label>
              <input className="hidden" type="file" id="imageInput" accept="image/*" />
              <Image id="preview" src={avatar1} alt="Preview Image" className="rounded-circle img-fluid" />
            </div>
          </div>
          <Row>
            <Col md={6}>
              <TextFormInput name="fName" label="First Name" placeholder="Chris" containerClassName="mb-3" control={control} />
            </Col>
            <Col md={6}>
              <TextFormInput name="lName" label="Last Name" placeholder="Keller" containerClassName="mb-3" control={control} />
            </Col>
            <Col md={6}>
              <TextFormInput name="number" label="Number" placeholder="Mobile Number" containerClassName="mb-3" control={control} />
            </Col>
            <Col md={6}>
              <SelectFormInput name="country" label="Country" containerClassName="mb-3" control={control} options={[{
              value: 'United States',
              label: 'United States'
            }, {
              value: 'Canada',
              label: 'Canada'
            }, {
              value: 'Australia',
              label: 'Australia'
            }, {
              value: 'Germany',
              label: 'Germany'
            }, {
              value: 'Bangladesh',
              label: 'Bangladesh'
            }, {
              value: 'China',
              label: 'China'
            }, {
              value: 'Argentina',
              label: 'Argentina'
            }, {
              value: 'Bharat',
              label: 'Bharat'
            }, {
              value: 'Afghanistan',
              label: 'Afghanistan'
            }, {
              value: 'France',
              label: 'France'
            }, {
              value: 'Brazil',
              label: 'Brazil'
            }, {
              value: 'Belgium',
              label: 'Belgium'
            }, {
              value: 'Colombia',
              label: 'Colombia'
            }, {
              value: 'Albania',
              label: 'Albania'
            }]} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>;
};
export default Profile;