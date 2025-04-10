'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Card, CardBody, Col } from 'react-bootstrap';
import { postData } from '../data';
import Link from 'next/link';
const PostCard = ({
  date,
  description,
  link,
  name,
  tags,
  title
}) => {
  return <Card>
      <CardBody className="p-2">
        <div className="ratio ratio-16x9">
          <iframe src={link} className="rounded" />
        </div>
        <span className="text-dark d-inline-block my-2">
          <Link href="" className="text-dark fs-18 fw-medium">
            {title}
          </Link>
          &nbsp;
          {tags.map((item, idx) => <span className={`badge px-2 py-1 bg-${item == 'Tutorials' ? 'success' : item == 'News' ? 'warning' : item == 'Homes' ? 'primary' : 'danger'}-subtle text-${item == 'Tutorials' ? 'success' : item == 'News' ? 'warning' : item == 'Homes' ? 'primary' : 'danger'} ms-1 `} key={idx}>
              {item}
            </span>)}
        </span>
        <p className="text-muted">{description}</p>
        <div className="d-flex align-items-center gap-1">
          <div className="d-block flex-grow-1">
            <span className="text-dark">
              <Link href="" className="text-dark fw-medium">
                {name}
              </Link>
            </span>
            <p className="text-muted mb-0">
              <Icon icon="ti:calendar-due" />
              {date.toLocaleString('en-us', {
              month: 'short',
              day: '2-digit',
              year: 'numeric'
            })}
            </p>
          </div>
          <div className="ms-auto">
            <span>
              <button type="button" className="btn btn-soft-danger avatar-sm d-inline-flex align-items-center justify-content-center fs-20 rounded-circle">
                <span>
                  {' '}
                  <IconifyIcon icon="solar:heart-broken" />
                </span>
              </button>
            </span>
          </div>
        </div>
      </CardBody>
    </Card>;
};
const Posts = () => {
  return <>
      {postData.map((item, idx) => <Col xl={3} lg={6} key={idx}>
          <PostCard {...item} />
        </Col>)}
    </>;
};
export default Posts;