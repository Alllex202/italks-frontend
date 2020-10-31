import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  roundedInput: {
    transition: '.1s all',
    border: '1px solid #828588',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#000000',
    borderRadius: '32px',
    outline: 'none',
    padding: '8px 16px',
    width: '100%',
    '&::placeholder': {
      color: '#828588',
    },
    '&:focus': {
      border: '3px solid #1E40FF',
      padding: '6px 14px',
    },
    '&:disabled': {
      border: '1px solid #D2D3D4',
      color: '#D2D3D4',
      '&::placeholder': {
        color: '#D2D3D4',
      }
    }
  }
});

const RoundedInput = (props) => {
  const classes = useStyle();

  return (
    <input
      className={classNames(classes.roundedInput, props.className)}
      type={props.type}
      autoComplete={props.autoComplete}
      maxLength={props.maxLength}
      autoFocus={props.autoFocus}
      placeholder={props.placeholder}
      disabled={props.disabled}
      onChange={props.onChange}
      value={props.value}
    />
  )
};

export default RoundedInput;
