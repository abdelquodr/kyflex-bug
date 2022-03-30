import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export const DateTimePicker = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        value={currentDate}
        onChange={setCurrentDate}
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
      />
    </MuiPickersUtilsProvider>
  );
};
