import React, { useEffect } from 'react';
import { TeamProfiles } from '../../data';
import { TeamProfile } from '../../components';
import { Jumbotron } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Team.styles.scss';

/*
    This is Team page.
    How to use this page:
        1. Import this page on top of file.
            import {Team} from '../pages' #path may vary

        2. in the function.
            <Team/>
*/

const Team = () => {
  const { t } = useTranslation();

  const RenderTeamProfiles = () => {
    return TeamProfiles.map((each) => {
      const { id, name, position, image } = each;
      return (
        <TeamProfile key={id} name={name} position={position} image={image} />
      );
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section id="team" className="team">
      <Jumbotron className="team-about">
        <div id="text">
          <h2>{t('Meet our Team')}</h2>
          <p>
            {t('We connect the world one experience at a time.')}
            <br />
            {t('We work tirelessly to bring you the platform where you host')}
            <br />
            {t('and enjoy your favorite experience.')}
          </p>
        </div>
      </Jumbotron>
      <section className="team-content">{RenderTeamProfiles()}</section>
    </section>
  );
};

export { Team };
