import small1 from '@/assets/images/small/img-1.jpg';
import small10 from '@/assets/images/small/img-10.jpg';
import small2 from '@/assets/images/small/img-2.jpg';
import small3 from '@/assets/images/small/img-3.jpg';
import small4 from '@/assets/images/small/img-4.jpg';
import small5 from '@/assets/images/small/img-5.jpg';
import small6 from '@/assets/images/small/img-6.jpg';
import small7 from '@/assets/images/small/img-7.jpg';
import small8 from '@/assets/images/small/img-8.jpg';
import small9 from '@/assets/images/small/img-9.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
const PhotoCard = () => {
  const images = [small1, small2, small3, small4, small5, small6, small7, small8, small9, small10, small4, small5];
  return <Card className="mt-4">
      <CardHeader className="d-flex border-bottom border-dashed">
        <CardTitle as={'a'}>Photo And Video</CardTitle>
        <div className="ms-auto">
          <Link href="" className="text-muted fw-semibold">
            See all
          </Link>
        </div>
      </CardHeader>
      <CardBody>
        <Row className="g-0">
          {images.map((item, idx) => <Col lg={4} key={idx}>
              <Link href="" className="d-block m-1">
                <Image src={item} alt="small" className="img-fluid rounded" />
              </Link>
            </Col>)}
        </Row>
      </CardBody>
    </Card>;
};
export default PhotoCard;