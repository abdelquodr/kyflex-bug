import React, { Component, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import { styled } from '@material-ui/core/styles';
import { Row } from 'react-bootstrap';
import SylvesterImg from '../../assets/images/Sylvester.jpg';
import ImageUploadCard from './BrowseDialog';

import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import { Avatar } from '../Avatar/Avatar';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  iconHover: {
    '&:hover': {
      color: red[800],
    },
  },
  cardHeader: {
    textalign: 'center',
    align: 'center',
    backgroundColor: 'white',
  },
  input: {
    display: 'none',
  },
  title: {
    color: blue[800],
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    align: 'center',
  },
  cardArea: {
    color: 'white',
  },
});

const KyFlexThemeBtn = styled(Button)({
  background: 'linear-gradient(#FC781C 100%, #FFFFFF 100%)',
  border: 0,
  borderRadius: 3,
  color: 'white',
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ChangePhoto({ imgUrl, size, alt }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { t } = useTranslation();

  return (
    <div>
      <div
        className="dashboard-header__image-overlay"
        onClick={handleClickOpen}
      >
        <FontAwesomeIcon icon={faCameraRetro} size="2x" />
        <p className="dashboard-header__image-container__text">
          {t('Change_Photo')}
        </p>
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Update Picture
        </DialogTitle>

        <ImageUploadCard onClose={() => setOpen(false)} />

        {/* <DialogActions>
          <KyFlexThemeBtn onClick={handleClose}>Discard</KyFlexThemeBtn>
          <KyFlexThemeBtn onClick={handleClose}>Apply</KyFlexThemeBtn>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
