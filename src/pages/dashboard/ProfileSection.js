import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateUser } from '../../contexts/UserContext';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import { StyledBtn } from '../../components/buttons';
import ColorVars from '../../sass/colors.scss';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/EditOutlined';
import { Paper, Grid, makeStyles } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Moment from 'moment';
import { DashboardHeader } from '../../components';
import { IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../../store/actions/accounts.actions';

const InfoRow = ({ label, children }) => {
  return (
    <Grid item container xs={12} spacing={2}>
      <Grid item xs={12} sm={12} md={3} className="font-weight-bold">
        {label}
      </Grid>
      <Grid item xs={12} sm={12} md={9}>
        {children}
      </Grid>
    </Grid>
  );
};

const ProfileSectionWithData = () => {
  const { profile: user } = useSelector(state => state.accounts);
  const userEndpoint = `/users/${user.id}/`;
  const profileEndpoint = `/profile/${user?.customer_profile?.pk}`;

  const updateUser = useUpdateUser();

  const [profile, setProfile] = useState(user.customer_profile || {});
  useEffect(() => {
    window.scrollTo(0, 0);
    if (user && user.customer_profile) {
      setProfile(user.customer_profile);
    }
  }, [user, profile]);

  if (user) {
    return (
      <ProfileSection
        data={user}
        profile={profile}
        saveEndpoints={{ userEndpoint, profileEndpoint }}
        onSave={updateUser}
      />
    );
  }

  return <>loading....</>;
};

export { ProfileSectionWithData };

const formStyles = makeStyles({
  root: {
    boxShadow: 'none',
    borderTop: 'none',
  },
});
const required = (value) => (value ? undefined : 'Required');
const validate = (values) => {
  const errors = {};
  const emailReg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailReg.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (values.birthday >= Date.now()) {
    errors.birthday = 'Invalid birthday';
  }
  if (!values.apt) values = { ...values, apt: '' };
  return errors;
};

const CustomTextField = ({
  type,
  label,
  placeholder,
  input,
  meta,
  multiline,
  rows,
  readOnly,
}) => {
  return (
    <>
      <TextField
        {...input}
        type={type}
        label={label ? label : null}
        placeholder={placeholder}
        multiline={multiline}
        rowsMax={4}
        fullWidth
        inputProps={{
          readOnly: readOnly ? readOnly : false,
          style: { fontSize: '1.2rem', lineHeight: '1.5rem' },
        }}
        InputProps={{
          disableUnderline: readOnly || false,
        }}
      />
      {meta.error && meta.touched && (
        <div className="field-error">{meta.error}</div>
      )}
    </>
  );
};

const materialTheme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    root: {
      primary: ColorVars.mainKyflexColor,
    },

    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: `2px solid ${ColorVars.lightGray}`,
          transition: 'none',
        },
        '&:after': {
          borderBottom: `2px solid ${ColorVars.mainKyflexColor}`,
          transition: 'none',
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid ${ColorVars.lightGray}`,
        },
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: ColorVars.mainKyflexColor,
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: ColorVars.mainKyflexColor,
        '&:hover': {
          backgroundColor: ColorVars.mainKyflexColor,
        },
      },
    },
    MuiTypography: {
      colorPrimary: {
        color: ColorVars.mainKyflexColor,
      },
    },
    MuiButton: {
      textPrimary: {
        color: ColorVars.mainKyflexColor,
      },
    },
    MuiInputBase: {
      input: {
        fontSize: '1.2rem',
      },
    },
  },
});

const CustomDatePickerField = (props) => {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...fields
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <ThemeProvider theme={materialTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          {...fields}
          name={name}
          placeholder="MM-dd-yyyy"
          format="MM-dd-yyyy"
          helperText={showError ? meta.error || meta.submitError : undefined}
          error={showError}
          inputProps={restInput}
          onChange={onChange}
          value={value === '' ? null : value}
          InputProps={{
            disableUnderline: fields.readOnly,
            style: {
              width: '150px',
            },
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
            style: {
              margin: 0,
              padding: 0,
            },
          }}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

const ProfileSection = ({ data = {}, profile = {}, saveEndpoints, onSave }) => {
  const classes = formStyles();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState();
  // const { userEndpoint, profileEndpoint } = saveEndpoints;

  const { t } = useTranslation();
  const { first_name, last_name, email, birthday } = data;
  const {
    apt,
    city,
    state,
    rating,
    street,
    country,
    zip_code,
    description,
    phone_number,
    num_of_reviews,
  } = profile;

  const sanitizedBirthday = new Date(birthday);
  sanitizedBirthday.setMinutes(
    sanitizedBirthday.getMinutes() + sanitizedBirthday.getTimezoneOffset()
  );

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, [setEditing]);

  const handleCancel = useCallback(
    (form) => {
      form.reset();
      setEditing(false);
    },
    [setEditing]
  );

  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    if (!values.apt || values.apt === '') {
      values = { ...values, apt: 'N/A' };
    }

    try {
      await dispatch(updateProfile({
        ...values,
        birthday: Moment(values.birthday).format('YYYY-MM-DD').toString(),
      }));
      await dispatch(getProfile());
    } catch (error) {
      // TODO: handle error
    } finally {
      setEditing(false);
    }

    // apiClient
    //   .put(userEndpoint, {
    //     ...values,
    //     birthday: Moment(values.birthday).format('YYYY-MM-DD').toString(),
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     if (res) {
    //       onSave(res.data);
    //     }
    //   })
    //   .catch((err) => console.log(err));
    // apiClient
    //   .put(profileEndpoint, {
    //     ...values,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));

    // setEditing(false);
  };

  return (
    <Grid container spacing={2} className="mb-4">
      <Grid item xs={12}>
        <DashboardHeader/>
      </Grid>
      <Grid item xs={12}>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            first_name,
            last_name,
            email: email,
            birthday: sanitizedBirthday,
            phone_number,
            description: description,
            street: street,
            apt: apt,
            city: city,
            state: state,
            country: country,
            zip_code,
          }}
          validate={validate}
          render={({
            handleSubmit,
            form,
            reset,
            submitting,
            pristine,
            values,
            errors,
          }) => (
            <form
              onSubmit={(event) => {
                const promise = handleSubmit(event);
                promise &&
                  promise.then(() => {
                    form.reset();
                  });
                return promise;
              }}
            >
              <Paper className={classes.root}>
                <Grid item container xs={12} spacing={0}>
                  <Grid item xs={9} />
                  <Grid
                    item
                    xs={3}
                    className="d-flex flex-row justify-content-end align-items-center"
                  >
                    {!editing ? (
                      <IconButton disableRipple>
                        <EditIcon
                          onClick={handleEdit}
                          className="edit-icon text-muted"
                        />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <CloseIcon
                          disableRipple
                          onClick={() => handleCancel(form)}
                          className="close-icon text-muted"
                        />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
                <Grid container alignItems="flex-start" spacing={2}>
                  <InfoRow label="First name">
                    <Field
                      validate={required}
                      fullWidth
                      name="first_name"
                      component={CustomTextField}
                      type="text"
                      readOnly={!editing}
                    />
                  </InfoRow>
                  <InfoRow label="Last name">
                    <Field
                      validate={required}
                      fullWidth
                      name="last_name"
                      component={CustomTextField}
                      type="text"
                      readOnly={!editing}
                    />
                  </InfoRow>
                  <InfoRow label="Birthday">
                    <Grid item xs={12}>
                      <Field
                        validate={required}
                        name="birthday"
                        component={CustomDatePickerField}
                        readOnly={!editing}
                      />
                    </Grid>
                  </InfoRow>
                  <InfoRow label="Email">
                    <Field
                      validate={required}
                      fullWidth
                      required
                      name="email"
                      component={CustomTextField}
                      type="emailv"
                      placeholder="abc@mail.com"
                      readOnly={!editing}
                    />
                  </InfoRow>
                  <InfoRow label="Phone number">
                    <Field
                      fullWidth
                      required
                      name="phone_number"
                      placeholder="N/A"
                      component={CustomTextField}
                      type="number"
                      readOnly={!editing}
                    />
                  </InfoRow>

                  <InfoRow label="Description">
                    <Field
                      fullWidth
                      required
                      name="description"
                      placeholder="N/A"
                      component={CustomTextField}
                      type="text"
                      multiline={description != ''}
                      readOnly={!editing}
                    />
                  </InfoRow>
                  <InfoRow label="Address">
                    <Grid item container spacing={1}>
                      <Grid item xs={12}>
                        <Field
                          validate={required}
                          fullWidth
                          required
                          name="street"
                          component={CustomTextField}
                          type="text"
                          label={editing ? 'Street' : null}
                          readOnly={!editing}
                        />
                      </Grid>
                      {(editing || (!editing && apt !== 'N/A')) && (
                        <Grid item xs={12}>
                          <Field
                            fullWidth
                            name="apt"
                            placeholder="Apt (optional)"
                            component={CustomTextField}
                            type="text"
                            label={editing ? 'Apt (optional)' : null}
                            readOnly={!editing}
                          />
                        </Grid>
                      )}
                      <Grid item container spacing={0}>
                        <Grid item xs={3}>
                          <Field
                            validate={required}
                            fullWidth
                            required
                            name="city"
                            component={CustomTextField}
                            type="text"
                            label={editing ? 'City' : null}
                            readOnly={!editing}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Field
                            validate={required}
                            fullWidth
                            required
                            name="state"
                            component={CustomTextField}
                            type="text"
                            label={editing ? 'State' : null}
                            readOnly={!editing}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Field
                            validate={required}
                            fullWidth
                            required
                            name="country"
                            component={CustomTextField}
                            type="text"
                            label={editing ? 'Country' : null}
                            readOnly={!editing}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Field
                            validate={required}
                            fullWidth
                            required
                            name="zip_code"
                            component={CustomTextField}
                            type="text"
                            label={editing ? 'Zipcode' : null}
                            readOnly={!editing}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </InfoRow>

                  {editing && (
                    <Grid item container spacing={1} className="mt-4">
                      <Grid item xs={6}>
                        <StyledBtn
                          title="Discard"
                          onClick={() => handleCancel(form)}
                          style={{
                            width: '100%',
                            backgroundColor: ColorVars.btnBgGray,
                            color: ColorVars.textBlackColor,
                            textTransform: 'uppercase',
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <StyledBtn
                          title="Save changes"
                          type="submit"
                          style={{
                            color: ColorVars.white,
                            width: '100%',
                            textTransform: 'uppercase',
                          }}
                          disabled={submitting || pristine}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </form>
          )}
        />
      </Grid>
    </Grid>
  );
};
