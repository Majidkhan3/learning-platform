'use client';

import ChoicesFormInput from '@/components/from/ChoicesFormInput';
import TextAreaFormInput from '@/components/from/TextAreaFormInput';
import TextFormInput from '@/components/from/TextFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const AddCustomer = () => {
  const messageSchema = yup.object({
    name: yup.string().required('Please enter name'),
    description: yup.string().required('Please enter description'),
    zipCode: yup.string().required('Please enter Zip-Code'),
    email: yup.string().email().required('Please enter email'),
    number: yup.string().required('Please enter number'),
    propertiesNumber: yup.string().required('Please enter Properties Number'),
    facebookUrl: yup.string().required('Please enter Facebook Url'),
    instagramUrl: yup.string().required('Please enter Instagram Url'),
    twitterUrl: yup.string().required('Please enter Twitter Url'),
    viewProperties: yup.string().required('Please enter view properties'),
    ownProperties: yup.string().required('Please enter own Properties')
  });
  const {
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(messageSchema)
  });
  return <form onSubmit={handleSubmit(() => {})}>
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Customer Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="name" placeholder="Full Name" label="Customer Name" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="email" placeholder="Enter Email" label="Customer Email" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="number" type="number" placeholder="Enter Number" label="Customer Number" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="viewProperties" type="number" placeholder="Enter View Properties" label="View Properties" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="ownProperties" type="number" placeholder="Enter Own Properties" label="Own Properties" />
              </div>
            </Col>
            <Col lg={6}>
              <label htmlFor="invest-property" className="form-label">
                Invest Property
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text fs-20 px-2 py-0">
                  <IconifyIcon icon="ri:money-dollar-circle-line" />
                </span>
                <input type="number" id="invest-property" className="form-control" placeholder={'000'} />
              </div>
            </Col>
            <Col lg={12}>
              <div className="mb-3">
                <TextAreaFormInput control={control} name="description" type="text" label="Customer Address" className="Customer-address" id="schedule-textarea" rows={3} placeholder="Enter address" />
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <TextFormInput control={control} name="zipCode" type="number" placeholder="Zip-Code" label="Zip-Code" />
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <label htmlFor="choices-city" className="form-label">
                  City
                </label>
                <ChoicesFormInput className="form-control" id="choices-city" data-choices data-choices-groups data-placeholder="Select City">
                  <option>Choose a city</option>
                  <optgroup label="UK">
                    <option value="London">London</option>
                    <option value="Manchester">Manchester</option>
                    <option value="Liverpool">Liverpool</option>
                  </optgroup>
                  <optgroup label="FR">
                    <option value="Paris">Paris</option>
                    <option value="Lyon">Lyon</option>
                    <option value="Marseille">Marseille</option>
                  </optgroup>
                  <optgroup label="DE" disabled>
                    <option value="Hamburg">Hamburg</option>
                    <option value="Munich">Munich</option>
                    <option value="Berlin">Berlin</option>
                  </optgroup>
                  <optgroup label="US">
                    <option value="New York">New York</option>
                    <option value="Washington" disabled>
                      Washington
                    </option>
                    <option value="Michigan">Michigan</option>
                  </optgroup>
                  <optgroup label="SP">
                    <option value="Madrid">Madrid</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="Malaga">Malaga</option>
                  </optgroup>
                  <optgroup label="CA">
                    <option value="Montreal">Montreal</option>
                    <option value="Toronto">Toronto</option>
                    <option value="Vancouver">Vancouver</option>
                  </optgroup>
                </ChoicesFormInput>
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <label htmlFor="choices-country" className="form-label">
                  Country
                </label>
                <ChoicesFormInput className="form-control" id="choices-country" data-choices data-choices-groups data-placeholder="Select Country">
                  <option>Choose a country</option>
                  <optgroup>
                    <option>United Kingdom</option>
                    <option value="Fran">France</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="U.S.A">U.S.A</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                    <option value="Spain">Spain</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </optgroup>
                </ChoicesFormInput>
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <TextFormInput control={control} name="facebookUrl" placeholder="Enter URL" label="Facebook URL" />
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <TextFormInput control={control} name="instagramUrl" placeholder="Enter URL" label="Instagram URL" />
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <TextFormInput control={control} name="twitterUrl" placeholder="Enter URL" label="Twitter URL" />
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <label htmlFor="choices-status" className="form-label">
                  Status
                </label>
                <ChoicesFormInput className="form-control" id="choices-status" data-choices data-choices-groups data-placeholder="Select status">
                  <option>Choose a Status</option>
                  <optgroup>
                    <option>Available</option>
                    <option value="Fran">Unavailable</option>
                  </optgroup>
                </ChoicesFormInput>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <div className="mb-3 rounded">
        <Row className="justify-content-end g-2">
          <Col lg={2}>
            <Button variant="outline-primary" type="submit" className="w-100">
              Create Customer
            </Button>
          </Col>
          <Col lg={2}>
            <Button variant="danger" className="w-100">
              Cancel
            </Button>
          </Col>
        </Row>
      </div>
    </form>;
};
export default AddCustomer;