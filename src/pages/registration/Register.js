import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Container, Col } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { EmailVerificationModal } from './EmailVerificationModal';
import {StyledBtn} from '../../components/buttons';
import { useDispatch } from 'react-redux';
import { register } from '../../store/actions/accounts.actions';

const { Row, Control, Group, Label } = Form;

const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));

const maxDateFormated = `${maxDate.getFullYear()}-${maxDate.getMonth()}-${maxDate.getDay()}`;

const Register = () => {
  const [registered, setRegistered] = useState();
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container fluid id="register">
      <EmailVerificationModal
        history={history}
        show={registered}
        onClose={() => history.push('/home')}
      />
      <Container
        style={{ marginTop: '50px', marginBottom: '50px' }}
        className="d-flex flex-column align-items-center"
      >
        <Col md={8}>
          <div className="d-flex my-3 register-title">
            <h1>{t('User_Information')}</h1>
          </div>
          <Formik
            initialValues={{
              email: '',
              password1: '',
              password2: '',
              first_name: '',
              last_name: '',
              gender: 'M',
              birthday: '',
              // is_host: false,
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email()
                .max(255, t('Max_n_chars', { max: 255 }))
                .required(t('Required')),
              password1: Yup.string()
                .min(8, t('Min_n_chars', { min: 8 }))
                .required(t('Required'))
                .matches(
                  passwordRegex,
                  'Password must contain a lowercase letter, a capital letter, a number, and a symbol.'
                ),
              password2: Yup.string()
                .required(t('Required'))
                .oneOf([Yup.ref('password1'), null], t('Passwords_must_match')),
              first_name: Yup.string()
                .max(255, t('Max_n_chars', { max: 255 }))
                .required(t('Required')),
              last_name: Yup.string()
                .max(255, t('Max_n_chars', { max: 255 }))
                .required(t('Required')),
              gender: Yup.string().oneOf(['M', 'F']),
              birthday: Yup.date().max(maxDate, t('At_least_18')),
              // is_host: Yup.bool(),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(true);
                // setting password1 as password post validation
                values.password = values.password1;
                await dispatch(register(values));
                setRegistered(true);
              } catch (error) {
                // TODO: handle error
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <FormikForm>
              <Row>
                <Group as={Col} md={5}>
                  <Label htmlFor="first_name">{t('First_Name')}</Label>
                  <Field as={Control} name="first_name" type="text" />
                  <div className={'text-danger'}>
                    <ErrorMessage name="first_name" />
                  </div>
                </Group>

                <Group as={Col} md={5}>
                  <Label htmlFor="last_name">{t('Last_Name')}</Label>
                  <Field as={Control} name="last_name" type="text" />
                  <div className={'text-danger'}>
                    <ErrorMessage name="last_name" />
                  </div>
                </Group>

                <Group as={Col} md={2}>
                  <Label htmlFor="gender">{t('Gender')}</Label>
                  <Field
                    as={({ ...props }) => <Control {...props} as="select" />}
                    name="gender"
                    type="select"
                  >
                    <option value="M">{t('M')}</option>
                    <option>{t('F')}</option>
                  </Field>
                </Group>
              </Row>

              <Group>
                <Label htmlFor="email">{t('Email')}</Label>
                <Field as={Control} name="email" type="text" />
                <div className={'text-danger'}>
                  <ErrorMessage name="email" />
                </div>
              </Group>

              <Group>
                <Label htmlFor="password1">{t('Password')}</Label>
                <Field as={Control} name="password1" type="password" />
                <div className={'text-danger'}>
                  <ErrorMessage name="password1" />
                </div>
              </Group>

              <Group>
                <Label htmlFor="password2">{t('Confirm_Password')}</Label>
                <Field as={Control} name="password2" type="password" />
                <div className={'text-danger'}>
                  <ErrorMessage name="password2" />
                </div>
              </Group>

              <Group>
                <Label htmlFor="birthday">{t('Birthday')}</Label>
                <Field
                  as={Control}
                  name="birthday"
                  type="date"
                  max={maxDateFormated}
                />
                <div className={'text-danger'}>
                  <ErrorMessage name="birthday" />
                </div>
              </Group>

              {/* <Group>
                <Field
                  as={Form.Switch}
                  name="is_host"
                  type="checkbox"
                  id="is_host"
                  label={t('Want_to_host')}
                />
                <div className={'text-danger'}>
                  <ErrorMessage name="is_host" />
                </div>
              </Group> */}
              <StyledBtn type="submit" width="100%" title="Register" size="md" className="my-4" />
            </FormikForm>
          </Formik>
        </Col>
      </Container>
    </Container>
  );
};

export { Register };
