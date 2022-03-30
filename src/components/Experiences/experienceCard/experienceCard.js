import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Carousel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './experienceCard.scss';
import { moneyFormatter } from '../../../lib/numberFormatter';
import { Rating } from '../../fontawesomeType';
import { IconButton, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';



const ExperienceCard = ({ children, experience, rating, author }) => {
  const { id, host, title, price, duration, city, state, pictures } =
    experience;
  const { t } = useTranslation();

  console.log(experience)

  return (
    <> 
        <Card className="experience-block">
          <Carousel
            className="carousel-size"
            indicators={false}
            interval={null}
          >
            {pictures &&
              pictures.map(({ id, image }) => (
                <Carousel.Item key={id} className="carouselBlock">
                  <img className="cropped" src={image} alt={image} loading="lazy" />
                </Carousel.Item>
              ))}
          </Carousel>
          <Link
              to={`/experience/${id}/edit`}
              style={{ color: 'black', textDecoration: 'none' }}
            >
              <Grid
                item
                xs={3}
                className="d-flex flex-row justify-content-end align-items-center"
              >
                <IconButton disableRipple>
                  <EditIcon
                    // onClick={}
                    className="edit-icon text-muted"
                  />
                </IconButton>
              </Grid>
            </Link>

            <Link
            to={`/experience/${id}`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
          <Card.Body className="experience-block_info">
            <Card.Text className="font-weight-bold experience-block__title">
              {title}
            </Card.Text>
            {author && (
              <Card.Text className="mb-0 experience-block__text">
                {host}
              </Card.Text>
            )}
            <Card.Text className="mb-0 experience-block__text">
              <Rating rating={4.5} /> {4.2} / 5.0 ({123})
            </Card.Text>
            <Card.Text className="mb-0 experience-block__text">
              {moneyFormatter(price)} • {duration} {t('hrs')}
            </Card.Text>
            {city && state && (
              <Card.Text className="experience-block__text__location">
                {city}, {state}
              </Card.Text>
            )}
          </Card.Body>
          </Link>
        </Card>
      {children}
    </>
  );
};

export { ExperienceCard };
