import React from 'react';
import { Icon } from '..';
import { NavDropdown } from 'react-bootstrap';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

/*
    This file contains single language toggle component, Bootstrap-based custom component.
    The props are to be equipped with function to change language status.
*/

const LangToggle = (/*props*/) => {
  const { Item, Divider } = NavDropdown;
  return (
    <NavDropdown title={<Icon icon={faGlobe} size="1x" color="#000000" />}>
      <Item>English</Item>
      <Divider />
      <Item>Spanish</Item>
    </NavDropdown>
  );
};

export { LangToggle };
