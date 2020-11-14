import axios from 'axios';
import { Settings } from '../settings/settings';

export const checkAuth = () => {
  const token = localStorage.getItem('auth_token');
  console.log(token)
  if (token) {
    axios
      .get(`${Settings.serverUrl}/auth/check_token/`, {
        headers: {
          'Authorization': 'Token ' + token,
        }
      })
      .then(response => {
        console.log(response.date)
      })
  }
}