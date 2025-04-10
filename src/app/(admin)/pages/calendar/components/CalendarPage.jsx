'use client';

import { Col } from 'react-bootstrap';
import useCalendar from '../useCalendar';
import AddEditEvent from './AddEditEvent';
import Calendar from './Calendar';
import SidePanel from './SidePanel';
const CalendarPage = () => {
  const {
    createNewEvent,
    eventData,
    events,
    isEditable,
    onAddEvent,
    onCloseModal,
    onDateClick,
    onDrop,
    onEventClick,
    onEventDrop,
    onRemoveEvent,
    onUpdateEvent,
    show
  } = useCalendar();
  return <>
      <Col xl={3}>
        <SidePanel createNewEvent={createNewEvent} />
      </Col>

      <Col xl={9}>
        <Calendar events={events} onDateClick={onDateClick} onDrop={onDrop} onEventClick={onEventClick} onEventDrop={onEventDrop} />
      </Col>

      <AddEditEvent eventData={eventData} isEditable={isEditable} onAddEvent={onAddEvent} onRemoveEvent={onRemoveEvent} onUpdateEvent={onUpdateEvent} open={show} toggle={onCloseModal} />
    </>;
};
export default CalendarPage;