import { Card, CardBody, CardHeader, CardTitle, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getAllFriends } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
const FriendsRequest = async () => {
  const friends = await getAllFriends();
  return <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle>Friends Request (10)</CardTitle>
      </CardHeader>
      <CardBody className="p-0 pb-3">
        <SimplebarReactClient className="p-3" style={{
        maxHeight: 400
      }}>
          {friends && friends.map((friend, idx) => <div className={`d-flex align-items-center ${friends.length - 1 === idx ? '' : 'mb-3'}`} key={idx}>
                <div className="flex-shrink-0">
                  <Image src={friend.avatar} className="img-fluid avatar-sm rounded me-2" alt="avatar-5" />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 fs-14">
                    <Link href="">{friend.name}</Link>
                  </h5>
                  <p className="mb-0">{friend.mutualCount} mutual friends</p>
                </div>
                <Dropdown>
                  <DropdownToggle as={'a'} role="button" className="arrow-none text-dark">
                    <IconifyIcon icon="bx:dots-vertical-rounded" className="fs-18" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem>
                      <IconifyIcon icon="bxs:user-detail" className="me-1" />
                      See Profile
                    </DropdownItem>
                    <DropdownItem>
                      <IconifyIcon icon="bxl:telegram" className="me-1" />
                      Message to {friend.name}
                    </DropdownItem>
                    <DropdownItem>
                      <IconifyIcon icon="bx:user-x" className="me-1" />
                      Unfriend {friend.name}
                    </DropdownItem>
                    <DropdownItem>
                      <IconifyIcon icon="bx:block" className="me-1" />
                      Block {friend.name}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>)}
        </SimplebarReactClient>
      </CardBody>
    </Card>;
};
export default FriendsRequest;