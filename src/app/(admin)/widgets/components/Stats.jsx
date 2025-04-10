import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { stateData } from '../data';
const StatsCard = ({
  stat
}) => {
  const {
    amount,
    change,
    changeColor,
    badgeIcon,
    icon,
    iconColor,
    title
  } = stat;
  return <Card>
      <CardBody className="overflow-hidden position-relative">
        <IconifyIcon icon={icon} className={`fs-36 text-${iconColor}`} />
        <h3 className="mb-0 fw-bold mt-3 mb-1">${amount}k</h3>
        <p className="text-muted">{title}</p>
        <span className={`badge fs-12 badge-soft-${changeColor}`}>
          <IconifyIcon icon="ti:arrow-badge-up" />
          {change}%
        </span>
        <IconifyIcon icon={badgeIcon} className="widget-icon" />
      </CardBody>
    </Card>;
};
const Stats = () => {
  return <>
      <Row>
        {stateData.map((stat, idx) => <Col key={idx}>
            <StatsCard stat={stat} />
          </Col>)}
      </Row>
    </>;
};
export default Stats;