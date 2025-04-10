import { useState } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useChatContext } from '@/context/useChatContext';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardHeader, CardTitle, Offcanvas, OffcanvasHeader, Tab, Tabs } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import Chat from './Chat';
import Contact from './Contact';
import Group from './Group';
import avatar1 from '@/assets/images/users/avatar-1.jpg';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
const ChatLeftSidebar = ({
  users,
  onUserSelect,
  selectedUser
}) => {
  const {
    chatSetting
  } = useChatContext();
  const [user, setUser] = useState([...users]);
  const search = text => {
    setUser(text ? [...users].filter(u => u.name.toLowerCase().indexOf(text.toLowerCase()) >= 0) : [...users]);
  };
  return <Card className="position-relative overflow-hidden">
      <CardHeader className="border-0 d-flex justify-content-between align-items-center gap-3">
        <form className="chat-search pb-0">
          <div className="chat-search-box">
            <input className="form-control" type="text" onKeyUp={e => search(e.target.value)} name="search" placeholder="Search ..." />
            <button type="button" className="btn btn-sm btn-link search-icon p-0 fs-15">
              <IconifyIcon icon="ri:search-eye-line" />
            </button>
          </div>
        </form>
        <a href="#user-setting" onClick={chatSetting.toggle} className="fs-20 icons-center" type="button" data-bs-toggle="offcanvas" aria-haspopup="true" aria-expanded="true">
          <IconifyIcon icon="ri:settings-2-line" />
        </a>
      </CardHeader>
      <CardTitle as={'h4'} className="mb-3 mx-3">
        Active
      </CardTitle>
      <Swiper pagination={{
      el: '.swiper-pagination',
      clickable: true
    }} slidesPerView={'auto'} spaceBetween={8} breakpoints={{
      0: {
        slidesPerView: 4
      },
      1400: {
        slidesPerView: 6
      }
    }} autoHeight className="mySwiper mx-3">
        {users.map(user => <SwiperSlide className="avatar" key={user.id}>
            <div className="chat-user-status-box">
              <span>
                <Image src={user.avatar} alt="avatar-1" className=" avatar rounded-circle  flex-shrink-0" />
              </span>
            </div>
          </SwiperSlide>)}
      </Swiper>
      <CardTitle as={'h4'} className="m-3">
        Message <span className="badge bg-danger badge-pill">5</span>
      </CardTitle>
      <Tabs justify mountOnEnter className="nav nav-pills chat-tab-pills nav-justified p-1 rounded mx-1" defaultActiveKey={'chat-tab'}>
        <Tab title="Chat" eventKey={'chat-tab'}>
          <Chat onUserSelect={onUserSelect} users={user} selectedUser={selectedUser} />
        </Tab>
        <Tab title="Group" eventKey={'group-tab'}>
          <Group />
        </Tab>
        <Tab title="Contact" eventKey={'contact-tab'}>
          <Contact />
        </Tab>
      </Tabs>
      <Offcanvas show={chatSetting.open} placement="start" onHide={chatSetting.toggle} className="offcanvas-start position-absolute shadow" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="user-setting" aria-labelledby="user-settingLabel">
        <OffcanvasHeader closeButton>
          <h5 className="offcanvas-title text-truncate w-50" id="user-settingLabel">
            Profile
          </h5>
        </OffcanvasHeader>
        <div className="offcanvas-body p-0 h-100" data-simplebar>
          <h4 className="page-title p-3 my-0">Setting</h4>
          <div className="d-flex align-items-center px-3 pb-3 border-bottom">
            <Image src={avatar1} className="me-2 rounded-circle" height={36} width={36} alt="avatar-1" />
            <div className="flex-grow-1">
              <div className="float-end">
                <span role="button">
                  <IconifyIcon icon="bx:qr-scan" className="fs-20" />
                </span>
              </div>
              <h5 className="my-0 fs-14">Gaston Lapierre</h5>
              <p className="mt-1 mb-0 text-muted">
                <span className="w-75">Hey there! I am using Reback Chat.</span>
              </p>
            </div>
          </div>
          <div className="px-3 my-3 app-chat-setting">
            <Accordion className="custom-accordion" id="accordionSetting">
              <AccordionItem eventKey="1" className="border-0">
                <AccordionHeader as={'h5'} className="my-0" id="headingAccount">
                  <span className="d-flex align-items-center">
                    <IconifyIcon icon="bx:key" className="me-3 fs-32" />
                    <span className="flex-grow-1">
                      <span className="fs-14 h5 mt-0 mb-1 d-block">Account</span>
                      <span className="mt-1 mb-0 text-muted w-75">Privacy, security, change number</span>
                    </span>
                  </span>
                </AccordionHeader>

                <AccordionBody className="pb-0">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <span role="button">
                        <IconifyIcon icon="bx:lock-alt" className="fs-18 me-2" />
                        Privacy
                      </span>
                    </li>
                    <li className="mb-2">
                      <span role="button">
                        <IconifyIcon icon="bx:check-Reback" className="fs-18 me-2" />
                        Security
                      </span>
                    </li>
                    <li className="mb-2">
                      <span role="button">
                        <IconifyIcon icon="bx:badge-check" className="fs-18 me-2" />
                        Two-step verification
                      </span>
                    </li>
                    <li className="mb-2">
                      <span role="button">
                        <IconifyIcon icon="bx:arrow-from-left" className="fs-18 me-2" />
                        Change number
                      </span>
                    </li>
                    <li className="mb-2">
                      <span role="button">
                        <IconifyIcon icon="bx:info-circle" className="fs-18 me-2" />
                        Request account info
                      </span>
                    </li>
                    <li>
                      <span role="button">
                        <IconifyIcon icon="bx:trash" className="fs-18 me-2" />
                        Delete my account
                      </span>
                    </li>
                  </ul>
                </AccordionBody>
              </AccordionItem>

              <AccordionItem eventKey="2" className="border-0">
                <AccordionHeader as={'h5'} className="my-0" id="headingChats">
                  <span className="d-flex align-items-center">
                    <IconifyIcon icon="bx:message-dots" className="me-3 fs-32" />
                    <span className="flex-grow-1">
                      <span className="fs-14 h5 mt-0 mb-1 d-block">Chats</span>
                      <span className="mt-1 mb-0 text-muted w-75">Theme, wallpapers, chat history</span>
                    </span>
                  </span>
                </AccordionHeader>

                <AccordionBody className="pb-0">
                  <h5 className="mb-2">Display</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex">
                      <IconifyIcon icon="bx:palette" className="fs-18 me-2" />
                      <div className="flex-grow-1">
                        <Link href="">Theme</Link>
                        <p className="mb-0 text-muted fs-12">System default</p>
                      </div>
                    </li>
                    <li className="mb-2">
                      <Link href="">
                        <IconifyIcon icon="bx:image" className="fs-16 me-2" />
                        Wallpaper
                      </Link>
                    </li>
                  </ul>
                  <hr />
                  <h5>Chat Setting</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2 ms-2">
                      <div className="float-end">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="media" defaultChecked />
                        </div>
                      </div>
                      <Link href="">Media Visibility</Link>
                      <p className="mb-0 text-muted fs-12">Show Newly downloaded media in your phone&apos;s gallery</p>
                    </li>
                    <li className="mb-2 ms-2">
                      <div className="float-end">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="enter" />
                        </div>
                      </div>
                      <Link href="">Enter is send</Link>
                      <p className="mb-0 text-muted fs-12">Enter key will send your message</p>
                    </li>
                    <li className="mb-2 ms-2">
                      <Link href="">Font size</Link>
                      <p className="mb-0 text-muted fs-12">small</p>
                    </li>
                  </ul>
                  <hr />
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <div className="d-flex">
                        <IconifyIcon icon="bx:text" className="fs-16 me-2" />
                        <div className="flex-grow-1">
                          <Link href="">App Language</Link>
                          <p className="mb-0 text-muted fs-12">English</p>
                        </div>
                      </div>
                    </li>
                    <li className="mb-2">
                      <span role="button">
                        <IconifyIcon icon="bx:cloud-upload" className="fs-16 me-2" />
                        Chat Backup
                      </span>
                    </li>
                    <li>
                      <span role="button">
                        <IconifyIcon icon="bx:history" className="fs-16 me-2" />
                        Chat History
                      </span>
                    </li>
                  </ul>
                </AccordionBody>
              </AccordionItem>

              <AccordionItem eventKey="3" className="border-0">
                <AccordionHeader as={'h5'} className="my-0" id="headingNotification">
                  <span className="d-flex align-items-center">
                    <IconifyIcon icon="bx:bell" className="me-3 fs-32" />
                    <span className="flex-grow-1">
                      <span className="fs-14 h5 mt-0 mb-1 d-block">Notification</span>
                      <span className="mt-1 mb-0 text-muted w-75">Message, group, call tones</span>
                    </span>
                  </span>
                </AccordionHeader>
                <AccordionBody className="pb-0">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <div className="float-end">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="conversation" defaultChecked />
                        </div>
                      </div>
                      <Link href="">Conversation Tones</Link>
                      <p className="mb-0 text-muted fs-12">Play sound for incoming and outgoing message.</p>
                    </li>
                  </ul>
                  <hr />
                  <h5>Messages</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <Link href="">Notification Tone</Link>
                      <p className="mb-0 text-muted fs-12">Default ringtone</p>
                    </li>
                    <li className="mb-2">
                      <Link href="">Vibrate</Link>
                      <p className="mb-0 text-muted fs-12">Default</p>
                    </li>
                    <li className="mb-2">
                      <Link href="">Light</Link>
                      <p className="mb-0 text-muted fs-12">White</p>
                    </li>
                  </ul>
                  <hr />
                  <h5>Groups</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <Link href="">Notification Tone</Link>
                      <p className="mb-0 text-muted fs-12">Default ringtone</p>
                    </li>
                    <li className="mb-2">
                      <Link href="">Vibrate</Link>
                      <p className="mb-0 text-muted fs-12">Off</p>
                    </li>
                    <li className="mb-2">
                      <Link href="">Light</Link>
                      <p className="mb-0 text-muted fs-12">Dark</p>
                    </li>
                  </ul>
                  <hr />
                  <h5>Calls</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <Link href="">Ringtone</Link>
                      <p className="mb-0 text-muted fs-12">Default ringtone</p>
                    </li>
                    <li>
                      <Link href="">Vibrate</Link>
                      <p className="mb-0 text-muted fs-12">Default</p>
                    </li>
                  </ul>
                </AccordionBody>
              </AccordionItem>

              <AccordionItem eventKey="4" className="border-0">
                <AccordionHeader as={'h5'} className="my-0" id="headingStorage">
                  <span className="d-flex align-items-center">
                    <IconifyIcon icon="bx:history" className="me-3 fs-32" />
                    <span className="flex-grow-1">
                      <span className="fs-14 h5 mt-0 mb-1 d-block">Storage and data</span>
                      <span className="mt-1 mb-0 text-muted w-75">Network usage, auto download</span>
                    </span>
                  </span>
                </AccordionHeader>

                <AccordionBody className="pb-0">
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex">
                      <IconifyIcon icon="bx:folder" className="fs-16 me-2" />
                      <div className="flex-grow-1">
                        <Link href="">Manage storage</Link>
                        <p className="mb-0 text-muted fs-12">2.4 GB</p>
                      </div>
                    </li>
                  </ul>
                  <hr />
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex">
                      <IconifyIcon icon="bx:wifi" className="fs-16 me-2" />
                      <div className="flex-grow-1">
                        <Link href="">Network usage</Link>
                        <p className="mb-0 text-muted fs-12">7.2 GB sent - 13.8 GB received</p>
                      </div>
                    </li>
                  </ul>
                  <hr />
                  <h5 className="mb-0">Media auto-download</h5>
                  <p className="mb-0 text-muted fs-12">Voice message are always automatically downloaded</p>
                  <ul className="list-unstyled mb-0 mt-2">
                    <li className="mb-2">
                      <Link href="">When using mobile data</Link>
                      <p className="mb-0 text-muted fs-12">No media</p>
                    </li>
                    <li className="mb-2 ms-2">
                      <Link href="">When connected on wi-fi</Link>
                      <p className="mb-0 text-muted fs-12">No media</p>
                    </li>
                    <li className="mb-2 ms-2">
                      <Link href="">When roaming</Link>
                      <p className="mb-0 text-muted fs-12">No media</p>
                    </li>
                  </ul>
                  <hr />
                  <h5 className="mb-0">Media upload quality</h5>
                  <p className="mb-0 text-muted fs-12">Choose the quality of media files to be sent</p>
                  <ul className="list-unstyled mb-0 mt-2">
                    <li className="ms-2">
                      <Link href="">Photo upload quality</Link>
                      <p className="mb-0 text-muted fs-12">Auto (recommended)</p>
                    </li>
                  </ul>
                </AccordionBody>
              </AccordionItem>

              <AccordionItem eventKey="5" className="border-0">
                <AccordionHeader as={'h5'} className="my-0" id="headingHelp">
                  <span className="d-flex align-items-center">
                    <IconifyIcon icon="bx:info-circle" className="me-3 fs-32" />
                    <span className="flex-grow-1">
                      <span className="fs-14 h5 mt-0 mb-1 d-block">Help</span>
                      <span className="mt-1 mb-0 text-muted w-75">Help center, contact us, privacy policy</span>
                    </span>
                  </span>
                </AccordionHeader>

                <AccordionBody className="pb-0">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <div role="button">
                        <IconifyIcon icon="bx:info-circle" className="fs-16 me-2" />
                        Help center
                      </div>
                    </li>
                    <li className="mb-2 d-flex">
                      <IconifyIcon icon="bxs:contact" className="fs-16 me-2" />
                      <div className="flex-grow-1">
                        <Link href="">Contact us</Link>
                        <p className="mb-0 text-muted fs-12">Questions?</p>
                      </div>
                    </li>
                    <li className="mb-2">
                      <span role="button">
                        <IconifyIcon icon="bx:book-content" className="fs-16 me-2" />
                        Teams and Privacy Policy
                      </span>
                    </li>
                    <li>
                      <span role="button">
                        <IconifyIcon icon="bx:book-circle" className="fs-16 me-2" />
                        App info
                      </span>
                    </li>
                  </ul>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Offcanvas>
    </Card>;
};
export default ChatLeftSidebar;