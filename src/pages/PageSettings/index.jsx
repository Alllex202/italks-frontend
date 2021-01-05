import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { stylesDictionary as SD } from '../../settings/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../components/Context';
import { Redirect } from 'react-router-dom';
import { RoundedButton, RoundedInputWithErrors, RoundedCheckbox } from '../../components';
import { Settings } from '../../settings/settings';
import { getAuthToken } from '../../auth/Auth';

const useStyles = makeStyles({
  settings: {
    display: 'flex',
    flexDirection: 'column',
    width: 546,
    margin: '0 auto',
  },
  settingsHeader: {
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    color: SD.basic.colors.main.black,
    marginBottom: 24,
  },
  settingsBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  settingsSection: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
    borderBottom: `1px solid ${SD.basic.colors.main.greyLight}`,
    '&:first-child': {
      borderTop: `1px solid ${SD.basic.colors.main.greyLight}`,
    },
    '& > $setting:last-child': {
      marginBottom: 0,
    },
  },
  settingsSubtitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: SD.basic.colors.main.grey,
    marginBottom: 40,
  },
  setting: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    marginBottom: 16,
    '& $settingInput': {
      width: 264,
    }
  },
  settingName: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: SD.basic.colors.main.grey,
  },
  settingInput: {
  },
  settingsFooter: {
    marginTop: 24,
  },
  btnSave: {
    width: '100%',
    height: 48,
  }
});

