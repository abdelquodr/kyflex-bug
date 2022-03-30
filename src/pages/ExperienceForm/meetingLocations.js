import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Maps from '../../components/Maps';
import { useGeocode } from '../../hooks/useGeocode';
import { Marker } from '@react-google-maps/api';
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Paper,
  makeStyles,
  TextField,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  selectRegion: {
    marginBottom: '2rem',
  },
  selectState: {
    marginBottom: '2rem',
  },
  zipCode: {
    marginBottom: '2rem',
  },
  inputLabel: {
    fontFamily: ['Archivo', 'sans-serif'],
  },
  input: {
    marginBottom: '2rem',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '14rem',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& > *': {
        width: '100%',
      },
    },
  },
}));

function MeetingLocations({ values, errors, touched, handleChange }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const regions = ['Select a Country', 'US', 'Canada', 'England'];
  const states = ['Select a State', 'PA', 'NJ', 'MA', 'CA'];
  const { coordinates, setAddress } = useGeocode(
    'T-Mobile Park, 1st Avenue South, Seattle, WA'
  );

  useEffect(() => {
    if (
      values.apt &&
      values.street &&
      values.country &&
      values.street &&
      values.city &&
      values.state &&
      values.zip_code
    ) {
      setAddress(
        `${values.apt}, ${values.street}, ${values.city}, ${values.state}, ${values.country}`
      );
    }
  }, [values.apt, values.street, values.city, values.state, values.country]);

  return (
    <div className={classes.root}>
      <div className="meetingLocation__map">
        <h3>Where are you hosting this experience?</h3>
        <Paper variant="outlined" elevation={3}>
          <Maps className="w-70 h-40" center={coordinates}>
            <Marker position={coordinates} />
          </Maps>
        </Paper>
      </div>
      <div className="meetingLocation__form">
        <TextField
          className={classes.input}
          error={errors.apt}
          type="text"
          name="apt"
          label="Address"
          placeholder="Address"
          helperText={errors.apt || ""}
          variant="outlined"
          value={values.apt}
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          error={errors.street}
          type="text"
          name="street"
          label="Address Line 2"
          placeholder="Apt, Suite, etc..."
          helperText={errors.street}
          variant="outlined"
          value={values.street}
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          error={errors.city}
          type="text"
          label="City"
          name="city"
          placeholder="City"
          helperText={errors.city}
          variant="outlined"
          value={values.city}
          onChange={handleChange}
        />
        <div className={classes.formGroup}>
          <FormControl
            variant="outlined"
            error={errors.state}
          >
            <InputLabel name="state" className={classes.inputLabel}>
              State
            </InputLabel>
            <Select
              labelId="state"
              label="State"
              name="state"
              error={errors.state}
              helperText={errors.state}
              className={classes.selectState}
              value={values.state}
              onChange={handleChange}
            >
              {states.map((state, i) => (
                <MenuItem key={i} value={i === 0 ? '' : state}>
                  <em>{t(state)}</em>
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.state}
            </FormHelperText>
          </FormControl>
          <TextField
            name="zip_code"
            className={classes.zipCode}
            error={errors.zip_code}
            type="text"
            label="Zip Code"
            placeholder="zipCode"
            helperText={errors.zip_code}
            variant="outlined"
            value={values.zip_code}
            onChange={handleChange}
          />
          <FormControl
            className={classes.selectRegion}
            variant="outlined"
            error={errors.country}
          >
            <InputLabel name="country" className={classes.inputLabel}>
              Select a Country/Region
            </InputLabel>
            <Select
              labelId="country"
              label="Country"
              name="country"
              value={values.country}
              onChange={handleChange}
            >
              {regions.map((region, i) => (
                <MenuItem key={i} value={i === 0 ? '' : region}>
                  <em>{t(region)}</em>
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.country}
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export { MeetingLocations };
