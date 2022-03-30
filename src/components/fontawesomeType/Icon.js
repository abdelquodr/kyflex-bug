import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
    This file contains single Icon component, React-FontAwesome-based custom component.
    Parameter:
        icon = icon element
        size = size of the icon component default by "1x"
        color =  color of the icon

    How to use it:
        <Icon icoc={someIcon} color="some color code"/>
*/

const Icon = (props) => {
  const { icon, size = '1x', color } = props;
  return <FontAwesomeIcon icon={icon} size={size} color={color} />;
};

export { Icon };
