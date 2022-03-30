import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import { useUser } from '../../contexts';
import { ReviewFormContext } from '../../contexts/ReviewFormContext';
import { TextField } from '@material-ui/core';
import { Form } from 'react-bootstrap';

export const DisplayReviewer = () => {
  const { reviewer, setReviewer } = useContext(ReviewFormContext);
  const user = useUser();
  const handleChangeReviewer = () => {
    if (reviewer === 'Anonymous')
      setReviewer(`${user.firstName} ${user.lastName}`);
    else setReviewer('Anonymous');
  };

  return (
    <Controller
      name="name"
      render={() => (
        <div className="my-4 d-flex justify-content-between">
          <h5>Review as </h5>
          <TextField value={reviewer} disabled={true} />
          <Form.Switch
            id="isAnonymous"
            onChange={handleChangeReviewer}
            value={reviewer}
          />
        </div>
      )}
    />
  );
};
