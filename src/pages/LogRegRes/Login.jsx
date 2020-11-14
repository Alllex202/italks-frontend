import React, { useContext } from 'react';

import { Settings } from '../../settings/settings';

import { makeStyles } from '@material-ui/core';
import { RoundedButton, RoundedInput, RoundedInputWithErrors } from '../../components';

import { Link as RLink, useHistory } from 'react-router-dom';

import axios from 'axios';

import { Context } from '../../components/Context/index.jsx';

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
  const [submitIsDisabled, setSubmitIsDisabled] = React.useState(false);
  const { setAuth } = useContext(Context);

  let history = useHistory();

  const handleLoginButtonClick = () => {
    // console.log(auth);
    setSubmitIsDisabled(true);
    axios
      .post(`${Settings.serverUrl}/auth/token/login/`, {
        email: email,
        password: password,
      })
      .then(response => {
        setEmailError('');
        setPasswordError('');
        setEmail('');
        setPassword('');
        // Записать токен
        localStorage.setItem('auth_token', response.data.auth_token);
        setAuth(true);
        // Перенаправить на главную
        history.push('/');
      })
      .catch((error) => {
        setPassword('');
        if (error.response.status === 400) {
          // console.log(error.response.data)
          error.response.data.email
            ? setEmailError(error.response.data.email[0])
            : error.response.data.non_field_errors
              ? setEmailError(error.response.data.non_field_errors[0])
              : setEmailError('');;
          error.response.data.password
            ? setPasswordError(error.response.data.password[0])
            : setPasswordError('');
        }
      })
      .finally(() => {
        setSubmitIsDisabled(false);
      });
  };

  // React.useEffect(() => {
  //   // console.log(emailError)
  // }, [emailError, passwordError]);

  return (
    <div className={classes.login}>
      <h1 className={classes.title}>
        Войдите
      </h1>

      <span className={classes.label}>
        или <RLink className={classes.link} to='/register'>Зарегистрируйтесь</RLink>
      </span>

      <RoundedInputWithErrors
        className={classes.input}
        type='email'
        placeholder='Почта'
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        autoComplete='true'
        error={emailError}
      />

      <RoundedInputWithErrors
        className={classes.input}
        type='password'
        placeholder='Пароль'
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        autoComplete='true'
        error={passwordError}
      />

      <RoundedButton
        className={classes.submitButtom}
        onClick={handleLoginButtonClick}
        disabled={submitIsDisabled}
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
