'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import { kebabToTitleCase } from '@/utils/change-casing';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const toastify = ({
  props,
  message
}) => {
  toast(message, {
    ...props,
    hideProgressBar: true,
    theme: 'colored',
    icon: false
  });
};
const BasicToastifyExamples = () => {
  return <ComponentContainerCard id="basic" title="Basic Toastify JS Example" titleClass="mb-3">
      <div className="hstack flex-wrap gap-2">
        <Button variant="light" type="button" onClick={() => toastify({
        message: 'Welcome Back! This is a Toast Notification',
        props: {
          type: 'info',
          position: 'top-right'
        }
      })} className=" w-xs">
          Default
        </Button>
        <Button variant="light" type="button" onClick={() => toastify({
        message: 'Your application was successfully sent',
        props: {
          type: 'success',
          position: 'top-center',
          closeButton: false
        }
      })} className=" w-xs">
          Success
        </Button>
        <Button variant="light" type="button" onClick={() => toastify({
        message: 'Warning ! Something went wrong try again',
        props: {
          type: 'warning',
          position: 'top-center',
          closeButton: false
        }
      })} className=" w-xs">
          Warning
        </Button>
        <Button variant="light" type="button" onClick={() => toastify({
        message: 'Error ! An error occurred.',
        props: {
          type: 'error',
          position: 'top-center',
          closeButton: false
        }
      })} className=" w-xs">
          Error
        </Button>
      </div>
    </ComponentContainerCard>;
};
const ToastPositions = () => {
  const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
  return <ComponentContainerCard id="display_position" title="Display Position Example" titleClass="mb-3">
      <div className="hstack flex-wrap gap-2">
        {positions.map((position, idx) => <Button variant="light" type="button" key={idx} onClick={() => toastify({
        message: 'Welcome Back! This is a Toast Notification',
        props: {
          type: 'success',
          position: position
        }
      })} className="w-xs">
            {kebabToTitleCase(position)}
          </Button>)}
      </div>
    </ComponentContainerCard>;
};
const DurationExample = () => {
  return <ComponentContainerCard id="rater" title="Offset,Hide Close Button & Duration Example" titleClass="mb-3">
      <div className="d-flex align-items-center flex-wrap gap-2">
        <Button type="button" variant="light" className="w-xs" onClick={() => toastify({
        message: 'Welcome Back! This is a Toast Notification',
        props: {
          type: 'success',
          position: 'top-right',
          closeButton: false
        }
      })}>
          Hide Close icon
        </Button>
        <Button type="button" variant="light" className="w-xs" onClick={() => toastify({
        message: 'Toast Duration 5s',
        props: {
          type: 'success',
          position: 'top-right',
          closeButton: false,
          autoClose: 5000
        }
      })}>
          Duration
        </Button>
      </div>
    </ComponentContainerCard>;
};
const AllToastify = () => {
  return <>
      <BasicToastifyExamples />
      <ToastPositions />
      <DurationExample />
    </>;
};
export default AllToastify;