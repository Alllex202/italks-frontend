import React from 'react'
import { getAuthToken } from '../../auth/Auth';
import { VideoList } from '../../components';
import { Context } from '../../components/Context';
import { Settings } from '../../settings/settings';
import ContentContainer from '../components/ContentContainer';
import ContentWrapper from '../components/ContentWrapper';
import PageFavouriteNotAuth from './PageFavouriteNotAuth';

const PageFavourite = () => {
  const { auth } = React.useContext(Context);

  const [isOpenedSortMenu, setOpenSortMenu] = React.useState(false);
  const [videos, setVideos] = React.useState([]);
  const [numberPage, setNumberPage] = React.useState(1);
  const [isLastPageServer, setLastPageServer] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [currentScroll, setScroll] = React.useState(0);
  const [sortName, setSortName] = React.useState('new_date');

  return (
    <ContentWrapper>
      <ContentContainer>
        {
          !auth
            ? <PageFavouriteNotAuth />
            : <>
              
            </>
        }
      </ContentContainer>
    </ContentWrapper>
  )
};

export default PageFavourite;
