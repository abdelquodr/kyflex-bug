import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { AddImage } from './addImage';

export const DisplayReviewImages = () => {
  return (
    <Controller
      name="media"
      render={() => (
        <>
          <div className="exp__imagesRow">
            <div className="exp__imageWrapper">
              <AddImage />
            </div>
            <div className="exp__imageWrapper">
              <AddImage />
            </div>
            <div className="exp__imageWrapper">
              <AddImage />
            </div>
          </div>
          <div className="exp__imagesRow">
            <div className="exp__imageWrapper">
              <AddImage />
            </div>
            <div className="exp__imageWrapper">
              <AddImage />
            </div>
            <div className="exp__imageWrapper">
              <AddImage />
            </div>
          </div>
        </>
      )}
    />
  );
}
