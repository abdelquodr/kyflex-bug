import React from 'react';
import { Rating } from '..';

/*
    This file contains single review component, my original custom component.
*/

const Review = (props) => {
  const { title, author, rating, children } = props;

  return (
    <div className="review-block">
      <h3 className="center-text">{title}</h3>
      <p className="right-text">{author}</p>
      <p className="review-block-body">{children}</p>
      <p className="right-text">
        <Rating rating={rating} size="1x" />
      </p>
    </div>
  );
};

export { Review };
