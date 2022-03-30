import React from 'react';
import { Card } from '../components';

/*
    THis function renders an array of experiences.
    utilizing Card Component.
*/

const ShowExperience = (data) => {
  return data.map((each) => {
    const { id, name, rating, host, img, totalReview } = each;
    return (
      <Card
        key={id}
        img={img}
        title={name}
        rating={rating}
        totalReview={totalReview}
        host={host}
      />
    );
  });
};

export { ShowExperience };
