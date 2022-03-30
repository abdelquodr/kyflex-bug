import React, { useEffect, useState } from 'react';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useResetPassword } from '../../hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router';
import { NavLink, useParams } from 'react-router-dom';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Input, Icon, Tab, Tabs, PrimaryButton } from '../../components';
import { IsEmptyInput } from '../../funcs';
import axios from 'axios';
import { Link } from '@material-ui/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const ResetPassword2 = () => {
  const { uid, token } = useParams();
  const { postResetPassword } = useResetPassword();
  const history = useHistory();

  const [new_password1, setNewPassword1] = useState('');
  const [new_password2, setNewPassword2] = useState('');
  const [matching, setMatching] = useState(true);
  const [postStatus, setPostStatus] = useState('PENDING');
  const resetPassword = async () => {
    try {
      const res = await postResetPassword({
        uid: uid,
        token: token,
        new_password: new_password1,
      });
      if (res && res.status === 204) {
        setPostStatus('SUCCESS');
      } else setPostStatus('FAILED');
    } catch (error) {
      setPostStatus('FAILED');
    }
  };

  useEffect(() => {
    if (new_password1 && new_password2) {
      if (new_password1 !== new_password2) {
        setMatching(false);
      } else setMatching(true);
    }
  }, [new_password1, new_password2]);

  return (
    <Tabs>
      {/* PAGE 2 (Email Verfication) */}
      <Tab>
        <div id="experience-form">
          <header>
            <ul className="nav tablet">
              <li className="nav-item">
                <NavLink to="/reset">
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
                  <NavLink to="/reset">
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
              {postStatus === 'PENDING' && (
                <form>
                  <h2 className="headerStyle">Reset your password!</h2>

                  <Input
                    value={new_password1}
                    setState={setNewPassword1}
                    placeholder="Enter new password"
                    type="password"
                  />

                  <Input
                    value={new_password2}
                    setState={setNewPassword2}
                    placeholder="Re-enter new password"
                    type="password"
                  />

                  {!matching && (
                    <p className="unmatching-password">
                      Passwords are not matching!!
                    </p>
                  )}

                  <div className="d-flex justify-content-center">
                    <PrimaryButton
                      size="block"
                      onClick={resetPassword}
                      fullWidth
                      style={{ height: '2.5rem' }}
                      disabled={
                        !matching ||
                        IsEmptyInput(new_password1) ||
                        IsEmptyInput(new_password2)
                      }
                    >
                      Save
                    </PrimaryButton>
                  </div>
                </form>
              )}
              {postStatus === 'SUCCESS' && (
                <div className="success-reset w-50 mx-auto my-4">
                  <div className="text-center">
                    <Icon icon={faCheckCircle} size="1x" color="#28a745" />
                    <h4 className="d-inline ml-2">
                      PASSWORD RESET SUCCESSFULLY !
                    </h4>
                  </div>
                  <p className="my-4">
                    Your password has been updated, please try{' '}
                    <Link href="/signin">Login again</Link>
                  </p>
                </div>
              )}
              {postStatus === 'FAILED' && (
                <div className="failed-reset w-50 mx-auto my-4">
                  <h4 className="text-center">PASSWORD RESET FAILED !</h4>
                  <p className="my-4">
                    Please make <Link href="/reset">reset request</Link> again
                    or <Link href="/contact">contact us</Link> for supports.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </Tab>
    </Tabs>
  );
};
