import React from 'react';

const HorizontalCard = (props) => (
  <div className="horizontal-card" {...props} />
);

const Image = (props) => (
  <div className="horizontal-card__image-container" {...props} />
);

const Title = ({ children, bold, big, ...props }) => (
  <div
    className={`
		horizontal-card__title
		${bold ? 'horizontal-card__title--bold' : ''}
		${big ? 'horizontal-card__title--big' : ''}
	`}
    {...props}
  >
    {children}
  </div>
);

const Content = (props) => (
  <div className="horizontal-card__content" {...props} />
);

const Body = (props) => <div className="horizontal-card__body" {...props} />;

Object.assign(HorizontalCard, {
  Content,
  Title,
  Image,
  Body,
});

export { HorizontalCard };
