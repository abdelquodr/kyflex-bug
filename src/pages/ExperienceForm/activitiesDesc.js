import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core';
import FormError from '../../components/FormError';


const useStyles = makeStyles((theme) => ({
  select: {
    marginBottom: '2rem',
    fontFamily: ['Archivo', 'sans-serif'],
    minWidth: '12rem',
  },
  inputLabel: {
    fontFamily: ['Archivo', 'sans-serif'],
  },
  input: {
    marginBottom: '2rem',
    fontFamily: ['Archivo', 'sans-serif'],
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));

function ActivitiesDescription({ values, touched, errors, handleChange }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const categories = [
    'Select a Category',
    'Travel',
    'Beauty',
    'Food',
    'Fashion',
    'Fitness',
    'Sports',
    'Finance',
    'Hybrid'
  ];

  return (
    <div className="activitiesDesc__form">
      <h3>Tell us about your experience</h3>
        <TextField
          className={classes.input}
          error={errors.title || ''}
          type="text"
          name='title'
          label="Title"
          placeholder="Activity Name"
          helperText={errors.title || ''}
          variant="outlined"
          value={values.title}
          onChange={handleChange}
        />
      <FormError text={touched.title && errors.title} />
      <div className={classes.formGroup}>
        <FormControl
          className={classes.select}
          variant="outlined"
          error={errors.category}
        >
          <InputLabel    className={classes.inputLabel}>
            Select a Category
          </InputLabel>
          <Select
            name='category'
            value={values.category}
            onChange={handleChange}
          >
            {categories.map((category, i) => (
              <MenuItem key={category} value={i === 0 ? '' : category}>
                {t(category)}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText>
            {errors.category && errors.category}
          </FormHelperText>
        </FormControl>
        <TextField
          className={classes.input}
          error={errors.price || ''}
          type="number"
          label="Price"
          name='price'
          placeholder="Price"
          helperText={errors.price || ''}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">$</InputAdornment>
            ),
          }}
          value={values.price}
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          error={errors.max_group_size}
          type="number"
          name='max_group_size'
          label="Max Group Size"
          placeholder="Max Group Size"
          helperText={errors.max_group_size || ''}
          variant="outlined"
          value={values.max_group_size}
          onChange={handleChange}
        />
      </div>
      <TextField
        className={classes.input}
        error={errors.description || ''}
        type="text"
        name='description'
        label="Description"
        placeholder="Provide a Brief Description"
        helperText={errors.description || ''}
        multiline
        rows={4}
        variant="outlined"
        value={values.description}
        onChange={handleChange}
      />
      <TextField
        className={classes.input}
        error={errors.requirements || ''}
        type="text"
        name='requirements'
        label="Requirements"
        placeholder="Provide requirements for the experience"
        helperText={errors.requirements || ''}
        multiline
        rows={4}
        variant="outlined"
        value={values.requirements}
        onChange={handleChange}
      />
    </div>
  );
}

export { ActivitiesDescription };
