import React from 'react';
import { Review } from '../components';

/*
    THis function renders an array of reviews
    utilizing Review component.
*/

const ShowReview = (data) => {
  return data.map((each) => {
    const { id, title, rating, author, body } = each;
    return (
      <Review key={id} title={title} author={author} rating={rating}>
        {body}
      </Review>
    );
  });
};

export { ShowReview };
