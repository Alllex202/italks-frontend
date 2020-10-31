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
    marginBottom: 12,
  },
  label: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#828588',
    marginBottom: 48,
  },
  link: {
    color: '#1E40FF',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
  },
  input: {
    height: 32,
    '&:nth-of-type(1)': {
      marginBottom: 32,
    },
    '&:nth-of-type(2)': {
      marginBottom: 32,
    },
    '&:nth-of-type(3)': {
      marginBottom: 48,
    },
  },
  submitButtom: {
    height: 42,
    marginBottom: 48,
  }
});

const Register = () => {
  const classes = useStyle();
  return (
    <div className={classes.login}>
      <h1 className={classes.title}>
        Зарегистрируйтесь
      </h1>
      <span className={classes.label}>
        или <RLink className={classes.link} to='/login'>Войдите</RLink>
      </span>
      <RoundedInput
        className={classes.input}
        type='text'
        placeholder='Имя'
      />
      <RoundedInput
        className={classes.input}
        type='email'
        placeholder='Почта'
      />
      <RoundedInput
        className={classes.input}
        type='password'
        placeholder='Пароль'
      />
      <RoundedButton
        className={classes.submitButtom}
      >
        Зарегистрироваться
      </RoundedButton>
      <RLink className={classes.link} to='/restore'>Забыли пароль?</RLink>
    </div>
  )
};

export default Register;
