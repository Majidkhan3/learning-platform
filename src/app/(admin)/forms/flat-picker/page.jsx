import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import CustomFlatpickr from '@/components/CustomFlatpickr';
import UIExamplesList from '@/components/UIExamplesList';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Flatpicker'
};
const FlatPicker = () => {
  return <>
      <PageTitle title="Flatpicker" subName="Form" />
      <Row>
        <Col xl={9}>
          <Card>
            <CardBody>
              <CardTitle as={'h5'} className="mb-1 anchor" id="overview">
                Overview
                <a className="btn btn-sm btn-outline-success rounded-2 float-end" href="https://www.npmjs.com/package/react-flatpickr" target="_blank">
                  Official Website
                </a>
              </CardTitle>
              <p className="text-muted mb-3">flatpickr is a lightweight and powerful datetime picker.</p>
            </CardBody>
          </Card>
          <ComponentContainerCard id="basic" title="Basic" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="Basic datepicker" options={{
                enableTime: false
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>

          <ComponentContainerCard id="datetime" title="DateTime" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="Date and Time" options={{
                enableTime: true,
                dateFormat: 'Y-m-d H:i'
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>

          <ComponentContainerCard id="human-friendly-dates" title="Human-friendly Dates" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="October 9,2018" options={{
                altInput: true,
                enableTime: false,
                altFormat: 'F j, Y',
                dateFormat: 'Y-m-d'
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>

          <ComponentContainerCard id="minmax" title="MinDate and MaxDate" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="mindate - maxdate" options={{
                enableTime: false,
                minDate: '2020-01-01',
                maxDate: '2020-03-05'
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>

          <ComponentContainerCard id="disable" title="Disabling dates" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="Disabling dates" options={{
                disable: ['2025-01-10', '2025-01-21', '2025-01-30'],
                enableTime: false,
                defaultDate: '2025-01'
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>

          <ComponentContainerCard id="multiple" title="Selecting multiple dates" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="Multiple dates" options={{
                enableTime: false,
                mode: 'multiple',
                dateFormat: 'Y-m-d'
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>

          <ComponentContainerCard id="conjunction" title="Selecting multiple dates - Conjunction" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="2018-10-10 :: 2018-10-11" options={{
                mode: 'multiple',
                dateFormat: 'Y-m-d',
                conjunction: ' :: ',
                enableTime: false
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>

          <ComponentContainerCard id="range-calendar" title="Range Calendar" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="2018-10-03 to 2018-10-10" options={{
                mode: 'range',
                enableTime: false
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>

          <ComponentContainerCard id="inline-calendar" title="Inline Calendar" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="Inline Calender" options={{
                inline: true,
                enableTime: false
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>

          <ComponentContainerCard id="timepicker-basic" title="Basic Timepicker" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="Basic timepicker" options={{
                noCalendar: true,
                dateFormat: 'H:i'
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>

          <ComponentContainerCard id="24hours" title="24-hour Time Picker" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="16:21" options={{
                noCalendar: true,
                dateFormat: 'H:i',
                time_24hr: true
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>

          <ComponentContainerCard id="timepicker-minmax" title="Time Picker w/ Limits" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="Limits" options={{
                noCalendar: true,
                dateFormat: 'H:i',
                minTime: '16:00',
                maxTime: '22:30'
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>

          <ComponentContainerCard id="preloading-time" title="Preloading Time" titleClass="mb-3">
            <Row>
              <Col lg={6}>
                <CustomFlatpickr className="form-control" placeholder="01:45" options={{
                noCalendar: true,
                enableTime: true,
                dateFormat: 'H:i',
                defaultDate: '13:45'
              }} />
              </Col>
            </Row>
          </ComponentContainerCard>
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#overview',
          label: 'Overview'
        }, {
          link: '#basic',
          label: 'Basic'
        }, {
          link: '#datetime',
          label: 'DateTime'
        }, {
          link: '#human-friendly-dates',
          label: 'Human-friendly Dates'
        }, {
          link: '#minmax',
          label: 'MinDate and MaxDate'
        }, {
          link: '#disable',
          label: 'Disabling dates'
        }, {
          link: '#multiple',
          label: 'Selecting multiple dates'
        }, {
          link: '#conjunction',
          label: 'Selecting multiple dates - Conjunction'
        }, {
          link: '#range-calendar',
          label: 'Range Calendar'
        }, {
          link: '#inline-calendar',
          label: 'Inline Calendar'
        }, {
          link: '#timepicker-basic',
          label: 'Basic Timepicker'
        }, {
          link: '#24hours',
          label: '24-hour Time Picker'
        }, {
          link: '#timepicker-minmax',
          label: 'Time Picker w/ Limits'
        }, {
          link: '#preloading-time',
          label: 'Preloading Time'
        }]} />
        </Col>
      </Row>
    </>;
};
export default FlatPicker;