import React from 'react';

import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core';
import { RoundedInput } from '../../components';
import classNames from 'classnames';

const useStyle = makeStyles({
  inputWrapper: {
    position: 'relative',
  },
  inputError: {
    position: 'absolute',
    transform: 'translateY(calc(-100% - 4px))',
    // top: '-18px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: SD.basic.colors.main.pink,
  },
  input: {
    height: 32,
  },
});

const RoundedInputWithErrors = (props) => {
  const classes = useStyle();

  return (
    <div className={classes.inputWrapper}>
      {
        props.error && (
          <span className={classes.inputError}>{props.error}</span>
        )
      }
      <RoundedInput
        className={classNames(classes.input, props.className)}
        type={props.type}
        autoCompleteOff={props.autoCompleteOff}
        maxLength={props.maxLength}
        autoFocus={props.autoFocus}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={props.onChange}
        value={props.value}
        id={props.id}
        name={props.name}
        readOnly={props.readOnly}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    </div>
  )
};

export default RoundedInputWithErrors;
