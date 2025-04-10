'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { Button, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, InputGroup } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import { serverSideFormValidate } from '@/helpers/data';
const BrowserDefault = () => {
  return <ComponentContainerCard id="browser-defaults" title="Browser Default" description={<>Depending on your browser and OS, you’ll see a slightly different style of feedback.</>}>
      <form className="row g-3">
        <Col md={4}>
          <FormLabel htmlFor="validationDefault01">First name</FormLabel>
          <FormControl type="text" id="validationDefault01" defaultValue="Mark" required />
        </Col>
        <Col md={4}>
          <FormLabel htmlFor="validationDefault02">Last name</FormLabel>
          <FormControl type="text" id="validationDefault02" defaultValue="Otto" required />
        </Col>
        <Col md={4}>
          <FormLabel htmlFor="validationDefaultUsername">Username</FormLabel>
          <div className="input-group">
            <span className="input-group-text" id="inputGroupPrepend2">
              @
            </span>
            <FormControl type="text" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
          </div>
        </Col>
        <Col md={6}>
          <FormLabel htmlFor="validationDefault03">City</FormLabel>
          <FormControl type="text" id="validationDefault03" required />
        </Col>
        <Col md={3}>
          <FormLabel htmlFor="validationDefault04">State</FormLabel>
          <FormSelect id="validationDefault04" required>
            <option disabled>Choose...</option>
            <option>...</option>
          </FormSelect>
        </Col>
        <Col md={3}>
          <FormLabel htmlFor="validationDefault05">Zip</FormLabel>
          <FormControl type="text" id="validationDefault05" required />
        </Col>
        <Col xs={12}>
          <FormCheck label="Agree to terms and conditions" id="term1" required />
        </Col>
        <Col xs={12}>
          <Button variant="primary" type="submit">
            Submit form
          </Button>
        </Col>
      </form>
    </ComponentContainerCard>;
};
const CustomStyles = () => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  return <ComponentContainerCard id="custom-styles" title="Custom styles" description={<>
          For custom Bootstrap form validation messages, you’ll need to add the <code>novalidate</code> boolean attribute to your{' '}
          <code>&lt;form&gt;</code>. This disables the browser default feedback tooltips, but still provides access to the form validation APIs in
          JavaScript. When attempting to submit, you’ll see the <code>:invalid</code> and <code>:valid</code> styles applied to your form controls.
        </>}>
      <Form className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
        <FormGroup className="col-md-4">
          <FormLabel>First name</FormLabel>
          <FormControl type="text" id="validationCustom01" placeholder="First name" defaultValue="Mark" required />
          <Feedback>Looks good!</Feedback>
        </FormGroup>
        <FormGroup className="col-md-4">
          <FormLabel>Last name</FormLabel>
          <FormControl type="text" id="validationCustom02" placeholder="Last name" defaultValue="Otto" required />
          <Feedback>Looks good!</Feedback>
        </FormGroup>
        <FormGroup className="col-md-4">
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <InputGroupText id="inputGroupPrepend">@</InputGroupText>
            <FormControl type="text" id="validationCustomUsername" placeholder="Username" required />
            <Feedback type="invalid">Please choose a username.</Feedback>
          </InputGroup>
        </FormGroup>
        <FormGroup className="col-md-6">
          <FormLabel>City</FormLabel>
          <FormControl type="text" id="validationCustom03" placeholder="City" required />
          <Feedback type="invalid">Please provide a valid city.</Feedback>
        </FormGroup>
        <FormGroup className="col-md-3">
          <FormLabel>State</FormLabel>
          <FormControl type="text" id="validationCustom04" placeholder="State" required />
          <Feedback type="invalid">Please provide a valid state.</Feedback>
        </FormGroup>
        <FormGroup className="col-md-3">
          <FormLabel>Zip</FormLabel>
          <FormControl type="text" id="validationCustom05" placeholder="Zip" required />
          <Feedback type="invalid">Please provide a valid zip.</Feedback>
        </FormGroup>
        <FormGroup className="col-12">
          <FormCheck id="invalidCheck" required label="Agree to terms and conditions" feedback="You must agree before submitting." feedbackType="invalid" />
        </FormGroup>
        <Col xs={12}>
          <Button variant="primary" type="submit">
            Submit form
          </Button>
        </Col>
      </Form>
    </ComponentContainerCard>;
};
const ServerSideValidation = () => {
  const [validated, setValidated] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [formValue, setFormValue] = useState({
    fName: 'Mark',
    lName: 'Otto',
    username: '',
    city: '',
    state: '',
    zip: ''
  });
  const handleChange = e => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  };
  const isValidInput = name => {
    return !formErrors.find(key => key.name === name);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    const validationReply = await serverSideFormValidate(formValue);
    const allErrors = [];
    validationReply?.inner?.forEach(e => {
      allErrors.push({
        name: e.path,
        message: e.message
      });
    });
    setFormErrors(allErrors);
  };
  return <ComponentContainerCard id="server-side" title="Server side" description={<>
          We recommend using client-side validation, but in case you require server-side validation, you can indicate invalid and valid form fields
          with <code>.is-invalid</code> and <code>.is-valid</code>. Note that <code>.invalid-feedback</code> is also supported with these classes.
        </>}>
      <Form className="row g-3" onSubmit={handleSubmit} noValidate>
        <FormGroup className="col-md-4" controlId="firstNameInput">
          <FormLabel>First name</FormLabel>
          <InputGroup hasValidation>
            <FormControl type="text" placeholder="First name" name="fName" isInvalid={!isValidInput('fName')} value={formValue.fName} className={clsx({
            'is-valid': validated && isValidInput('fName')
          })} onChange={handleChange} />
            <Feedback type={isValidInput('fName') ? 'valid' : 'invalid'}>
              {isValidInput('fName') ? 'Looks good!' : formErrors.find(err => err.name === 'fName')?.message}
            </Feedback>
          </InputGroup>
        </FormGroup>
        <FormGroup className="col-md-4">
          <FormLabel>Last name</FormLabel>
          <InputGroup hasValidation>
            <FormControl type="text" placeholder="Last name" name="lName" value={formValue.lName} onChange={handleChange} className={clsx({
            'is-valid': validated && isValidInput('lName')
          })} isInvalid={!isValidInput('lName')} />
            <Feedback type={isValidInput('lName') ? 'valid' : 'invalid'}>
              {isValidInput('lName') ? 'Looks good!' : formErrors.find(err => err.name === 'lName')?.message}
            </Feedback>
          </InputGroup>
        </FormGroup>
        <FormGroup className="col-md-4">
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <InputGroup hasValidation>
              <InputGroupText>@</InputGroupText>
              <FormControl type="text" placeholder="Username" value={formValue.username} onChange={handleChange} name="username" className={clsx({
              'is-valid': validated && isValidInput('username')
            })} isInvalid={!isValidInput('username')} />
              <Feedback type={isValidInput('username') ? 'valid' : 'invalid'}>
                {isValidInput('username') ? 'Looks good!' : formErrors.find(err => err.name === 'username')?.message}
              </Feedback>
            </InputGroup>
          </InputGroup>
        </FormGroup>
        <FormGroup className="col-md-6">
          <FormLabel>City</FormLabel>
          <InputGroup hasValidation>
            <FormControl type="text" placeholder="City" name="city" value={formValue.city} onChange={handleChange} className={clsx({
            'is-valid': validated && isValidInput('city')
          })} isInvalid={!isValidInput('city')} />
            <Feedback type={isValidInput('city') ? 'valid' : 'invalid'}>
              {isValidInput('city') ? 'Looks good!' : formErrors.find(err => err.name === 'city')?.message}
            </Feedback>
          </InputGroup>
        </FormGroup>
        <FormGroup className="col-md-3">
          <FormLabel>State</FormLabel>
          <InputGroup hasValidation>
            <FormControl type="text" name="state" placeholder="State" value={formValue.state} onChange={handleChange} className={clsx({
            'is-valid': validated && isValidInput('state')
          })} isInvalid={!isValidInput('state')} />
            <Feedback type={isValidInput('state') ? 'valid' : 'invalid'}>
              {isValidInput('state') ? 'Looks good!' : formErrors.find(err => err.name === 'state')?.message}
            </Feedback>
          </InputGroup>
        </FormGroup>
        <FormGroup className="col-md-3">
          <FormLabel>Zip</FormLabel>
          <FormControl type="text" placeholder="Zip" name="zip" value={formValue.zip} onChange={handleChange} className={clsx({
          'is-valid': validated && isValidInput('zip')
        })} isInvalid={!isValidInput('zip')} />
          <Feedback type={isValidInput('zip') ? 'valid' : 'invalid'}>
            {isValidInput('zip') ? 'Looks good!' : formErrors.find(err => err.name === 'zip')?.message}
          </Feedback>
        </FormGroup>
        <FormGroup className="col-12">
          <FormCheck type="checkbox" label="Agree to terms and conditions" />
        </FormGroup>
        <Col xs={12}>
          <Button variant="primary" type="submit">
            Submit form
          </Button>
        </Col>
      </Form>
    </ComponentContainerCard>;
};
const Tooltips = () => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = event => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  return <ComponentContainerCard id="tooltips" title="Tooltips" description={<>
          If your form layout allows it, you can swap the{' '}
          <code>
            .{'{'}valid|invalid{'}'}-feedback
          </code>{' '}
          classes for{' '}
          <code>
            .{'{'}valid|invalid{'}'}-tooltip
          </code>{' '}
          classes to display validation feedbackin a styled tooltip. Be sure to have a parent with <code>position: relative</code> on it for tooltip
          positioning. In the example below, our column classes have this already, but your project may require an alternative setup.{' '}
        </>}>
      <Form className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
        <FormGroup className="position-relative col-md-4">
          <FormLabel>First name</FormLabel>
          <FormControl type="text" placeholder="First name" defaultValue="Mark" required />
          <Feedback tooltip>Looks good!</Feedback>
          <Feedback type="invalid" tooltip>
            Please enter first name.
          </Feedback>
        </FormGroup>
        <FormGroup className="position-relative col-md-4">
          <FormLabel>Last name</FormLabel>
          <FormControl type="text" placeholder="Last name" defaultValue="Otto" required />
          <Feedback tooltip>Looks good!</Feedback>
          <Feedback type="invalid" tooltip>
            Please enter last name.
          </Feedback>
        </FormGroup>
        <FormGroup className="position-relative col-md-4">
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <InputGroupText>@</InputGroupText>
            <FormControl type="text" placeholder="Username" required />
            <Feedback type="invalid" tooltip>
              Please choose a unique and valid username.
            </Feedback>
          </InputGroup>
        </FormGroup>
        <FormGroup className="position-relative col-md-6">
          <FormLabel>City</FormLabel>
          <FormControl type="text" placeholder="City" required />
          <Feedback type="invalid" tooltip>
            Please provide a valid city.
          </Feedback>
        </FormGroup>
        <FormGroup className="position-relative col-md-3">
          <FormLabel>State</FormLabel>
          <FormControl type="text" placeholder="State" required />
          <Feedback type="invalid" tooltip>
            Please provide a valid state.
          </Feedback>
        </FormGroup>
        <FormGroup className="position-relative col-md-3">
          <FormLabel>Zip</FormLabel>
          <FormControl type="text" placeholder="Zip" required />
          <Feedback type="invalid" tooltip>
            Please provide a valid zip.
          </Feedback>
        </FormGroup>
        <Col xs={12}>
          <Button variant="primary" type="submit">
            Submit form
          </Button>
        </Col>
      </Form>
    </ComponentContainerCard>;
};
const SupportedElements = () => {
  return <ComponentContainerCard id="supported-elements" title="Supported elements" description={<>Validation styles are available for the following form controls and components:</>}>
      <ul>
        <li>
          <code>&lt;input&gt;</code>s and&nbsp;
          <code>&lt;textarea&gt;</code>s with&nbsp;
          <code>.form-control</code>
          &nbsp;(including up to one&nbsp;
          <code>.form-control</code> in input groups)
        </li>
        <li>
          <code>&lt;select&gt;</code>s with&nbsp;
          <code>.form-select</code>
        </li>
        <li>
          <code>.form-check</code>s
        </li>
      </ul>
      <form className="was-validated">
        <div className="mb-3">
          <FormLabel htmlFor="validationTextarea">Textarea</FormLabel>
          <textarea className="form-control" id="validationTextarea" placeholder="Required example textarea" required defaultValue={''} />
          <Feedback type="invalid">Please enter a message in the textarea.</Feedback>
        </div>
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="validationFormCheck1" required />
          <label className="form-check-label" htmlFor="validationFormCheck1">
            Check this checkbox
          </label>
          <Feedback type="invalid">Example invalid feedback text</Feedback>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" id="validationFormCheck2" name="radio-stacked" required />
          <label className="form-check-label" htmlFor="validationFormCheck2">
            Toggle this radio
          </label>
        </div>
        <div className="form-check mb-3">
          <input type="radio" className="form-check-input" id="validationFormCheck3" name="radio-stacked" required />
          <label className="form-check-label" htmlFor="validationFormCheck3">
            Or toggle this other radio
          </label>
          <Feedback type="invalid">More example invalid feedback text</Feedback>
        </div>
        <div className="mb-3">
          <FormSelect required aria-label="select example">
            <option>Open this select menu</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </FormSelect>
          <Feedback type="invalid">Example invalid select feedback</Feedback>
        </div>
        <div className="mb-3">
          <FormControl type="file" aria-label="file example" required />
          <Feedback type="invalid">Example invalid form file feedback</Feedback>
        </div>
        <div className="mb-3">
          <Button variant="primary" type="submit">
            Submit form
          </Button>
        </div>
      </form>
    </ComponentContainerCard>;
};
const AllFormValidation = () => {
  return <>
      <BrowserDefault />

      <CustomStyles />

      <ServerSideValidation />

      <SupportedElements />

      <Tooltips />
    </>;
};
export default AllFormValidation;