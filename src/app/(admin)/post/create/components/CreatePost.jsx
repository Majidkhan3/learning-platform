'use client';

import ChoicesFormInput from '@/components/from/ChoicesFormInput';
import TextAreaFormInput from '@/components/from/TextAreaFormInput';
import TextFormInput from '@/components/from/TextFormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const CreatePost = () => {
  const messageSchema = yup.object({
    name: yup.string().required('Please enter name'),
    description: yup.string().required('Please enter description'),
    userName: yup.string().required('Please enter user name'),
    date: yup.string().email().required('Please enter date'),
    userDetails: yup.string().required('Please enter description')
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
          <CardTitle as={'h4'}>Blog Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="name" placeholder="Name" label="Blog Title" />
              </div>
            </Col>
            <Col lg={6}>
              <label htmlFor="blog-tag" className="form-label">
                Blog Tag
              </label>
              <ChoicesFormInput options={{
              removeItemButton: true
            }} className="form-control" id="choices-multiple-remove-button" data-choices data-choices-removeitem multiple>
                <option value="Blog">Blog</option>
                <option value="Business">Business</option>
                <option value="Health">Health</option>
                <option value="Computer Software">Computer Software</option>
                <option value="Lifestyle blogs">Lifestyle blogs</option>
                <option value="Fashion">Fashion</option>
              </ChoicesFormInput>
            </Col>
            <Col lg={12}>
              <div className="mb-3">
                <TextAreaFormInput control={control} name="description" type="text" label="Add Description" className="Customer-address" id="schedule-textarea" rows={3} placeholder="Enter address" />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Blog User Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <TextFormInput control={control} name="userName" placeholder="Name" label="User Name" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <label htmlFor="create-date" className="form-label">
                  Date
                </label>
                <input type="text" id="create-date" className="form-control flatpickr-input" placeholder="dd-mm-yyyy" />
              </div>
            </Col>
            <Col lg={12}>
              <div>
                <TextAreaFormInput control={control} name="userDetails" type="text" label="User Detail" className="Customer-address" id="schedule-textarea" rows={4} placeholder="Description" />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <div className="mb-3 rounded">
        <Row className="justify-content-end g-2">
          <Col lg={2}>
            <Button variant="outline-primary" type="submit" className="w-100">
              Create Blog
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
export default CreatePost;