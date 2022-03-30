import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    '&:hover': {
      border: '0 !important',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

export const Dialog = withStyles(styles)((props) => {
  const { classes, ...other } = props;
  return <MuiDialog className={classes.root} {...other}></MuiDialog>;
});

export const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, disabled, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose && (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          disabled={disabled}
        >
          <CloseIcon />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles(styles)((props) => {
  const { classes, ...other } = props;
  return (
    <MuiDialogContent className={classes.root} {...other}></MuiDialogContent>
  );
});

export const DialogAction = withStyles(styles)((props) => {
  const { classes, disabled, children, ...other } = props;
  return (
    <MuiDialogActions className={classes.root} {...other} disabled={disabled}>{children}</MuiDialogActions>
  );
});
