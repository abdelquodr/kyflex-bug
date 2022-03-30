import React, { useState, useEffect, useCallback } from 'react';
import {
  ExperienceList,
  LandingBlock,
} from '../../components';
import FindExperienceImage from '../../assets/images/back_of_mans_head.png';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import { isEmptyObject } from '../../lib/utils';
import { useDispatch } from 'react-redux';
import { fetchExperiences } from '../../store/actions/experience.actions';

const EXPERIENCES_PER_PAGE = process.env.REACT_APP_EXPERIENCES_PER_PAGE;

const FindExperience = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [experiences, setExperiences] = useState(null);
  const [experienceList, setExperienceList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setExperienceList(experiences?.results || []);
  }, [experiences]);

  const getExperiences = useCallback(async () => {
    try {
      const data = await dispatch(fetchExperiences());
      setExperiences(data);
    } catch (error) {
      // TODO: handle error
    }
  }, []);

  useEffect(() => {
    getExperiences();
  }, [getExperiences]);

  // Load More Experiences functionalities ////////////////////////
  const [loadAllExperiences, setLoadAllExperiences] = useState([]);
  const [experiencePerClick, setExperiencePerClick] =
    useState(EXPERIENCES_PER_PAGE);

  const loadSlicedExperiences = (start, end) => {
    if (
      !isEmptyObject(loadAllExperiences) &&
      end - start + 1 >= experienceList.length
    )
      return; // all experience loaded
    const slicedExperiences = experienceList.slice(start, end);
    setLoadAllExperiences(slicedExperiences);
  };

  useEffect(() => {
    loadSlicedExperiences(0, experiencePerClick);
  }, [experienceList]);

  const handleLoadMoreExperiences = () => {
    loadSlicedExperiences(0, experiencePerClick);
    setExperiencePerClick(experiencePerClick + experiencePerClick);
  };

  return (
    <div id="findExperience">
      <LandingBlock
        background={FindExperienceImage}
        title="Find Your True Experience"
      />

      <Grid container className="findExperience">
        <Grid item container className="findExperience-new_this_week my-4">
          <Grid item xs={12}>
            <h3>{t('New This Week')}</h3>
          </Grid>
          <Grid item container className="justify-content-center">
            <ExperienceList experience={experienceList.slice(0, 7)} />
          </Grid>
        </Grid>

        <Grid item container className="findExperience-popular_now my-4">
          <Grid item xs={12}>
            <h3>{t('Popular Experiences')}</h3>
          </Grid>
          <Grid item container className="justify-content-center">
            <ExperienceList experience={experienceList.slice(0, 7)} />
          </Grid>
        </Grid>

        <Grid item container className="findExperience-all my-4">
          <Grid item xs={12}>
            <h3>{t('All Experiences')}</h3>
          </Grid>
          <Grid item container className="justify-content-center">
            <ExperienceList experience={loadAllExperiences} />
          </Grid>
        </Grid>
      </Grid>

      <div
        className="mb-5 d-flex justify-content-center btn-loadmore"
        onClick={handleLoadMoreExperiences}
      >
        Load more
      </div>
    </div>
  );
};

export { FindExperience };
