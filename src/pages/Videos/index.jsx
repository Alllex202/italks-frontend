import React from 'react';

import classNames from 'classnames';

import axios from 'axios';

import { CSSTransition } from 'react-transition-group';

import { stylesDictionary as SD } from '../../settings/styles';
import { Settings } from '../../settings/settings';

import { ClickAwayListener, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { RoundedButton, VideoItem, VideoList } from '../../components';

const useStyles = makeStyles({  
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const Videos = (props) => {
  const classes = useStyles();
  const { period, categoryId, subcategoryId } = useParams();
  // const [isOpenedSortMenu, openSortMenu] = React.useState(false);
  // const [videos, setVideos] = React.useState([]);
  // const [numberPage, setNumberPage] = React.useState(1);
  // const [isLastPageServer, setLastPageServer] = React.useState(false);
  // const [isLoading, setLoading] = React.useState(false);

  // React.useEffect(() => {
  //   getNewVideos()
  // }, [period, categoryId, subcategoryId]);

  // const getNewVideos = () => {
  //   setLoading(true);
  //   if (categoryId || (categoryId && subcategoryId)) {
  //     axios
  //       .get(`${Settings.serverUrl}/video/sorted/${categoryId}/`, {
  //         params: {
  //           period: period,
  //           page: numberPage,
  //           subcategory: subcategoryId,
  //         }
  //       })
  //       .then(response => {
  //         // console.log(response.data)
  //         setLastPageServer(response.data.is_last_page);
  //         setVideos([...videos, ...response.data.videos_page]);
  //         if (!response.data.is_last_page) {
  //           setNumberPage(numberPage + 1);
  //         }
  //         setLoading(false);
  //       })
  //       .catch(error => {
  //         setLoading(false);
  //       });
  //   } else {
  //     axios
  //       .get(`${Settings.serverUrl}/video/`, {
  //         params: {
  //           period: period,
  //           page: numberPage,
  //         }
  //       })
  //       .then(response => {
  //         // console.log(response.data)
  //         setLastPageServer(response.data.is_last_page);
  //         setVideos([...videos, ...response.data.videos_page]);
  //         if (!response.data.is_last_page) {
  //           setNumberPage(numberPage + 1);
  //         }
  //         setLoading(false);
  //       })
  //       .catch(error => {
  //         setLoading(false);
  //       });
  //   }
  // }

  // const closeSortMenu = () => {
  //   openSortMenu(false);
  // };

  // const handlerOnClickSortTitle = () => {
  //   openSortMenu(!isOpenedSortMenu);
  // };

  // const handlerOnClickBtnMore = () => {
  //   if (!isLastPageServer && !isLoading) {
  //     getNewVideos();
  //   }
  // };

  return (
    <VideoList
      title={period}
      categoryId={categoryId}
      subcategoryId={subcategoryId}
      period={period}
    />
    // <React.Fragment>
    //   <CSSTransition
    //     in={videos && videos.length > 0}
    //     timeout={500}
    //     classNames="animation"
    //     unmountOnExit
    //   >
    //     <div>
    //       <div className={classes.title}>
    //         <h3 className={classes.titleName}>На этой неделе</h3>
    //         <ClickAwayListener onClickAway={closeSortMenu}>

    //           <div className={classNames('unselected', classes.sort)}>
    //             <div
    //               className={classNames(classes.sortTitle)}
    //               onClick={handlerOnClickSortTitle}
    //             >
    //               <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                 <path d="M1.75 10.5H5.25V9.33333H1.75V10.5ZM1.75 3.5V4.66667H12.25V3.5H1.75ZM1.75 7.58333H8.75V6.41667H1.75V7.58333Z" fill="#828588" />
    //               </svg>
    //               <span>Упорядочить</span>
    //             </div>
    //             <CSSTransition
    //               in={isOpenedSortMenu}
    //               timeout={300}
    //               classNames="animation-fast"
    //               unmountOnExit
    //             >
    //               <ul className={classes.sortMenu}>
    //                 {
    //                   [
    //                     'По длительности',
    //                     'По названию',
    //                     'Сначала старые',
    //                     'Сначала новые'
    //                   ].map((el, ind) => (
    //                     <li key={ind} className={classNames(classes.sortMenuItem, ind === 1 && classes.sortMenuItemSelect)}>
    //                       {el}
    //                     </li>
    //                   ))
    //                 }
    //               </ul>
    //             </CSSTransition>
    //           </div>
    //         </ClickAwayListener>

    //       </div>
    //       <div className={classes.videoGrid}>
    //         {
    //           videos && videos.length > 0 && videos.map(video => (
    //             <div
    //               key={video.id}
    //               className={classes.videoItemWrapper}
    //             >
    //               <VideoItem
    //                 videoData={video}
    //                 className={classes.videoItem}
    //               />
    //             </div>
    //           ))
    //         }
    //       </div>
    //       <div>
    //         <CSSTransition
    //           in={videos && videos.length > 0 && !isLastPageServer && !isLoading}
    //           timeout={300}
    //           classNames="animation-fast"
    //           unmountOnExit
    //         >
    //           <RoundedButton
    //             className={classes.btnMore}
    //             onClick={handlerOnClickBtnMore}
    //           >
    //             {'Показать ещё'}
    //           </RoundedButton>
    //         </CSSTransition>
    //         <CSSTransition
    //           in={isLoading}
    //           timeout={300}
    //           classNames="animation-fast"
    //           unmountOnExit
    //         >
    //           <div className='loader'></div>
    //         </CSSTransition>
    //       </div>
    //     </div>
    //   </CSSTransition >
    //   <CSSTransition
    //     in={!(videos && videos.length > 0)}
    //     timeout={300}
    //     classNames="animation-fast"
    //     unmountOnExit
    //   >
    //     <div className='loader'></div>
    //   </CSSTransition>
    // </React.Fragment>
  )
};

export default Videos;
