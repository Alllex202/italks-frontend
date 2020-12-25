import React from 'react'
import { getAuthToken } from '../../auth/Auth';
import { VideoList } from '../../components';
import { Context } from '../../components/Context';
import { Settings } from '../../settings/settings';
import PromoPage from './PromoPage';

const FavouritePage = () => {
  const token = getAuthToken();
  const { auth } = React.useContext(Context);
  const [isAuthenticated, setAuthenticated] = React.useState(true);
  return (
    auth && isAuthenticated
      ? <VideoList
        url={`${Settings.serverUrl}/favorites/video/`}
        headers={{
          'Authorization': `Token ${token}`,
        }}
        title={'Избранное'}
        setAuthenticated={setAuthenticated}
      />
      : <PromoPage />
  )
};

export default FavouritePage;
