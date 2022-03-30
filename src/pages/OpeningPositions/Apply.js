import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { Grid, TextField, makeStyles, Container, Input, FormControlLabel, Checkbox } from "@material-ui/core";
import { StyledBtn } from "../../components";
import colorVars from '../../sass/colors.scss';
import { useParams } from "react-router";
import RoomIcon from '@material-ui/icons/Room';
import { roles } from '../../data';
import './Apply.styles.scss';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#fb5012',
    color: '#FFFFFF',
    fontSize: '1rem',
    border: 'none',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.25rem',
    '&:hover': {
      color: '#fc1837',
      textDecoration: 'none',
    },
  },
  contactUs: {
    padding: '0',
    margin: '0',
    maxWidth: '100%',
  },
  contactUsContent: {
    width: '100%',
    justifyContent: 'center',
    padding: '0 2rem',
    maxWidth: '960px',
    margin: '2rem auto',
  },
  contactUsForm: {
    width: '100%',
  },
  accordionHeading: {
    background: 'lightgray',
  }
});

const Apply = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  const [confirmed, setConfirmed] = useState(false);
  const [showTextArea, setShowTextArea] = useState('none');

  const handlefileSubmit = (event) => {
    console.log('Triger', event.target.file);
  }

  const handleTextArea = () => {
    if (showTextArea === 'none') {
      setShowTextArea('block');
    }
    else {
      setShowTextArea('none');
    }
  }

  const handleCheckboxChange = (event) => {
    if (event.currentTarget.checked) {
      setConfirmed(true);
    } else {
      setConfirmed(false);
    }
  }


  const { id } = useParams();
  const position = roles.find(role => role.url === id);
  const {
    jobTitle,
    location,
  } = position;
  return (
    <>
      <div className="position-header">
        <Container maxWidth="md" className="d-flex justify-content-between">
          <div className="header-content">
            <h1>{jobTitle}</h1>
            <p><RoomIcon fontSize="small" /> {location}</p>
          </div>

          <div>
            <svg width="65" height="232" viewBox="0 0 65 232" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 232L52 116L0 0H11L65 116L13.5 232H0Z" fill="white" fill-opacity="0.2" />
            </svg>
            <svg width="65" height="232" viewBox="0 0 65 232" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 232L52 116L0 0H11L65 116L13.5 232H0Z" fill="white" fill-opacity="0.2" />
            </svg>
          </div>
        </Container>
      </div>
      <Container maxWidth="md">

        <Grid container className="mt-5">
          <Grid item container>
            <form
              id="contact-form"
              className={classes.contactUsForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid item container spacing={2}>
                <Grid item xs={12} md={6}>
                  <label>First Name</label>
                  <TextField
                    name="user_name"
                    required={true}
                    placeholder="First Name"
                    autoComplete="name"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <label>Last Name</label>
                  <TextField
                    name="user_name"
                    required={true}
                    placeholder="Last Name"
                    fullWidth
                    autoComplete="name"
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                  />
                </Grid>

                <Grid item xs={12}>
                  <label>Email</label>
                  <TextField
                    name="user_email_address"
                    required={true}
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                  />
                </Grid>

                <Grid item xs={12}>
                  <label>Phone number</label>
                  <TextField
                    name="user_phone_number"
                    required={true}
                    type="phone"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                  />
                </Grid>

                {/* ////// resume and cover letter upload /////// */}
                <Grid item xs={12} >
                  <label>Resume</label><br />
                  <label htmlFor="file-upload-id" className="file-label" >Attach,</label>
                  <input type="file" className="file-upload-input" id="file-upload-id" onChange={handlefileSubmit} />

                  <label htmlFor="resume-past-id" className="file-label" onClick={handleTextArea}>Past</label><br />
                  <textarea style={{ display: showTextArea }} id="resume-past-id" />
                </Grid>

                <Grid item xs={12}>
                  <label>Cover Letter</label><br />
                  <label htmlFor="file-upload-id" className="file-label" onChange={handlefileSubmit}>Attach,</label>
                  <input type="file" className="file-upload-input" id="file-upload-id" />

                  <label htmlFor="resume-past-id" className="file-label" onClick={handleTextArea}>Past</label><br />
                  <textarea style={{ display: showTextArea }} id="resume-past-id" />
                </Grid>

                <Grid item container>
                  <label>Experience</label>
                  <Grid item container>
                    <Grid item container spacing={2}>
                      <Grid item xs={6}>
                        <h6>Job title</h6>
                        <TextField
                          name="job-title"
                          required
                          fullWidth
                          variant="outlined"
                          color="primary"
                          inputRef={register}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <h6>Company</h6>
                        <TextField
                          name="company"
                          required
                          fullWidth
                          variant="outlined"
                          color="primary"
                          inputRef={register}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container className="mt-3">
                      <Grid item xs={6}>
                        <h6 className="date-text">From</h6>
                        <TextField
                          name="from"
                          required
                          type="date"
                          variant="standard"
                          color="primary"
                          inputRef={register}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <h6 className="date-text ml-2">To</h6>
                        <TextField
                          name="to"
                          required
                          type="date"
                          variant="standard"
                          color="primary"
                          inputRef={register}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>


                <Grid item xs={12}>
                  <label>Description</label>
                  <TextField
                    name="description"
                    fullWidth={true}
                    variant="outlined"
                    color="primary"
                    multiline={true}
                    rows="8"
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>LinkedIn (optional)</label>
                  <TextField
                    name="linkedin"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                  />
                </Grid>

                <Grid item xs={12}>
                  <label>Website (optional)</label>
                  <TextField
                    name="Website"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox
                      onChange={handleCheckboxChange}
                    />
                    }
                    label="** I hereby declare that the information provided is true and correct. I understand that any willful dishonesty may render for refusal of this application or immediate termination of employment."
                  />
                </Grid>


                <Grid item container className="d-flex justify-content-center mb-5">
                  <StyledBtn
                    type="submit"
                    title="Review & Submit"
                    backgroundColor={colorVars.mainKyflexColor}
                    textTransform="uppercase"
                    disabled={!confirmed}
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Apply;