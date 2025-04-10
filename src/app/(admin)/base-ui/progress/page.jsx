import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import UIExamplesList from '@/components/UIExamplesList';
import { Col, ProgressBar, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Progress'
};
const ProgressBarWorks = () => {
  return <ComponentContainerCard id="how-works" title="How it works" description={<>A progress bar can be used to show a user how far along he/she is in a process.</>}>
      <ProgressBar className="mb-2" now={0} />
      <ProgressBar className="mb-2" now={35} />
      <ProgressBar className="mb-2" now={50} />
      <ProgressBar className="mb-2" now={75} />
      <ProgressBar now={25} label="25%" />
    </ComponentContainerCard>;
};
const BackgroundProgressBar = () => {
  return <ComponentContainerCard id="backgrounds-color" title="Backgrounds Color" description={<>Use background utility classes to change the appearance of individual progress bars.</>}>
      <ProgressBar now={25} variant="primary" className="mb-2" />
      <ProgressBar now={50} variant="secondary" className="mb-2" />
      <ProgressBar now={75} variant="success" className="mb-2" />
      <ProgressBar now={100} variant="info" className="mb-2" />
      <ProgressBar>
        <ProgressBar now={15} />
        <ProgressBar now={30} variant="secondary" />
        <ProgressBar now={20} variant="success" />
      </ProgressBar>
    </ComponentContainerCard>;
};
const StripedProgressBar = () => {
  return <ComponentContainerCard id="progress-bar" title="Striped Progress Bar" description={<>
          Add <code>.progress-bar-striped</code> to any <code>.progress-bar</code> to apply a stripe via CSS gradient over the progress bar’s
          background color.
        </>}>
      <ProgressBar now={25} striped className="mb-2" />
      <ProgressBar now={50} striped variant="secondary" className="mb-2" />
      <ProgressBar now={75} striped variant="success" className="mb-2" />
      <ProgressBar now={65} striped variant="info" className="mb-2" />
      <ProgressBar now={100} striped variant="warning" />
    </ComponentContainerCard>;
};
const HeightProgressBar = () => {
  return <ComponentContainerCard id="height" title="Height" description={<>
          {' '}
          We only set a height value on the <code>.progress</code>, so if you change that value the inner <code>.progress-bar</code> will
          automatically resize accordingly. Use <code>.progress-xs</code>, <code>.progress-sm</code>, <code>.progress-md</code>,{' '}
          <code>.progress-lg</code> or <code>.progress-xl</code> classes.
        </>}>
      <ProgressBar now={25} variant="primary" className="mb-2 progress-xs" />
      <ProgressBar now={50} variant="secondary" className="mb-2 progress-sm" />
      <ProgressBar now={75} variant="success" className="mb-2 progress-md" />
      <ProgressBar now={35} variant="info" className="progress-lg mb-2" />
      <ProgressBar now={60} variant="warning" className="progress-xl" />
    </ComponentContainerCard>;
};
const Progress = () => {
  return <>
      <PageTitle subName="UI" title="Progress" />
      <Row>
        <Col xl={9}>
          <ProgressBarWorks />
          <BackgroundProgressBar />
          <StripedProgressBar />
          <HeightProgressBar />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#how-works',
          label: 'How it works'
        }, {
          link: '#backgrounds-color',
          label: 'Backgrounds Color'
        }, {
          link: '#progress-bar',
          label: 'Progress Bar'
        }, {
          link: '#height',
          label: 'Height'
        }]} />
        </Col>
      </Row>
    </>;
};
export default Progress;