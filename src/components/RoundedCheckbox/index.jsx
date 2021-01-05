import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { stylesDictionary as SD } from '../../settings/styles';
import classNames from 'classnames';

const useStyles = makeStyles({
  roundedCheckboxWrapper: {
    width: 54,
    height: 27,
    display: 'inline-block',
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  roundedCheckbox: {
    width: 0,
    height: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,

    '&:disabled': {
      opacity: .1,
    },
    '&:checked': {
      '& ~ $roundedCheckboxPseudo': {
        '&::before': {
          backgroundColor: SD.basic.colors.main.violetDark,
        },
        '&::after': {
          left: 32,
        },
      }
    }
  },
  roundedCheckboxPseudo: {
    display: 'block',
    height: 27,
    width: '100%',
    position: 'relative',
    top: 0,
    left: 0,

    '&::before': {
      content: `""`,
      position: 'absolute',
      display: 'block',
      width: 54,
      height: 27,
      backgroundColor: SD.basic.colors.main.grey,
      borderRadius: 20,
      transition: 'background-color .15s',
    },
    '&::after': {
      content: `""`,
      position: 'absolute',
      display: 'block',
      width: 16,
      height: 16,
      top: '50%',
      left: 6,
      backgroundColor: SD.basic.colors.main.white,
      borderRadius: '50%',
      transform: 'translateY(-50%)',
      transition: 'left .15s',
    },
  }
});

const RoundedCheckbox = ({
  className,
  classNameWrapper,
  roundedCheckboxPseudo,
  name,
  id,
  checked,
  disabled,
  onClick,
  onChange,
  defaultChecked
}) => {
  const classes = useStyles();

  return (
    <label className={classNames(classes.roundedCheckboxWrapper, classNameWrapper)}>
      <input
        type="checkbox"
        className={classNames(classes.roundedCheckbox, className)}
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        onClick={onClick}
        onChange={onChange}
        id={id}
        name={name}
      />
      <div className={classNames(classes.roundedCheckboxPseudo, roundedCheckboxPseudo)}></div>
    </label>
  )
};

export default RoundedCheckbox;
