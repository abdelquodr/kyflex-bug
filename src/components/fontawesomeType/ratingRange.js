import React from 'react';
import { Rating } from '.';

/*
    This file contains single Range of ratings component, React-fontawesome-based custom component.
*/

const RatingRange = (props) => {
  const { from, to } = props;

  if (from === 0 && to === 1)
    return (
      <>
        ~ <Rating rating={1} size="1x" />
      </>
    );
  else if (from === 1 && to === 2)
    return (
      <>
        <Rating rating={1} size="1x" /> ~ <Rating rating={2} size="1x" />
      </>
    );
  else if (from === 2 && to === 3)
    return (
      <>
        <Rating rating={2} size="1x" /> ~ <Rating rating={3} size="1x" />
      </>
    );
  else if (from === 3 && to === 4)
    return (
      <>
        <Rating rating={3} size="1x" /> ~ <Rating rating={4} size="1x" />
      </>
    );
  else if (from === 4 && to === 5)
    return (
      <>
        <Rating rating={4} size="1x" /> ~ <Rating rating={5} size="1x" />
      </>
    );
};

export { RatingRange };
