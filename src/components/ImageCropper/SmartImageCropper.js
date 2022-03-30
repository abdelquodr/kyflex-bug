import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import getCroppedImg from './ImageCropper';
import { styles } from './styles';

export const createFileFromImageBlob = async (blobFile) => {
  let response = await fetch(blobFile);
  let data = await response.blob();
  let metadata = {
    type: 'image/png',
  };
  let file = new File([data], 'test.png', metadata);
//   setUploadImage(file);
  return file;
};

const SmartImageCropper = ({
  classes,
  initialImg,
  setCroppedImg,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        initialImg,
        croppedAreaPixels,
        rotation
      );
      setCroppedImg(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <>
      <div className={classes.cropContainer}>
        <Cropper
          image={initialImg}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={classes.controls}>
        <div>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              Zoom
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              classes={{ root: classes.slider }}
              onChange={(e, zoom) => {setZoom(zoom);
              }}
            />
          </div>
        </div>
        <div>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              Rotation
            </Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              classes={{ root: classes.slider }}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </div>
        </div>
        <Button
          onClick={showCroppedImage}
          variant="contained"
          color="primary"
          classes={{ root: classes.cropButton }}
        >
          Crop
        </Button>
      </div>
    </>
  );
};

export default withStyles(styles)(SmartImageCropper);
