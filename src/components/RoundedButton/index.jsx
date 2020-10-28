import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  rootRoundedButton: {
    borderRadius: '32px',
    border: '1px solid #6D1EFF',
    // width: 'auto',
    // height: 48,
    transition: '.2s all',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(109, 30, 255, 0.1)',
    },
    '&:active': {
      backgroundColor: '#6D1EFF',
      '& span': {
        color: '#FFFFFF',
      },
      '& path': {
        fill: '#FFFFFF',
      }
    }
  },
  labelRoundedButton: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    textTransform: 'none',
    color: '#6D1EFF',
  },
  iconRoudedButton: {
    '& path': {
      fill: '#6D1EFF',
    },
    '& svg': {
      width: 14,
      height: 14,
    },
  },
  '@media (max-width: 1599px)': {
    labelRoundedButton: {
      fontSize: '14px',
      lineHeight: '16px',
    },
    iconRoudedButton: {
      '& svg': {
        width: 14,
        height: 14,
      },
    }
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const RoundedButton = ({ children, className = '' }) => {
  const classes = useStyles();

  return (
    <Button
      endIcon={(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 17L9.6 15.6L12.2 13H2L2 11L12.2 11L9.6 8.4L11 7L16 12L11 17ZM20 5H12V3L20 3C21.1 3 22 3.9 22 5L22 19C22 20.1 21.1 21 20 21L12 21V19L20 19L20 5Z" fill="#828588" />
      </svg>
      )}
      component='div'
      disableRipple
      classes={{
        root: `${classes.rootRoundedButton} ${className}`,
        label: classes.labelRoundedButton,
        endIcon: classes.iconRoudedButton,
      }}
      children={children}
    />
  )
}

export default RoundedButton
