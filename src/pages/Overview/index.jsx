import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core';
import { PreviewsBlock, TagsBlock } from '../../components';
import { Settings } from '../../settings/settings';

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
    // display: 'flex',
    // padding: '18px 0',
    marginBottom: 24,
    // border: `solid 1px ${SD.basic.colors.main.greyLight}`,
    // borderLeft: 'none',
    // borderRight: 'none',
    // overflow: 'hidden',
  },
  // tag: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   textAlign: 'center',
  //   padding: '0 8px',
  //   height: 32,
  //   width: 'auto',
  //   border: `1px solid ${SD.basic.colors.main.grey}`,
  //   borderRadius: '12px',
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   fontSize: '12px',
  //   lineHeight: '14px',
  //   color: SD.basic.colors.main.black,
  //   backgroundColor: SD.basic.colors.main.white,
  //   marginRight: 8,
  //   cursor: 'pointer',
  //   transition: 'background-color .3s, color .3s',
  //   '&:hover': {
  //     backgroundColor: SD.basic.colors.main.black,
  //     color: SD.basic.colors.main.white,
  //   },
  // },
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

  React.useEffect(() => {
    console.log('Страница ОБЗОР');

    axios
      .get(`${Settings.serverUrl}/video/`, {
        params: {
          period: 'week',
          page: 1,
        }
      })
      .then(response => {
        // console.log(response.data)
        setLastWeekVideo(response.data.videos_page)
      })

    axios
      .get(`${Settings.serverUrl}/video/`, {
        params: {
          period: 'month',
          page: 1,
        }
      })
      .then(response => {
        // console.log(response.data)
        setLastMonthVideo(response.data.videos_page)
      })

    axios
      .get(`${Settings.serverUrl}/video/`, {
        params: {
          period: 'year',
          page: 1,
        }
      })
      .then(response => {
        // console.log(response.data)
        setLastYearVideo(response.data.videos_page)
      })
      .catch(error => {
        // console.log('ERROR:' + error);
      });

    axios
      .get(`${Settings.serverUrl}/subcategory/user/`)
      .then(response => {
        console.log(response.data)
        setListSubcategories(response.data);
      })
      .catch(error => {

      })

  }, []);


  // console.log([lastWeekVideo, lastMonthVideo, lastYearVideo])

  return (
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
            url=''
            videos={lastWeekVideo}
          />
        )
      }

      {
        lastMonthVideo && lastMonthVideo.length > 0 && (
          <PreviewsBlock
            titleName='В этом месяце'
            url=''
            videos={lastMonthVideo}
          />
        )
      }

      {
        lastYearVideo && lastYearVideo.length > 0 && (
          <PreviewsBlock
            titleName='В этом году'
            url=''
            videos={lastYearVideo}
          />
        )
      }
    </div>
  )
}

export default Overview;
