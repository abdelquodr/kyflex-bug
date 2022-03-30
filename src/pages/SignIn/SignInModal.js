import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { Logo } from '../../assets';
import facebookIcon from '../../assets/icons/facebook.png';
import googleIcon from '../../assets/icons/google.png';

import ColorVars from '../../sass/colors.scss';
import { Formik, Form as FormikForm } from 'formik';
import { emailValidator, passwordValidator } from '../../validators';
import PageLoader from '../../components/PageLoader';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import FormError from '../../components/FormError';
import { loginWithEmail, getSocialAuthURL } from '../../store/actions/accounts.actions';
import { useQueryParam, StringParam } from 'use-query-params';


const SignInModal = () => {
  const [apiError, setApiError] = useState('');
  const loading = useSelector(state => state.accounts.loading);
  const history = useHistory();
  const [next] = useQueryParam('next', StringParam);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const loginViaEmail = async (values) => {
    try {
      await dispatch(loginWithEmail(values));
      history.replace(next || '/home');
    } catch (error) {
      setApiError(error.detail);
    }
  };

  const loginWithSocial = async (provider) => {
    try {
      const { authorization_url } = await dispatch(getSocialAuthURL(provider));
      window.location.href = authorization_url;
    } catch (error) {
      // TODO: handle error
      console.log({error});
    }
  }

  useEffect(() => {
    setTimeout(() => setApiError(''), 5000);
  }, [apiError]);

  const onClose = () => history.push('/');

  // const handleResetPassword = () => {
  //   history.push('/reset');
  // };

  return (
    <Modal show={true} onHide={onClose}>
      <PageLoader loading={loading} />
      <Modal.Header
        className={
          'border-0 d-flex justify-content-center align-items-center py-3'
        }
      >
        <img className="login-modal__kyflex-logo mx-2" src={Logo}></img>
        <h3 className={'login-modal__title mx-2'}>KyFlex</h3>
      </Modal.Header>
      <Modal.Body>
        <Formik
          onSubmit={loginViaEmail}
          validationSchema={Yup.object().shape({
            email: emailValidator,
            password: passwordValidator,
          })}
          initialValues={{ email: '', password: '', isHost: false }}
        >
          {
            ({ errors, values, touched, handleChange, handleSubmit }) => {
              return (
                <FormikForm>
                  <div className="logIn">
                    <Form.Control
                      className="rounded-0 my-2"
                      type="email"
                      value={values.email}
                      onChange={handleChange('email')}
                      placeholder={t('Email_Address')}
                      error={touched.email && errors.email || ''}
                      />
                    <Form.Control
                      className="rounded-0 my-2"
                      type="password"
                      value={values.password}
                      placeholder={t('Password')}
                      onChange={handleChange('password')}
                      error={touched.password && errors.password || ''}
                    />
                    <Form.Switch
                      id="isHost"
                      value={values.isHost}
                      label="Log In As Host"
                      onChange={handleChange('isHost')}
                    />
                    <FormError text={(touched.email && errors.email) || (touched.password && errors.password) || apiError} />
                    <Button
                      variant="danger"
                      className="w-100 rounded-0 my-2"
                      onClick={handleSubmit}
                      style={{
                        backgroundColor: ColorVars.mainKyflexColor,
                        border: 'none',
                      }}
                    >
                      {t('Sign_In')}
                    </Button>
                    <Row>
                      <Col xs="5">
                        <hr className="w-100 border-danger" />
                      </Col>
                      <Col xs="2" className="text-center">
                        {t('OR')}
                      </Col>
                      <Col xs="5">
                        <hr className="w-100 border-danger" />
                      </Col>
                    </Row>
                    <Row className="my-2">
                      <Col>
                        {/* <FacebookLogin
                          appId="152735806657349"
                          callback={responseFacebook}
                          render={(renderProps) => (
                            <Button
                              variant="light"
                              className="d-flex w-100"
                              onClick={renderProps.onClick}
                            >
                              <img src={facebookIcon}></img>
                              <div className="flex-grow-1">{t('Continue_Facebook')}</div>
                            </Button>
                          )}
                        /> */}
                        <Button
                          variant="light"
                          className="d-flex w-100"
                          onClick={() => loginWithSocial('facebook')}
                        >
                          <img src={facebookIcon}></img>
                          <div className="flex-grow-1">{t('Continue_Facebook')}</div>
                        </Button>
                      </Col>
                    </Row>
                    <Row className="my-2">
                      <Col>
                        <Button
                          variant="light"
                          className="w-100 d-flex"
                          onClick={() => loginWithSocial('google')}
                        >
                          <img src={googleIcon}></img>
                          <div className="flex-grow-1">{t('Continue_Google')}</div>
                        </Button>
                      </Col>
                    </Row>
                    <Row className="my-2">
                      <Col>
                        <Link
                          to="/register"
                          component={Button}
                          className="w-100 rounded-0"
                          style={{
                            backgroundColor: ColorVars.mainKyflexColor,
                            border: 'none',
                          }}
                        >
                          {t('Create_Account')}
                        </Link>
                      </Col>
                    </Row>
                  </div>
                </FormikForm>
              );
            }
          }
        </Formik>
      </Modal.Body>
      <Modal.Footer className="border-0">
        {t('Cant_Signin')}
        <a
          style={{ color: ColorVars.darkMainKyFlexColor }}
          onClick={() => alert('Reset password')}
        >
          {t('Reset_Password')}
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export { SignInModal };
