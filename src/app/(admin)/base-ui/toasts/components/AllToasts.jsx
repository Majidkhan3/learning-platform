'use client';

import useToggle from '@/hooks/useToggle';
import Image from 'next/image';
import { useState } from 'react';
import { Button, Col, Form, Row, Toast, ToastBody, ToastContainer, ToastHeader } from 'react-bootstrap';
import ReactSelect from 'react-select';
import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';
import ComponentContainerCard from '@/components/ComponentContainerCard';
const BasicToast = () => {
  const {
    isTrue: isOpen,
    toggle: hide
  } = useToggle();
  return <ComponentContainerCard id="basic_examples" title="Basic Examples" description={<>
          Toasts are as flexible as you need and have very little required markup. At a minimum, we require a single element to contain your “toasted”
          content and strongly encourage a dismiss button.
        </>}>
      <Toast className="fade d-block opacity-100" role="alert" onClose={hide} show={!isOpen}>
        <ToastHeader closeButton>
          <div className="auth-logo d-inline-block me-auto">
            <Image className="logo-dark" src={logoDark} alt="logo-dark" height={18} />
            <Image className="logo-light" src={logoLight} alt="logo-light" height={18} />
          </div>
          <div className="float-end">
            <small>11 mins ago</small>
          </div>
        </ToastHeader>
        <ToastBody>Hello, world! This is a toast message.</ToastBody>
      </Toast>
    </ComponentContainerCard>;
};
const LiveExample = () => {
  const {
    isTrue: isOpen,
    toggle
  } = useToggle();
  return <ComponentContainerCard id="live_example" title="Live example" description={<>Click the button below to show a toast (positioned with our utilities in the lower right corner) that has been hidden by default.</>}>
      <Button variant="primary" onClick={toggle} type="button" id="liveToastDefaultBtn">
        Show live toast
      </Button>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <Toast show={isOpen} onClose={toggle} id="liveToastDefault" role="alert" aria-live="assertive" aria-atomic="true">
          <ToastHeader closeButton>
            <div className="auth-logo d-inline-block me-auto">
              <Image className="logo-dark" src={logoDark} alt="logo-dark" height={18} />
              <Image className="logo-light" src={logoLight} alt="logo-light" height={18} />
            </div>
            <small>11 mins ago</small>
          </ToastHeader>
          <ToastBody>Hello, world! This is a toast message.</ToastBody>
        </Toast>
      </div>
    </ComponentContainerCard>;
};
const StackingToast = () => {
  const {
    isTrue: isOpenToast1,
    toggle: toggleToast1
  } = useToggle();
  const {
    isTrue: isOpenToast2,
    toggle: toggleToast2
  } = useToggle();
  return <ComponentContainerCard id="default_buttons" title="Default Buttons" description={<>
          {' '}
          Toasts are as flexible as you need and have very little required markup. At a minimum, we require a single element to contain your “toasted”
          content and strongly encourage a dismiss button.
        </>}>
      <Button type="button" className="me-1" variant="primary" onClick={toggleToast1}>
        Show live toast
      </Button>
      <Button type="button" variant="primary" onClick={toggleToast2}>
        Show live toast
      </Button>
      <ToastContainer className="position-fixed end-0 top-0 p-3">
        <Toast autohide show={isOpenToast1} onClose={toggleToast1} id="liveToast" role="alert" aria-live="assertive" aria-atomic="true">
          <ToastHeader closeButton>
            <div className="auth-logo me-auto">
              <Image className="logo-dark" src={logoDark} alt="logo-dark" height={18} />
              <Image className="logo-light" src={logoLight} alt="logo-light" height={18} />
            </div>
            <small className="text-muted">just now</small>
          </ToastHeader>
          <ToastBody className="toast-body">See? Just like this.</ToastBody>
        </Toast>
        <Toast autohide delay={2000} show={isOpenToast2} onClose={toggleToast2} id="liveToast2" role="alert" aria-live="assertive" aria-atomic="true">
          <ToastHeader closeButton>
            <div className="auth-logo me-auto">
              <Image className="logo-dark" src={logoDark} alt="logo-dark" height={18} />
              <Image className="logo-light" src={logoLight} alt="logo-light" height={18} />
            </div>
            <small className="text-muted">2 seconds ago</small>
          </ToastHeader>
          <ToastBody>Heads up, toasts will stack automatically</ToastBody>
        </Toast>
      </ToastContainer>
    </ComponentContainerCard>;
};
const CustomToast = () => {
  const {
    isTrue: isOpenCustom1,
    setFalse: hideCustom1
  } = useToggle(true);
  const {
    isTrue: isOpenCustom2,
    setFalse: hideCustom2
  } = useToggle(true);
  const {
    isTrue: isOpenCustom3,
    setFalse: hideCustom3
  } = useToggle(true);
  const {
    isTrue: isOpenCustom4,
    setFalse: hideCustom4
  } = useToggle(true);
  return <ComponentContainerCard id="custom_content" title="Custom Content" description={<> Alternatively, you can also add additional controls and components to toasts.</>}>
      <Row>
        <Col md={6}>
          <Toast className="align-items-center mb-3 fade" show={isOpenCustom1} onClose={hideCustom1} delay={3000} autohide>
            <div className="d-flex">
              <ToastBody>Hello, world! This is a toast message.</ToastBody>
              <Button variant="" onClick={hideCustom1} className="btn-close me-2 m-auto" />
            </div>
          </Toast>
        </Col>
        <Col md={6}>
          <Toast className="align-items-center text-white bg-primary mb-3" show={isOpenCustom2} onClose={hideCustom2} delay={6000} autohide>
            <div className="d-flex">
              <ToastBody>Hello, world! This is a toast message.</ToastBody>
              <Button variant="" onClick={hideCustom2} className="btn-close btn-close-white me-2 m-auto" />
            </div>
          </Toast>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Toast className="mb-3 mb-md-0 fade" show={isOpenCustom3} onClose={hideCustom3} delay={8000} autohide>
            <ToastBody>
              Hello, world! This is a toast message.
              <div className="mt-2 pt-2 border-top d-flex flex-wrap gap-1">
                <Button variant="primary" size="sm">
                  Take action
                </Button>
                <Button variant="secondary" size="sm" onClick={hideCustom3}>
                  Close
                </Button>
              </div>
            </ToastBody>
          </Toast>
        </Col>
        <Col md={6}>
          <Toast className="text-bg-primary fade" show={isOpenCustom4} onClose={hideCustom4} delay={10000} autohide>
            <ToastBody className="text-white">
              Hello, world! This is a toast message.
              <div className="mt-2 pt-2 border-top d-flex flex-wrap gap-1">
                <Button variant="light" className="btn-sm">
                  Take action
                </Button>
                <Button variant="secondary" className="btn-sm" onClick={hideCustom4}>
                  Close
                </Button>
              </div>
            </ToastBody>
          </Toast>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const TranslucentToast = () => {
  const {
    isTrue: isOpenTranslucent,
    toggle: hideTranslucent
  } = useToggle(true);
  return <ComponentContainerCard id="pranscluentPlacement" title="Transcluent" description={<>
          Toasts are slightly translucent, too, so they blend over whatever they might appear over. For browsers that support the backdrop-filter CSS
          property, we’ll also attempt to blur the elements under a toast.
        </>}>
      <div className="p-3 bg-light">
        <Toast onClose={hideTranslucent} autohide delay={8000} show={isOpenTranslucent} className="fade" role="alert">
          <ToastHeader closeButton>
            <div className="auth-logo me-auto">
              <Image className="logo-dark" src={logoDark} alt="logo-dark" height={18} />
              <Image className="logo-light" src={logoLight} alt="logo-light" height={18} />
            </div>
            <div className="float-end">
              <small>11 mins ago</small>
            </div>
          </ToastHeader>
          <ToastBody>Hello, world! This is a toast message.</ToastBody>
        </Toast>
      </div>
    </ComponentContainerCard>;
};
const PlacementToast = () => {
  const [position, setPosition] = useState('top-start');
  return <ComponentContainerCard id="placement" title="Placement" description={<>
          Place toasts with custom CSS as you need them. The top right is often used for notifications, as is the top middle. If you’re only ever
          going to show one toast at a time, put the positioning styles right on the <code>.toast.</code>
        </>}>
      <div aria-live="polite" aria-atomic="true" className="bg-light position-relative" style={{
      minHeight: 350
    }}>
        <ToastContainer position={position} className="position-absolute p-3" id="toastPlacement">
          <Toast className="mb-2">
            <ToastHeader closeButton>
              <div className="auth-logo me-auto">
                <Image className="logo-dark" src={logoDark} alt="logo-dark" height={18} />
                <Image className="logo-light" src={logoLight} alt="logo-light" height={18} />
              </div>
              <div className="float-end">
                <small>11 mins ago</small>
              </div>
            </ToastHeader>
            <ToastBody>Hello, world! This is a toast message.</ToastBody>
          </Toast>
        </ToastContainer>
      </div>
      <Form>
        <div className="mt-3">
          <label htmlFor="selectToastPlacement" className="form-label">
            Toast placement
          </label>
          <ReactSelect className="mt-2" onChange={e => setPosition(e?.value)} options={[{
          value: 'top-start',
          label: 'Top Start'
        }, {
          value: 'top-center',
          label: 'Top Center'
        }, {
          value: 'top-end',
          label: 'Top End'
        }, {
          value: 'middle-start',
          label: 'Middle Start'
        }, {
          value: 'middle-center',
          label: 'Middle Center'
        }, {
          value: 'middle-end',
          label: 'Middle End'
        }, {
          value: 'bottom-start',
          label: 'Bottom Start'
        }, {
          value: 'bottom-center',
          label: 'Bottom Center'
        }, {
          value: 'bottom-end',
          label: 'Bottom End'
        }]}></ReactSelect>
        </div>
      </Form>
    </ComponentContainerCard>;
};
const AllToasts = () => {
  return <>
      <BasicToast />
      <LiveExample />
      <StackingToast />
      <CustomToast />
      <TranslucentToast />
      <PlacementToast />
    </>;
};
export default AllToasts;