import React from 'react';
import { FormHelperText } from "@material-ui/core";
import styled, { css } from 'styled-components';


const Wrapper = styled(FormHelperText)`
  & {
    font-weight: 400 !important;
    ${props => props.fontSize && css`
      font-size: ${props => props.fontSize || '.6rem'} !important;
    `}
  }
`;

const FormError = ({text, fontSize}) => {
  return text ? (
    <Wrapper error={true} fontSize={fontSize}>
      <span>{text}</span>
    </Wrapper>
  ) : null;
};

export default FormError;
