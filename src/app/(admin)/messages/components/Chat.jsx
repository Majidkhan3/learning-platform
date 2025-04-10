import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { timeSince } from '@/utils/date';
import Image from 'next/image';
import Link from 'next/link';
const Chat = ({
  onUserSelect,
  users,
  selectedUser
}) => {
  return <SimplebarReactClient className="px-2 mb-3 chat-setting-height">
      {users.map((user, idx) => <div className={`d-flex flex-column h-100 ${users.length - 1 != idx && 'border-bottom'}`} key={idx}>
          <Link href="" className="d-block">
            <div className={`d-flex align-items-center px-2 pb-2 mb-1 ${idx == 0 ? '' : 'p-2'} rounded`} onClick={() => {
          onUserSelect(user);
        }}>
              <div className="position-relative">
                <Image src={user.avatar} alt="avatar" className="avatar rounded-circle flex-shrink-0" />
                <span className="position-absolute bottom-0 end-0  p-1 bg-success border border-light border-2 rounded-circle">
                  <span className="visually-hidden">New alerts</span>
                </span>
              </div>
              <div className="d-block ms-3 flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h5 className="mb-0">{user.name}</h5>
                  <div>
                    <p className="text-muted fs-13 mb-0">{timeSince(new Date(user.time))}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  {selectedUser.activityStatus === 'typing' && selectedUser.id === user.id ? <span className="w-75 text-primary">typing...</span> : <>
                      <p className="mb-0 text-muted d-flex align-items-center gap-1 d-flex align-items-center gap-1">
                        {user.chatIcon && <IconifyIcon icon={user.chatIcon} className="text-warning fs-18" />} {user.message}
                      </p>
                      <div>
                        <IconifyIcon icon="ri:check-double-line" className=" fs-18 text-primary" />
                        {idx == 0 && <IconifyIcon icon="ri:pushpin-2-fill" className=" text-success" />}
                      </div>
                    </>}
                </div>
              </div>
            </div>
          </Link>
        </div>)}
    </SimplebarReactClient>;
};
export default Chat;