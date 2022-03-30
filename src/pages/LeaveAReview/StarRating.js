import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({type, allRating, handleRatingChange}) => {
  const [rating, setRating] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const updateRating = (value) => {
    setRating(value);
    handleRatingChange({...allRating, [type]:value});
  }
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input 
              style={{display: 'none'}}
              type="radio" 
              name="rating" 
              value={ratingValue}
              onClick={()=> updateRating(ratingValue)}
            />
            <FaStar
              style={{cursor: 'pointer', transition: 'color 200ms'}}
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={24}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
          );
      }
      )}
    </div>
  );
};

export default StarRating;