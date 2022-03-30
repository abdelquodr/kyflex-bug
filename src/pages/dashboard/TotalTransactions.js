import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
  useLocation,
  Redirect,
} from 'react-router-dom';
import { Container, Row, Col, Div } from 'react-bootstrap';

import { SampleForSearch } from '../../data/sample';
import { HorizontalCard } from '../../components';

const Card = ({ imgUrl, rating, totalReviews, name, description, balance }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <Card.Image>
        <div className="dashboard-header__image-container">
          <Image
            className="dashboard-header__image"
            src={imgUrl}
            roundedCircle
            alt={name}
          />
          <div className="dashboard-header__image-overlay">
            <FontAwesomeIcon icon={faCameraRetro} size="2x" />
            <p className="dashboard-header__image-container__text">
              {t('Change_Photo')}
            </p>
          </div>
        </div>
      </Card.Image>
      <Card.Body>
        <Card.Title bold big>
          {name}
        </Card.Title>
        <div>
          <Rating rating={rating} size="18x" /> {rating} / 5.0 ({totalReviews})
        </div>
        <Card.Content>
          {description}
          <div>
            <span className="font-weight-bold">{t('Current_Balance')}:</span> $
            {balance}
          </div>
        </Card.Content>
      </Card.Body>
    </Card>
  );
};

const TotalTransactions = () => {
  return (
    <>
      <Container>
        <Row></Row>
      </Container>
    </>
  );
};

export { TotalTransactions };
