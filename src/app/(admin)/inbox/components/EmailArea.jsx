import avatar1 from '@/assets/images/users/avatar-1.jpg';
import avatar3 from '@/assets/images/users/avatar-3.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { useEmailContext } from '@/context/useEmailContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button, CardFooter, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { emailBodyFileData, emailBodyImageData } from '../data';
const EmailHeader = () => {
  const {
    composeEmail
  } = useEmailContext();
  return <CardHeader className="border-bottom bg-light-subtle d-flex align-items-center justify-content-between gap-2">
      <button onClick={composeEmail.toggle} className="btn btn-sm btn-icon btn-soft-primary d-xl-none d-flex align-items-center px-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <IconifyIcon icon="ri:menu-line" className="fs-18" />
      </button>
      <form className="app-search d-none d-md-block w-50 me-auto">
        <div className="position-relative">
          <input type="search" className="form-control" placeholder="Search In Mails" autoComplete="off" />
          <IconifyIcon icon="solar:magnifer-broken" className="search-widget-icon" />
        </div>
      </form>
      <div>
        <ul className="list-inline d-flex gap-1 mb-0 align-items-center">
          <li className="list-inline-item">
            <a data-bs-toggle="offcanvas" href="#user-profile" className="btn btn-light avatar-sm d-flex align-items-center justify-content-center text-warning fs-20">
              <span>
                {' '}
                <IconifyIcon icon="solar:star-bold-duotone" />
              </span>
            </a>
          </li>
          <Dropdown className="list-inline-item d-none d-md-flex">
            <DropdownToggle as={'a'} className="btn btn-light avatar-sm d-flex align-items-center justify-content-center fs-20 arrow-none text-dark fs-20" data-bs-toggle="dropdown" aria-expanded="false">
              <span>
                {' '}
                <IconifyIcon icon="ri:more-2-fill" />{' '}
              </span>
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
          <li className="list-inline-item">
            <Button variant="primary" className="d-flex align-items-center gap-1">
              <IconifyIcon icon="solar:stopwatch-play-broken" className="fs-18" />
              Snoozed
            </Button>
          </li>
        </ul>
      </div>
      <button className="btn btn-sm btn-icon btn-soft-primary d-xl-none d-flex align-items-center px-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#emaillist" aria-controls="emaillist">
        <IconifyIcon icon="ri:menu-unfold-line" className="fs-18" />
      </button>
    </CardHeader>;
};
const EmailBody = () => {
  return <SimplebarReactClient className="card-body" style={{
    height: 'calc(100vh - 442px)'
  }}>
      <div className="d-flex flex-column h-100">
        <div className="d-block">
          <div className="d-flex rounded gap-2">
            <div className="position-relative ">
              <Image src={avatar3} alt="avatar" className="avatar rounded-circle flex-shrink-0" />
            </div>
            <div className="d-block flex-grow-1">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div>
                  <Link href="" className="text-dark fw-medium fs-15">
                    diannablair46skl@dayrep.com
                  </Link>
                  <p className="mb-0 text-muted d-flex align-items-center gap-1">to hello@dundermuffilin.com</p>
                </div>
                <div>
                  <p className="text-muted fs-13 mb-0">Mon , 1 Apr , 23.12</p>
                </div>
              </div>
              <div className="mt-4">
                <h4>Documentation of last meeting</h4>
                <p className="text-dark mt-3">
                  Hey : <span className="badge bg-primary-subtle fs-13 text-primary p-1">@Gaston Lapierre</span>
                </p>
                <p>
                  Thank you all for your hard work and dedication to this project. Your contributions are invaluable, and I am confident that together
                  we will achieve our goals successfully. After reviewing the current progress and considering various factors, I would like to share
                  some observations and next steps.
                </p>
                <p>
                  Additionally, I would like to remind everyone of our upcoming team meeting scheduled for this week. During this meeting, we will
                  discuss the revised timeline in detail and address any concerns or questions you may have ...
                </p>
                <div className="my-4 bg-light rounded p-2">
                  <Row className="g-2">
                    {emailBodyImageData.map((img, idx) => <Col lg={3} key={idx}>
                        <Link href="">
                          <Image src={img.image} alt="small" className="img-fluid rounded" />
                        </Link>
                      </Col>)}
                  </Row>
                  <div className="d-flex align-items-center gap-2 mt-3">
                    <Image src={avatar3} alt="avatar" className="avatar-sm rounded-circle" />
                    <Link href="" className="text-dark fw-medium">
                      Dianna Blair
                    </Link>
                    <p className="mb-0">attached 4 photos</p>
                    <div className="ms-auto">
                      <Link href="" className="text-muted d-flex align-items-center gap-1">
                        See Photo <IconifyIcon icon="solar:eye-bold" className="align-middle" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="my-4">
                  <Row className="align-items-center text-center g-2">
                    {emailBodyFileData.map((file, idx) => <Col lg={2} key={idx}>
                        <div className="border p-2 rounded bg-light-subtle">
                          <IconifyIcon icon={file.icon} className={`fs-28 text-${file.variant}`} />
                          <p className="mb-0">
                            <Link href="" className="text-dark fw-medium">
                              {file.title}
                            </Link>
                          </p>
                        </div>
                      </Col>)}
                    <Col lg={4}>
                      <Link href="" className="link-primary fw-medium d-flex align-items-center gap-1">
                        Download All File <IconifyIcon icon="solar:download-bold" />
                      </Link>
                    </Col>
                  </Row>
                </div>
                <div className="mt-4">
                  <p>We&apos;d like to thank you for being an exceptional author and encourage you to continue creating great work!</p>
                  <p className="mb-1 mt-3">Best Regards ,</p>
                  <p className="mb-0 text-dark fw-medium">Dianna Blair</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimplebarReactClient>;
};
const EmailArea = () => {
  return <div className="position-relative">
      <EmailHeader />
      <EmailBody />
      <CardFooter className="bg-light-subtle border-top w-100">
        <div className="d-flex gap-2">
          <Image src={avatar1} alt="avatar" className="avatar rounded-circle" />
          <div className="w-100">
            <p className="mb-2">
              <span className="text-dark fw-medium">To : </span>diannablair46skl@dayrep.com
            </p>
            <textarea className="form-control" id="property-address" rows={3} placeholder="Type Message...." defaultValue={''} />
            <div className="d-flex flex-wrap justify-content-between mt-2 align-items-center">
              <div className="d-flex gap-3">
                <form>
                  <label htmlFor="file" className="text-dark fs-18 fw-medium">
                    <IconifyIcon icon="solar:folder-with-files-broken" />
                  </label>
                  <input type="file" id="file" className="d-none" />
                </form>
                <form>
                  <label htmlFor="photo" className="text-dark fs-18 fw-medium">
                    <IconifyIcon icon="solar:album-broken" />
                  </label>
                  <input type="file" id="photo" className="d-none" />
                </form>
                <Link href="" className="text-dark fs-18 fw-medium">
                  <IconifyIcon icon="solar:pen-broken" />
                </Link>
                <Link href="" className="text-dark fs-18 fw-medium">
                  <IconifyIcon icon="solar:link-broken" />
                </Link>
                <Link href="" className="text-dark fs-18 fw-medium">
                  <IconifyIcon icon="solar:trash-bin-2-broken" />
                </Link>
              </div>
              <div>
                <Button variant="primary">Send</Button>&nbsp;
                <Button variant="outline-secondary">Forward</Button>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </div>;
};
export default EmailArea;