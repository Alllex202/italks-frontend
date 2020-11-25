import React from 'react';

import {stylesDictionary as SD} from '../../settings/styles';

import { makeStyles, Typography } from '@material-ui/core';

import { RoundedButton, RoundedInputWithErrors } from '../../components';

import { Link as RLink } from 'react-router-dom';
import axios from 'axios';
import { Settings } from '../../settings/settings';

const useStyle = makeStyles({
  restore: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 264,
  },
  title: {
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
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
    color: SD.basic.colors.main.grey,
    height: 18,
    '& svg': {
      height: 18,
      marginRight: 18,
      '& path': {
        fill: SD.basic.colors.main.grey,
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
  },
  message: {
    fontFamily: SD.basic.fontsFamily.Roboto,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: SD.basic.colors.main.black,
  }
});

const Restore = () => {
  const classes = useStyle();
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [stepRestore, setStepRestore] = React.useState(1);
  const [submitIsDisabled, setSubmitIsDisabled] = React.useState(false);

  const handleClickButtonRestore = () => {
    if (email) {
      setSubmitIsDisabled(true);
      axios
        .post(`${Settings.serverUrl}/auth/users/reset_password/`, {
          email: email,
        }, {
          before: () => {
            console.log('start');
          }
        })
        .then(response => {
          setStepRestore(2);
        })
        .catch(error => {
          if (error.response.status === 400) {
            error.response.data.email ? setEmailError(error.response.data.email[0]) : setEmailError('');
            document.getElementById('email').focus();
          }
        })
        .finally(() => {
          setSubmitIsDisabled(false);
        });
    } else {
      document.getElementById('email').focus();
    }
  };

  return (
    <div className={classes.restore}>
      <RLink className={classes.backLogin} to='/login'>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.7525 2.9027L7.425 1.5752L0 9.00019L7.425 16.4252L8.7525 15.0977L2.655 9.00019L8.7525 2.9027Z" fill="#828588" />
        </svg>
        К авторизации
      </RLink>
      <h1 className={classes.title}>
        Восстановление пароля
      </h1>
      {
        (stepRestore === 1
          && (
            <React.Fragment>
              <RoundedInputWithErrors
                className={classes.input}
                type='email'
                placeholder='Почта'
                value={email}
                onChange={e => setEmail(e.target.value)}
                id='email'
                error={emailError}
              />
              <RoundedButton
                className={classes.submitButtom}
                onClick={handleClickButtonRestore}
                disabled={submitIsDisabled}
              >
                Восстановить пароль
              </RoundedButton>
            </React.Fragment>
          ))
        || (stepRestore === 2
          && (
            <Typography
              align='left'
              display='block'
              className={classes.message}
            >
              Мы отправили Вам email со ссылкой для подтверждения.
              Вы можете закрыть эту вкладку и проверить почту.
            </Typography>
          ))
      }
    </div>
  )
};

export default Restore;
