'use client';

import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Modal, ModalBody, ModalHeader, ModalTitle, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import SelectFormInput from '@/components/from/SelectFormInput';
import TextFormInput from '@/components/from/TextFormInput';
const AddEditEvent = ({
  eventData,
  isEditable,
  onAddEvent,
  onRemoveEvent,
  onUpdateEvent,
  open,
  toggle
}) => {
  const eventFormSchema = yup.object({
    title: yup.string().required('Please enter event title'),
    category: yup.string().required('Please select event category')
  });
  const {
    handleSubmit,
    control,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(eventFormSchema),
    defaultValues: {
      title: eventData?.title ?? '',
      category: eventData?.className ? String(eventData.className) : 'bg-danger'
    }
  });
  useEffect(() => {
    if (eventData?.title) {
      setValue('title', String(eventData?.title));
      setValue('category', String(eventData?.className));
    }
  }, [eventData]);
  useEffect(() => {
    if (!open) reset();
  }, [open]);
  const onSubmitEvent = data => {
    isEditable ? onUpdateEvent(data) : onAddEvent(data);
  };
  return <Modal show={open} onHide={toggle} className="fade" tabIndex={-1}>
      <div className="modal-content">
        <form onSubmit={handleSubmit(onSubmitEvent)} className="needs-validation" name="event-form">
          <ModalHeader className="modal-header p-3 border-bottom-0" closeButton>
            <ModalTitle className="modal-title" as="h5">
              Event
            </ModalTitle>
          </ModalHeader>
          <ModalBody className="px-3 pb-3 pt-0">
            <Row>
              <Col xs={12}>
                <TextFormInput control={control} name="title" containerClassName="mb-3" label="Event Name" placeholder="Insert Event Name" />
              </Col>
              <Col xs={12}>
                <SelectFormInput control={control} name="category" label="Category" containerClassName="mb-3" options={[{
                value: 'bg-primary',
                label: 'Blue'
              }, {
                value: 'bg-secondary',
                label: 'Gray Dark'
              }, {
                value: 'bg-success',
                label: 'Green'
              }, {
                value: 'bg-info',
                label: 'Cyan'
              }, {
                value: 'bg-warning',
                label: 'Yellow'
              }, {
                value: 'bg-danger',
                label: 'Red'
              }, {
                value: 'bg-dark',
                label: 'Dark'
              }]} />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                {isEditable && <button onClick={onRemoveEvent} type="button" className="btn btn-danger">
                    Delete
                  </button>}
              </Col>
              <Col xs={6} className="text-end">
                <Button variant="light" type="button" className="me-1" onClick={toggle}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </form>
      </div>
    </Modal>;
};
export default AddEditEvent;