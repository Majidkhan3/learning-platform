import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Link from 'next/link';
import { Card, CardBody } from 'react-bootstrap';
export const metadata = {
  title: 'Box Icons'
};
const BoxIcons = () => {
  return <>
      <PageTitle title="Boxicons" subName="Icons" />
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:child" className="fs-2" />
            <h5 className="mt-2 mb-0">Child</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxs:balloon" className="fs-2" />
            <h5 className="mt-2 mb-0">Balloon</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxs:coffee-bean" className="fs-2" />
            <h5 className="mt-2 mb-0">Coffee Bean</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:sushi" className="fs-2" />
            <h5 className="mt-2 mb-0">Sushi</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:shower" className="fs-2" />
            <h5 className="mt-2 mb-0">Shower</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:typescript" className="fs-2" />
            <h5 className="mt-2 mb-0">Typescript</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:graphql" className="fs-2" />
            <h5 className="mt-2 mb-0">Graphql</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:rfid" className="fs-2" />
            <h5 className="mt-2 mb-0">Rfid</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:universal-access" className="fs-2" />
            <h5 className="mt-2 mb-0">Universal</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxs:castle" className="fs-2" />
            <h5 className="mt-2 mb-0">Castle</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:shield-minus" className="fs-2" />
            <h5 className="mt-2 mb-0">Shield Minus</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:shield-plus" className="fs-2" />
            <h5 className="mt-2 mb-0">Shield Plus</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:objects-vertical-bottom" className="fs-2" />
            <h5 className="mt-2 mb-0">ObjectsVertical</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:vertical-top" className="fs-2" />
            <h5 className="mt-2 mb-0">Vertical Top</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:color" className="fs-2" />
            <h5 className="mt-2 mb-0">Color</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:horizontal-left" className="fs-2" />
            <h5 className="mt-2 mb-0">HorizontalLeft</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:reflect-vertical" className="fs-2" />
            <h5 className="mt-2 mb-0">ReflectVertical</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:postgresql" className="fs-2" />
            <h5 className="mt-2 mb-0">Postgresql</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:mongodb" className="fs-2" />
            <h5 className="mt-2 mb-0">Mongodb</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:deezer" className="fs-2" />
            <h5 className="mt-2 mb-0">Deezer</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:xing" className="fs-2" />
            <h5 className="mt-2 mb-0">Xing</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:cart-add" className="fs-2" />
            <h5 className="mt-2 mb-0">Cart Add</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:cart-download" className="fs-2" />
            <h5 className="mt-2 mb-0">CartDownload</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:no-signal" className="fs-2" />
            <h5 className="mt-2 mb-0">No Signal</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:signal-5" className="fs-2" />
            <h5 className="mt-2 mb-0">Signal 5</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:cheese" className="fs-2" />
            <h5 className="mt-2 mb-0">Cheese</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:hard-hat" className="fs-2" />
            <h5 className="mt-2 mb-0">Hard Hat</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:home-alt-2" className="fs-2" />
            <h5 className="mt-2 mb-0">Home Alt 2</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:meta" className="fs-2" />
            <h5 className="mt-2 mb-0">Meta</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxs:lemon" className="fs-2" />
            <h5 className="mt-2 mb-0">Lemon</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxs:cable-car" className="fs-2" />
            <h5 className="mt-2 mb-0">Cable Car </h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:cricket-ball" className="fs-2" />
            <h5 className="mt-2 mb-0">Cricket Ball</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxs:tree-alt" className="fs-2" />
            <h5 className="mt-2 mb-0">Tree Alt</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:male-female" className="fs-2" />
            <h5 className="mt-2 mb-0">Male Female</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxs:invader" className="fs-2" />
            <h5 className="mt-2 mb-0">Invader</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:baguette" className="fs-2" />
            <h5 className="mt-2 mb-0">Baguette</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:fork" className="fs-2" />
            <h5 className="mt-2 mb-0">Fork</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:knife" className="fs-2" />
            <h5 className="mt-2 mb-0">Knife</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:circle-half" className="fs-2" />
            <h5 className="mt-2 mb-0">Circle Half</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:circle-three-quarter" className="fs-2" />
            <h5 className="mt-2 mb-0">Circle Quarter</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxs:bowl-rice" className="fs-2" />
            <h5 className="mt-2 mb-0">Bowl Rice</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxs:bowl-hot" className="fs-2" />
            <h5 className="mt-2 mb-0">Bowl Hot</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:popsicle" className="fs-2" />
            <h5 className="mt-2 mb-0">Popsicle</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:cross" className="fs-2" />
            <h5 className="mt-2 mb-0">Cross</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:scatter-chart" className="fs-2" />
            <h5 className="mt-2 mb-0">Scatter Chart</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:money-withdraw" className="fs-2" />
            <h5 className="mt-2 mb-0">MoneyWithdraw</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:candles" className="fs-2" />
            <h5 className="mt-2 mb-0">Candles</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:math" className="fs-2" />
            <h5 className="mt-2 mb-0">Math</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:party" className="fs-2" />
            <h5 className="mt-2 mb-0">Party</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:leaf" className="fs-2" />
            <h5 className="mt-2 mb-0">Leaf</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:injection" className="fs-2" />
            <h5 className="mt-2 mb-0">Injection</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bx:expand-vertical" className="fs-2" />
            <h5 className="mt-2 mb-0">ExpandVertical</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxs:dog" className="fs-2" />
            <h5 className="mt-2 mb-0">Dog</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxs:cat" className="fs-2" />
            <h5 className="mt-2 mb-0">Cat</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:upwork" className="fs-2" />
            <h5 className="mt-2 mb-0">Upwork</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:netlify" className="fs-2" />
            <h5 className="mt-2 mb-0">Netlify</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:java" className="fs-2" />
            <h5 className="mt-2 mb-0">Java</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:heroku" className="fs-2" />
            <h5 className="mt-2 mb-0">Heroku</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:go-lang" className="fs-2" />
            <h5 className="mt-2 mb-0">Go Lang</h5>
          </CardBody>
        </Card>
        <Card className="icon-box">
          <CardBody className="d-flex flex-column align-items-center justify-content-center">
            <IconifyIcon icon="bxl:gmail" className="fs-2" />
            <h5 className="mt-2 mb-0">Gmail</h5>
          </CardBody>
        </Card>
      </div>

      <div className="my-4 text-center">
        <Link href="https://boxicons.com/" target="_blank" className="btn btn-primary">
          View All Icons
        </Link>
      </div>
    </>;
};
export default BoxIcons;