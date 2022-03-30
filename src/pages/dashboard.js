import React, { useState } from 'react';
import { SampleUserDashboardProfile as Profile } from '../data';
import { ShowExperience, ShowBookings } from '../funcs';
import {
  Footer,
  Rating,
  Tabs,
  Tab,
  Progressblock,
  SearchBar,
  Button,
} from '../components';
import { Jumbotron, Navbar, Nav } from 'react-bootstrap';

/*
    This page is where user views his performance stats and other information.
*/

const Dashboard = (props) => {
  const { funcs, lang } = props;
  const [option, setOption] = useState('Performance/Stats');

  const {
    name,
    image,
    rating,
    description,
    account_balance,
    response_rate,
    performance_stat,
    totalReview,
    total_transactions,
    active_experiences,
    pending_bookings,
    bookings,
    _30days_bookings,
  } = Profile;
  const { _1star, _2star, _3star, _4star, _5star } = performance_stat;

  const renderOptionCSS = (chosen, option) => {
    return option === chosen ? 'option chosen' : 'option';
  };

  const { Brand, Toggle, Collapse } = Navbar;
  const { Link } = Nav;
  return (
    <div id="dashboard">
      <div className="main-content">
        <Jumbotron id="user-profile">
          <section id="user-profile-bio">
            <img src={image} alt="profile" />
            <div>
              <h2>{name}</h2>
              <p>
                <Rating rating={rating} size="1x" /> {rating} / 5.0 <br />
                {description}
              </p>
              <Button size="lg" onClick={() => alert('Profile')}>
                View Profile
              </Button>
              <Button size="lg" onClick={() => alert('fund added')}>
                Add Fund
              </Button>
            </div>
          </section>
          <section id="user-profile-etc">
            <ul className="list-group list-group-flush">
              <li className="list-group-item empty-space" />
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h3>Account Balance</h3>
                <span className="badge badge-primary badge-pill">
                  {account_balance}$
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center" />
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h3>Response Rate</h3>
                <span className="badge badge-primary badge-pill">
                  {response_rate}%
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-center align-items-center" />
            </ul>
          </section>
        </Jumbotron>
        <Navbar
          className="bootstrap-search-bar"
          id="user-dashboard-selector"
          bg="light"
          expand="xl"
        >
          <Brand className="tablet">
            <h4>{option}</h4>
          </Brand>
          <Toggle aria-controls="basic-navbar-nav" />
          <Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav>
              <Link onClick={() => setOption('Performance/Stats')}>
                <span className={renderOptionCSS('Performance/Stats', option)}>
                  Performance/Stats
                </span>
              </Link>
              <Link onClick={() => setOption('Total Reviews')}>
                <span className={renderOptionCSS('Total Reviews', option)}>
                  Total Reviews
                </span>
              </Link>
              <Link onClick={() => setOption('Total Transactions')}>
                <span className={renderOptionCSS('Total Transactions', option)}>
                  Total Transactions
                </span>
              </Link>
              <Link onClick={() => setOption('Active Experience(s)')}>
                <span
                  className={renderOptionCSS('Active Experience(s)', option)}
                >
                  Active Experience(s)
                </span>
              </Link>
              <Link onClick={() => setOption('Pending Bookings')}>
                <span className={renderOptionCSS('Pending Bookings', option)}>
                  Pending Bookings
                </span>
              </Link>
              <Link onClick={() => setOption('Bookings')}>
                <span className={renderOptionCSS('Bookings', option)}>
                  Bookings
                </span>
              </Link>
              <Link onClick={() => setOption('30-day Bookings')}>
                <span className={renderOptionCSS('30-day Bookings', option)}>
                  30-day Bookings
                </span>
              </Link>
            </Nav>
          </Collapse>
        </Navbar>
        <Tabs>
          <Tab activeKey={option} select_key={'Performance/Stats'}>
            <Progressblock degree={_1star} header={'1 Star Reviews'} />
            <Progressblock degree={_2star} header={'2 Star Reviews'} />
            <Progressblock degree={_3star} header={'3 Star Reviews'} />
            <Progressblock degree={_4star} header={'4 Star Reviews'} />
            <Progressblock degree={_5star} header={'5 Star Reviews'} />
          </Tab>
          <Tab activeKey={option} select_key={'Total Reviews'}></Tab>
          <Tab
            id="experience-tab"
            activeKey={option}
            select_key={'Total Transactions'}
          >
            <br />
            <SearchBar data={total_transactions} />
          </Tab>
          <Tab
            id="experience-tab"
            activeKey={option}
            select_key={'Active Experience(s)'}
          >
            <br />
            {ShowExperience(active_experiences)}
          </Tab>
          <Tab activeKey={option} select_key={'Pending Bookings'}>
            {ShowBookings('pending', pending_bookings)}
          </Tab>
          <Tab activeKey={option} select_key={'Bookings'}>
            {ShowBookings('own', bookings)}
          </Tab>
          <Tab activeKey={option} select_key={'30-day Bookings'}>
            {ShowBookings('30-day', _30days_bookings)}
          </Tab>
        </Tabs>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export { Dashboard };
