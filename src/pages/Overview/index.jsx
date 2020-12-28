import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core';
import { PreviewsBlock, TagsBlock } from '../../components';
import { Settings } from '../../settings/settings';
import { getAuthToken } from '../../auth/Auth';

const useStyles = makeStyles({
  pageTitle: {
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
    lineHeight: '60px',
    color: SD.basic.colors.main.black,
    marginBottom: 12,
  },
  pageSubtitle: {
    width: 637,
    display: 'inline-block',
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '30px',
    color: SD.basic.colors.main.pink,
    marginBottom: 24,
  },
  tags: {
    marginBottom: 24,
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const Overview = () => {
  const classes = useStyles();
  const [lastWeekVideo, setLastWeekVideo] = React.useState([]);
  const [lastMonthVideo, setLastMonthVideo] = React.useState([]);
  const [lastYearVideo, setLastYearVideo] = React.useState([]);
  const [listSubcategories, setListSubcategories] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log('Страница ОБЗОР');
    // setLoading(true)    
    const token = getAuthToken();
    axios
      .get(`${Settings.serverUrl}/video/promo/`,{        
        headers: {
          'Authorization': token ? `Token ${token}` : null,
        },
      })
      .then(response => {
        // console.log(response.data)
        setLastWeekVideo(response.data.week)
        setLastMonthVideo(response.data.month)
        setLastYearVideo(response.data.year)
      })
      .catch(error => {
      })
      .then(() => {
        setLoading(false);
      });

    axios
      .get(`${Settings.serverUrl}/subcategory/user/`)
      .then(response => {
        // console.log(response.data)
        setListSubcategories(response.data);
      })
      .catch(error => {

      })

  }, []);


  // console.log([lastWeekVideo, lastMonthVideo, lastYearVideo])

  return (
    // <CSSTransition
    //   in={isLoading
    //     && (lastWeekVideo.length > 0
    //       || lastMonthVideo.length > 0
    //       || lastYearVideo.length > 0)}
    //   timeout={500}
    //   classNames="animation"
    //   unmountOnExit
    // >
    !isLoading
    && (lastWeekVideo.length > 0
      || lastMonthVideo.length > 0
      || lastYearVideo.length > 0) &&
    <div>
      <h1 className={classes.pageTitle}>
        Обзор
      </h1>
      <span className={classes.pageSubtitle}>
        Здесь мы собрали категории, события и видео, которые могут быть Вам интересны
      </span>
      {
        listSubcategories && listSubcategories.length > 0 && (
          <TagsBlock
            className={classes.tags}
            tags={listSubcategories}
          />
        )
      }

      {
        lastWeekVideo && lastWeekVideo.length > 0 && (
          <PreviewsBlock
            titleName='На этой неделе'
            url='/overview/week'
            videos={lastWeekVideo}
          />
        )
      }

      {
        lastMonthVideo && lastMonthVideo.length > 0 && (
          <PreviewsBlock
            titleName='В этом месяце'
            url='/overview/month'
            videos={lastMonthVideo}
          />
        )
      }

      {
        lastYearVideo && lastYearVideo.length > 0 && (
          <PreviewsBlock
            titleName='В этом году'
            url='/overview/year'
            videos={lastYearVideo}
          />
        )
      }
    </div>
    // </CSSTransition>
  )
}

export default Overview;
