import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import { commentsData } from '../data';
import Link from 'next/link';
const Comments = () => {
  return <>
      {commentsData.map((item, idx) => <div className={`ps-0  ${idx == 1 ? 'pt-4' : 'pt-3'}  ${idx == 0 && 'border-top mt-3'}`} key={idx}>
          <div className="d-sm-flex align-items-top">
            <div className="position-relative">
              <Image src={item.image} alt="avatar" className="avatar rounded-circle flex-shrink-0" />
            </div>
            <div className="flex-grow-1 ms-sm-3">
              <span>
                <Link href="" className="text-dark fw-medium">
                  {item.name}
                </Link>
              </span>
              <p className="text-muted mb-2">
                {item.date.toLocaleString('en-us', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            })}
              </p>
              <p className="text-muted">{item.description}</p>
              <div className="d-flex gap-3 fs-16">
                <Link href="" className="d-flex align-items-center text-dark">
                  <IconifyIcon icon="solar:like-bold-duotone" className="me-1" /> {item.like}
                </Link>
                <Link href="" className="d-flex align-items-center text-dark">
                  <IconifyIcon icon="solar:chat-square-call-bold" className="me-1" />
                  {item.comment}
                </Link>
              </div>
              {item.reply && item.reply.map((reply, idx) => <div className="d-sm-flex align-items-top mt-4 " key={idx}>
                    <div className="position-relative">
                      <Image src={reply.image} alt="avatar" className="avatar rounded-circle flex-shrink-0" />
                    </div>
                    <div className="flex-grow-1 ms-sm-3">
                      <span>
                        <Link href="" className="text-dark fw-medium">
                          {reply.name}
                        </Link>
                      </span>
                      <p className="text-muted mb-2">
                        {reply.date.toLocaleString('en-us', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })}
                      </p>
                      <p className="text-muted">{reply.description}</p>
                      <div className="d-flex gap-3 fs-16">
                        <Link href="" className="d-flex align-items-center text-dark">
                          <IconifyIcon icon="solar:like-bold-duotone" className="me-1" /> {reply.like}
                        </Link>
                        <Link href="" className="d-flex align-items-center text-dark">
                          <IconifyIcon icon="solar:chat-square-call-bold" className="me-1" /> {reply.comment}
                        </Link>
                      </div>
                    </div>
                  </div>)}
            </div>
            <Link href="" data-bs-toggle="tooltip" data-bs-title="Comment" data-bs-placement="top">
              <div className="avatar-sm flex-shrink-0 mt-2 ">
                <span className="avatar-title bg-light text-dark fs-4 rounded border border-dashed">
                  <IconifyIcon icon="solar:chat-square-bold-duotone" />
                </span>
              </div>
            </Link>
          </div>
        </div>)}
    </>;
};
export default Comments;