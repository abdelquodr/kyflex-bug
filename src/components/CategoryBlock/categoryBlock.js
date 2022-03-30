import React from 'react';
import { StyledLinkBtn } from '../../components/buttons';

/*
    CategoryBlock renders a category card. 
*/

const CategoryBlock = ({ categories }) => {
  const { image, title, description } = categories;
  return (
    <div className="category-block">
      <img src={image} className="category-block-img" alt="category" />
      <div className="category-block-body">
        <h4>{title}</h4>
        <p className="category-block-description">{description}</p>
        <div className="text-right">
          <StyledLinkBtn href="#" title="Explore Now" />
        </div>
      </div>
    </div>
  );
};

export { CategoryBlock };
