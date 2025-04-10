import { Col, Row } from 'react-bootstrap';
import IconifyIcon from './wrappers/IconifyIcon';
import Link from 'next/link';
const PageTitle = ({
  title,
  subName
}) => {
  return <Row>
      <Col xs={12}>
        <div className="page-title-box">
          <h4 className="mb-0 fw-semibold">{title}</h4>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link href="">{subName}</Link>
            </li>{' '}
            &nbsp;
            <IconifyIcon width={22} height={21} icon="ri:arrow-drop-right-line" />
            &nbsp;
            <li className="breadcrumb-item active">{title}</li>
          </ol>
        </div>
      </Col>
    </Row>;
};
export default PageTitle;