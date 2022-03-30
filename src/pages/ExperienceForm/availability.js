import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export function Availability({ availability, setCurrentView }) {
  const [availType, setAvailType] = useState(
    (Object.entries(availability).find(([_, value]) => {
      return value?.length > 0;
    }) || [])[0] || 'regular');

  const handleChange = (_, newAvail) => {
    setAvailType(newAvail); // update availability type
  };

  useEffect(() => {
    setCurrentView(availType);
  }, [availType]);

  return (
    <Grid
      container
      spacing={4}
      direction="column"
      alignItems="center"
      className="availtype mt-2 mb-4 justify-content-center"
    >
      <Grid item xs={12} className="availType">
        <ToggleButtonGroup
          size="medium"
          value={availType}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="on_demand" disabled={availType === 'on_demand'}>
            On_Demand
          </ToggleButton>
          <ToggleButton value="regular" disabled={availType === 'regular'}>
            Regular
          </ToggleButton>

          {/* <ToggleButton
            value="unavailable"
            disabled={availType === 'unavailable'}
          >
            Unavailable
          </ToggleButton> */}
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}
