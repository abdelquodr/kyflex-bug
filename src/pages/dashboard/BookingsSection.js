import React from 'react';
import { SampleForSearch } from '../../data';
import { Button, ExperienceCard } from '../../components';
import { Row, Col } from 'react-bootstrap';

const BookingExperience = ({ data }) => {
  return data.map((datum) => {
    const { id } = datum;
    return (
      <Col
        xs={6}
        key={id}
        className="d-flex flex-row justify-content-center py-3"
      >
        <ExperienceCard experience={datum} />
      </Col>
    );
  });
};

const BookingExperienceWithData = () => {
  return (
    <Row>
      <BookingExperience data={SampleForSearch} />
    </Row>
  );
};

export { BookingExperienceWithData };
