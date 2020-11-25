import React from 'react';

import {stylesDictionary as SD} from '../../settings/styles';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  roundedInput: {
    transition: '.1s all',
    border: `1px solid ${SD.basic.colors.main.grey}`,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: SD.basic.colors.main.black,
    borderRadius: '32px',
    outline: 'none',
    padding: '8px 16px',
    width: '100%',
    '&::placeholder': {
      color: SD.basic.colors.main.grey,
    },
    '&:focus': {
      border: `3px solid ${SD.basic.colors.main.blue}`,
      padding: '6px 14px',
    },
    '&:disabled': {
      border: `1px solid ${SD.basic.colors.main.greyLight}`,
      color: SD.basic.colors.main.greyLight,
      '&::placeholder': {
        color: SD.basic.colors.main.greyLight,
      }
    }
  }
});

const RoundedInput = ({
  className,
  type,
  autoComplete,
  maxLength,
  autoFocus,
  placeholder,
  disabled,
  onChange,
  value,
  id,
  name
}) => {
  const classes = useStyle();

  return (
    <input
      className={classNames(classes.roundedInput, className)}
      type={type}
      autoComplete={autoComplete}
      maxLength={maxLength}
      autoFocus={autoFocus}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      value={value}
      id={id}
      name={name}
    />
  )
};

export default RoundedInput;
