import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import UIExamplesList from '@/components/UIExamplesList';
import small2 from '@/assets/images/small/img-2.jpg';
import small3 from '@/assets/images/small/img-3.jpg';
import avatar2 from '@/assets/images/users/avatar-2.jpg';
import avatar3 from '@/assets/images/users/avatar-3.jpg';
import avatar4 from '@/assets/images/users/avatar-4.jpg';
import avatar5 from '@/assets/images/users/avatar-5.jpg';
import avatar6 from '@/assets/images/users/avatar-6.jpg';
import avatar7 from '@/assets/images/users/avatar-7.jpg';
import avatar8 from '@/assets/images/users/avatar-8.jpg';
import avatar9 from '@/assets/images/users/avatar-9.jpg';
import PageTitle from '@/components/PageTitle';
const BasicExample = () => {
  return <ComponentContainerCard descriptionClass="font-14 mb-3" id="basic-example" title="Basic Example" description={<>
          Create and group avatars of different sizes and shapes with the css classes. Using Bootstrap&apos;s naming convention, you can control size
          of avatar including standard avatar, or scale it up to different sizes.
        </>}>
      <Row>
        <Col md={3}>
          <Image src={avatar2} alt="image" className="img-fluid avatar-xs rounded" />
          <p>
            <code>.avatar-xs</code>
          </p>
          <Image src={avatar3} alt="image" className="img-fluid avatar-sm rounded mt-2" />
          <p className="mb-2 mb-sm-0">
            <code>.avatar-sm</code>
          </p>
        </Col>
        <Col md={3}>
          <Image src={avatar4} alt="image" className="img-fluid avatar-md rounded" />
          <p>
            <code>.avatar-md</code>
          </p>
        </Col>
        <Col md={3}>
          <Image src={avatar5} alt="image" className="img-fluid avatar-lg rounded" />
          <p>
            <code>.avatar-lg</code>
          </p>
        </Col>
        <Col md={3}>
          <Image src={avatar6} alt="image" className="img-fluid avatar-xl rounded" />
          <p className="mb-0">
            <code>.avatar-xl</code>
          </p>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const RoundedCircleAvatars = () => {
  return <ComponentContainerCard descriptionClass="font-14 mb-3" id="rounded-circle" title="Rounded Circle" description={<>
          {' '}
          Using an additional class <code>.rounded-circle</code> in <code>&lt;img&gt;</code> element creates the rounded avatar.
        </>}>
      <Row>
        <Col md={4}>
          <Image src={avatar7} alt="image" className="img-fluid avatar-md rounded-circle" />
          <p className="mt-1">
            <code>.avatar-md .rounded-circle</code>
          </p>
        </Col>
        <Col md={4}>
          <Image src={avatar8} alt="image" className="img-fluid avatar-lg rounded-circle" />
          <p>
            <code>.avatar-lg .rounded-circle</code>
          </p>
        </Col>
        <Col md={4}>
          <Image src={avatar9} alt="image" className="img-fluid avatar-xl rounded-circle" />
          <p className="mb-0">
            <code>.avatar-xl .rounded-circle</code>
          </p>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const ImagesShapes = () => {
  return <ComponentContainerCard descriptionClass="font-14 mb-3" id="images-shapes" title="Images Shapes" description={<>Avatars with different sizes and shapes.</>}>
      <div className="d-flex flex-wrap gap-3 align-items-end">
        <div>
          <Image src={small2} alt="image" className="img-fluid rounded" width={200} />
          <p className="mb-0">
            <code>.rounded</code>
          </p>
        </div>
        <div>
          <Image src={avatar5} alt="image" className="img-fluid rounded" width={120} />
          <p className="mb-0">
            <code>.rounded</code>
          </p>
        </div>
        <div>
          <Image src={avatar7} alt="image" className="img-fluid rounded-circle" width={120} />
          <p className="mb-0">
            <code>.rounded-circle</code>
          </p>
        </div>
        <div>
          <Image src={small3} alt="image" className="img-fluid img-thumbnail" width={200} />
          <p className="mb-0">
            <code>.img-thumbnail</code>
          </p>
        </div>
        <div>
          <Image src={avatar8} alt="image" className="img-fluid rounded-circle img-thumbnail" width={120} />
          <p className="mb-0">
            <code>.rounded-circle .img-thumbnail</code>
          </p>
        </div>
      </div>
    </ComponentContainerCard>;
};
export const metadata = {
  title: 'Avatars'
};
const page = () => {
  return <>
      <PageTitle subName="UI" title="Avatar" />
      <Row>
        <Col xl={9}>
          <BasicExample />
          <RoundedCircleAvatars />
          <ImagesShapes />
        </Col>
        <Col xl={3}>
          <UIExamplesList examples={[{
          link: '#basic-example',
          label: 'Basic Example'
        }, {
          link: '#rounded-circle',
          label: 'Rounded Circle'
        }, {
          link: '#images-shapes',
          label: 'Images Shapes'
        }]} />
        </Col>
      </Row>
    </>;
};
export default page;