'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import PasswordFormInput from '@/components/from/PasswordFormInput';
import TextAreaFormInput from '@/components/from/TextAreaFormInput';
import TextFormInput from '@/components/from/TextFormInput';
import { useForm } from 'react-hook-form';
const BasicExamples = () => {
  const {
    control
  } = useForm();
  return <ComponentContainerCard id="basic" title="Basic Example" description={<>
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.
        </>}>
      <div>
        <TextFormInput name="text" label="Text" control={control} containerClassName="mb-3" />
        <TextFormInput name="email" type="email" label="Email" control={control} placeholder="Email" containerClassName="mb-3" />
        <PasswordFormInput name="password" label="Password" control={control} placeholder="password" containerClassName="mb-3" />
        <div className="mb-3">
          <label htmlFor="example-palaceholder" className="form-label">
            Placeholder
          </label>
          <input type="text" id="example-palaceholder" className="form-control" placeholder="placeholder" />
        </div>
        <TextAreaFormInput name="textarea" label="Text area" control={control} rows={5} />
      </div>
    </ComponentContainerCard>;
};
export default BasicExamples;