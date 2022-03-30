import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { styled, withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import colorVariables from '../sass/colors.scss';
import { useHistory } from 'react-router-dom';

// custom style button template
export const useBtnStyles = makeStyles({
  root: {
    fontFamily: '"Open Sans", sans-serif',
    background: ({ backgroundColor }) =>
      backgroundColor || colorVariables.mainKyflexColor,
    color: ({ color }) => color? color : colorVariables.white,
    fontSize: ({ fontSize }) =>
      fontSize ? `${parseFloat(fontSize)}rem` : '1rem',
    border: 'none',
    outline: 'none !important',
    opacity: '90%',
    padding: '0.4rem 1.2rem',
    '&:hover': {
      backgroundColor: ({ backgroundColor }) =>
        backgroundColor || colorVariables.mainKyflexColor,
      color: ({ color }) => color || colorVariables.white,
      opacity: '100%',
    },
    borderRadius: ({ borderRadius, fontSize }) =>
      borderRadius? borderRadius : ( fontSize
        ? `${parseFloat(0.3 / fontSize) * 0.3}rem`
        : '0.9rem'),
    textTransform: ({ textTransform }) => textTransform || 'none',
    fontWeight: ({ textTransform }) =>
      textTransform === 'uppercase' ? 'bold' : 'normal',
    width: ({ width }) => width || 'auto',
    '&:disabled': {
      backgroundColor: ({ backgroundColor }) =>
        backgroundColor || colorVariables.darkMainKyFlexColor,
      color: ({ color }) => color || colorVariables.white,
      opacity: '70%',
    }
  },
  link: { '&:hover': { textDecoration: 'none' } },
  disabledBtn: {
    color: 'black',
    backgroundColor: 'gray',
  }
});

const decodeBtnSize = (props) => {
  if (props && props.size && isNaN(props.size)) {
    switch (props.size) {
      case 'md':
        // medium btn
        props = { ...props, style: {...props.style, fontSize: '1.2rem'} };
        break;
      case 'lg':
        //  large btn
        props = { ...props, fontSize: '1.5rem' };
        break;
      case 'sm':
        // small btn
        props = { ...props, fontSize: '1rem' };
        break;
      default:
        break;
    }
  }
  return props;
};

export const StyledLinkBtn = (props) => {
  const history = useHistory();
  const {style, ...rest} = {...props};
  props = decodeBtnSize(props);
  const classes = useBtnStyles({...props?.style, ...props});
  return (
    // <Link href={(props && props.href) || '#'} className={classes.link}>
      <Button
        {...props}
        className={`${props.className} ${classes.root}`}
        disableRipple
        href={(props && props.href) || '#'}
      >
        {props.title}
      </Button>
    // </Link>
  );
};

export const StyledBtn = (props) => {
  const {style, ...rest} = {...props};
  props = decodeBtnSize(props);
  const classes = useBtnStyles({...props?.style, ...props});
  return (
    <Button
      {...rest}
      className={`${rest.className? rest.className : ''} ${classes.root}`}
      disableRipple
    >
      {rest.title}
      <span>{props.children}</span>
    </Button>
  );
};

export const PrimaryButton = styled(Button)({
  background: 'linear-gradient(#fb5012 100%, #FFFFFF 100%)',
  border: 'none',
  borderRadius: 4,
  color: 'white',
  outline: 'none !important',
  '&:disabled': {
    color: 'white !important',
    backgroundColor: 'linear-gradient(#fb5012 100%, #FFFFFF 100%)',
    opacity: '0.6'
  },
  width: '80px',
});

export const DangerButton = styled(Button)({
  // border: '1px solid #FF0000',
  borderRadius: 3,
  color: '#EB251E',
  outline: 'none !important',
  fontSize: '1.2rem',
  fontWeight: 'normal',
  '&:disabled': {
    color: '#818181 !important',
  },
  border: '1px solid #EB251E',
  '&:hover': {
    border: '1px solid #EB251E',
  },
  width: '95px',
});

export const PayButton = styled(Button)({
  // border: '1px solid #FF0000',
  borderRadius: 3,
  color: '#000000',
  outline: 'none !important',
  fontSize: '1.2rem',
  fontWeight: 'normal',
  '&:disabled': {
    color: '#818181 !important',
  },
  border: '1px solid #000000',
  '&:hover': {
    border: '1px solid #000000',
  },
  width: '95px',
});

export const SuccessButton = styled(Button)({
  // border: '1px solid #0000ff',
  borderRadius: 3,
  color: '#0000FF',
  outline: 'none !important',
  fontSize: '1.2rem',
  fontWeight: 'normal',
  backgroundColor: '#E7E7E7',
  '&:disabled': {
    color: '#818181',
  },
  opacity: '70%',
});
