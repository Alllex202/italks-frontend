import axios from 'axios';
import { Settings } from '../settings/settings';

const checkAuth = (setAuth, setInfoUser) => {
  const token = getAuthToken();
  if (token) {
    axios
      .get(`${Settings.serverUrl}/auth/check_token/`, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      })
      .then(response => {
        if (response.status === 201){
          setAuth(true)
          // setInfoUser(response.data.infoUser)
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