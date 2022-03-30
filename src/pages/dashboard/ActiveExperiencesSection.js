import React, { useEffect, useState } from 'react';
import { ExperienceCard } from '../../components';
import { Row, Col } from 'react-bootstrap';
import apiClient from '../../lib/apiClient';
import { isEmptyObject } from '../../lib/utils';
import { useSelector } from 'react-redux';

const ActiveExperiencesSection = ({ data }) => {
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

const ActiveExperiencesSectionWithData = () => {
  const { loading, profile: user } = useSelector(state => state.accounts);

  const [myExperiences, setMyExperiences] = useState([]);
  useEffect(()=>{
    if (isEmptyObject(myExperiences)) {
      apiClient.get(`/experiences/?host=${user?.id}`)
        .then(res=>setMyExperiences(res.data.results))
        .catch(error=>console.log(error))
    }
  },[user]);

  return (
    <Row>
      {!isEmptyObject(myExperiences) ? <ActiveExperiencesSection data={myExperiences} /> : <>No experience found ...</>}
    </Row>
  );
};

export { ActiveExperiencesSectionWithData };
