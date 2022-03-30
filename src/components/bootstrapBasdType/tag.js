import React from 'react';
import { Badge } from 'react-bootstrap';

/*
    This file contains tag block Bootstrap-based custom component.

    How to use it:
        <Tag>
            Some text
        </Tag>
*/

const Tag = (props) => {
  const { children } = props;

  return (
    <div className="margin5">
      <Badge variant="info">
        <span className="badge-text">{children}</span>
      </Badge>
    </div>
  );
};

export { Tag };
