import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from 'react-router-dom';
import './Role.styles.scss';

const Role = ({ datum }) => {
  const { url, jobTitle, location } = datum;
  return (
    <div className='role'>
      <Link to={`/career-details/${url}`} className="role-link">
        <div className="d-flex justify-content-between">
          <h4>{jobTitle}</h4>
          <ArrowForwardIosIcon />
        </div>
      </Link>
      <p>{location}</p>
    </div>
  );
};

export default Role;