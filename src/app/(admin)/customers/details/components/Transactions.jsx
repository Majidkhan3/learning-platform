import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import contactlessImg from '@/assets/images/contactless-payment.png';
import chipImg from '@/assets/images/chip.png';
import mastercardImg from '@/assets/images/card/mastercard.svg';
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import { currency } from '@/context/constants';
import Link from 'next/link';
const Transactions = () => {
  return <Card>
      <CardHeader>
        <CardTitle as={'h4'}>Transactions </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="p-3 bg-primary bg-gradient rounded-4 border border-light border-2 shadow-sm">
          <div className="d-flex align-items-center">
            <Image src={chipImg} alt="chip" className="avatar" />
            <div className="ms-auto">
              <Image src={mastercardImg} alt="mastercard" className="avatar" />
            </div>
          </div>
          <div className="mt-5">
            <h4 className="text-white d-flex gap-2">
              <span className="text-white-50">XXXX</span> <span className="text-white-50">XXXX</span> <span className="text-white-50">XXXX</span> 3467
            </h4>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div>
              <p className="text-white-50 mb-2">Holder Name</p>
              <h4 className="mb-0 text-white">Ray C. Nichols</h4>
            </div>
            <div>
              <p className="text-white-50 mb-2">Valid</p>
              <h4 className="mb-0 text-white">05/26</h4>
            </div>
            <Image src={contactlessImg} alt="contactless" className="img-fluid" />
          </div>
        </div>
        <div className="mt-4">
          <div className="d-flex align-items-center gap-3 border-bottom pb-3">
            <div className="avatar bg-primary bg-opacity-10 rounded flex-centered">
              <IconifyIcon icon="solar:square-transfer-horizontal-bold" width={28} height={28} className="fs-28 text-primary" />
            </div>
            <div>
              <p className="mb-1 text-dark fw-medium fs-15">Michael A. Miner</p>
              <p className="text-muted mb-0">michaelminer@dayrep.com</p>
            </div>
            <div className="ms-auto">
              <p className="mb-1 fs-16 text-dark fw-medium">
                {currency}13,987{' '}
                <span>
                  <IconifyIcon icon="ri:checkbox-circle-line" className="text-success ms-1" />
                </span>
              </p>
              <p className="mb-0 fs-13">TXN-341220</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3 pt-3 rounded">
            <div className="avatar bg-primary bg-opacity-10 rounded flex-centered">
              <IconifyIcon icon="solar:square-transfer-horizontal-bold" width={28} height={28} className="fs-28 text-primary" />
            </div>
            <div>
              <p className="mb-1 text-dark fw-medium fs-15">Theresa T. Brose</p>
              <p className="text-muted mb-0">theresbrosea@dayrep.com</p>
            </div>
            <div className="ms-auto">
              <p className="mb-1 fs-16 text-dark fw-medium">
                {currency}2,710{' '}
                <span>
                  <IconifyIcon icon="ri:checkbox-circle-line" className="text-success ms-1" />
                </span>
              </p>
              <p className="mb-0 fs-13">TXN-836451</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="" className="link-primary fw-medium">
              View More
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>;
};
export default Transactions;