const PageSettings = () => {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [errorUsername, setErrorUsername] = React.useState('');
  const [errorOldPassword, setErrorOldPassword] = React.useState('');
  const [errorNewPassword, setErrorNewPassword] = React.useState('');
  const [notifications, setNotifications] = React.useState(false);
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [themeAsDevice, setThemeAsDevice] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [clickedNotifications, clickNotifications] = React.useState(false);
  const [clickedDarkTheme, clickDarkTheme] = React.useState(false);
  const [clickedThemeAsDevice, clickThemeAsDevice] = React.useState(false);
  const [clickedButtonSave, clickButtonSave] = React.useState(false);

  const handlerButtonSave = (E) => {
    if (!clickedButtonSave) {
      clickButtonSave(true);
      const token = getAuthToken();
      const data = {
        userName: username
      };
      if (oldPassword !== '' && newPassword !== '') {
        data['old_password'] = oldPassword;
        data['new_password'] = newPassword;
      }
      axios
        .post(`${Settings.serverUrl}/settings/user/`, data, {
          headers: {
            'Authorization': token ? `Token ${token}` : null,
          },
        })
        .then(response => {
          console.log(response);
          setUsername(response.data.username);
        })
        .catch(error => {
          console.log(error.response);
          if (error.response.status === '') {
            if (error.response) {
              setUsername(error.response.data.info_user.username);
              error.response.data.errors && error.response.data.errors.username
                && setErrorUsername(error.response.data.errors.username);

              error.response.data.errors && error.response.data.errors.old_password
                && setErrorOldPassword(error.response.data.errors.old_password);

              error.response.data.errors && error.response.data.errors.new_password
                && setErrorNewPassword(error.response.data.errors.new_password);
            }
          }
        })
        .finally(() => {
          clickButtonSave(false);
        });
    }
  };

  const onChangeNotifications = (e) => {
    if (!clickedNotifications) {
      clickNotifications(true);
      const token = getAuthToken();
      axios
        .post(`${Settings.serverUrl}/settings/other/?notifications=${+!notifications}`, {}, {
          headers: {
            'Authorization': token ? `Token ${token}` : null,
          },
        })
        .then(response => {
          if (response.status === 200) {
            setNotifications(response.data.notifications);
          }
          console.log(response)
        })
        .catch(error => {
          console.log(error.response)
        })
        .finally(() => {
          clickNotifications(false);
        });
    }
  };

  const onChangeDarkTheme = (e) => {
    if (!clickedDarkTheme) {
      clickDarkTheme(true);
      const token = getAuthToken();
      axios
        .post(`${Settings.serverUrl}/settings/other/?dark_theme=${+!darkTheme}`, {}, {
          headers: {
            'Authorization': token ? `Token ${token}` : null,
          },
        })
        .then(response => {
          if (response.status === 200) {
            setDarkTheme(response.data.dark_theme);
          }
          console.log(response)
        })
        .catch(error => {
          console.log(error.response)
        })
        .finally(() => {
          clickDarkTheme(false);
        });
    }
  };

  const onChangeThemeAsDevice = (e) => {
    if (!clickedThemeAsDevice) {
      clickThemeAsDevice(true);
      const token = getAuthToken();
      const change = !themeAsDevice;
      axios
        .post(`${Settings.serverUrl}/settings/other/?as_device=${+change}`, {}, {
          headers: {
            'Authorization': token ? `Token ${token}` : null,
          },
        })
        .then(response => {
          if (response.status === 200) {
            setThemeAsDevice(response.data.as_device);
          }
          console.log(response)
        })
        .catch(error => {
          console.log(error.response)
        })
        .finally(() => {
          clickThemeAsDevice(false);
        });
    }
  };

  React.useEffect(() => {
    setLoading(true)
    const token = getAuthToken();
    axios
      .get(`${Settings.serverUrl}/settings/`, {
        headers: {
          'Authorization': token ? `Token ${token}` : null,
        },
      })
      .then(response => {
        console.log(response)
        setUsername(response.data.user.username)
        setEmail(response.data.user.email)
        setNotifications(response.data.notifications)
        setDarkTheme(response.data.dark_theme)
        setThemeAsDevice(response.data.as_device)
      })
      .catch(error => {
        console.log(error.response)
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return (
    !isLoading
    && <div className={classes.settings}>
      <h1 className={classes.settingsHeader}>Настройки пользователя</h1>
      <div className={classes.settingsBody}>
        <div className={classes.settingsSection}>
          <span className={classes.settingsSubtitle}>Основные настройки</span>
          <div className={classes.setting}>
            <span className={classes.settingName}>Имя</span>
            <RoundedInputWithErrors
              className={classes.settingInput}
              value={username}
              placeholder='Имя'
              error={errorUsername}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={classes.setting}>
            <span className={classes.settingName}>Эл. почта</span>
            <RoundedInputWithErrors
              className={classes.settingInput}
              // disabled
              value={email}
              placeholder='E-mail'
              readOnly
              onChange={(e) => e.preventDefault()}
            />
          </div>
          <div className={classes.setting}>
            <span className={classes.settingName}>Пароль</span>
            <RoundedInputWithErrors
              className={classes.settingInput}
              value={oldPassword}
              placeholder='Старый пароль'
              type='password'
              autoCompleteOff
              error={errorOldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className={classes.setting}>
            <span className={classes.settingName}></span>
            <RoundedInputWithErrors
              className={classes.settingInput}
              value={newPassword}
              placeholder='Новый пароль'
              type='password'
              error={errorNewPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.settingsSection}>
          <span className={classes.settingsSubtitle}>Уведомления</span>
          <div className={classes.setting}>
            <span className={classes.settingName}>Получать уведомления о новых видео по почте</span>
            <RoundedCheckbox
              checked={notifications}
              onChange={onChangeNotifications}
            />
          </div>
        </div>
        <div className={classes.settingsSection}>
          <span className={classes.settingsSubtitle}>Другое</span>
          <div className={classes.setting}>
            <span className={classes.settingName}>Тёмная тема</span>
            <RoundedCheckbox
              checked={darkTheme}
              onChange={onChangeDarkTheme}
            />
          </div>
          {/* <div className={classes.setting}>
            <span className={classes.settingName}>Тема как на устройстве</span>
            <RoundedCheckbox
              checked={themeAsDevice}
              onChange={onChangeThemeAsDevice}
            />
          </div> */}
        </div>
      </div>
      <div className={classes.settingsFooter}>
        <RoundedButton
          className={classes.btnSave}
          onClick={handlerButtonSave}
        >
          Сохранить настройки
        </RoundedButton>
      </div>
    </div>
  )
};

export default PageSettings;
