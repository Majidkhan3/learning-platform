import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Button, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import ChoicesFormInput from '@/components/from/ChoicesFormInput';
import PageTitle from '@/components/PageTitle';
import UIExamplesList from '@/components/UIExamplesList';
export const metadata = {
  title: 'Form Select'
};
const BasicExample = () => {
  return <ComponentContainerCard id="basic" title="Basic Example" titleClass="mb-3">
      <Row>
        <Col lg={6}>
          <ChoicesFormInput>
            <option>This is a placeholder</option>
            <option value="Choice 1">Choice 1</option>
            <option value="Choice 2">Choice 2</option>
            <option value="Choice 3">Choice 3</option>
          </ChoicesFormInput>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const OptionGroups = () => {
  return <ComponentContainerCard id="options-group" title="Option Groups Example" titleClass="mb-3">
      <Row>
        <Col lg={6}>
          <ChoicesFormInput>
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
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const OptionWithNoSearch = () => {
  return <ComponentContainerCard id="options-add-no-search" title="Options added via config with no search" titleClass="mb-3">
      <Row>
        <Col lg={6}>
          <ChoicesFormInput options={{
          removeItemButton: true,
          searchEnabled: false
        }}>
            <option value="Zero">Zero</option>
            <option value="One">One</option>
            <option value="Two">Two</option>
            <option value="Three">Three</option>
            <option value="Four">Four</option>
            <option value="Five">Five</option>
            <option value="Six">Six</option>
          </ChoicesFormInput>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const OptionWithNoSorting = () => {
  return <ComponentContainerCard id="options-add-no-sorting" title=" Options added via config with no sorting" titleClass="mb-3">
      <Row>
        <Col lg={6}>
          <ChoicesFormInput options={{
          shouldSort: false
        }}>
            <option value="Madrid">Madrid</option>
            <option value="Toronto">Toronto</option>
            <option value="Vancouver">Vancouver</option>
            <option value="London">London</option>
            <option value="Manchester">Manchester</option>
            <option value="Liverpool">Liverpool</option>
            <option value="Paris">Paris</option>
            <option value="Malaga">Malaga</option>
            <option value="Washington" disabled>
              Washington
            </option>
            <option value="Lyon">Lyon</option>
            <option value="Marseille">Marseille</option>
            <option value="Hamburg">Hamburg</option>
            <option value="Munich">Munich</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Berlin">Berlin</option>
            <option value="Montreal">Montreal</option>
            <option value="New York">New York</option>
            <option value="Michigan">Michigan</option>
          </ChoicesFormInput>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const MultipleSelect = () => {
  return <ComponentContainerCard id="multiple-select" title="Multiple select input" titleClass="mb-3">
      <Row>
        <Col lg={6}>
          <ChoicesFormInput className="form-control" multiple>
            <option value="Choice 1" defaultChecked>
              Choice 1
            </option>
            <option value="Choice 2">Choice 2</option>
            <option value="Choice 3">Choice 3</option>
            <option value="Choice 4" disabled>
              Choice 4
            </option>
          </ChoicesFormInput>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const MultipleSelectWithRemoveButton = () => {
  return <ComponentContainerCard id="multiple-select-remove" title="Multiple select With remove button input" titleClass="mb-3">
      <Row>
        <Col lg={6}>
          <ChoicesFormInput options={{
          removeItemButton: true
        }} multiple>
            <option value="Choice 1">Choice 1</option>
            <option value="Choice 2">Choice 2</option>
            <option value="Choice 3">Choice 3</option>
            <option value="Choice 4">Choice 4</option>
          </ChoicesFormInput>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const MultipleSelectOptionGroups = () => {
  return <ComponentContainerCard id="multiple-groups" title="Multiple select With Option groups" titleClass="mb-3">
      <Row>
        <Col lg={6}>
          <ChoicesFormInput options={{
          placeholderValue: 'choose a city'
        }} multiple>
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
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const TextInputs = () => {
  return <ComponentContainerCard id="text-input" title="Text Inputs" description={<>
          Set <code>data-choices data-choices-limit=&quot;Required Limit&quot; data-choices-removeItem</code> attribute.
        </>}>
      <Row>
        <Col lg={6}>
          <label htmlFor="choices-text-remove-button" className="form-label text-muted">
            Set limit values with remove button
          </label>
          <ChoicesFormInput options={{
          removeItemButton: true,
          maxItemCount: 3
        }} allowInput className="form-control" data-choices data-choices-limit={3} data-choices-removeitem defaultValue="Task-1" />
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const TextInputsWithUniqueValue = () => {
  return <ComponentContainerCard id="unique-values" title=" Text inputs in Unique values only, no pasting" description={<>
          Set <code>data-choices data-choices-text-unique-true</code> attribute.
        </>}>
      <Row>
        <Col lg={6}>
          <label htmlFor="choices-text-unique-values" className="form-label text-muted">
            Unique values only, no pasting
          </label>
          <ChoicesFormInput options={{
          duplicateItemsAllowed: false,
          paste: false
        }} allowInput className="form-control" id="choices-text-unique-values" data-choices data-choices-text-unique-true defaultValue="Project-A, Project-B" />
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const DisabledInput = () => {
  return <ComponentContainerCard id="disabled-values" title="Disabled Text Inputs" description={<>
          Set <code>data-choices data-choices-text-disabled-true</code> attribute.
        </>}>
      <div className="w-50 mb-3">
        <label htmlFor="choices-text-disabled" className="form-label text-muted">
          Disabled
        </label>
        <input disabled className="form-control" id="choices-text-disabled" data-choices data-choices-text-disabled-true type="text" defaultValue="josh@joshuajohnson.co.uk, joe@bloggs.co.uk" />
      </div>
    </ComponentContainerCard>;
};
const Select = () => {
  return <>
      <PageTitle title="Form Select" subName="Form" />
      <Row>
        <Col xl={9}>
          <Card>
            <CardBody>
              <CardTitle as={'h5'} className="mb-1 anchor" id="overview">
                Overview
                <Button variant="outline-success" size="sm" className="rounded-2 float-end" href="https://github.com/Choices-js/Choices" target="_blank">
                  Official Website
                </Button>
              </CardTitle>
              <p className="text-muted mb-3">
                Choices.js is a A vanilla, lightweight, configurable select box/text input plugin. Similar to Select2 and Selectize but without the
                jQuery dependency.
              </p>
            </CardBody>
          </Card>
          <BasicExample />
          <OptionGroups />
          <OptionWithNoSearch />
          <OptionWithNoSorting />
          <MultipleSelect />
          <MultipleSelectWithRemoveButton />
          <MultipleSelectOptionGroups />
          <TextInputs />
          <TextInputsWithUniqueValue />
          <DisabledInput />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#basic',
          label: 'Basic Example'
        }, {
          link: '#options-group',
          label: 'Option Groups Example'
        }, {
          link: '#options-add-no-search',
          label: 'Options added via config with no search'
        }, {
          link: '#options-add-no-sorting',
          label: 'Options added via config with no sorting'
        }, {
          link: '#multiple-select',
          label: 'Multiple select input'
        }, {
          link: '#multiple-select-remove',
          label: 'Multiple select With remove button input'
        }, {
          link: '#multiple-groups',
          label: 'Multiple select With Option groups'
        }, {
          link: '#text-input',
          label: 'Text inputs'
        }, {
          link: '#unique-values',
          label: 'Text inputs in Unique values only,no pasting'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Select;