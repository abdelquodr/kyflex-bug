import React, { lazy, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CategoryBlock } from '../../components';
import { SampleCategories } from '../../data';
import { LandingBlock } from '../../components/LandingBlock/LandingBlock';
import LandingBg from '../../assets/images/landingbg.jpg';
import { Grid } from '@material-ui/core';
import Paging from '../../components/Paging/Paging';
import { CONTENT_PER_PAGE } from '../../components/ContentPerPage/ContentPerPage';
import { Suspense } from 'react-is';
import { fetchExperiences } from '../../store/actions/experience.actions';

const LazyExperienceList = lazy(() =>
  import('../../components').then((module) => ({
    default: module.ExperienceList,
  }))
);

const Home = ({ searchRef }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [displayPopularExp, setDisplayPopularExp] = useState([]);
  const [experiencesPerPage] = useState(CONTENT_PER_PAGE.DESKTOP);
  const [experiences, setExperiences] = useState(null);
  const { loading } = useSelector(state => state.experience);

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


  // get experience per page
  const lastExperience = page * experiencesPerPage;
  const firstExperience = lastExperience - experiencesPerPage;
  const currentExperience = displayPopularExp?.slice(
    firstExperience,
    lastExperience
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (experiences) {
      setDisplayPopularExp(experiences.results);
    }
  }, [experiences]);

  const RenderCategories = (data) =>
    data.map((datum) => {
      const { id } = datum;
      return (
        <div key={id} className="home-categories-item mx-auto">
          <CategoryBlock categories={datum} />
        </div>
      );
    });

  return (
    <div id="home">
      <LandingBlock
        ref={searchRef}
        background={LandingBg}
        title="Looking For Experience"
        hasSearchBar={true}
      />

      <Grid container className="home m-5">
        <Grid item container id="home-popular_now" className="home-popular_now">
          <Grid item xs={12}>
            <h3>{t('Popular_Now')}</h3>
          </Grid>
          {displayPopularExp?.pictures ? (
            <h1>Experience loading</h1>
          ) : (
            <>
              <Grid item container xs={12} className="justify-content-center">
                <Suspense fallback={<div>Loading experiences...</div>}>
                  <LazyExperienceList experience={currentExperience} />
                </Suspense>
              </Grid>
              <Grid item container xs={12} className="justify-content-center">
                {!loading && (
                  <Paging
                    setPage={setPage}
                    totalData={displayPopularExp?.length}
                    totalPages={experiencesPerPage}
                  />
                )}
              </Grid>
            </>
          )}
        </Grid>

        <Grid item container className="home-categories my-4">
          <Grid item xs={12}>
            <h3>{t('Categories')}</h3>
          </Grid>
          <Grid item container>
            {RenderCategories(SampleCategories)}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export { Home };
