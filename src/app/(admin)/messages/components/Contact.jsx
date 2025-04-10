import Link from 'next/link';
import { useEffect, useState } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getAllUsers } from '@/helpers/data';
import Image from 'next/image';
const Contact = () => {
  const [allContacts, setAllContacts] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const fetchedContacts = await getAllUsers();
      setAllContacts(fetchedContacts);
    };
    fetchData();
  }, []);
  return <SimplebarReactClient className="px-2 mb-3 chat-setting-height">
      <div className="d-flex flex-column h-100  border-bottom">
        <Link href="" className="d-block">
          <div className="d-flex align-items-center justify-content-between bg-light bg-opacity-75 p-2 mb-1 rounded">
            <div className="position-relative">
              <div className="avatar flex-shrink-0">
                <span className="avatar-title bg-primary text-white fs-4 rounded-circle">
                  <IconifyIcon icon="ri:user-add-line" />
                </span>
              </div>
            </div>
            <div className="d-block ms-3 flex-grow-1">
              <h5 className="mb-0 fw-medium">Add New Contact</h5>
            </div>
            <IconifyIcon icon="solar:qr-code-bold-duotone" className="fs-20 text-primary" />
          </div>
        </Link>
      </div>

      {allContacts?.map((contact, idx) => <div className={`d-flex flex-column h-100 ${allContacts.length - 1 != idx && 'border-bottom'} `} key={idx}>
          <Link href="" className="d-block">
            <div className="d-flex align-items-center p-2 mb-1 rounded">
              <div className="position-relative">
                <Image src={contact.avatar} alt="avatar" className="avatar rounded-circle flex-shrink-0" />
              </div>
              <div className="d-block ms-3 flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h5 className="mb-0">{contact.name}</h5>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 text-muted d-flex align-items-center gap-1">Are we going to have th...</p>
                </div>
              </div>
            </div>
          </Link>
        </div>)}
    </SimplebarReactClient>;
};
export default Contact;