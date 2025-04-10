'use client';

import useCountdown from '@/hooks/useCountdown';
import { Col, Row } from 'react-bootstrap';
const Timer = () => {
  const {
    days,
    hours,
    minutes,
    seconds
  } = useCountdown();
  return <Row className="my-5">
      <Col>
        <h3 id="days" className="fw-bold fs-60">
          {days}
        </h3>
        <p className="text-uppercase fw-semibold">Days</p>
      </Col>
      <Col>
        <h3 id="hours" className="fw-bold fs-60">
          {hours}
        </h3>
        <p className="text-uppercase fw-semibold">Hours</p>
      </Col>
      <Col>
        <h3 id="minutes" className="fw-bold fs-60">
          {minutes}
        </h3>
        <p className="text-uppercase fw-semibold">Minutes</p>
      </Col>
      <Col>
        <h3 id="seconds" className="fw-bold fs-60">
          {seconds}
        </h3>
        <p className="text-uppercase fw-semibold">Seconds</p>
      </Col>
    </Row>;
};
export default Timer;