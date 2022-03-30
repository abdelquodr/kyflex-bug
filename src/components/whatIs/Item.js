import React from 'react';
import { Icon } from '..';
import { Col } from 'react-bootstrap';

const Item = ({ contents }) => {
  const { icon, header, description } = contents;

  return (
    <Col
      className={'d-flex justify-content-start flex-column p-3'}
      md={12}
      lg={6}
    >
      <div className="align-self-center text-center">
        <Icon icon={icon} size="2x" color="#FFFFFF" />
        <h4 className="text-left">{header}</h4>
      </div>

      <p className={'text-center text-lg-left'}>{description}</p>
    </Col>
  );
};

export { Item };
