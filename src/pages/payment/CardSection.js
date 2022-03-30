/**
 * Use the CSS tab above to style your Element's container.
 */
import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import './CardSectionStyles.scss';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '1.5rem',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CardSection = () => {
  return (
    <div>
      <h2 className="text-left mt-4">Payment information</h2>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </div>
  );
};

export { CardSection };
