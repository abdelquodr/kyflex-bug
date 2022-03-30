import React from 'react';
import { Rating } from '..';

/*
    This file contains single card component, Bootstrap-based custom component.
    Parameters:
        title = titel of the card. 
        img = image of the card
        rating = rating of the experience
        host = host of experience
        totalReview = total number of review
        link = destination to detail page
*/

const Card = (props) => {
  const { title, img, rating, host, totalReview, link = '' } = props;

  const renderString = (string) => {
    if (string.length >= 14) return string.substring(0, 14) + '...';
    else return string;
  };

  return (
    <div className="card">
      <a href={link}>
        <img src={img} className="card-img-top" alt="experince" />
      </a>
      <div className="card-body">
        <h5 className="card-title">{renderString(title)}</h5>
        <sub className="card-text">
          <span>{renderString(host)}</span>
          <br />
          <span className="rating-number">{rating}</span>{' '}
          <Rating rating={rating} size="1x" />
          <br />({totalReview})
        </sub>
      </div>
    </div>
  );
};

export { Card };
