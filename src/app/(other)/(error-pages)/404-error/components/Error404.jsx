'use client';

import error404Img from '@/assets/images/404.svg';
import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
const Error404 = () => {
  useEffect(() => {
    document.body.classList.add('authentication-bg');
    return () => {
      document.body.classList.remove('authentication-bg');
    };
  }, []);
  return <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col xl={6}>
            <Card className="auth-card">
              <CardBody className="p-0">
                <Row className="align-items-center g-0">
                  <Col>
                    <div className="p-4">
                      <div className="mx-auto mb-4 text-center">
                        <div className="mx-auto text-center auth-logo">
                          <Link href="/dashboards/analytics" className="logo-dark">
                            <Image src={logoDark} height={32} alt="logo dark" />
                          </Link>
                          <Link href="/dashboards/analytics" className="logo-light">
                            <Image src={logoLight} height={28} alt="logo light" />
                          </Link>
                        </div>
                        <Image src={error404Img} alt="auth" height={250} className="mt-5 mb-3" />
                        <h2 className="fs-22 lh-base">Page Not Found !</h2>
                        <p className="text-muted mt-1 mb-4">
                          The page you&apos;re trying to reach seems to have gone <br /> missing in the digital wilderness.
                        </p>
                        <div className="text-center">
                          <Link href="/dashboards/analytics" className="btn btn-danger">
                            Back to Home
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>;
};
export default Error404;