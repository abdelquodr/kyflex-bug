import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faChevronCircleLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Input, Icon, Tab, Tabs, Button, PrimaryButton } from '../../components';
import { IsEmptyInput } from '../../funcs';
import axios from 'axios';
import apiClient from '../../lib/apiClient';

/*
    ResetPassword is used for users to enter their emails
    and receive a link to ResetPassword2 page.
*/

const ResetPassword = (/*props*/) => {
  // const {funcs, lang} = props;

  // Hooks for the tabs
  const [option /*, setOption*/] = useState('Email Verification');

  // PAGE 1 Hooks
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  // Checks empty inputs when user presses next
  const onEmailNext = () => {
    if (IsEmptyInput(email)) alert('Please fill out empty inputs!');
    else {
      apiClient
        .post(`users/reset_password/`, {
          email: email,
        })
        .then((res) => {
          setSent(true);
          setEmail('');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Tabs>
      {/* PAGE 1 (Email Verfication) */}
      <Tab activeKey={option} select_key={'Email Verification'}>
        <div id="experience-form">
          <header>
            <ul className="nav tablet">
              <li className="nav-item">
                <NavLink to="/home">
                  <span className="nav-link">
                    <Icon
                      icon={faChevronCircleLeft}
                      size="1x"
                      color="#28a745"
                    />
                  </span>
                </NavLink>
              </li>
            </ul>
          </header>

          <div className="main-content">
            <section>
              <ul className="nav browser">
                <li className="nav-item">
                  <NavLink to="/home">
                    <span className="nav-link">
                      <Icon
                        icon={faChevronCircleLeft}
                        size="1x"
                        color="#1F9AEC"
                      />
                    </span>
                  </NavLink>
                </li>
              </ul>

              <form>
                {sent && (
                  <p className="confirm-message text-center">
                    <Icon
                      icon={faCheckCircle}
                      size="1x"
                      color="#28a745"
                    />
                    <span>{` An email has been sent to your account. Please follow the provided link to complete password reset within 24 hrs.`}</span>
                  </p>
                )}
                <h2 className="headerStyle">
                  Enter your email to reset password!
                </h2>

                <Input
                  value={email}
                  setState={setEmail}
                  placeholder="johndoe@example.com"
                />

                <div className="d-flex justify-content-center">
                  <PrimaryButton
                    size="block"
                    onClick={onEmailNext}
                    fullWidth
                    style={{ height: '2.5rem' }}
                  >
                    Send my request
                  </PrimaryButton>
                </div>
              </form>
            </section>
          </div>
        </div>
      </Tab>
    </Tabs>
  );
};

export { ResetPassword };
