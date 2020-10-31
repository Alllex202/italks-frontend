import React from 'react';

import { makeStyles } from '@material-ui/core';

import { RoundedButton, RoundedInput } from '../../components';

import { Link as RLink } from 'react-router-dom';

const useStyle = makeStyles({
  login: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 264,
  },
  title: {
    fontFamily: 'JetBrains Mono',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    marginBottom: 48,
  },
  backLogin: {
    display: 'flex',
    alignItems: 'center',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#828588',
    height: 18,
    '& svg': {
      height: 18,
      marginRight: 18,
      '& path': {
        fill: '#828588',
      }
    },
    marginBottom: 12,
  },
  input: {
    height: 32,
    marginBottom: 48,
  },
  submitButtom: {
    height: 42,
  }
});

const Restore = () => {
  const classes = useStyle();
  return (
    <div className={classes.login}>
      <RLink className={classes.backLogin} to='/login'>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.7525 2.9027L7.425 1.5752L0 9.00019L7.425 16.4252L8.7525 15.0977L2.655 9.00019L8.7525 2.9027Z" fill="#828588" />
        </svg>
        К авторизации
        </RLink>
      <h1 className={classes.title}>
        Восстановление пароля
      </h1>
      <RoundedInput
        className={classes.input}
        type='email'
        placeholder='Почта'
      />
      <RoundedButton
        className={classes.submitButtom}
        
      >
        Зарегистрироваться
      </RoundedButton>
    </div>
  )
};

export default Restore;
