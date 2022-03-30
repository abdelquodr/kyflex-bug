import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Logo } from '../../assets';

const EmailVerificationModal = ({ show, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header
        className={
          'border-0 d-flex justify-content-center align-items-center py-3'
        }
      >
        <img className="login-modal__kyflex-logo mx-2" src={Logo}></img>
        <h3 className={'login-modal__title mx-2'}>{t('Registered')}</h3>
      </Modal.Header>
      <Modal.Body>{t('Email_verification_warning')}</Modal.Body>
      <Modal.Footer className="border-0">
        <Button onClick={onClose}>{t('Ok')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export { EmailVerificationModal };
