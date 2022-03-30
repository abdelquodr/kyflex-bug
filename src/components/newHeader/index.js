import React, { useEffect, useState, useCallback } from 'react';
import { Navbar, Dropdown, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Logo } from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, SearchBar, NavLink, SearchElement } from '../.';
import CookiesData from '../../data/cookies.data';
import { logout, setIsHost } from '../../store/actions/accounts.actions';

const NewHeader = ({ showSearch, fixed = 'top' }) => {
  // prettier-ignore
  const headerVisibleClassName = showSearch || window.location.pathname !== '/home' ? 'newheader__search--visible' : '';
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { profile: user, isHost } = useSelector(state => state.accounts);
  const fullName = [user?.first_name || '', user?.last_name || ''].join(' ').trim();
  const isLoggedIn = !!CookiesData.getAccessToken();
  const profileId = user?.customer_profile?.pk;

  const logUserOut = () => {
    dispatch(logout());
    history.replace('/home');
  };

  const updateIsHost = (e) => {
    e.preventDefault();
    dispatch(setIsHost(!isHost));
  };

  const [windowWidth, setWindowWidth] = useState();
  const [toggleSearchDropdown, setToggleSearchDropdown] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const onWindowResize = useCallback(function () {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [onWindowResize]);

  useEffect(() => {
    setImgUrl(user?.uploaded_picture || user?.picture);
  }, [user]);

  return (
    <>
      <Navbar
        className={'newheader--main-bg d-flex flex-row justify-content-between'}
        fixed={fixed}
      >
        <Nav>
          <Navbar.Brand className={'d-flex'}>
            <NavLink to="/home">
              <img
                src={Logo}
                alt="logo"
                className={'newheader__brand-logo d-inline-block'}
              />
              {windowWidth > 700 ? (
                <h3 className="bold d-inline-block mx-2">{t('KyFlex')}</h3>
              ) : (
                ''
              )}
            </NavLink>
          </Navbar.Brand>
        </Nav>

        {showSearch && <SearchElement
          windowWidth={windowWidth}
          headerVisibleClassName={headerVisibleClassName}
          toggleSearchDropdown={toggleSearchDropdown}
          setToggleSearchDropdown={setToggleSearchDropdown}
        />}

        <Nav>
          {!isLoggedIn ? (
            <>
              <NavLink to="/signin">{t('Sign_In')}</NavLink>
              <NavLink to="/register">{t('Sign_Up')}</NavLink>
            </>
          ) : (
            <Dropdown>
              <Dropdown.Toggle
                className="flex-nowrap"
                bsPrefix="dropdown"
                variant="transparent"
              >
                {windowWidth > 700 ? (
                  <span className="mx-1">{fullName}</span>
                ) : (
                  ''
                )}

                <Avatar imgUrl={imgUrl} size={30} />
              </Dropdown.Toggle>

              <Dropdown.Menu
                alignRight="true"
                // alignRight has depreciated, but it works for us because we have an older version. The new syntax currently does not work on our version, but if we ever update, or if this stops working, the new syntax will be: align='right'.
                // For more info, check the docs: https://react-bootstrap.github.io/components/dropdowns/#dropdown-menu-props
              >
                {windowWidth < 700 ? (
                  <div
                    className="mx-1"
                    style={{
                      fontWeight: '600',
                      textAlign: 'center',
                    }}
                  >{fullName}</div>
                ) : (
                  ''
                )}

                <Link component={Dropdown.Item} to="/findexperience">
                  {t('Find experience')}
                </Link>
                {isHost && (
                  <Link component={Dropdown.Item} to="/experience/new">
                    {t('Host experience')}
                  </Link>
                )}
                <hr />

                {isHost && (
                  <Link
                    component={Dropdown.Item}
                    to={`/profile/${profileId}`}
                  >
                    {t('Public profile')}
                  </Link>
                )}
                <Link component={Dropdown.Item} to="/dashboard">
                  {t('Message center')}
                </Link>
                <Link component={Dropdown.Item} to="/dashboard">
                  {t('Dashboard')}
                </Link>
                <hr />
                <Link
                  component={Dropdown.Item}
                  to="/"
                  onClick={updateIsHost}
                >
                  {t(
                    `Switch to ${
                      isHost ? 'Customer' : 'Host'
                    }`
                  )}
                </Link>
                <Dropdown.Item onClick={logUserOut}>
                  {t('Sign_Out')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Nav>
      </Navbar>
      {toggleSearchDropdown && window.innerWidth < 700 ? (
        <>
          <div id="dropdown-search-bar" data-aos="fade-down">
            <SearchBar
              style={{ margin: '1rem' }}
              className={`newheader__search newheader__search--visible`}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export { NewHeader };
