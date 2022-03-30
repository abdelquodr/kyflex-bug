import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormControl, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


const SearchBar = React.forwardRef(function SearchBar(
  {
    className,
    value,
    onChange = (e) => {
      value = e.target.value;
    },
    landing,
    ...props
  },
  ref
) {
  const { t } = useTranslation();
  let history = useHistory();

  const onSearch = (e) => {
    e.preventDefault();
    if (!value) {
      history.push(`/findexperience/`);
    } else {
      history.push(`/searchresults/?title=${value}`);
    }
  };

  return (
    <Form
      className={`${className} d-flex flex-nowrap search-bar__container align-items-center`}
      {...props}
      onSubmit={onSearch}
    >
      <FormControl
        ref={ref}
        className={`search-bar__input ${
          landing ? 'search-bar__input--landing' : ''
        }`}
        placeholder={t('Search_anything')}
        value={value}
        onChange={onChange}
      />
      <Button
        className={'search-bar__button'}
        variant="danger"
        onClick={onSearch}
      >
        Search
      </Button>
    </Form>
  );
});

export { SearchBar };
