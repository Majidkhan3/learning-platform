import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getAllTasks } from '@/helpers/data';
import clsx from 'clsx';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
const Tasks = async () => {
  const allTasks = await getAllTasks();
  return <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle>My Tasks</CardTitle>
        <div>
          <Button variant="primary" size="sm">
            <span className="icons-center">
              <IconifyIcon icon="bx:plus" className="me-1" />
              Create Task
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardBody className="p-0 pb-3">
        <SimplebarReactClient className="p-3" style={{
        maxHeight: 386
      }}>
          {allTasks.map((task, idx) => <div className={clsx('form-check form-todo ps-4', {
          'py-1 my-2': idx != 0
        })} key={idx}>
              <input type="checkbox" className="form-check-input rounded-circle mt-0 fs-18" id={`customCheck${idx}`} defaultChecked={task.status === 'Completed' ? true : false} />
              <label className="form-check-label" htmlFor={`customCheck${idx}`}>
                {task.task}
              </label>
            </div>)}
        </SimplebarReactClient>
      </CardBody>
    </Card>;
};
export default Tasks;