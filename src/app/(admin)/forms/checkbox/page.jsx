import { Col, FormCheck, Row } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import UIExamplesList from '@/components/UIExamplesList';
import { colorVariants } from '@/context/constants';
import { toSentenceCase } from '@/utils/change-casing';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Checkboxes'
};
const Checkbox = () => {
  return <ComponentContainerCard id="checkbox-basic" title="Checkbox" description={<>
          {' '}
          Each checkbox and radio <code>&lt;input&gt;</code> and <code>&lt;label&gt;</code> pairing is wrapped in a <code>&lt;div&gt;</code> to create
          our custom control. Structurally, this is the same approach as our default <code>.form-check</code>.
        </>}>
      <FormCheck label="Check this custom checkbox" id="customCheck1" />
      <FormCheck label="Check this custom checkbox" id="customCheck2" />
    </ComponentContainerCard>;
};
const InlineCheckbox = () => {
  return <ComponentContainerCard id="inline-checkbox" title="Inline Checkbox" titleClass="mb-3">
      <FormCheck label="Check this custom checkbox" id="customCheck3" inline />
      <FormCheck label="Check this custom checkbox" id="customCheck4" inline />
    </ComponentContainerCard>;
};
const DisabledCheckbox = () => {
  return <ComponentContainerCard id="disabled-checkbox" title="Disabled Checkbox" titleClass="mb-3">
      <FormCheck defaultChecked label="Check this custom checkbox" id="customCheck4" inline disabled />
      <FormCheck label="Check this custom checkbox" id="customCheck5" inline disabled />
    </ComponentContainerCard>;
};
const ColorsCheckbox = () => {
  return <ComponentContainerCard id="colors-checkbox" title="Colors Checkbox" titleClass="mb-3">
      <div className="mt-2">
        {colorVariants.slice(0, 7).map((color, idx) => <div className={`form-check form-checkbox-${color} ${colorVariants.length - 1 === idx ? '' : 'mb-2'}`} key={idx}>
            <input type="checkbox" className="form-check-input" id={`customCheckColor${idx}`} defaultChecked />
            <label className="form-check-label" htmlFor={`customCheckColor${idx}`}>
              {toSentenceCase(color)} Checkbox
            </label>
          </div>)}
      </div>
    </ComponentContainerCard>;
};
const DefaultRadio = () => {
  return <ComponentContainerCard id="radio-basic" title="Radio" description={<>
          Each Radio <code>&lt;input&gt;</code> and <code>&lt;label&gt;</code> pairing is wrapped in a <code>&lt;div&gt;</code> to create our custom
          control. Structurally,this is the same approach as our default <code>.form-check</code>.
        </>}>
      <FormCheck type="radio" name="radio1" label="Default radio" id="flexRadioDefault1" />
      <FormCheck type="radio" name="radio1" label="Default checked radio" id="flexRadioDefault2" defaultChecked />
    </ComponentContainerCard>;
};
const InlineRadio = () => {
  return <ComponentContainerCard id="inline-radio" title="Inline Radio" titleClass="mb-3">
      <FormCheck type="radio" name="radio2" label="Check this custom radio" id="flexRadioDefault3" inline />
      <FormCheck type="radio" name="radio2" label="Check this custom radio" id="flexRadioDefault4" inline />
    </ComponentContainerCard>;
};
const DisabledRadio = () => {
  return <ComponentContainerCard id="disabled-radio" title="Disabled Radio" titleClass="mb-3">
      <FormCheck type="radio" name="radio3" label="Check this custom radio" id="flexRadioDefault5" inline defaultChecked disabled />
      <FormCheck type="radio" name="radio3" label="Check this custom radio" id="flexRadioDefault6" inline disabled />
    </ComponentContainerCard>;
};
const ColorsRadio = () => {
  return <ComponentContainerCard id="colors-radio" title="Colors Radio" titleClass="mb-3">
      {colorVariants.slice(0, 7).map((color, idx) => <div className={`form-check form-radio-${color} ${colorVariants.length - 1 === idx ? '' : 'mb-2'}`} key={idx}>
          <input type="radio" id={`customRadioColor${idx}`} name={`customRadioColor${idx}`} className="form-check-input" defaultChecked />
          <label className="form-check-label" htmlFor={`customRadioColor${idx}`}>
            {toSentenceCase(color)} Radio
          </label>
        </div>)}
    </ComponentContainerCard>;
};
const Switches = () => {
  return <ComponentContainerCard id="switch-basic" title="Switch" description={<>
          A switch has the markup of a custom checkbox but uses the <code>.form-switch</code> class to render a toggle switch. Switches alsosupport
          the <code>disabled</code> attribute.
        </>}>
      <FormCheck type="switch" label="Default switch checkbox input" id="switch1" />
      <FormCheck type="switch" label="Checked switch checkbox input" id="switch2" defaultChecked />
      <FormCheck type="switch" label="Disabled switch checkbox input" id="switch3" disabled />
      <FormCheck type="switch" label="Disabled checked switch checkbox input" id="switch4" defaultChecked disabled />
    </ComponentContainerCard>;
};
const CheckboxAndRadio = () => {
  return <>
      <PageTitle title="Checkbox & Radio" subName="Form" />
      <Row>
        <Col xl={9}>
          <Checkbox />
          <InlineCheckbox />
          <DisabledCheckbox />
          <ColorsCheckbox />
          <DefaultRadio />
          <InlineRadio />
          <DisabledRadio />
          <ColorsRadio />
          <Switches />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#checkbox-basic',
          label: 'Checkbox'
        }, {
          link: '#inline-checkbox',
          label: 'Inline Checkbox'
        }, {
          link: '#disabled-checkbox',
          label: 'Disabled Checkbox'
        }, {
          link: '#colors-checkbox',
          label: 'Colors Checkbox'
        }, {
          link: '#radio-basic',
          label: 'Radio'
        }, {
          link: '#inline-radio',
          label: 'Inline Radio'
        }, {
          link: '#disabled-radio',
          label: 'Disabled Radio'
        }, {
          link: '#colors-radio',
          label: 'Colors Radio'
        }, {
          link: '#switch-basic',
          label: 'Switch'
        }]} />
        </Col>
      </Row>
    </>;
};
export default CheckboxAndRadio;