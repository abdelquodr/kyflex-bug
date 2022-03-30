import React from 'react';
import { Icon } from '.';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

/*
    This file contains single rating component, React-fontawesome-based custom component.

    How to Use this component:
        1. import this. Path varies from where you import it.
            ex) import {Rating} from '...'
        2. Use it
            ex) <Rating rating={3.4}/>
*/

const padding = {
  marginRight: '5px',
};

const SingleRating = ({ rating, size = '1x' }) => {
  const RenderColor = (threshold) =>
    rating >= threshold ? '#D63B03' : 'rgba(0, 0, 0, 0.3)';

  return (
    <span>
      <Icon
        icon={faHeart}
        size={size}
        color={RenderColor(1)}
        className="heart"
      />
    </span>
  );
};

export { SingleRating };
