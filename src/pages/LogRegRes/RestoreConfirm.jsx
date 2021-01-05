import React from 'react';
import { RoundedButton, RoundedInputWithErrors } from '../../components';

import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core';

import { useHistory, useParams } from 'react-router-dom';
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

const RestoreConfirm = () => {
  const classes = useStyle();
  const { uid, token } = useParams();
  let history = useHistory();
  const [newPass, setNewPass] = React.useState('');
  const [passError, setPassError] = React.useState('');
  const [submitIsDisabled, setSubmitIsDisabled] = React.useState(false);

  const handleClickButtonRestoreConfirm = () => {
    if (newPass) {
      setSubmitIsDisabled(true);
      axios
        .post(`${Settings.serverUrl}/auth/users/reset_password_confirm/`, {
          uid: uid,
          token: token,
          new_password: newPass,
        })
        .then(response => {
          history.push('/login');
        })
        .catch(error => {
          const res = [];
          if (error.response.data.detail) {
            res.push(error.response.data.detail)
          }
          if (error.response.data.uid) {
            res.push(...error.response.data.uid)
          }
          if (error.response.data.token) {
            res.push(...error.response.data.token)
          }
          if (error.response.data.new_password) {
            res.push(...error.response.data.new_password)
          }
          setPassError(res.filter(el => el).join(' '));
          document.getElementById('password').focus();
        })
        .finally(() => {
          setSubmitIsDisabled(false);
        });
    } else {
      document.getElementById('password').focus();
    }
  };

  return (
    <div className={classes.restore}>
      <h1 className={classes.title}>
        Восстановление пароля
      </h1>
      <React.Fragment>
        <RoundedInputWithErrors
          className={classes.input}
          type='password'
          placeholder='Придумайте новый пароль'
          value={newPass}
          onChange={e => setNewPass(e.target.value)}
          id='password'
          error={passError}
          autoCompleteOff
        />
        <RoundedButton
          className={classes.submitButtom}
          onClick={handleClickButtonRestoreConfirm}
          disabled={submitIsDisabled}
        >
          Восстановить пароль
        </RoundedButton>
      </React.Fragment>
    </div>
  )
};

export default RestoreConfirm;
