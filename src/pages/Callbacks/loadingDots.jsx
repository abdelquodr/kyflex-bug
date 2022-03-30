import React from 'react';
import styled from 'styled-components';

const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 0.75s infinite;
    content: '.';
    width: 2em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '';
    }
    20% {
      content: '.';
    }
    40% {
      content: '..';
    }
    60% {
      content: '...';
    }
    100% {
      content: '....';
    }
  }
`;

export default (props) => {
  return <Dots style={{ margin: 'auto' }}>{props.children}</Dots>;
};
