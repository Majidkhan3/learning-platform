import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getAllUsers } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import Image from 'next/image';
import Link from 'next/link';
import { CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
const InboxMail = () => {
  const inboxUser = useFetchData(getAllUsers);
  return <div className="offcanvas-xl offcanvas-end" tabIndex={-1} id="emaillist" aria-labelledby="emaillistLabel">
      <div className="border-start border-light border-end h-100">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <button type="button" className="btn p-0 d-lg-none d-flex" data-bs-dismiss="offcanvas" data-bs-target="#emaillist" aria-label="Close">
              <IconifyIcon icon="ri:expand-right-line" className="fs-22" />
            </button>
            <h5 className="mb-0 text-dark d-flex align-items-center gap-1">
              <IconifyIcon icon="solar:inbox-bold-duotone" className="align-middle" /> Inbox Mail
            </h5>
            <Dropdown>
              <DropdownToggle as={'a'} className="arrow-none text-dark" data-bs-toggle="dropdown" aria-expanded="false">
                <IconifyIcon icon="ri:more-2-fill" className="fs-18" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>
                  <IconifyIcon icon="ri:user-line" className="me-2" />
                  View Profile
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="ri:music-2-line" className="me-2" />
                  Media, Links and Docs
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="ri:search-line" className="me-2" />
                  Search
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="ri:image-line" className="me-2" />
                  Wallpaper
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="ri:arrow-right-circle-line" className="me-2" />
                  More
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <form className="app-search d-none d-md-block w-100">
              <div className="position-relative">
                <input type="search" className="form-control" placeholder="Search" autoComplete="off" />
                <IconifyIcon icon="solar:magnifer-broken" className="search-widget-icon" />
              </div>
            </form>
          </div>
        </CardBody>
        <div className="border-top border-light overflow-hidden">
          <SimplebarReactClient style={{
          maxHeight: 'calc(100vh - 301px)'
        }}>
            <ul className="list-unstyled email-list-group mb-0">
              {inboxUser?.map((item, idx) => <li className="email-read-done" key={idx}>
                  <div className="d-flex flex-column h-100 border-bottom">
                    <Link href="" className="d-block">
                      <div className={`mail-select d-flex align-items-center p-3 ${idx == 1 && 'selected'}  m-1 rounded`}>
                        <div className="position-relative">
                          <Image src={item.avatar} alt="avatar" className="avatar rounded-circle flex-shrink-0" />
                        </div>
                        <div className="d-block ms-3 flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <h5 className={`mb-0 ${idx == 1 && 'text-white'}`}>{item.name}</h5>
                            <div>
                              <p className={` fs-13 mb-0 ${idx == 1 ? 'text-white' : 'text-muted'}`}>
                                {item.time.toLocaleString('en-us', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className={`mb-0  d-flex align-items-center gap-1 ${idx == 1 ? 'text-white' : 'text-muted'}`}>{item.emailMessage}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </li>)}
              <li>
                <div className="d-flex justify-content-center my-2">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </li>
            </ul>
          </SimplebarReactClient>
        </div>
      </div>
    </div>;
};
export default InboxMail;