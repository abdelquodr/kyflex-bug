import React from 'react';

import { Nav } from 'react-bootstrap';

const SideMenu = ({ children }) => (
  <Nav className="flex-column side-menu py-3">{children}</Nav>
);

const Item = ({ children, active, onClick, ...props }) => (
  <Nav.Link
    onClick={onClick}
    className={`text-dark side-menu__item side-menu__item ${
      active ? 'side-menu__item--active' : ''
    }`}
    {...props}
  >
    <div
      className={`side-menu__item-selector ${
        active ? 'side-menu__item-selector--active' : ''
      }`}
    />
    {children}
  </Nav.Link>
);

Object.assign(SideMenu, {
  Item,
});

export { SideMenu };
