import { colorVariants } from '@/context/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import cardImg from '@/assets/images/small/img-1.jpg';
import cardImg2 from '@/assets/images/small/img-2.jpg';
import cardImg3 from '@/assets/images/small/img-3.jpg';
import cardImg4 from '@/assets/images/small/img-4.jpg';
import cardImg5 from '@/assets/images/small/img-5.jpg';
import PageTitle from '@/components/PageTitle';
export const metadata = {
  title: 'Cards'
};
const CardWithImage = () => {
  return <>
      <Card className="mb-3 mb-xl-0">
        <Image className="card-img-top img-fluid" src={cardImg} alt="img-1" />
        <CardBody>
          <CardTitle as={'h5'} className="mb-2">
            Card title
          </CardTitle>
          <p className="card-text text-muted">
            Some quick example text to build on the card title and make up the bulk of the card&apos;s content. With supporting text below as a
            natural lead-in to additional content.
          </p>
          <Link href="" className="btn btn-primary">
            Button
          </Link>
        </CardBody>
      </Card>
    </>;
};
const CardWithImage2 = () => {
  return <Card className="mb-3">
      <Image className="card-img-top img-fluid" src={cardImg2} alt="img-2" />
      <CardBody>
        <CardTitle as={'h5'} className="mb-2">
          Card title
        </CardTitle>
        <p className="card-text text-muted">Some quick example text to build on the card title.</p>
      </CardBody>
      <ul className="list-group list-group-flush text-muted">
        <li className="list-group-item text-muted">Dapibus ac facilisis in</li>
      </ul>
      <CardBody>
        <Link href="" className="card-link text-primary">
          Card link
        </Link>
        <Link href="" className="card-link text-primary">
          Another link
        </Link>
      </CardBody>
    </Card>;
};
const CardWithImage3 = () => {
  return <Card className="mb-3 mb-xl-0">
      <Image className="card-img-top img-fluid" src={cardImg4} alt="img-4" />
      <CardBody>
        <p className="card-text text-muted">
          Some quick example text to build on the card title and make up the bulk of the card&apos;s content. With supporting text below as a natural
          lead-in to additional content.
        </p>
        <Link href="" className="btn btn-primary">
          Button
        </Link>
      </CardBody>
    </Card>;
};
const CardWithTitleAndImage = () => {
  return <Card className="mb-3 mb-xl-0">
      <CardBody>
        <h5 className="card-title mb-0">Card title</h5>
      </CardBody>
      <Image className="img-fluid" src={cardImg5} alt="img-5" />
      <CardBody>
        <p className="card-text text-muted">Some quick example text to build on the card title.</p>
        <Link href="" className="card-link text-primary">
          Card link
        </Link>
        <Link href="" className="card-link text-primary">
          Another link
        </Link>
      </CardBody>
    </Card>;
};
const CardWithSpecialTitle = () => {
  return <Card className="card-body">
      <CardTitle as={'h5'} className="mb-1">
        Special title treatment
      </CardTitle>
      <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <Link href="" className="btn btn-primary">
        Go somewhere
      </Link>
    </Card>;
};
const CardWithHeader = () => {
  return <Card>
      <CardHeader>Featured</CardHeader>
      <CardBody>
        <CardTitle as={'h5'} className="mb-1">
          Special title treatment
        </CardTitle>
        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Link href="" className="btn btn-primary">
          Go somewhere
        </Link>
      </CardBody>
    </Card>;
};
const CardWithHeaderAndQuote = () => {
  return <Card>
      <CardHeader>Quote</CardHeader>
      <CardBody>
        <blockquote>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <footer>
            Someone famous in
            <cite>Source Title</cite>
          </footer>
        </blockquote>
      </CardBody>
    </Card>;
};
const CardWithHeaderAndFooter = () => {
  return <Card>
      <CardHeader>Featured</CardHeader>
      <CardBody>
        <Link href="" className="btn btn-primary">
          Go somewhere
        </Link>
      </CardBody>
      <div className="card-footer text-muted">2 days ago</div>
    </Card>;
};
const ColorCards = () => {
  return <Row>
      <Col md={4}>
        <Card className="text-bg-primary">
          <CardBody>
            <CardTitle as={'h5'} className="text-white mb-2">
              Special title treatment
            </CardTitle>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Button variant="light" size="sm" href="">
              Button
            </Button>
          </CardBody>
        </Card>
      </Col>
      {colorVariants.slice(1, 6).map((color, idx) => <Col md={4} key={idx}>
          <Card className={`bg-${color} text-white`}>
            <CardBody>
              <blockquote>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer>
                  Someone famous in&nbsp;
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </CardBody>
          </Card>
        </Col>)}
    </Row>;
};
const BorderedCards = () => {
  return <Row>
      {colorVariants.slice(0, 3).map((color, idx) => <Col md={4} key={idx}>
          <Card className={`border-${color} border`}>
            <CardBody>
              <CardTitle as={'h5'} className={`text-${color} mb-2`}>
                Special title treatment
              </CardTitle>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <Link href="" className={`btn btn-${color} btn-sm`}>
                Button
              </Link>
            </CardBody>
          </Card>
        </Col>)}
    </Row>;
};
const HorizontalCards = () => {
  return <Row>
      <Col lg={6}>
        <Card>
          <Row className="g-0">
            <Col md={4}>
              <Image src={cardImg} className="img-fluid rounded-start h-100" alt="img-1" />
            </Col>
            <Col md={8}>
              <CardBody>
                <CardTitle as={'h5'} className="mb-2">
                  Card title
                </CardTitle>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </CardBody>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col lg={6}>
        <Card>
          <Row className="g-0">
            <Col md={8}>
              <CardBody>
                <CardTitle as={'h5'} className="mb-2">
                  Card title
                </CardTitle>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </CardBody>
            </Col>
            <Col md={4}>
              <Image src={cardImg2} className="img-fluid rounded-end h-100" alt="img-2" />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>;
};
const CardWithStretchedLink = () => {
  return <>
      <Col md={6} lg={3}>
        <Card>
          <Image src={cardImg} height={205} className="card-img-top" alt="img-1" />
          <CardBody>
            <CardTitle as={'h5'} className="mb-2">
              Card with stretched link
            </CardTitle>
            <Link href="" className="btn btn-primary mt-2 stretched-link">
              Go somewhere
            </Link>
          </CardBody>
        </Card>
      </Col>
      <Col md={6} lg={3}>
        <Card>
          <Image src={cardImg2} height={205} className="card-img-top" alt="img-2" />
          <CardBody>
            <CardTitle as={'h5'} className="mb-2">
              <Link href="" className="text-primary stretched-link">
                Card with stretched link
              </Link>
            </CardTitle>
            <p className="card-text">Some quick example text to build on the card up the bulk of the card&apos;s content.</p>
          </CardBody>
        </Card>
      </Col>
      <Col md={6} lg={3}>
        <Card>
          <Image src={cardImg3} height={205} className="card-img-top" alt="img-3" />
          <CardBody>
            <CardTitle as={'h5'} className="mb-2">
              Card with stretched link
            </CardTitle>
            <Link href="" className="btn btn-primary mt-2 stretched-link">
              Go somewhere
            </Link>
          </CardBody>
        </Card>
      </Col>
      <Col md={6} lg={3}>
        <Card>
          <Image src={cardImg4} height={205} className="card-img-top" alt="img-4" />
          <CardBody>
            <CardTitle as={'h5'} className="mb-2">
              <Link href="" className="stretched-link">
                Card with stretched link
              </Link>
            </CardTitle>
            <p className="card-text">Some quick example text to build on the card up the bulk of the card&apos;s content.</p>
          </CardBody>
        </Card>
      </Col>
    </>;
};
const CardDecks = () => {
  return <Row className="row-cols-1 row-cols-md-3 g-3">
      {[cardImg4, cardImg3, cardImg2].map((image, idx) => <Col key={idx}>
          <Card>
            <Image src={image} className="card-img-top" height={278} alt="img-4" />
            <CardBody>
              <CardTitle as={'h5'} className="mb-2">
                Card title
              </CardTitle>
              <p className="card-text">
                This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </CardBody>
          </Card>
        </Col>)}
    </Row>;
};
const CardWithGroup = ({
  item
}) => {
  return <Card className="d-block">
      <Image className="card-img-top" src={item.image} height={288} alt="img-1" />
      <CardBody>
        <CardTitle as={'h5'} className="mb-2">
          {item.title}
        </CardTitle>
        <p className="card-text">{item.text}</p>
        <p className="card-text">
          <small className="text-muted">{item.subtext}</small>
        </p>
      </CardBody>
    </Card>;
};
const Cards = () => {
  const CardGroupDetails = [{
    id: 1,
    image: cardImg,
    title: 'Card title',
    text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    subtext: 'Last updated 3 mins ago'
  }, {
    id: 2,
    image: cardImg2,
    title: 'Card title',
    text: 'This card has supporting text below as a natural lead-in to additional content.',
    subtext: 'Last updated 3 mins ago'
  }, {
    id: 3,
    image: cardImg3,
    title: 'Card title',
    text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
    subtext: 'Last updated 3 mins ago'
  }];
  return <>
      <PageTitle subName="UI" title="Cards" />
      <Row>
        <Col xl={3} md={6}>
          <CardWithImage />
        </Col>
        <Col xl={3} md={6}>
          <CardWithImage2 />
        </Col>
        <Col xl={3} md={6}>
          <CardWithImage3 />
        </Col>
        <Col xl={3} md={6}>
          <CardWithTitleAndImage />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <CardWithSpecialTitle />
        </Col>
        <Col sm={6}>
          <CardWithSpecialTitle />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <CardWithHeader />
        </Col>
        <Col md={4}>
          <CardWithHeaderAndQuote />
        </Col>
        <Col md={4}>
          <CardWithHeaderAndFooter />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CardTitle as={'h5'} className="mb-3">
            Card Colored
          </CardTitle>
        </Col>
      </Row>
      <ColorCards />
      <Row>
        <Col xs={12}>
          <CardTitle as={'h5'} className="mb-3">
            Card Bordered
          </CardTitle>
        </Col>
      </Row>
      <BorderedCards />
      <Row>
        <Col xs={12}>
          <CardTitle as={'h5'} className="mb-3">
            Horizontal Card
          </CardTitle>
        </Col>
      </Row>
      <HorizontalCards />
      <Row>
        <Col xs={12}>
          <CardTitle as={'h5'} className="mb-3">
            Stretched link
          </CardTitle>
        </Col>
      </Row>
      <Row>
        <CardWithStretchedLink />
      </Row>
      <Row>
        <Col xs={12}>
          <CardTitle as={'h5'} className="mb-3">
            Card Group
          </CardTitle>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="card-group mb-3">
            {CardGroupDetails.map((item, idx) => <CardWithGroup item={item} key={idx} />)}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CardTitle as={'h5'} className="mb-3">
            Card Decks
          </CardTitle>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CardDecks />
        </Col>
      </Row>
    </>;
};
export default Cards;