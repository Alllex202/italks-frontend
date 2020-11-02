import React from 'react';

import { makeStyles } from '@material-ui/core';
import { RoundedButton, RoundedInput } from '../../components';

import { Link as RLink, useHistory } from 'react-router-dom';

import axios from 'axios';

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
  inputWrapper: {
    position: 'relative',
  },
  inputError: {
    position: 'absolute',
    top: '-18px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#FF0099',
  },
  input: {
    height: 32,
    '&:nth-of-type(1)': {
      marginBottom: 32,
    },
    '&:nth-of-type(2)': {
      marginBottom: 48,
    },
  },
  submitButtom: {
    height: 42,
    marginBottom: 48,
  }
});

const Login = (props) => {
  const classes = useStyle();

  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  let history = useHistory();

  const handleLoginButtonClick = () => {
    axios
      .post(`http://127.0.0.1:8000/auth/token/login/`, {
        username: email,
        password: password,
      })
      .then(response => {
        setEmailError('');
        setPasswordError('');
        setEmail('');
        setPassword('');
        // Записать токен
        localStorage.setItem('auth_token', response.data.auth_token);
        // props.setAuth(true);
        history.push('/');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log(error.response.data)
          // setEmailError(error.response.data.non_field_errors[0]);
        }
      });
  };

  React.useEffect(() => {
    // console.log(emailError)
  }, [emailError, passwordError]);

  return (
    <div className={classes.login}>
      <h1 className={classes.title}>
        Войдите
      </h1>

      <span className={classes.label}>
        или <RLink className={classes.link} to='/register'>Зарегистрируйтесь</RLink>
      </span>

      <div className={classes.inputWrapper}>
        {
          emailError && (
            <span className={classes.inputError}>{emailError}</span>
          )
        }
        <RoundedInput
          className={classes.input}
          type='email'
          placeholder='Почта'
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          autoComplete='true'
        />
      </div>

      <div className={classes.inputWrapper}>
        {
          passwordError && (
            <span className={classes.inputError}>{passwordError}</span>
          )
        }
        <RoundedInput
          className={classes.input}
          type='password'
          placeholder='Пароль'
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          autoComplete='true'
        />
      </div>

      <RoundedButton
        className={classes.submitButtom}
        onClick={handleLoginButtonClick}
      >
        Войти
      </RoundedButton>

      <RLink
        className={classes.link}
        to='/restore'
      >
        Забыли пароль?
      </RLink>
    </div>
  )
};

export default Login;
