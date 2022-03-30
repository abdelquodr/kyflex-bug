import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Item } from './Item';
import { useTranslation } from 'react-i18next';

const WhatIsSection = ({ data }) => {
  const { t } = useTranslation();

  return (
    <section className="what-is" id="what-is-kyflex">
      <Container>
        <Row className="text-center d-inline p-3">
          <h3>{t('Whats_KyFlex')}</h3>
        </Row>

        <Row>
          {data.map((datum) => (
            <Item key={datum.id} contents={datum} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export { WhatIsSection };
