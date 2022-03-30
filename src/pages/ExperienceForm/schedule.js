import React, { useState } from 'react';
import { isPast } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { v4 as uuidV4 } from 'uuid';
import { InputAdornment, TextField } from '@material-ui/core';

import { ExperienceScheduler } from '../../components';
import {Availability} from './availability';
import { FormHelperText } from '@material-ui/core';

function Schedule({values, errors, setFieldValue, handleChange}) {
  console.log({values})
  const { t } = useTranslation();
  const [currentAvailabilityView, setCurrentAvailabilityView] = useState('regular');
  const handleCommitChanges = ({ added, changed, deleted }) => {
    let isInvalid = false;
    let availability = [
      ...values.availability[currentAvailabilityView],
    ];
    if (added) {
      isInvalid = isPast(added.startDate)  || isPast(added.endDate);
      if (!isInvalid) {
        const diffMs = added.endDate - added.startDate;
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        added.duration = diffMins;
        const startingAddedId = uuidV4();
        const isRecurring = !!added.rRule;
        const rRule = added.rRule;
        availability.push({ ...added, id: startingAddedId, isRecurring, rRule });
      }
    } else if (changed) {
      const ids = Object.keys(changed);
      ids.forEach((itemId) => {
        const index = availability.findIndex(({ id }) => id === itemId);
        const changedValues = changed[itemId];
        isInvalid = (
          (
            changedValues.startDate && isPast(changedValues.startDate)
          ) || (
            changedValues.endDate && isPast(changedValues.endDate)
          )
        );
        if (!isInvalid) {
          availability[index] = {
            ...availability[index],
            ...changedValues,
          };
        }
      });
    }
    if (deleted) {
      const index = availability.findIndex(({ id }) => id === deleted);
      availability.splice(index, 1);
    }
    if (isInvalid) {
      // TODO: handle past date selection better
      alert('Neither start date nor end date can be set in the past');
    } else {
      setFieldValue('availability', {
        ...values.availability,
        [currentAvailabilityView]: availability,
      });
    }
  };

  return (
    <div className="schedule__box">
      <h3>Schedule a time for your experience</h3>
      <div className="schedule__box-right">
        <ol className="schedule__box-right-steps">
          <li className="schedule__box-right-step">
            {t('Click on Calendar to schedule your availability')}
          </li>
          <li className="schedule__box-right-step">
            {t('Click again to undo your availability')}
          </li>
          <li className="schedule__box-right-step">
            {t('Choose how long the experience duration will be')}
          </li>
        </ol>
        <div>
          <p className="schedule__box-right-heading">
            <span> *</span> {t('You can always change the schedule later')}
          </p>
          <p className="schedule__box-right-heading">
            {' '}
            <span> *</span>
            {t('Unchosen days are considered unavailable')}
          </p>
        </div>
        <TextField
          className="mb-4"
          error={errors.duration}
          type="number"
          label="Duration"
          placeholder="Activity Duration"
          helperText={errors.duration}
          variant="outlined"
          value={values.duration}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">mins</InputAdornment>
              ),
            }}
          name='duration'
        />
      </div>
      <Availability
        availability={values.availability}
        setCurrentView={(value) => setCurrentAvailabilityView(value)}
      />
      <ExperienceScheduler
        schedulerData={values.availability[currentAvailabilityView]}
        height={620}
        onCommitChanges={handleCommitChanges}
        editable
      />
      <FormHelperText error={true}>
        {
          errors.availability?.on_demand || errors.availability?.regular || errors.availability?.unavailable
        }
      </FormHelperText>
    </div>
  );
}

export { Schedule };
