import IconifyIcon from '@/components/wrappers/IconifyIcon';
import LeftSideBarToggle from './components/LeftSideBarToggle';
import ProfileDropdown from './components/ProfileDropdown';
import ThemeCustomizerToggle from './components/ThemeCustomizerToggle';
import Notifications from './components/Notifications';
import ThemeModeToggle from './components/ThemeModeToggle';
import MaximizeScreen from './components/MaximizeScreen';
import { Container } from 'react-bootstrap';
const page = () => {
  return <header>
      <div className="topbar" >
        <Container fluid>
          <div className="navbar-header">
            <div className="d-flex align-items-center gap-2">
              <LeftSideBarToggle />
              <form className="app-search d-none d-md-block me-auto">
                {/* <div className="position-relative">
                  <input type="search" className="form-control border-0" placeholder="Search..." autoComplete="off" />
                  <IconifyIcon icon="ri:search-line" className=" search-widget-icon" />
                </div> */}
              </form>
            </div>
            <div className="d-flex align-items-center gap-1">
              <ThemeModeToggle />

              <MaximizeScreen />

              {/* <Notifications /> */}

              <ThemeCustomizerToggle />

              <ProfileDropdown />
            </div>
          </div>
        </Container>
      </div>
    </header>;
};
export default page;