import Link from 'next/link';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getJoinedGroups } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
const Group = () => {
  const groupData = useFetchData(getJoinedGroups);
  return <SimplebarReactClient className="px-2 mb-3 chat-setting-height">
      <div className="d-flex flex-column h-100  border-bottom">
        <Link href="" className="d-block">
          <div className="d-flex align-items-center bg-light bg-opacity-75 p-2 mb-1 rounded">
            <div className="position-relative">
              <div className="avatar flex-shrink-0">
                <span className="avatar-title bg-primary text-white fs-4 rounded-circle">
                  <IconifyIcon icon="ri:group-line" />
                </span>
              </div>
            </div>
            <div className="d-block ms-3 flex-grow-1">
              <h5 className="mb-0 fw-medium">Create New Group</h5>
            </div>
          </div>
        </Link>
      </div>
      {groupData?.map((group, idx) => <div className={`d-flex flex-column h-100 ${groupData.length - 1 != idx && 'border-bottom'}`} key={idx}>
          <Link href="" className="d-block">
            <div className="d-flex align-items-center p-2 mb-1 rounded">
              <div className="position-relative">
                <div className="avatar flex-shrink-0">
                  <span className={`avatar-title bg-${group.variant}-subtle text-${group.variant} fw-medium fs-4 rounded-circle`}>
                    {group.groupName.slice(0, 1)}
                  </span>
                </div>
                <span className="position-absolute bottom-0 end-0  p-1 bg-success border border-light border-2 rounded-circle">
                  <span className="visually-hidden">New alerts</span>
                </span>
              </div>
              <div className="d-block ms-3 flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h5 className="mb-0">{group.groupName}</h5>
                  <div>
                    <p className="text-muted fs-13 mb-0">{group.time.toLocaleString('en-us', {
                    hour: '2-digit',
                    minute: 'numeric'
                  })}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 text-muted d-flex align-items-center gap-1">
                    <span className="fw-medium text-primary">{group.name} :</span>
                    {group.description}
                  </p>
                  {group.change ? <span className="badge bg-danger badge-pill">{group.change}</span> : <IconifyIcon icon="ri:check-double-line" className="fs-18 text-primary" />}
                </div>
              </div>
            </div>
          </Link>
        </div>)}
    </SimplebarReactClient>;
};
export default Group;