import React from 'react';

/*
    This file contains full page size overlay component, my own custom component.
*/

const CustomOverlay = (props) => {
  const { id, show, children } = props;

  const renderCSS = () => {
    let css = 'full-screen-overlay';
    switch (show) {
      case true:
        css += ' display-block';
        break;
      default:
        css += ' display-none';
    }
    return css;
  };

  return (
    <div id={id} className={renderCSS()}>
      {children}
    </div>
  );
};

export { CustomOverlay };
