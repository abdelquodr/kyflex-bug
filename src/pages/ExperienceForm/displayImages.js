import React from 'react';
import { Controller } from 'react-hook-form';
import { AddImage } from './addImage';

function DisplayImages({ images, setImage }) {
  return (
    <Controller
      name="images"
      render={() => (
        <div>
          <h3 className="form">Select Photos for your experience</h3>
          <div  iv className="exp__images">
            <div className="exp__imagesRow">
              <div className="exp__imageWrapper">
                <AddImage image={images[0]} setImage={(file) => setImage(file, 0)} />
              </div>
              <div className="exp__imageWrapper">
                <AddImage image={images[1]} setImage={(file) => setImage(file, 1)} />
              </div>
              <div className="exp__imageWrapper">
                <AddImage image={images[2]} setImage={(file) => setImage(file, 2)} />
              </div>
            </div>
            <div className="exp__imagesRow">
              <div className="exp__imageWrapper">
                <AddImage image={images[3]} setImage={(file) => setImage(file, 3)} />
              </div>
              <div className="exp__imageWrapper">
                <AddImage image={images[4]} setImage={(file) => setImage(file, 4)} />
              </div>
              <div className="exp__imageWrapper">
                <AddImage image={images[5]} setImage={(file) => setImage(file, 5)} />
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}

export { DisplayImages };
