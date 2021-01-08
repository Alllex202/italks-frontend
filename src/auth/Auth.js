import axios from 'axios';
import { Settings } from '../settings/settings';

const checkAuth = (setAuth, setInfoUser, setLastVideo, setDarkTheme) => {
  const token = getAuthToken();
  if (token) {
    axios
      .get(`${Settings.serverUrl}/auth/check_token/`, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          setAuth(true)
          setInfoUser({
            username: response.data.username,
            id: response.data.id,
            email: response.data.email,
          });
          setLastVideo(response.data.last_video);
          setDarkTheme(response.data.dark_theme);
        } else {
          setAuth(false)
        };
      })
      .catch(error => {
        setAuth(false);
      });
  } else {
    setAuth(false);
  }
};

const getAuthToken = () => localStorage.getItem('auth_token');

const setAuthToken = (token) => localStorage.setItem('auth_token', token);

const removeAuthToken = () => localStorage.removeItem('auth_token');

export {
  checkAuth,
  getAuthToken,
  setAuthToken,
  removeAuthToken
};