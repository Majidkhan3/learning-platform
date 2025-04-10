'use client'

import logoDark from '@/assets/images/logo-dark.png'
import LogoLight from '@/assets/images/logo-light.png'
import TextFormInput from '@/components/from/TextFormInput'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import Link from 'next/link'
import language from '@/assets/images/language.png'
import { useEffect } from 'react'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import useSignIn from './useSignIn'
const SignIn = () => {
  useEffect(() => {
    document.body.classList.add('authentication-bg')
    return () => {
      document.body.classList.remove('authentication-bg')
    }
  }, [])

  // const messageSchema = yup.object({
  //   email: yup.string().email().required('Please enter Email'),
  //   password: yup.string().required('Please enter password'),
  // })

  // const { handleSubmit, control } = useForm({
  //   resolver: yupResolver(messageSchema),
  // })

  const { loading, login, control } = useSignIn()
  return (
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col xl={5}>
            <Card className="auth-card">
              <CardBody className="px-3 py-5">
                <div className="mx-auto mb-4 text-center auth-logo">
                  <Link href="/dashboards/espagnol" className="logo-dark">
                    <Image src={language} width={20} height={32} alt="logo dark" />
                  </Link>
                  <Link href="/dashboards/analytics" className="logo-light">
                    <Image src={language} width={20} height={28} alt="logo light" />
                  </Link>
                </div>
                <h2 className="fw-bold text-uppercase text-center fs-18">Sign In</h2>
                <p className="text-muted text-center mt-1 mb-4">Enter your email address and password to access admin panel.</p>
                <div className="px-4">
                  <form className="authentication-form" onSubmit={login}>
                    <div className="mb-3">
                      <TextFormInput
                        control={control}
                        name="email"
                        placeholder="Enter your email"
                        className="bg-light bg-opacity-50 border-light py-2"
                        label="Email"
                      />
                    </div>
                    <div className="mb-3">
                      {/* <Link href="/auth/reset-password" className="float-end text-muted text-unline-dashed ms-1">
                        Reset password
                      </Link> */}
                      <TextFormInput
                        control={control}
                        name="password"
                        placeholder="Enter your password"
                        className="bg-light bg-opacity-50 border-light py-2"
                        label="Password"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                        <label className="form-check-label" htmlFor="checkbox-signin">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="mb-1 text-center d-grid">
                      <button disabled={loading} className="btn btn-danger py-2 fw-medium" type="submit">
                        Sign In
                      </button>
                    </div>
                  </form>
                  <p className="mt-3 fw-semibold no-span">OR sign with</p>
                  <div className="text-center">
                    <Button variant="outline-light" className="shadow-none">
                      <IconifyIcon icon="bxl:google" className="fs-20" />
                    </Button>
                    &nbsp;
                    <Button variant="outline-light" className="shadow-none">
                      <IconifyIcon icon="ri:facebook-fill" height={32} width={20} className="" />
                    </Button>
                    &nbsp;
                    <Button variant="outline-light" className="shadow-none">
                      <IconifyIcon icon="bxl:github" className="fs-20" />
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default SignIn
