import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Logo } from '../../assets';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../store/actions/accounts.actions';

const STATES = {
  Fetching: 'fetching',
  Success: 'success',
  Error: 'error',
};

const stateMessageMap = {
  fetching: 'Verifying_email...',
  success: 'Email_verified!',
  error: 'Email_verification_failed',
};

const Verify = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { code } = useParams();
  const dispatch = useDispatch();

  const [state, setState] = useState(STATES.Fetching);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(verifyEmail(code));
        setState(STATES.Success);
      } catch (error) {
        setState(STATES.Error);
      }
    })();
  }, []);

  const onLogin = () => {
    history.push('/signin');
  };
  const onClose = () => {
    history.push('/home');
  };

  return (
    <Modal show={true}>
      <Modal.Header
        className={
          'border-0 d-flex justify-content-center align-items-center py-3'
        }
      >
        <img className="login-modal__kyflex-logo mx-2" src={Logo}></img>
        <h3 className={'login-modal__title mx-2'}>{t('Email confirmed!')}</h3>
      </Modal.Header>
      <Modal.Body>{t(stateMessageMap[state])}</Modal.Body>
      <Modal.Footer className="border-0">
        {state !== STATES.error && (
          <Button disabled={state !== STATES.Success} onClick={onLogin}>
            {t('Login')}
          </Button>
        )}
        {state === STATES.error && (
          <Button onClick={onClose}>{t('Close')}</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export { Verify };
