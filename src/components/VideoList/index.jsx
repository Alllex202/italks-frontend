import React from 'react';

import classNames from 'classnames';

import axios from 'axios';

import { CSSTransition } from 'react-transition-group';

import { stylesDictionary as SD } from '../../settings/styles';
import { Settings } from '../../settings/settings';

import { ClickAwayListener, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { RoundedButton, VideoItem } from '../../components';
import { lockScroll as _ls } from '../../constF/lockScroll';

const useStyles = makeStyles({
  videoList: {
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
  sortOpened: {
    '& > $sortTitle': {
      '$ > span': {
        color: SD.basic.colors.main.violetDark,
      },
    },
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
    // padding: '16px 0 16px 18px',
    // height: '100%',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    backgroundColor: 'transparent',
    color: SD.basic.colors.main.black,
    // cursor: 'pointer',
    transition: 'color .3s, background-color .3s',
    '& > label': {
      display: 'inline-block',
      padding: '16px 0 16px 18px',
      width: '100%',
      cursor: 'pointer',
      '& > input': {
        display: 'none',
        '&:checked': {
          '& ~ span': {
            color: SD.basic.colors.main.violetDark,
          }
        },
      },
    },
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
  title,
  url,
  setAuthenticated,
  headers
}) => {
  const classes = useStyles();
  // const [isFirstLoading, setFirstLoading] = React.useState(true);
  const [isOpenedSortMenu, setOpenSortMenu] = React.useState(false);
  const [videos, setVideos] = React.useState([]);
  const [numberPage, setNumberPage] = React.useState(1);
  const [isLastPageServer, setLastPageServer] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [currentScroll, setScroll] = React.useState(0);
  const [sortName, setSortName] = React.useState('new_date');

  const getNewVideos = () => {
    setLoading(true);
    axios.get(url, {
      params: {
        query: searchQuery,
        page: numberPage,
        order_by: sortName,
        period: period,
        subcategory: subcategoryId,
      },
      headers: headers,
    })
      .then(response => {
        setAuthenticated && setAuthenticated(true);
        setNumberSearchResults && setNumberSearchResults(response.data.count)
        setLastPageServer(response.data.is_last_page);
        setVideos([...videos, ...response.data.videos_page])
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setAuthenticated
          && error
          && error.response
          && error.response.status === 401
          && setAuthenticated(false)
      })
  };

  const lockScroll = () => _ls(currentScroll);

  const closeSortMenu = () => {
    setOpenSortMenu(false);
  };

  const openSortMenu = () => {
    setOpenSortMenu(true);
  };

  const handlerOnClickSortTitle = () => {
    if (isOpenedSortMenu) {
      closeSortMenu();
    } else {
      openSortMenu();
    }
  };

  const handlerOnClickBtnMore = () => {
    if (!isLastPageServer && !isLoading) {
      setNumberPage(numberPage + 1);
      // getNewVideos();
    }
  };

  const onClickSortItem = (sortName) => {
    setSortName(sortName);
    setVideos([]);
    setNumberPage(1);
    setLastPageServer(false);
    setLoading(true);
    setScroll(0);
    closeSortMenu();
  };

  React.useEffect(() => {
    getNewVideos();
  }, [sortName, numberPage]);

  return (
    // !isLoading &&
    <div className={classes.videoList}>
      {
        videos && videos.length > 0 &&
        <div className={classes.title}>
          <h3 className={classes.titleName}>{title}</h3>
          <ClickAwayListener onClickAway={closeSortMenu}>
            <div className={classNames('unselected', classes.sort, isOpenedSortMenu ? classes.sortOpened : '')}>
              <div
                className={classNames(classes.sortTitle)}
                onClick={handlerOnClickSortTitle}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.75 10.5H5.25V9.33333H1.75V10.5ZM1.75 3.5V4.66667H12.25V3.5H1.75ZM1.75 7.58333H8.75V6.41667H1.75V7.58333Z" fill="#828588" />
                </svg>
                <span>Упорядочить</span>
              </div>
              {
                isOpenedSortMenu && <SortMenu
                  classes={classes}
                  setScroll={setScroll}
                  lockScroll={lockScroll}
                  currentScroll={currentScroll}
                  setOpenSortMenu={setOpenSortMenu}
                  onClickSortItem={onClickSortItem}
                  sortName={sortName}
                />
              }
            </div>
          </ClickAwayListener>

        </div>
      }
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
        {
          videos && videos.length > 0 && !isLastPageServer &&
          <RoundedButton
            className={classes.btnMore}
            onClick={handlerOnClickBtnMore}
            disabled={isLoading}
          >
            {'Показать ещё'}
          </RoundedButton>
        }
      </div>
    </div>
  )
};

export default VideoList;

const SortMenu = ({
  classes,
  setScroll,
  lockScroll,
  setOpenSortMenu,
  onClickSortItem,
  sortName,
}) => {
  React.useEffect(() => {
    const scroll = parseInt(window.pageYOffset);
    setScroll(scroll);
    document.addEventListener('scroll', lockScroll);

    return () => {
      document.removeEventListener('scroll', lockScroll);
    }
  });

  return (

    // <CSSTransition
    //   in={isOpenedSortMenu}
    //   timeout={300}
    //   classNames="animation-fast"
    //   unmountOnExit
    // >
    <ul className={classes.sortMenu}>
      {
        [
          {
            id: 1,
            text: 'По длительности',
            sortName: 'duration'
          },
          {
            id: 2,
            text: 'По названию',
            sortName: 'name'
          },
          {
            id: 3,
            text: 'Сначала старые',
            sortName: 'old_date'
          },
          {
            id: 4,
            text: 'Сначала новые',
            sortName: 'new_date'
          }
        ].map((el) => (
          <li
            key={el.id}
            className={classNames(classes.sortMenuItem)}
            onClick={() => onClickSortItem(el.sortName)}
          >
            <label>
              {
                el.sortName === sortName
                  ? <input type='radio' name='sort' defaultChecked />
                  : <input type='radio' name='sort' />
              }
              <span>{el.text}</span>
            </label>
          </li>
        ))
      }
    </ul>
    // </CSSTransition>
  )
}