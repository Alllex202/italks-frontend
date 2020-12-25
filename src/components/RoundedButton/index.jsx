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
    '&:hover': {
      backgroundColor: SD.basic.colors.translucent.violet,
    },
    '&:active': {
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



  // rootRoundedButton: {
  //   borderRadius: '32px',
  //   border: '1px solid #6D1EFF',
  //   // width: 'auto',
  //   // height: 48,
  //   transition: '.2s all',
  //   '&:hover, &:focus': {
  //     backgroundColor: SD.basic.colors.translucent.violet,
  //   },
  //   '&:active': {
  //     backgroundColor: SD.basic.colors.main.violetDark,
  //     '& span': {
  //       color: SD.basic.colors.main.white,
  //     },
  //     '& path': {
  //       fill: SD.basic.colors.main.white,
  //     }
  //   },
  // },
  // disabledRoudedButton: {
  //   cursor: 'not-allowed',
  //   '&:disabled': {
  //     cursor: 'not-allowed',
  //   },
  // },
  // labelRoundedButton: {
  //   transition: '.2s all',
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   fontSize: '14px',
  //   lineHeight: '16px',
  //   textTransform: 'none',
  //   color: SD.basic.colors.main.violetDark,
  // },
  // iconRoudedButton: {
  //   transition: '.2s all',
  //   '& path': {
  //     fill: SD.basic.colors.main.violetDark,
  //   },
  //   '& svg': {
  //     width: 14,
  //     height: 14,
  //   },
  // },
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
    // <Button
    //   endIcon={props.endIcon}
    //   startIcon={props.startIcon}
    //   component={props.component}
    //   disableRipple
    //   className={props.className}
    //   classes={{
    //     root: classNames(classes.rootRoundedButton, props.classes && props.classes.root),
    //     label: classNames(classes.labelRoundedButton, props.classes && props.classes.label),
    //     endIcon: classNames(classes.iconRoudedButton, props.classes && props.classes.endIcon),
    //     startIcon: classNames(classes.iconRoudedButton, props.classes && props.classes.startIcon),
    //     // disabled: classNames(classes.disabledRoudedButton, props.classes && props.classes.disabled)
    //   }}
    //   children={props.children}
    //   onClick={props.onClick}
    //   id={props.id}
    //   name={props.name}
    //   disabled={props.disabled}
    // />
  )
}

export default RoundedButton
