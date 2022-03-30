import { Container } from 'react-bootstrap';
import { SearchResultsList } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { PrimaryButton } from './../../components/buttons';
import { StringParam, useQueryParam } from 'use-query-params';
import React, { useState, useEffect, useCallback } from 'react';
import { fetchExperiences } from '../../store/actions/experience.actions';


function SearchResults() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [query] = useQueryParam('title', StringParam);
  const { loading } = useSelector(state => state.experience);
  const [experiences, setExperiences] = useState(null);

  const getExperiences = useCallback(async () => {
    try {
      const data = await dispatch(fetchExperiences({ title: query.toLowerCase() }));
      setExperiences(data);
    } catch (error) {
      // TODO: handle error
    }
  }, [query]);

  useEffect(() => {
    getExperiences();
  }, [query, getExperiences]);

  return (
    <Container fluid>
      <Container>
        {loading ? (
          'Loading...'
        ) : (
          <SearchResultsList data={experiences?.results || []} />
        )}
        <div style={{textAlign: 'center', marginBottom: 10}}>
        {experiences && Math.ceil(experiences.count / 25) > page && <PrimaryButton loading={loading} onClick={() => setPage(page=> page+=1)}>Load More</PrimaryButton>}
        </div>
      </Container>
    </Container>
  );
}

export default SearchResults;
