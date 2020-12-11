import React from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import { Settings } from '../../settings/settings';

const ActivateProfile = () => {
  const { uid, token } = useParams();
  const [isLoading, setLoading] = React.useState(true);
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    // console.log(uid, token)
    setLoading(true)
    axios
      .post(`${Settings.serverUrl}/auth/users/activation/`, {
        uid: uid,
        token: token,
      })
      .then(res => {
        setLoading(false)
        setResult('Done');
        // console.log(11, res)
      })
      .catch((error) => {
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
        setResult(res.filter(el => el).join(' '));
        setLoading(false)
        // console.log(er.response.data.detail, ...er.response.data.uid)
      });
  }, [uid, token]);

  return (
    isLoading
      ? <div>Подождите</div>
      : <div>
        {
          result === 'Done'
            ? <React.Fragment>
              <div>Аккаунт активирован, если не произошло автоматическое перенаправление можете <Link to={'/'}>перейти на сайт по ссылке</Link>.</div>
              <Redirect to={'/'} />
            </React.Fragment>
            : <div>Что-то пошло не так :-( {result}</div>
        }
      </div>
  )
};

export default ActivateProfile;
