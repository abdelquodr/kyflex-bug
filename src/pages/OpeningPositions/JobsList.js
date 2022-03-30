import React from 'react';
import Role from './Role';
import { roles } from '../../data'

const JobsList = ({ job }) => {
  const filterRole = roles.filter(role => role.profession === job || role.jobType === job)
  return (
    <div>
      <p>Roles</p>
      {
        filterRole.map((role, index) => <Role datum={role} key={index} />)
      }
    </div>
  );
};

export default JobsList;