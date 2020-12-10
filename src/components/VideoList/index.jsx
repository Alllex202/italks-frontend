import React from 'react';

import classNames from 'classnames';

import axios from 'axios';

import { CSSTransition } from 'react-transition-group';

import { stylesDictionary as SD } from '../../settings/styles';
import { Settings } from '../../settings/settings';

import { ClickAwayListener, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { RoundedButton, VideoItem } from '../../components';

const useStyles = makeStyles({
  viedoList: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  titleName: {
    // fontFamily: SD.basic.fontsFamily.Roboto,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: SD.basic.colors.main.grey,
  },
  sort: {
    position: 'relative',
  },
  sortTitle: {
    display: 'flex',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    '& > svg': {
      width: 14,
      height: 14,
      marginRight: 4,
      '& > path': {
        fill: SD.basic.colors.main.grey,
        transition: 'fill .3s',
      }
    },
    '& > span': {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '16px',
      color: SD.basic.colors.main.grey,
      transition: 'color .3s',
    },
    '&:hover': {
      '& > svg': {
        '& > path': {
          fill: SD.basic.colors.main.violetDark,
        }
      },
      '& > span': {
        color: SD.basic.colors.main.violetDark,
      },
    }
  },
  sortMenu: {
    position: 'absolute',
    top: 25,
    left: -122,
    width: 226,
    display: 'flex',
    flexDirection: 'column',
    padding: '18px 0',
    background: SD.basic.colors.main.white,
    boxShadow: '0px 2px 10px 8px rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    zIndex: 10,
  },
  sortMenuItem: {
    padding: '16px 0 16px 18px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    backgroundColor: 'transparent',
    color: SD.basic.colors.main.black,
    cursor: 'pointer',
    transition: 'color .3s, background-color .3s',
    '&:hover': {
      backgroundColor: SD.basic.colors.translucent.violet,
    },
    '&:active': {
      color: SD.basic.colors.main.violetDark,
      backgroundColor: SD.basic.colors.translucent.violet,
    },
  },
  sortMenuItemSelect: {
    color: SD.basic.colors.main.violetDark,
  },
  videoGrid: {
    display: 'grid',
    position: 'relative',
    gridTemplateColumns: 'repeat(auto-fill, 226px)',
    gridAutoRows: '213px',
    columnGap: 24,
    rowGap: '24px',
    marginBottom: 24,
  },
  videoItemWrapper: {
    position: 'relative',
  },
  videoItem: {
    position: 'absolute',
  },
  btnMore: {
    width: '100%',
    height: 48,
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const VideoList = ({
  categoryId,
  subcategoryId,
  period,
  searchQuery,
  setNumberSearchResults,
  title
}) => {
  const classes = useStyles();
  const [isOpenedSortMenu, openSortMenu] = React.useState(false);
  const [videos, setVideos] = React.useState([]);
  const [numberPage, setNumberPage] = React.useState(1);
  const [isLastPageServer, setLastPageServer] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const getNewVideos = () => {
    setLoading(true);
    if (searchQuery) {
      axios
        .get(`${Settings.serverUrl}/search/`, {
          params: {
            query: searchQuery,
            page: numberPage,
          },
        })
        .then(res => {
          setNumberSearchResults(res.data.length)
          console.log(res)
          setVideos(res.data)
        })
        .catch(e => {
          setLoading(false);
        });
    } else {
      if (categoryId || (categoryId && subcategoryId)) {
        axios
          .get(`${Settings.serverUrl}/video/sorted/${categoryId}/`, {
            params: {
              period: period,
              page: numberPage,
              subcategory: subcategoryId,
            }
          })
          .then(response => {
            // console.log(response.data)
            setLastPageServer(response.data.is_last_page);
            setVideos([...videos, ...response.data.videos_page]);
            if (!response.data.is_last_page) {
              setNumberPage(numberPage + 1);
            }
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
          });
      } else {
        axios
          .get(`${Settings.serverUrl}/video/`, {
            params: {
              period: period,
              page: numberPage,
            }
          })
          .then(response => {
            // console.log(response.data)
            setLastPageServer(response.data.is_last_page);
            setVideos([...videos, ...response.data.videos_page]);
            if (!response.data.is_last_page) {
              setNumberPage(numberPage + 1);
            }
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
          });
      }
    }
  }

  const closeSortMenu = () => {
    openSortMenu(false);
  };

  const handlerOnClickSortTitle = () => {
    openSortMenu(!isOpenedSortMenu);
  };

  const handlerOnClickBtnMore = () => {
    if (!isLastPageServer && !isLoading) {
      getNewVideos();
    }
  };

  React.useEffect(() => {
    getNewVideos()
    console.log(videos)
  }, []);


  return (
    // videos && videos.length > 0 ? 
    <div className={classes.viedoList}>
      <div className={classes.title}>
        <h3 className={classes.titleName}>{title}</h3>
        <ClickAwayListener onClickAway={closeSortMenu}>

          <div className={classNames('unselected', classes.sort)}>
            <div
              className={classNames(classes.sortTitle)}
              onClick={handlerOnClickSortTitle}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.75 10.5H5.25V9.33333H1.75V10.5ZM1.75 3.5V4.66667H12.25V3.5H1.75ZM1.75 7.58333H8.75V6.41667H1.75V7.58333Z" fill="#828588" />
              </svg>
              <span>Упорядочить</span>
            </div>
            <CSSTransition
              in={isOpenedSortMenu}
              timeout={300}
              classNames="animation-fast"
              unmountOnExit
            >
              <ul className={classes.sortMenu}>
                {
                  [
                    'По длительности',
                    'По названию',
                    'Сначала старые',
                    'Сначала новые'
                  ].map((el, ind) => (
                    <li key={ind} className={classNames(classes.sortMenuItem, ind === 1 && classes.sortMenuItemSelect)}>
                      {el}
                    </li>
                  ))
                }
              </ul>
            </CSSTransition>
          </div>
        </ClickAwayListener>

      </div>
      <div className={classes.videoGrid}>
        {
          videos && videos.length > 0 && videos.map(video => (
            <div
              key={video.id}
              className={classes.videoItemWrapper}
            >
              <VideoItem
                videoData={video}
                className={classes.videoItem}
              />
            </div>
          ))
        }
      </div>
      <div>
        <RoundedButton
          className={classes.btnMore}
          onClick={handlerOnClickBtnMore}
        >
          {'Показать ещё'}
        </RoundedButton>
      </div>
    </div>
    // : <>123</>
  )
};

export default VideoList;
