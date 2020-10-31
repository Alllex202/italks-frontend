import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  roundedButton: {
    border: '1px solid #6D1EFF',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    borderRadius: '32px',
    outline: 'none',
    width: '100%',
    color: '#6D1EFF',
    '&:focus, &:hover': {
      backgroundColor: 'rgba(109, 30, 255, 0.1)',
    },
    '&:active': {
      backgroundColor: '#6D1EFF',
      color: '#FFFFFF',
    },
  },
});

const RoundedButton = (props) => {
  const classes = useStyle();

  return (
    <button className={classNames(classes.roundedButton, props.className)} />
  )
};

export default RoundedButton;
