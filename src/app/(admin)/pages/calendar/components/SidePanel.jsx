import { Button } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
const SidePanel = ({
  createNewEvent
}) => {
  // external events
  const externalEvents = [{
    id: 1,
    variant: 'primary',
    title: 'Team Building Retreat Meeting'
  }, {
    id: 2,
    variant: 'info',
    title: 'Product Launch Strategy Meeting'
  }, {
    id: 3,
    variant: 'success',
    title: 'Monthly Sales Review'
  }, {
    id: 4,
    variant: 'danger',
    title: 'Team Lunch Celebration'
  }, {
    id: 5,
    variant: 'warning',
    title: 'Marketing Campaign Kickoff'
  }];
  return <>
      <div className="d-grid">
        <Button variant="primary" type="button" onClick={createNewEvent}>
          <IconifyIcon icon="bx:plus" className="fs-18 me-2" />
          &nbsp;Add New Schedule
        </Button>
      </div>
      <div id="external-events">
        <br />
        <p className="text-muted">Drag and drop your event or click in the calendar</p>

        {externalEvents.map(({
        id,
        variant,
        title
      }) => <div key={id} className={`external-event pb-1 bg-soft-${variant} text-${variant}`} title={title} data-class={`bg-${variant}`}>
            <span className="icons-center">
              <IconifyIcon icon="bxs:circle" className="me-2 vertical-middle" />
              {title}
            </span>
          </div>)}
      </div>
    </>;
};
export default SidePanel;