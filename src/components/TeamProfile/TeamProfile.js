import React from 'react';
import './TeamProfile.styles.scss';

/*
    This component shows team member profile
    Parameter:
        -name = name of the member
        -position =  position of the member
        -image = image of the member

    How to use:
        ex)
            <TeamProfile
                name={name}
                position={position}
                image={image}
            />
*/

const TeamProfile = (props) => {
  const { name, position, image } = props;

  return (
    <div className="team-people-profile">
      <img src={image} alt={`${name} profile`} />
      <section className="overlay">
        <div className="text">
          <h2>{name}</h2>
          <p>{position}</p>
        </div>
      </section>
    </div>
  );
};

export { TeamProfile };
