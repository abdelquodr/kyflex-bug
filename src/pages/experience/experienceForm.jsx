import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Icon, Tab, Tabs, Button } from '../components';
import { IsEmptyInput } from '../funcs';
import {
  faChevronCircleLeft,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { Modal, Form, Nav, Row, Col } from 'react-bootstrap';

/*
    This page is for users to become a host
    list their experience online.

    VARIABLES
    payment: Free for no charge payments,
    Paid for hosts to charge other users who join

    FUNCTIONS
    disable(): This function is used to disable the input box
    from being used.
    enable(): This function is used to enable the input box
    from being used.
    decrease(): This function is used to decrease a number by 1.
    increase(): This function is used to increase a number by 1.
    handleClose(): This function is used to close the pop-up box.
    handleShow(): This function is used to show the pop-up box.
    onActivityNext(): This function is used on the Next button on Activity Page
    to check whether all inputs have been filled out correctly or not. If everything
    has been correctly filled out, it will allow users to proceed to the next page.
    onAddressNext(): This function is used on the Next button on Meeting Address Page
    to check whether all inputs have been filled out correctly or not. If everything
    has been correctly filled out, it will allow users to proceed to the next page.
    onOffersNext(): This function is used on the Next button on Offers Page
    to check whether all inputs have been filled out correctly or not. If everything
    has been correctly filled out, it will allow users to proceed to the next page.
*/

const ExperienceForm = (/*props*/) => {
  // Hooks for the tabs
  const [option, setOption] = useState('Activity Description');

  // Hooks for Page 1 (Activity Description)
  const [activityName, setActivityName] = useState('');
  const [categories, setCategories] = useState('N/A');
  const [description, setDescription] = useState('');

  // Hooks for Page 2 (Meeting Location)
  const [country, setCountry] = useState('N/A');
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  // Hooks for Page 3 (Offers)
  const [payment, setPayment] = useState('');
  const [price, setPrice] = useState('');
  const [groupSize, setGroupSize] = useState(0);
  const [disabled, setDisabled] = useState(true);

  // Function to disable inputBox
  const disable = () => setDisabled(true);

  // Function to enable inputBox
  const enable = () => setDisabled(false);

  // Function to increase number
  const increase = () => setGroupSize(groupSize + 1);

  // Function to decrease number
  const decrease = () => {
    setGroupSize(groupSize - 1);
  };

  // Hooks for Modal
  const [show, setShow] = useState(false);

  // Functions for Modal (pop-up box to confirm)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Link to another page
  const { Link } = Nav;

  // Checks empty inputs when user presses next
  const onActivityNext = () => {
    if (
      IsEmptyInput(activityName) ||
      IsEmptyInput(description) ||
      categories == 'N/A'
    )
      alert('Please fill out empty inputs!');
    else setOption('Meeting Location');
  };

  // Checks empty inputs when user presses next
  const onAddressNext = () => {
    if (
      IsEmptyInput(street) ||
      IsEmptyInput(city) ||
      IsEmptyInput(state) ||
      IsEmptyInput(zip) ||
      country == 'N/A'
    )
      alert('Please fill out empty inputs!');
    else setOption('Schedules');
  };

  // Checks empty inputs when user presses next
  const onOffersNext = () => {
    if (groupSize < 1) alert('Group size must be at least 1!');
    else if (IsEmptyInput(payment)) alert('Please fill out empty inputs!');
    else if (payment == 'Paid' && IsEmptyInput(price))
      alert('Please fill out the price!');
    else setOption('Review');
  };

  return (
    <Tabs>
      {/* PAGE 1 (Activity Description) */}
      <Tab activeKey={option} select_key={'Activity Description'}>
        <div id="experience-form">
          <header>
            <ul className="nav tablet">
              <li className="nav-item">
                <NavLink to="/home">
                  <span className="nav-link">
                    <Icon
                      icon={faChevronCircleLeft}
                      size="1x"
                      color="#28a745"
                    />
                  </span>
                </NavLink>
              </li>
            </ul>
          </header>

          <div className="main-content">
            <section>
              <ul className="nav browser">
                <li className="nav-item">
                  <NavLink to="/home">
                    <span className="nav-link">
                      <Icon
                        icon={faChevronCircleLeft}
                        size="1x"
                        color="#1F9AEC"
                      />
                    </span>
                  </NavLink>
                </li>
              </ul>

              <form>
                <label className="labelStyle">Page 1 of 4</label>
                <h2 className="headerStyle">Host an experience!</h2>

                <Input
                  value={activityName}
                  setState={setActivityName}
                  placeholder="Activity Name"
                />

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control
                    className="emG"
                    onChange={(event) => setCategories(event.target.value)}
                    value={categories}
                    as="select"
                  >
                    <option className="emG">N/A</option>
                    <option>Sports</option>
                    <option>Culinary</option>
                    <option>Nature</option>
                    <option>Game</option>
                    <option>Education</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    className="emG"
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                    as="textarea"
                    rows="4"
                    placeholder="Provide a Brief Description"
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button size="block" onClick={onActivityNext}>
                    Next
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </Tab>

      {/* PAGE 2 (Meeting Location) */}
      <Tab activeKey={option} select_key={'Meeting Location'}>
        <div id="experience-form">
          <header>
            <ul className="nav tablet">
              <li className="nav-item">
                <Link onClick={() => setOption('Activity Description')}>
                  <Icon icon={faChevronCircleLeft} size="1x" color="#28a745" />
                </Link>
              </li>
            </ul>
          </header>

          <div className="main-content">
            <section>
              <ul className="nav browser">
                <li className="nav-item">
                  <Link onClick={() => setOption('Activity Description')}>
                    <Icon
                      icon={faChevronCircleLeft}
                      size="1x"
                      color="#1F9AEC"
                    />
                  </Link>
                </li>
              </ul>

              <form>
                <label className="labelStyle">Page 2 of 4</label>
                <h2 className="headerStyle">Set up the meeting location</h2>

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control
                    className="emG"
                    onChange={(event) => setCountry(event.target.value)}
                    value={country}
                    as="select"
                  >
                    <option className="emG">N/A</option>
                    <option>United States</option>
                    <option>Spain</option>
                    <option>France</option>
                    <option>Indonesia</option>
                    <option>Peru</option>
                  </Form.Control>
                </Form.Group>

                <Input
                  value={street}
                  setState={setStreet}
                  placeholder="Street Address"
                />
                <Input
                  value={apt}
                  setState={setApt}
                  placeholder="Apt. Suite (Optional)"
                />

                <div className="alignment">
                  <div>
                    <Input value={city} setState={setCity} placeholder="City" />
                  </div>

                  <div>
                    <Input
                      value={state}
                      setState={setState}
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <Input
                      value={zip}
                      setState={setZip}
                      placeholder="Zip Code"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <Button size="block" onClick={onAddressNext}>
                    Next
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </Tab>

      {/* PAGE 3 (Schedules) */}
      <Tab activeKey={option} select_key={'Schedules'}>
        <div id="experience-form">
          <header>
            <ul className="nav tablet">
              <li className="nav-item">
                <Link onClick={() => setOption('Meeting Location')}>
                  <Icon icon={faChevronCircleLeft} size="1x" color="#28a745" />
                </Link>
              </li>
            </ul>
          </header>

          <div className="main-content">
            <section>
              <ul className="nav browser">
                <li className="nav-item">
                  <Link onClick={() => setOption('Meeting Location')}>
                    <Icon
                      icon={faChevronCircleLeft}
                      size="1x"
                      color="#1F9AEC"
                    />
                  </Link>
                </li>
              </ul>

              <form>
                <label className="labelStyle">Page 3 of 4</label>
                <h2 className="headerStyle">Schedules</h2>

                <h6 className="d-flex justify-content-left">
                  <span className="emR">*</span>You can always change the
                  schedule later.
                </h6>
                <h6 className="d-flex justify-content-left">
                  <span className="emR">*</span>Unchosen days are considered
                  unavailable.
                </h6>

                <h2 className="scheduleText">1. Choose Availibility Types.</h2>
                <h2 className="scheduleText">
                  2. Tab/Click on Calendar for scheduling.
                </h2>
                <h2 className="scheduleText">
                  3. Tab/Click again for cancelling.
                </h2>
                <h2 className="scheduleText">4. Click Next when done.</h2>

                <div className="d-flex justify-content-center">
                  <Button size="block" onClick={() => setOption('Offers')}>
                    Next
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </Tab>

      {/* PAGE 4 (Offers) */}
      <Tab activeKey={option} select_key={'Offers'}>
        <div id="experience-form">
          <header>
            <ul className="nav tablet">
              <li className="nav-item">
                <Link onClick={() => setOption('Activity Description')}>
                  <Icon icon={faChevronCircleLeft} size="1x" color="#28a745" />
                </Link>
              </li>
            </ul>
          </header>

          <div className="main-content">
            <section>
              <ul className="nav browser">
                <li className="nav-item">
                  <Link onClick={() => setOption('Activity Description')}>
                    <Icon
                      icon={faChevronCircleLeft}
                      size="1x"
                      color="#1F9AEC"
                    />
                  </Link>
                </li>
              </ul>

              <form>
                <label className="labelStyle">Page 4 of 4</label>
                <h2 className="headerStyle">What are your offers?</h2>

                <div className="alignment">
                  <div className="alignment">
                    <div className="form-check form-check-inline">
                      <input
                        onChange={(event) => setPayment(event.target.value)}
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        value="Free"
                        onClick={disable}
                        checked={payment === 'Free' ? true : false}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Free
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        onChange={(event) => setPayment(event.target.value)}
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        value="Paid"
                        onClick={enable}
                        checked={payment === 'Paid' ? true : false}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Paid
                      </label>
                    </div>
                  </div>

                  <div className="d-flex">
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      $
                    </label>
                    <Input
                      value={price}
                      setState={setPrice}
                      disabled={disabled}
                    />
                  </div>
                </div>

                <div className="alignment">
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Maximum Group Size
                  </label>

                  <div className="alignment">
                    <div>
                      <Button size="sm" type="secondary" onClick={decrease}>
                        -
                      </Button>
                    </div>

                    <div>
                      <label
                        className="number"
                        value={groupSize}
                        setState={setGroupSize}
                      >
                        {groupSize}
                      </label>
                    </div>

                    <div>
                      <Button size="sm" type="secondary" onClick={increase}>
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="alignment">
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Attach Related Pictures
                  </label>
                  <div className="d-flex">
                    <Button
                      size="sm"
                      type="secondary"
                      onClick={() => alert('Attach a File!')}
                    >
                      <Icon icon={faPaperclip} size="1x" color="#28a745" />
                    </Button>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <Button size="block" onClick={onOffersNext}>
                    Finish & Review
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </Tab>

      {/* REVIEW PAGE */}
      <Tab activeKey={option} select_key={'Review'}>
        <div id="experience-form">
          <header>
            <ul className="nav tablet">
              <li className="nav-item">
                <Link onClick={() => setOption('Offers')}>
                  <Icon icon={faChevronCircleLeft} size="1x" color="#28a745" />
                </Link>
              </li>
            </ul>
          </header>

          <div className="main-content">
            <section>
              <ul className="nav browser">
                <li className="nav-item">
                  <Link onClick={() => setOption('Offers')}>
                    <Icon
                      icon={faChevronCircleLeft}
                      size="1x"
                      color="#1F9AEC"
                    />
                  </Link>
                </li>
              </ul>

              <form>
                <label className="labelStyle">Review page</label>
                <h2 className="headerStyle">Review your listing!</h2>

                <Row xs="2">
                  <Col>
                    <label className="labelReview">Activity Title</label>
                  </Col>
                  <Col className="inputReview">
                    <label className="inputReview">{activityName}</label>
                  </Col>

                  <Col>
                    <label className="labelReview">Category</label>
                  </Col>

                  <Col>
                    <label className="inputReview">{categories}</label>
                  </Col>

                  <Col>
                    <label className="labelReview">Brief Description</label>
                  </Col>

                  <Col>
                    <label className="inputReview">{description}</label>
                  </Col>

                  <Col>
                    <label className="labelReview">Meeting Address</label>
                  </Col>

                  <Col>
                    <label className="inputReview">
                      {street} {apt} {city} {state} {zip} {country}
                    </label>
                  </Col>

                  <Col>
                    <label className="labelReview">Maximum Group Size</label>
                  </Col>

                  <Col>
                    <label className="inputReview">{groupSize}</label>
                  </Col>

                  <Col>
                    <label className="labelReview">Price</label>
                  </Col>

                  <Col>
                    <label className="inputReview">{price}</label>
                  </Col>
                </Row>

                <div className="d-flex justify-content-center">
                  <Button variant="primary" onClick={handleShow}>
                    Finish
                  </Button>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm to submit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure to do this?</Modal.Body>
                    <Modal.Footer>
                      <Button type="secondary" onClick={handleClose}>
                        No
                      </Button>
                      <Button onClick={() => alert('Clicked Yes')}>Yes</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </form>
            </section>
          </div>
        </div>
      </Tab>
    </Tabs>
  );
};

export { ExperienceForm };
