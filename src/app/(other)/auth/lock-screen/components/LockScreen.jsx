'use client';

import logoDark from '@/assets/images/logo-dark.png';
import LogoLight from '@/assets/images/logo-light.png';
import avatar1 from '@/assets/images/users/avatar-1.jpg';
import TextFormInput from '@/components/from/TextFormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const LockScreen = () => {
  useEffect(() => {
    document.body.classList.add('authentication-bg');
    return () => {
      document.body.classList.remove('authentication-bg');
    };
  }, []);
  const messageSchema = yup.object({
    name: yup.string().required('Please enter Name'),
    email: yup.string().email().required('Please enter Email'),
    password: yup.string().required('Please enter password')
  });
  const {
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(messageSchema)
  });
  return <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col xl={5}>
            <Card className="auth-card">
              <CardBody className="px-3 py-5">
                <div className="mx-auto mb-4 text-center auth-logo">
                  <Link href="/dashboards/analytics" className="logo-dark">
                    <Image src={logoDark} height={32} alt="logo dark" />
                  </Link>
                  <Link href="/dashboards/analytics" className="logo-light">
                    <Image src={LogoLight} height={28} alt="logo light" />
                  </Link>
                </div>
                <div className="text-center mb-2">
                  <Image className="rounded-circle avatar-lg img-thumbnail" src={avatar1} alt="avatar" />
                </div>
                <h2 className="fw-bold text-uppercase text-center fs-18">Hi ! Gaston</h2>
                <p className="text-muted text-center mt-1 mb-4">Enter your password to access the admin.</p>
                <div className="px-4">
                  <form onSubmit={handleSubmit(() => {})} className="authentication-form">
                    <div className="mb-3">
                      <TextFormInput control={control} name="password" placeholder="Enter your password" className="bg-light bg-opacity-50 border-light py-2" />
                    </div>
                    <div className="mb-1 text-center d-grid">
                      <button className="btn btn-danger py-2" type="submit">
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </CardBody>
            </Card>
            <p className="mb-0 text-center text-white">
              Not you? return{' '}
              <Link href="/auth/sign-in" className="text-reset text-unline-dashed fw-bold ms-1">
                Sign In
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>;
};
export default LockScreen;