import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import UIExamplesList from '@/components/UIExamplesList';
import { Col, FormControl, FormLabel, FormSelect, Row } from 'react-bootstrap';
import BasicExamples from './components/BasicExamples';
export const metadata = {
  title: 'Form Basics'
};
const InputSizing = () => {
  return <ComponentContainerCard id="size" title="Input Sizing" description={<>
          Set heights using classes like <code>.form-control-lg</code> and <code>.form-control-sm</code>.
        </>}>
      <Row>
        <Col lg={6}>
          <div className="d-flex flex-column gap-2">
            <FormControl size="lg" type="text" placeholder=".form-control-lg" aria-label=".form-control-lg example" />
            <FormControl type="text" placeholder="Default input" aria-label="default input example" />
            <FormControl size="sm" type="text" placeholder=".form-control-sm" aria-label=".form-control-sm example" />
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const DisabledInput = () => {
  return <ComponentContainerCard id="disabled" title="Disabled Input" description={<>
          Add the <code>disabled</code> boolean attribute on an input to give it a grayed out appearance, remove pointer events, and prevent focusing.
        </>}>
      <Row>
        <Col lg={6}>
          <div className="d-flex flex-column gap-2">
            <FormControl type="text" placeholder="Disabled input" aria-label="Disabled input example" disabled />
            <FormControl type="text" defaultValue="Disabled readonly input" aria-label="Disabled input example" disabled readOnly />
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const ReadonlyInput = () => {
  return <ComponentContainerCard id="readonly" title="Readonly Input" description={<>
          Add the <code>readonly</code> boolean attribute on an input to prevent modification of the input’s value. <code>readonly</code> inputs can
          still be focused and selected, while <code>disabled</code> inputs cannot.
          <br />
          <br />
          If you want to have <code>&lt;input readonly&gt;</code> elements in your form styled as plain text, replace <code>.form-control</code> with{' '}
          <code>.form-control-plaintext</code> to remove the default form field styling and preserve the correct <code>margin</code> and{' '}
          <code>padding</code>.
        </>}>
      <Row>
        <Col lg={6}>
          <div className="d-flex flex-column gap-2">
            <FormControl type="text" defaultValue="Readonly input here..." aria-label="readonly input example" readOnly />
            <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue="email@example.com" />
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const DataListsInput = () => {
  return <ComponentContainerCard id="datalists" title="Datalists input" description={<>
          If you want to have <code>&lt;input readonly&gt;</code> elements in your form styled as plain text, replace <code>.form-control</code> with{' '}
          <code>.form-control-plaintext</code> to remove the default form field styling and preserve the correct <code>margin</code> and{' '}
          <code>padding</code>.
        </>}>
      <Row>
        <Col lg={6}>
          <div>
            <label htmlFor="exampleDataList" className="form-label">
              Datalist example
            </label>
            <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
            <datalist id="datalistOptions">
              <option value="San Francisco"></option>
              <option value="New York"></option>
              <option value="Seattle"></option>
              <option value="Los Angeles"></option>
              <option value="Chicago"></option>
            </datalist>
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const SelectInputs = () => {
  return <ComponentContainerCard id="select" title="Select" description={<>
          Custom <code>&lt;select&gt;</code> menus need only a custom class, <code>.form-select</code> to trigger the custom styles. Custom styles are
          limited to the <code>&lt;select&gt;</code>’s initial appearance and cannot modify the <code>&lt;option&gt;</code>s due to browser
          limitations.
        </>}>
      <Row>
        <Col lg={6}>
          <div className="mb-3">
            <FormLabel htmlFor="example-select">Default Input Select</FormLabel>
            <FormSelect id="example-select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </FormSelect>
          </div>
          <p className="text-muted">
            The <code>multiple</code> attribute is also supported:
          </p>
          <div className="mb-3">
            <FormLabel htmlFor="example-multiselect">Multiple Select</FormLabel>
            <select id="example-multiselect" multiple className="form-control">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <p className="text-muted">
            As is the <code>size</code> attribute:
          </p>
          <label htmlFor="example-multiselectsize" className="form-label">
            Multiple Select Size
          </label>
          <select id="example-multiselectsize" className="form-select" size={3} aria-label="size 3 select example">
            <option defaultValue="selected">Open this select menu</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </select>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const BasicElements = () => {
  return <>
      <PageTitle title="Basic Form" subName="Form" />
      <Row>
        <Col xl={9}>
          <BasicExamples />
          <InputSizing />
          <DisabledInput />
          <ReadonlyInput />
          <DataListsInput />
          <SelectInputs />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#basic',
          label: 'Basic Example'
        }, {
          link: '#size',
          label: 'Input Sizing'
        }, {
          link: '#disabled',
          label: 'Disabled Input'
        }, {
          link: '#disabled',
          label: 'Readonly Input'
        }, {
          link: '#datalists',
          label: 'Datalists input'
        }, {
          link: '#select',
          label: 'Select input'
        }]} />
        </Col>
      </Row>
    </>;
};
export default BasicElements;