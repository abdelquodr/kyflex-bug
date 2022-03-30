import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Rating } from '../../';
import { useHistory } from 'react-router-dom';

import './SearchResults.styles.scss';

function SearchResultCard({ experience }) {
  let history = useHistory();

  function handleOnClick(e) {
    e.preventDefault();
    history.push(`/experience/${experience.id}`);
  }

  return (
    <Row className="search-result-card" onClick={handleOnClick}>
      <Col
        className="search-image"
        style={{ backgroundImage: `url(${experience && experience.image  && experience.image.data && experience.image.data.length && experience.image.data[0].imagePath})` }}
      ></Col>
      <Col className="search-content">
        <Row className="search-title">
          <Col>{experience.title}</Col>
          <Col>
            <Rating rating={experience.rating} />
          </Col>
        </Row>
        <Row className="search-subtitle">{experience.category}</Row>
        <Row className="search-body">{experience.description}</Row>
      </Col>
    </Row>
  );
}

export { SearchResultCard };
