import React, { useEffect, useState } from 'react';

function AddImage({ image, setImage }) {
  const [previewImg, setPreviewImg] = useState('');
  const [imageName, setImageName] = useState('');
  const [hover, setHover] = useState(false);

  const onFileChange = (event) => {
    // Update the state
    if (!event.target.files[0]) return;
    const UploadedFile = event.target.files[0];
    setImage(UploadedFile);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImg('');
  };

  useEffect(() => {
    if (image) {
      let reader = new FileReader();
      reader.onloadend = function (e) {
        setPreviewImg(e.target.result);
        setImageName(image.name);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);
  return (
    <div>
      <div
        className="addImage__container exp__image"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {!previewImg && (
          <input
            type="file"
            className="addImage__input"
            accept=".jpg, .jpeg, .png"
            onChange={onFileChange}
          />
        )}
        {previewImg && <img className="exp__image" src={previewImg} />}
        {!previewImg && (
          <label forhtml="file__input" className="addImage__icon">
            +
          </label>
        )}
        {previewImg && hover && (
          <label
            forhtml="file__input"
            className="addImage__icon"
            onClick={handleRemoveImage}
            style={{ zIndex: 3 }}
            onMouseEnter={() => setHover(true)}
          >
            x
          </label>
        )}
      </div>
    </div>
  );
}

export { AddImage };
