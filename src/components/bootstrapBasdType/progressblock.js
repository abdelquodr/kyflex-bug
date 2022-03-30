import React from 'react';
import { ProgressBar } from 'react-bootstrap';

/*
    This file contains single progress block component, Bootstrap-based custom component.
*/

const Progressblock = (props) => {
  const { degree, header } = props;

  return (
    <div className="progress-block">
      <h3 className="center-text">{header}</h3>
      <ProgressBar
        striped
        variant="success"
        className="progress-block-bar"
        now={degree}
        label={`${degree}%`}
      />
    </div>
  );
};

export { Progressblock };
