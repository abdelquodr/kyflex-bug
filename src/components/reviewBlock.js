import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Rating } from '../components';

/*
    Review renders a review card. 
*/

const ReviewBlock = ({ review }) => {
  const [fulltextOpen, setFulltextOpen] = useState(false);
  const {
    reviewer: {
      customer: { firstName, lastName, uploadedPicture, picture },
    },
    submittedMedia,
    reviewBody,
    overallRating,
  } = review;

  const handleFulltext = () => {
    setFulltextOpen(!fulltextOpen);
  };

  return (
    <div className="experience-reviews-block">
      <div>
        <div className="d-flex">
          <div className="experience-reviews-pic">
            <img
              src={uploadedPicture || picture}
              loading="lazy"
              className="cropped"
              alt="reviewer picture"
            />
          </div>
          <div>
            <h4>
              {firstName} {lastName}
            </h4>
            <Rating rating={overallRating} />
          </div>
        </div>

        <div className="experience-reviews-body" onClick={handleFulltext}>
          <Typography className={!fulltextOpen ? 'cropped-text' : 'full-text'}>
            {reviewBody}
          </Typography>
        </div>
        <div className="experience-reviews-media">
          {submittedMedia &&
            submittedMedia.map((each, index) => (
              <img src={each.media} loading="lazy" />
//               <div class="container" key={index}>
//               <img className="image" src={each.media} loading="lazy" alt="review image" />
//               <div className="overlay">
//                 <div className="text">{index + 1}</div>
//               </div>
// </div>
            ))}
          {/* <img
            src="https://storage.googleapis.com/kyflex-7b93e-media/reviews/media/77a3fbd58b044e5e848886f47af602bf.jpg?Expires=1628686877&GoogleAccessId=772780927534-compute%40developer.gserviceaccount.com&Signature=rqfBd1DDBWSOmxhCsI6OZYy5x9f7U%2Ft9hyiCDqspXaIozhAupMPbzGwvmXbbFdMUW3cCgtD21iUExSSi2h2g2cXCKRWztnkQ741miyw91Fr1UgEQekDBXMRSFpbmGDXxO0g1O0WzvHYD8d4%2BKyhGru9B4ko5BdSfkarSoJfCIY2NkCNZeOKjDtkEzBTuQS4S5ER1T1e%2BdH7JgiuVrxeP0TiTf1NjBrm6GaeU0f6WzHdxH4q%2FshY7ozmsobfQ0uYtgk4nTZia65070L3Hb0zqeLvHbN7SldCC9SwJFQuO4l61IOiRGmWxou2m5l0XVtAZJE8B42krYovA1cLBf%2FNhXA%3D%3D"
            loading="lazy"
          />
          <img
            src="https://storage.googleapis.com/kyflex-7b93e-media/reviews/media/77a3fbd58b044e5e848886f47af602bf.jpg?Expires=1628686877&GoogleAccessId=772780927534-compute%40developer.gserviceaccount.com&Signature=rqfBd1DDBWSOmxhCsI6OZYy5x9f7U%2Ft9hyiCDqspXaIozhAupMPbzGwvmXbbFdMUW3cCgtD21iUExSSi2h2g2cXCKRWztnkQ741miyw91Fr1UgEQekDBXMRSFpbmGDXxO0g1O0WzvHYD8d4%2BKyhGru9B4ko5BdSfkarSoJfCIY2NkCNZeOKjDtkEzBTuQS4S5ER1T1e%2BdH7JgiuVrxeP0TiTf1NjBrm6GaeU0f6WzHdxH4q%2FshY7ozmsobfQ0uYtgk4nTZia65070L3Hb0zqeLvHbN7SldCC9SwJFQuO4l61IOiRGmWxou2m5l0XVtAZJE8B42krYovA1cLBf%2FNhXA%3D%3D"
            loading="lazy"
          />
          <img
            src="https://storage.googleapis.com/kyflex-7b93e-media/reviews/media/77a3fbd58b044e5e848886f47af602bf.jpg?Expires=1628686877&GoogleAccessId=772780927534-compute%40developer.gserviceaccount.com&Signature=rqfBd1DDBWSOmxhCsI6OZYy5x9f7U%2Ft9hyiCDqspXaIozhAupMPbzGwvmXbbFdMUW3cCgtD21iUExSSi2h2g2cXCKRWztnkQ741miyw91Fr1UgEQekDBXMRSFpbmGDXxO0g1O0WzvHYD8d4%2BKyhGru9B4ko5BdSfkarSoJfCIY2NkCNZeOKjDtkEzBTuQS4S5ER1T1e%2BdH7JgiuVrxeP0TiTf1NjBrm6GaeU0f6WzHdxH4q%2FshY7ozmsobfQ0uYtgk4nTZia65070L3Hb0zqeLvHbN7SldCC9SwJFQuO4l61IOiRGmWxou2m5l0XVtAZJE8B42krYovA1cLBf%2FNhXA%3D%3D"
            loading="lazy"
          /> */}
        </div>
      </div>
    </div>
  );
};

export {ReviewBlock};
