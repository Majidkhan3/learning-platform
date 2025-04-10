'use client';

import logoDark from '@/assets/images/logo-dark.png';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import Timer from './Timer';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';
const ComingSoon = () => {
  const {user} = useAuth();
    console.log("user",user)
  useEffect(() => {
    document.body.classList.add('authentication-bg');
    return () => {
      document.body.classList.remove('authentication-bg');
    };
  }, []);
  return <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="auth-card text-center">
              <CardBody>
                <div className="mx-auto my-5 text-center">
                  <Link href="/dashboards/analytics">
                    <Image src={logoDark} alt="logo-dark" height={32} />
                  </Link>
                </div>
                <h2 className="fw-bold text-uppercase">We Are Launching Soon...</h2>
                <p className="lead mt-3 w-75 mx-auto pb-4 fst-italic">
                  Exciting news is on the horizon! We&apos;re thrilled to announce that something incredible is coming your way very soon.
                </p>
                <Timer />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>;
};
export default ComingSoon;