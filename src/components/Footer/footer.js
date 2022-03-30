import React from 'react';
import { Logo } from '../../assets';
import { SNN_links, NavLinks } from '../../data';
import { Link } from 'react-router-dom';
import { Icon } from '..';
import { useIsLoggedIn } from '../../hooks';
import colorVars from '../../sass/colors.scss';

const {
  //parsing
  about,
  experience,
  support,
  join_us,
} = NavLinks;

/*
    This file contains footer component, Bootstrap-based custom component.
    Renewed!
*/

const Footer = () => {
  const isLoggedIn = useIsLoggedIn();

  const RenderNavLinks = (header, data) => {
    return (
      <section className="footer-body-nav_links">
        <h5 className="nav-header">{header}</h5>
        <ul id="nav-block1" className="nav flex-column">
          {data.map((datum) => {
            const { id, text, end_point } = datum;

            if (isLoggedIn && end_point === 'dashboard')
              return (
                <li key={id} className="nav-item">
                  <Link className="nav-link" to={`/${end_point}`}>
                    {text}
                  </Link>
                </li>
              );
            else if (!isLoggedIn && end_point === 'dashboard') return null;
            else if (!isLoggedIn && end_point === 'signin')
              return (
                <li key={id} className="nav-item">
                  <Link className="nav-link" to={`/${end_point}`}>
                    {text}
                  </Link>
                </li>
              );
            else if (isLoggedIn && end_point === 'signin') return null;
            else
              return (
                <li key={id} className="nav-item">
                  <Link className="nav-link" to={`/${end_point}`}>
                    {text}
                  </Link>
                </li>
              );
          })}
        </ul>
      </section>
    );
  };

  const RenderSNNLinks = (data) => {
    return (
      <ul className="nav justify-content-center">
        {data.map((datum) => {
          const { id, icon, end_point } = datum;

          return (
            <li key={id} className="nav-item">
              <a className="nav-link" target="_blank" href={end_point}>
                <Icon icon={icon} size="2x" color={colorVars.mainKyflexColor} />
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  const year = new Date().getFullYear();
  return (
    <footer>
      <section id="footer-body">
        <div id="footer-body-nav_links_block">
          <img id="footer-body-main_logo" src={Logo} />
          {RenderNavLinks('About', about)}
          {RenderNavLinks('Experience', experience)}
          {RenderNavLinks('Support', support)}
          {RenderNavLinks('Join Us', join_us)}
        </div>
        <div id="footer-body-snn_links">
          {RenderSNNLinks(SNN_links)}
          <sub id='footer-body_copyright'>&copy; {year} KyFlex. All Rights Reserved.</sub>
        </div>
      </section>
    </footer>
  );
};

export { Footer };
