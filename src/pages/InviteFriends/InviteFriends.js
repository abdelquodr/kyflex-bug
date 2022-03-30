import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import MuiPhoneNumber from 'material-ui-phone-number';
import { PrimaryButton } from '../../components/buttons';
import { LandingBlock } from '../../components/LandingBlock/LandingBlock';
import LandingBg from '../../assets/images/main.jpg';
import './style.scss';


export const InviteFriends = () => {
  const [PhoneNumber, setPhoneNumber] = useState('');
  const handleInputPhone = (phone) => {
    setPhoneNumber(phone);
  };
  const handleInvite = () => {
    if (PhoneNumber == '') return;
    alert(`Invite ${PhoneNumber}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <LandingBlock
        background={LandingBg}
        title="Invite Friends"
        hasSearchBar={false}
      />
      <Container className="invite-friends">
        <Row xs={12} sm={12} md={12} lg={12} className="caption">
          <h3>Share amazing experiences and beyond with your friends</h3>
        </Row>
        <Row
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className="media-icons w-50 mx-auto"
        >
          <Col lg={1}>
            <a href="">
              <EmailIcon />
            </a>
          </Col>
          <Col lg={1}>
            <a href="">
              <FacebookIcon />
            </a>
          </Col>
          <Col lg={1}>
            <a href="">
              <LinkedInIcon />
            </a>
          </Col>
          <Col lg={1}>
            <a href="">
              <InstagramIcon />
            </a>
          </Col>
          <Col lg={1}>
            <a href="">
              <TwitterIcon />
            </a>
          </Col>
        </Row>
        <Row className="divider"></Row>
        <Row xs={12} sm={12} md={12} lg={12} className="caption">
          <h4>Text your invitation</h4>
        </Row>
        <Row xs={12} sm={12} md={12} lg={12} className="phone-section mx-auto">
          <Col lg={4}>
            <MuiPhoneNumber
              defaultCountry={'us'}
              value={PhoneNumber}
              onChange={(PhoneNumber) => handleInputPhone(PhoneNumber)}
              style={{ width: '100%', fontSize: '3rem' }}
            />
          </Col>
          <Col lg={2}>
            <PrimaryButton
              onClick={handleInvite}
              style={{ width: '100%' }}
              className="my-2"
            >
              Invite
            </PrimaryButton>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
