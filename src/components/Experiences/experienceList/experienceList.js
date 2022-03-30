import React from 'react';
import { ExperienceCard } from '..';

const ExperienceList = ({ experience }) => {
  return experience?.map((datum) => {
    const { id } = datum;
    return <ExperienceCard key={id} experience={datum} />;
  });
};

export { ExperienceList };
