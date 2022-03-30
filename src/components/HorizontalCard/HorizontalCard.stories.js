import React from 'react';

import { HorizontalCard as Card } from './HorizontalCard';
import Dummy from 'dummyjs';

import { Image } from 'react-bootstrap';

export default {
  title: 'components/HorizontalCard',
  component: Card,
};

export const Default = () => (
  <Card>
    <Card.Image>
      <Image roundedCircle src={Dummy.img(150, 150)} />
    </Card.Image>
    <Card.Body>
      <Card.Title bold>{Dummy.text(9999)}</Card.Title>
      <Card.Content>
        <div>{Dummy.text(20)}</div>
        <div>{Dummy.text(20)}</div>
        <div>{Dummy.text(20)}</div>
      </Card.Content>
    </Card.Body>
  </Card>
);
