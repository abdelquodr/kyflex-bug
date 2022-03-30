import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { HorizontalCard as Card } from '../HorizontalCard/HorizontalCard';
import { Avatar } from '..';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
import { useUploadProfileImage } from './../../hooks/images/useUploadProfileImage';
import { useUser } from '../../contexts';

import { Dialog, DialogTitle, DialogContent, DialogAction } from '../dialog';
import { PrimaryButton } from '../buttons';
import nProgress from 'nprogress';
import TestImg from '../../assets/images/group_at_sunset.png';
import ProfileCropper from './ProfileCropper';
import SmartImageCropper, {createFileFromImageBlob} from '../ImageCropper/SmartImageCropper';

const DashboardHeader = () => {
  const { t } = useTranslation();
  const user = useUser();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [imgUrl, setImgUrl] = useState();
  const [previewImg, setPreviewImg] = useState(imgUrl);
  
  const { postImage } = useUploadProfileImage(profile && profile.id);
  const [uploading, setUploading] = useState(false);
  const [croppedImg, setCroppedImg] = useState(null);
  const [cropperOpen, setCropperOpen] = useState(false);

  nProgress.configure({ minimum: 0.75, showSpinner: false });

  const handleSave = async () => {
    if (!uploadImage) {
      closeUploadProfile();
      return;
    }
    
    nProgress.start(0.8);
    setUploading(true);
    let img2Upload;
    if (croppedImg) img2Upload = await createFileFromImageBlob(croppedImg);
    else img2Upload = uploadImage;
    await postImage(img2Upload);
    setUploading(false);
    nProgress.done();

    closeUploadProfile();
  };

  const openUploadDialog = () => {
    setUploadDialogOpen(true);
  };

  const closeUploadProfile = () => {
    setUploadDialogOpen(false);
    setPreviewImg(imgUrl);
    setCroppedImg(null);
    setUploadImage(null);
    setCropperOpen(false);
  };

  const onFileUploadChange = (event) => {
    // Update the state
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function (e) {
      setPreviewImg(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    setUploadImage(uploadedFile);
    setCropperOpen(true);
  };

  const showMyAlbum = () => {
    alert('Incoming feature. Stay tuned!');
  };
  useEffect(() => {
    if (user && user.customerProfile) {
      setProfile(user.customerProfile);
      setImgUrl(user.uploadedPicture || user.picture);
      setPreviewImg(user.uploadedPicture || user.picture);
    }
  }, [user]);

  useEffect(()=>{
    if (croppedImg) setCropperOpen(false);
  },[croppedImg]);

  return (
    <>
      <div className="dashboard-header__image-container text-center">
        <Avatar imgUrl={imgUrl} />
        <div
          className="dashboard-header__image-overlay"
          onClick={openUploadDialog}
          onclose={closeUploadProfile}
        >
          <FontAwesomeIcon icon={faCameraRetro} size="2x" />
          <p className="dashboard-header__image-container__text">
            {t('Change_Photo')}
          </p>
        </div>
      </div>
      <Card>
        <Dialog
          onClose={closeUploadProfile}
          aria-labelledby="customized-dialog-title"
          open={uploadDialogOpen}
          fullWidth={true}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={closeUploadProfile}
            disabled={uploading}
          >
            Update Picture
          </DialogTitle>
          <Divider />
      
            {!cropperOpen &&<div className="dashboard-header__image-preview my-4">
              <div className="dashboard-header__circ-border">
                <Avatar imgUrl={croppedImg || previewImg} />
              </div>
            </div>}
            {cropperOpen && <SmartImageCropper initialImg={previewImg || imgUrl} croppedImg={croppedImg} setCroppedImg={setCroppedImg}/>}
            {!cropperOpen && <div className="dashboard-header__btn-center">
              <input
                accept=".jpg, .jpeg, .png"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={onFileUploadChange}
              />
              <label htmlFor="contained-button-file" className="mx-2">
                <Button
                  component="span"
                  color="primary"
                  className="h6"
                  style={{ border: '1px solid #E7E7E7', color: 'black', fontWeight: 'normal' }}
                  disabled={uploading}
                >
                  Upload
                </Button>
              </label>
              <label>
                <Button
                  color="primary"
                  className="h6"
                  style={{ border: '1px solid #E7E7E7', color: 'black', fontWeight: 'normal' }}
                  onClick={showMyAlbum}
                  disabled={uploading}
                >
                  My album
                </Button>
              </label>
            </div>}
          

          <Divider />

          <DialogAction>
            <PrimaryButton
              onClick={() => closeUploadProfile()}
              disabled={uploading}
            >
              Discard
            </PrimaryButton>

            <PrimaryButton
              onClick={() => handleSave()}
              disabled={!uploadImage || cropperOpen || uploading}
            >
              Save
            </PrimaryButton>
          </DialogAction>
        </Dialog>
      </Card>
    </>
  );
};

export { DashboardHeader };
