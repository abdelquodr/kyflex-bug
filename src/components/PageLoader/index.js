import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  & {
    top: 0px;
    left: 0px;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: #33333399;
  }

  .content {
    color: #fff;
  }
`;

const PageLoader = ({loading}) => {
  return loading && (
    <Wrapper>
      <p className='content'>Loading...</p>
    </Wrapper>
  );
};

export default PageLoader;
