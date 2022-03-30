import React from 'react';
import { Dialog, DialogTitle, DialogAction } from '../../components/dialog';
import { PrimaryButton } from '../../components/buttons';

export const ActionConfirm = ({
  message,
  handleConfirm,
  closeConfirmation,
}) => {
  return (
    <Dialog
      onClose={closeConfirmation}
      aria-labelledby="customized-dialog-title"
      open={true}
      fullWidth={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={closeConfirmation}>
        Are you sure you want to {message}?
      </DialogTitle>

      <DialogAction>
        <PrimaryButton onClick={closeConfirmation}>Cancel</PrimaryButton>

        <PrimaryButton onClick={handleConfirm}>Yes</PrimaryButton>
      </DialogAction>
    </Dialog>
  );
};
