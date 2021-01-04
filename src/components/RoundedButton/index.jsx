import React from 'react'

import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

const useStyles = makeStyles({
  roundedButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 32,
    // width: 96,
    // padding: '0px 19px',
    backgroundColor: 'transparent',
    borderRadius: '32px',
    border: '1px solid #6D1EFF',
    outline: 'none',
    cursor: 'pointer',
    transition: '.2s all',
    '&:disabled': {
      borderColor: SD.basic.colors.main.greyLight,
      '& > $roundedButtonIcon path': {
        fill: SD.basic.colors.main.greyLight,
      },
      '& > $roundedButtonLabel': {
        color: SD.basic.colors.main.greyLight,
      },
    },
    '&:not(:disabled):hover': {
      backgroundColor: SD.basic.colors.translucent.violet,
    },
    '&:not(:disabled):active': {
      backgroundColor: SD.basic.colors.main.violetDark,
      '& > $roundedButtonIcon path': {
        fill: SD.basic.colors.main.white,
      },
      '& > $roundedButtonLabel': {
        color: SD.basic.colors.main.white,
      },
    },
  },
  roundedButtonIcon: {
    width: 14,
    height: 14,
    transition: '.2s all',
    '& path': {
      fill: SD.basic.colors.main.violetDark,
      transition: '.2s all',
    },
    '& svg': {
      width: 14,
      height: 14,
      transition: '.2s all',
    },
  },
  roundedButtonLabel: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    textTransform: 'none',
    color: SD.basic.colors.main.violetDark,
    transition: '.2s all',
  },
  roundedButtonEndIcon: {
    marginLeft: 4,
  },
  roundedButtonStartIcon: {
    marginRight: 4,
  },
});

const RoundedButton = (props) => {
  const classes = useStyles();

  return (
    <button
      type='button'
      className={classNames(
        classes.roundedButton,
        props.className,
      )}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.startIcon &&
        <div className={classNames(
          classes.roundedButtonIcon,
          classes.roundedButtonStartIcon,
          props.classes && props.classes.startIcon)}>
          {props.startIcon}
        </div>
      }
      {props.children &&
        <span className={classNames(
          classes.roundedButtonLabel,
          props.classes && props.classes.label)}>
          {props.children}
        </span>
      }
      {props.endIcon &&
        <div className={classNames(
          classes.roundedButtonIcon,
          classes.roundedButtonEndIcon,
          props.classes && props.classes.endIcon)}>
          {props.endIcon}
        </div>
      }
    </button>
  )
}

export default RoundedButton
