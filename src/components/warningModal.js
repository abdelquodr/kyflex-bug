import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
const { Header, Title, Body, Footer } = Modal;

/* 
    This is warning modal.
*/

const WarningModal = ({ texts, control }) => {
  const { title, body, footer } = texts;
  const { show, onClose } = control;

  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Header>
        <Title>
          <h3>{title}</h3>
        </Title>
      </Header>
      <Body>{body}</Body>
      <Footer>
        {footer ? (
          <Link to="/home">
            <Button variant="danger" size="lg" block>
              Return
            </Button>
          </Link>
        ) : (
          <Button onClick={onClose} variant="danger" size="lg" block>
            Return
          </Button>
        )}
      </Footer>
    </Modal>
  );
};

export { WarningModal };
