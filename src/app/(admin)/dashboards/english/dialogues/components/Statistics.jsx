import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, Col } from 'react-bootstrap';
import { statData } from '../data';
const StatCard = ({
  amount,
  icon,
  title,
  change,
  variant
}) => {
  return <Card>
      <CardBody>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="mb-2 fs-15 fw-medium">
              {title} &nbsp;{' '}
              {change && <span className="badge text-success bg-success-subtle fs-11 icons-center">
                  <IconifyIcon width={11} height={11} icon="ri:arrow-up-line" />
                  {change}%
                </span>}{' '}
            </p>
            <h3 className="text-dark fw-bold d-flex align-items-center gap-2 mb-0">{amount}</h3>
          </div>
          <div>
            <div className={`avatar-md bg-${variant} bg-opacity-10 rounded flex-centered`}>
              <IconifyIcon icon={icon} width={32} height={32} className={`text-${variant}`} />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>;
};
const Statistics = () => {
  return <>
      {statData.map((item, idx) => <Col md={6} xl={3} key={idx}>
          <StatCard {...item} />
        </Col>)}
    </>;
};
export default Statistics;