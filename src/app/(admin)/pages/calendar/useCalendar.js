'use client';

import { Draggable } from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { defaultEvents } from './data';
const useCalendar = () => {
  const [show, setShow] = useState(false);
  const onOpenModal = () => setShow(true);
  const [isEditable, setIsEditable] = useState(false);
  const [events, setEvents] = useState([...defaultEvents]);
  const [eventData, setEventData] = useState();
  const [dateInfo, setDateInfo] = useState();
  const onCloseModal = () => {
    setEventData(undefined);
    setDateInfo(undefined);
    setShow(false);
  };
  useEffect(() => {
    // create draggable events
    const draggableEl = document.getElementById('external-events');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.external-event'
      });
    }
  }, []);
  const onDateClick = arg => {
    setDateInfo(arg);
    onOpenModal();
    setIsEditable(false);
  };
  const onEventClick = arg => {
    const event = {
      id: String(arg.event.id),
      title: arg.event.title,
      className: arg.event.classNames[0]
    };
    setEventData(event);
    setIsEditable(true);
    onOpenModal();
  };
  const onDrop = arg => {
    const dropEventData = arg;
    const title = dropEventData.draggedEl.title;
    if (title) {
      const newEvent = {
        id: String(events.length + 1),
        title: title,
        start: dropEventData ? dropEventData.dateStr : new Date(),
        className: dropEventData.draggedEl.dataset.class
      };
      const modifiedEvents = [...events];
      modifiedEvents.push(newEvent);
      setEvents(modifiedEvents);
    }
  };
  const onAddEvent = data => {
    const modifiedEvents = [...events];
    const event = {
      id: String(modifiedEvents.length + 1),
      title: data.title,
      start: Object.keys(dateInfo ?? {}).length !== 0 ? dateInfo?.date : new Date(),
      className: data.category
    };
    modifiedEvents.push(event);
    setEvents(modifiedEvents);
    onCloseModal();
  };
  const onUpdateEvent = data => {
    console.info(data);
    setEvents(events.map(e => {
      if (e.id === eventData?.id) {
        return {
          ...e,
          title: data.title,
          className: data.category
        };
      } else {
        return e;
      }
    }));
    onCloseModal();
    setIsEditable(false);
  };
  const onRemoveEvent = () => {
    const modifiedEvents = [...events];
    const idx = modifiedEvents.findIndex(e => e.id === eventData?.id);
    modifiedEvents.splice(idx, 1);
    setEvents(modifiedEvents);
    onCloseModal();
  };
  const onEventDrop = arg => {
    const modifiedEvents = [...events];
    const idx = modifiedEvents.findIndex(e => e.id === arg.event.id);
    modifiedEvents[idx].title = arg.event.title;
    modifiedEvents[idx].className = arg.event.classNames;
    modifiedEvents[idx].start = arg.event.start;
    modifiedEvents[idx].end = arg.event.end;
    setEvents(modifiedEvents);
    setIsEditable(false);
  };
  const createNewEvent = () => {
    setIsEditable(false);
    onOpenModal();
  };
  return {
    createNewEvent,
    show,
    onDateClick,
    onEventClick,
    onDrop,
    onEventDrop,
    events,
    onCloseModal,
    isEditable,
    eventData,
    onUpdateEvent,
    onRemoveEvent,
    onAddEvent
  };
};
export default useCalendar;