import React from 'react';
import { useParams } from 'react-router';
import { roles } from '../../data';
import './CareerDetails.styles.scss';
import RoomIcon from '@material-ui/icons/Room';
import { StyledLinkBtn } from '../../components/buttons';
import { Container, Grid, Typography } from '@material-ui/core';

const CareerDetails = () => {
  const { id } = useParams();
  console.log(id)
  const position = roles.find(role => role.url === id);
  const {
    jobTitle,
    location,
    jobNumber,
    jobType,
    datePosted,
    profession,
    description,
    responsibilities,
    basicQualification,
    preferredQualifications
  } = position;
  return (
    <div>
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
          <Grid item md={6} xs={12} >
            <Typography>Job number: {jobNumber}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography>Job type: {jobType}</Typography>
          </Grid>
        </Grid>
        <hr />

        <Grid container>
          <Grid item md={6} xs={12}>
            <Typography>Date posted: {datePosted}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography>Profession: {profession}</Typography>
          </Grid>
        </Grid>
        <hr />

        <div >
          <h5>Description</h5>
          <Typography>{description}</Typography>
        </div>

        <div className="mt-3">
          <h5>Responsibilities</h5>
          <Typography>{responsibilities.map((list, index) => <li key={index}>{list}</li>)}</Typography>
        </div>

        <div className="mt-3">
          <h5>Basic Qualification</h5>
          <Typography>{basicQualification.map((list, index) => <li key={index}>{list}</li>)}</Typography>
        </div>

        <div className="mt-3 mb-5">
          <h5>Preferred Qualifications</h5>
          <Typography>{preferredQualifications.map((list, index) => <li key={index}>{list}</li>)}</Typography>
        </div>

        <div className="d-flex justify-content-center mb-5">
          <StyledLinkBtn href={`/apply/${id}`} title="Apply now" />
        </div>
      </Container>
    </div>
  );
};

export default CareerDetails;