import React, { useState } from 'react';

import axios from 'axios';

import { makeStyles, Typography } from '@material-ui/core';

import { RoundedButton, RoundedInput, RoundedInputWithErrors } from '../../components';

import { Link as RLink } from 'react-router-dom';
import { Settings } from '../../settings/settings';

const useStyle = makeStyles({
  register: {
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
  },
  message: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#000000',
  }
});

const Register = () => {
  const classes = useStyle();
  const [stepRegistration, setStepRegistration] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitIsDisabled, setSubmitIsDisabled] = useState(false);

  const handleClickButtonRegister = () => {
    
    setSubmitIsDisabled(true);
    axios
      .post(`${Settings.serverUrl}/auth/users/`, {
        email: email,
        username: username,
        password: password,
      })
      .then(response => {
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        // setUsername('');
        setEmail('');
        setPassword('');
        setStepRegistration(2);
      })
      .catch(error => {
        setPassword('');
        if (error.response.status === 400) {
          console.log(error.response.data)
          error.response.data.username ? setUsernameError(error.response.data.username[0]) : setUsernameError('');
          error.response.data.email ? setEmailError(error.response.data.email[0]) : setEmailError('');
          error.response.data.password ? setPasswordError(error.response.data.password[0]) : setPasswordError('');
        }
      })
      .finally(() => {
        setSubmitIsDisabled(false);
      });
    // setStepRegistration(2);
  };

  return (
    <div className={classes.register}>
      <h1 className={classes.title}>
        Зарегистрируйтесь
      </h1>
      <span className={classes.label}>
        или <RLink className={classes.link} to='/login'>Войдите</RLink>
      </span>
      {
        (stepRegistration === 1
          && (
            <React.Fragment>
              <RoundedInputWithErrors
                className={classes.input}
                type='text'
                placeholder='Имя'
                value={username}
                onChange={e => setUsername(e.target.value)}
                error={usernameError}
              />
              <RoundedInputWithErrors
                className={classes.input}
                type='email'
                placeholder='Почта'
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete='true'
                error={emailError}
              />
              <RoundedInputWithErrors
                className={classes.input}
                type='password'
                placeholder='Пароль'
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={passwordError}
              />
              <RoundedButton
                className={classes.submitButtom}
                onClick={handleClickButtonRegister}
                disabled={submitIsDisabled}
              >
                Зарегистрироваться
              </RoundedButton>
              <RLink className={classes.link} to='/restore'>Забыли пароль?</RLink>
            </React.Fragment>
          ))
        || (stepRegistration === 2
          && (
            <Typography
              align='left'
              display='block'
              className={classes.message}
            >
              {username}, мы отправили Вам email со ссылкой для подтверждения.
              Вы можете закрыть эту вкладку и проверить почту.
            </Typography>
          ))
      }
    </div>
  )
};

export default Register;
