'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { useEmailContext } from '@/context/useEmailContext';
import { getAllUsers, getEmailsCategoryCount } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import useToggle from '@/hooks/useToggle';
import useViewPort from '@/hooks/useViewPort';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, CardBody, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, Offcanvas } from 'react-bootstrap';
const NavBar = () => {
  const inboxUser = useFetchData(getAllUsers);
  const {
    activeLabel,
    changeActiveLabel
  } = useEmailContext();
  const [emailsCount, setEmailsCount] = useState({
    inbox: 0,
    starred: 0,
    draft: 0,
    sent: 0,
    deleted: 0,
    important: 0
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmailsCategoryCount();
      if (data) setEmailsCount(data);
    };
    fetchData();
  }, []);
  const {
    isTrue,
    toggle: toggleCollapse
  } = useToggle();
  const {
    isTrue: compaseTrue,
    toggle: toggleCompase
  } = useToggle();
  const {
    isTrue: isOpenContact,
    toggle: toggleContact
  } = useToggle();
  return <>
      <div>
        <div className="bg-body-secondary card-body d-flex justify-content-between gap-1">
          <button type="button" onClick={toggleCompase} className="btn btn-danger w-100 d-flex align-items-center  justify-content-center" data-bs-toggle="modal" data-bs-target="#compose-modal">
            <span className="fw-semibold">
              <IconifyIcon icon="solar:pen-new-square-broken" className="align-middle me-1 fs-16" />
              Compose
            </span>
          </button>
          <button type="button" className="btn btn-icon btn-soft-danger d-xl-none" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasExample" aria-label="Close">
            <IconifyIcon icon="ri:close-line" className="fs-22" />
          </button>
        </div>
      </div>
      <Modal size="lg" className="fade compose-mail" show={compaseTrue} onHide={toggleCompase}>
        <ModalHeader className="overflow-hidden bg-primary p-2">
          <h5 className="modal-title text-white" id="compose-modalLabel">
            New Message
          </h5>
          <button type="button" className="btn-close btn-close-white" onClick={toggleCompase} data-bs-dismiss="modal" aria-label="Close" />
        </ModalHeader>
        <ModalBody className="p-4">
          <div className="overflow-hidden">
            <div className="mb-2">
              <input type="email" className="form-control" id="toEmail" placeholder="To: " />
            </div>
            <div className="mb-2">
              <input type="text" className="form-control" id="subject" placeholder="Subject " />
            </div>
            <div className="my-2">
              <div id="snow-editor2" style={{
              height: 200
            }} />
            </div>
            <div className="d-flex float-end">
              <Dropdown className="me-1">
                <DropdownToggle className="arrow-none btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                  <IconifyIcon icon="ri:more-2-fill" className="fs-18" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-up">
                  <DropdownItem>Default to full screen</DropdownItem>
                  <div className="dropdown-divider" />
                  <DropdownItem>Label</DropdownItem>
                  <DropdownItem>Palin text mode</DropdownItem>
                  <div className="dropdown-divider" />
                  <DropdownItem>Smart Compose Feedback</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Button variant="light" className="compose-close">
                <IconifyIcon icon="ri:delete-bin-line" className="fs-18" />
              </Button>
            </div>
            <div>
              <Button variant="primary">Send</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <SimplebarReactClient style={{
      height: 'calc(100vh - 280px)'
    }}>
        <CardBody className="pt-0">
          <div className="email-menu-list d-flex flex-column gap-2">
            <Link href="" className="active" onClick={() => changeActiveLabel('Primary')}>
              <IconifyIcon icon="solar:inbox-broken" className="me-2 fs-18 text-muted" />
              <span>Your Inbox</span>
              <span className="fs-12 text-primary ms-auto">5</span>
            </Link>
            <Link href="">
              <IconifyIcon icon="solar:bookmark-broken" className="me-2 fs-18 text-muted" />
              <span>Important</span>
            </Link>
            <Link href="">
              <IconifyIcon icon="solar:stopwatch-play-broken" className="me-2 fs-18 text-muted" />
              <span>Snoozed</span>
            </Link>
            <Link href="">
              <IconifyIcon icon="solar:pen-2-broken" className="me-2 fs-18 text-muted" />
              <span>Draft</span>
              <span className="fs-12 text-muted ms-auto">8</span>
            </Link>
            <Link href="">
              <IconifyIcon icon="solar:file-send-broken" className="me-2 fs-18 text-muted" />
              <span>Sent</span>
            </Link>
            <Link href="">
              <IconifyIcon icon="solar:bag-3-broken" className="me-2 fs-18 text-muted" />
              <span>Promotions</span>
              <span className="fs-12 text-muted ms-auto">3</span>
            </Link>
            <Link href="">
              <IconifyIcon icon="solar:bell-bing-broken" className="me-2 fs-18 text-muted" />
              <span>Update</span>
              <span className="fs-12 text-muted ms-auto">14</span>
            </Link>
            <Link href="">
              <span>
                <IconifyIcon icon="ri:arrow-down-s-line" /> More
              </span>
            </Link>
          </div>
        </CardBody>
        <CardBody className="border-top border-light">
          <span onClick={toggleCollapse} className="btn-link d-flex align-items-center text-dark fw-semibold  mb-0" data-bs-toggle="collapse" data-bs-target="#labels" aria-expanded="false" aria-controls="labels">
            Labels <IconifyIcon icon="ri:arrow-down-s-line" className="ms-auto" />
          </span>
          <Collapse in={isTrue}>
            <div>
              <div className="email-menu-list d-flex flex-column gap-2 mt-2">
                <Link href="">
                  <IconifyIcon icon="solar:camera-square-bold" className="me-2 fs-18 text-success" />
                  <span>Collaboration</span>
                </Link>
                <Link href="">
                  <IconifyIcon icon="solar:camera-square-bold" className="me-2 fs-18 text-warning" />
                  <span>New Client</span>
                </Link>
                <Link href="">
                  <IconifyIcon icon="solar:camera-square-bold" className="me-2 fs-18 text-info" />
                  <span>Wedding</span>
                </Link>
              </div>
            </div>
          </Collapse>
        </CardBody>
        <CardBody className="border-top border-light">
          <Link href="" onClick={toggleContact} className="btn-link d-flex align-items-center text-dark fw-semibold  mb-0" data-bs-toggle="collapse" data-bs-target="#contacts" aria-expanded="false" aria-controls="contacts">
            Contacts <IconifyIcon icon="ri:arrow-down-s-line" className="ms-auto" />
          </Link>
          <Collapse in={isOpenContact}>
            <div>
              <div className="email-menu-list d-flex flex-column gap-1 mt-2">
                {inboxUser?.slice(0, 4).map((user, idx) => <Link href="" key={idx}>
                    <div className="d-flex align-items-center gap-2">
                      <Image src={user.avatar} alt="avatar" className="avatar-sm rounded-circle" />
                      <p className="mb-0">{user.name}</p>
                    </div>
                  </Link>)}
              </div>
            </div>
          </Collapse>
        </CardBody>
      </SimplebarReactClient>
    </>;
};
const EmailNavigationMenu = () => {
  const {
    composeEmail
  } = useEmailContext();
  const {
    width
  } = useViewPort();
  const {
    navigationBar: {
      open,
      toggle
    }
  } = useEmailContext();
  return width > 1400 ? <NavBar /> : <Offcanvas show={composeEmail.open} onHide={composeEmail.toggle} placement="start" className="offcanvas-xl">
      <NavBar />
    </Offcanvas>;
};
export default EmailNavigationMenu;