import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';

import classNames from 'classnames';

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
  // '@media (max-width: 1599px)': {
  //   labelRoundedButton: {
  //     fontSize: '14px',
  //     lineHeight: '16px',
  //   },
  //   iconRoudedButton: {
  //     '& svg': {
  //       width: 14,
  //       height: 14,
  //     },
  //   }
  // },
  // '@media (min-width: 1600px) and (max-width: 1919px)': {

  // },
  // '@media (min-width: 1920px)': {

  // }
});

const RoundedButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      endIcon={props.endIcon}
      startIcon={props.startIcon}
      component={props.component}
      disableRipple
      className={props.className}
      classes={{
        root: classNames(classes.rootRoundedButton, props.classes && props.classes.root),
        label: classNames(classes.labelRoundedButton, props.classes && props.classes.label),
        endIcon: classNames(classes.iconRoudedButton, props.classes && props.classes.endIcon),
        startIcon: classNames(classes.iconRoudedButton, props.classes && props.classes.startIcon),
      }}
      children={props.children}
      onClick={props.onClick}
    />
  )
}

export default RoundedButton
