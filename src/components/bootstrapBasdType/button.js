import React from 'react';
import { NavLink as Link } from 'react-router-dom';

/*
    This file contains single button component, Bootstrap-based custom component.
    Parameters:
        type = variants of button. refer to Bootstrap button online. success by default
        size = size of button referred to Bootstrap buton online. block size by default
        onClick = call back function when clicked
        isLink = boolean value for button being link
        path = path for destination if button is link
    How to use:
        when using as a pure button
        <Button
            size="block" //default by block
            type="success" //default
            onClick={someFunction}
        >
            Blah Blah Blah
        </Button>

        when using as a link
        <Button isLink={true} path="/somewhere">
            I am link button!
        </Button>
*/

const Button = (props) => {
  const {
    children,
    size = 'block',
    type = 'success',
    onClick = null,
    isLink = false,
    path = '',
  } = props;

  const renderCSS = () => {
    let btn_size = '';
    switch (size) {
      case 'block':
        btn_size = 'btn-lg btn-block';
        break;
      case 'sm':
        btn_size = 'btn-sm';
        break;
      case 'lg':
        btn_size = 'btn-lg';
        break;
      default:
        btn_size = '';
    }

    return `btn btn-${type} ${btn_size}`;
  };

  return isLink ? (
    <Link to={path}>
      <button type="button" className={`${renderCSS()} margin5`}>
        {children}
      </button>
    </Link>
  ) : (
    <button
      type="button"
      onClick={() => onClick()}
      className={`${renderCSS()} margin5`}
    >
      {children}
    </button>
  );
};

export { Button };
