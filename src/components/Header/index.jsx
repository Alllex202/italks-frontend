import React from 'react';

import { Link as RLink } from 'react-router-dom';

import { Scrollbars } from 'react-custom-scrollbars';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, Typography } from '@material-ui/core';
import { HideOnScroll } from '..';
import HeaderSearch from '../HeaderSearch';

import LogoSvg from '../../assets/img/Logo.svg';
import { Context } from '../Context';
import RoundedButton from '../RoundedButton';

import classNames from 'classnames';

import continueWatchingImage from '../../assets/img/continueWatchingImage.png';

const useStyles = makeStyles({
  header: {
    transition: 'all .2s',
    backgroundColor: '#EE6002',
    height: 65,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
  },
  toolbar: {
    paddingLeft: 18,
    paddingRight: 18,
    height: '100%',
    alignItems: 'center',
  },
  logo: {
    padding: 0,
    margin: 0,
    marginRight: 'auto',
    width: 59,
    height: 17,
    '& img': {
      width: 59,
      height: 17,
    },
  },
  login: {
    padding: 0,
    margin: 0,
    marginLeft: 'auto',
    fontSize: 14,
    color: '#000000',
    height: 16,
    textDecoration: 'none',
    cursor: 'pointer',
    textAlign: 'medium',
    display: 'inline-flex',
    transition: 'color .2s',
    '&:hover, &:focus': {
      textDecoration: 'none',
      color: '#6D1EFF',
      '& svg': {
        '& path': {
          fill: '#6D1EFF',
        }
      }
    },
    '& svg': {
      marginLeft: 4,
      width: 14,
      height: 14,
      marginTop: 'auto',
      marginBottom: 'auto',
      '& path': {
        fill: '#000000',
        transition: 'fill .2s',
      }
    },
  },
  imageButton: {
    padding: 0,
    margin: 0,
    marginLeft: 18,
    cursor: 'pointer',
    display: 'inline-flex',
    '&:hover, &:focus': {
      textDecoration: 'none',
      '& svg': {
        '& path': {
          fill: '#6D1EFF',
        }
      }
    },
    '& svg': {
      marginTop: 'auto',
      marginBottom: 'auto',
      width: 18,
      height: 18,
      '& path': {
        fill: '#000000',
        transition: 'fill .2s',
      }
    },
  },
  continueWatchingBlock: {
    display: 'inline-block',
    position: 'relative',
    borderRadius: '32px',
    '&:hover > div': {
      display: 'flex',
    },
  },
  continueWatchingButton: {
  },
  continueWatchingRoot: {
    backgroundColor: 'transparent',
    border: '1px solid #000000',
    '&:hover, &:focus': {
      backgroundColor: '#6D1EFF',
      borderColor: '#6D1EFF',
      '& span': {
        color: '#FFFFFF',
      },
    },
  },
  continueWatchingLabel: {
    color: '#000000',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    textTransform: 'none',
  },
  continueWatchingInfo: {
    display: 'none',
    // display: 'flex',
    justifyContent: 'space-between',
    width: '267px',
    top: '48px',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  continueWatchingImage: {
    width: 80,
    height: 45,
    objectFit: 'contain',
    marginRight: 12,
  },
  continueWatchingTitle: {
    display: 'inline-block',
    marginBottom: 8,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#000000',
  },
  continueWatchingTime: {
    display: 'inline-block',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#828588',
  },

  containerBlock: {
    display: 'flex',
    position: 'relative',
  },
  smallContainer: {
    display: 'none',
    position: 'absolute',
    padding: '18px',
    background: '#FFFFFF',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
  },
  imageButtonBlock: {
    margin: 0,
    marginLeft: 18,
    '& > a': {
      margin: 0,
    },
  },

  notifications: {
    flexDirection: 'column',
    maxHeight: 340,
    minHeight: 340,
    width: 267,
    overflow: 'hidden',
    paddingLeft: 0,
    paddingRight: 0,
    top: 42,
    left: '-213px',    
    '& ::-webkit-scrollbar': {
      width: '0px',
    },
  },
  flex: {
    display: 'flex',
  },
  notification: {
    display: 'flex',
    width: 267,
    justifyContent: 'flex-start',
    // marginBottom: 12,
    padding: '6px 18px 4px 18px',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(109, 30, 255, 0.1)',
    },
    // '&:last-child': {
    //   marginBottom: 0,
    // }
  },
  notificationImage: {
    width: 80,
    height: 45,
    objectFit: 'contain',
    marginRight: 12,
  },
  notificationText: {
    width: 139,
    // margin: '0 auto 0',
  },
  notificatioTitle: {
    display: 'inline-block',    
    marginBottom: '8px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#000000',
  },
  notificatioDate: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#828588',
  },
  '@media (max-width: 1599px)': {
    // header: {
    //   height: 65,
    // },
    // toolbar: {
    //   paddingLeft: 18,
    //   paddingRight: 18,
    // },
    // logo: {
    //   width: 59,
    //   height: 17,
    //   '& img': {
    //     width: 59,
    //     height: 17,
    //   },
    // },
    // login: {
    //   fontSize: 14,
    //   height: 16,
    //   '& svg': {
    //     marginLeft: 4,
    //     width: 14,
    //     height: 14,
    //   },
    // },
    // imageButton: {
    //   marginLeft: 18,
    //   '& svg': {
    //     width: 18,
    //     height: 18,
    //   }
    // }
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const Header = (props) => {
  const classes = useStyles();
  const [searchOpened, openSearch] = React.useState(false);
  const [notificationsOpened, openNotifications] = React.useState(false);
  const [menuOpened, openMenu] = React.useState(false);
  const [inputSearch, setInputSearch] = React.useState('');
  const { auth, infoUser } = React.useContext(Context);

  const handleOpenSearch = () => {
    openSearch(true);
  }

  const handleCloseSearch = () => {
    openSearch(false);
    setInputSearch('');
  }

  return (
    <React.Fragment>
      {
        !searchOpened
          ? (<HideOnScroll {...props}>
            <AppBar className={classes.header}>
              <Toolbar className={classes.toolbar}>
                <RLink className={classes.logo} to='/'>
                  <img src={LogoSvg} alt="logo icon" />
                </RLink>
                {
                  !auth
                    ? (<React.Fragment>
                      <RLink className={classes.login} to='/login'>
                        <span>Войти</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 17L9.6 15.6L12.2 13H2L2 11L12.2 11L9.6 8.4L11 7L16 12L11 17ZM20 5H12V3L20 3C21.1 3 22 3.9 22 5L22 19C22 20.1 21.1 21 20 21L12 21V19L20 19L20 5Z" fill="#828588" />
                        </svg>
                      </RLink>
                      <Link className={classes.imageButton} onClick={handleOpenSearch}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.6667 18.6667H19.6133L19.24 18.3067C20.5467 16.7867 21.3333 14.8133 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.34667 18.6667 6.66667 15.9867 6.66667 12.6667C6.66667 9.34667 9.34667 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z" fill="#828588" />
                        </svg>
                      </Link>
                    </React.Fragment>)
                    : (<React.Fragment>
                      <div className={classNames(classes.containerBlock, classes.continueWatchingBlock)}>
                        <RoundedButton
                          onClick={() => console.log(1)}
                          className={classes.continueWatchingButton}
                          classes={{
                            root: classes.continueWatchingRoot,
                            label: classes.continueWatchingLabel,
                          }}
                        >
                          Продолжить просмотр
                        </RoundedButton>
                        <div className={classNames(classes.smallContainer, classes.continueWatchingInfo)}>
                          <img className={classes.continueWatchingImage} src={continueWatchingImage} alt="preview" />
                          <div>
                            <span className={classes.continueWatchingTitle}>
                              Machine Learning на Python или зачем я это делаю?
                            </span>
                            <span className={classes.continueWatchingTime}>
                              22:48 из 42:43
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={classNames(classes.containerBlock, classes.imageButtonBlock)}>
                        <Link
                          className={classes.imageButton}
                          onClick={() => openNotifications(!notificationsOpened)}
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 16.5C9.825 16.5 10.5 15.825 10.5 15H7.5C7.5 15.825 8.1675 16.5 9 16.5ZM13.5 12V8.25C13.5 5.9475 12.27 4.02 10.125 3.51V3C10.125 2.3775 9.6225 1.875 9 1.875C8.3775 1.875 7.875 2.3775 7.875 3V3.51C5.7225 4.02 4.5 5.94 4.5 8.25V12L3 13.5V14.25H15V13.5L13.5 12Z" fill="black" />
                          </svg>
                        </Link>
                        <div
                          className={classNames(classes.smallContainer, classes.notifications, !notificationsOpened && classes.flex)}
                          id='notificationsContainer'
                        >
                          <div>
                          <Scrollbars
                            autoHide
                            autoHideTimeout={1000}
                            autoHideDuration={400}
                            style={{position: 'inherid'}}
                            renderTrackHorizontal={props => <div {...props} style={{ display: "none" }} />}
                            renderThumbHorizontal={props => <div {...props} style={{ display: "none" }} />}
                          >
                            {
                              infoUser && infoUser.notifications.length === 0
                                ? (<>Пусто</>)
                                : (
                                  infoUser.notifications.map(notif => (
                                    <a href='#w' className={classes.notification}>
                                      <img className={classes.notificationImage} src={continueWatchingImage} alt="preview" />
                                      <div className={classes.notificationText}>
                                        <span href='#qwe' className={classes.notificatioTitle}>
                                          <b>Python</b> “Machine Learning на Python или зачем я это делаю?”
                                        </span>
                                        <span className={classes.notificatioDate}>
                                          16 ноября в 11:42
                                        </span>
                                      </div>
                                    </a>
                                  ))
                                )
                            }
                          </Scrollbars>
                          </div>
                          
                        </div>
                      </div>
                      <Link className={classes.imageButton}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.75 8.8125C6.2325 8.8125 5.8125 9.2325 5.8125 9.75C5.8125 10.2675 6.2325 10.6875 6.75 10.6875C7.2675 10.6875 7.6875 10.2675 7.6875 9.75C7.6875 9.2325 7.2675 8.8125 6.75 8.8125ZM11.25 8.8125C10.7325 8.8125 10.3125 9.2325 10.3125 9.75C10.3125 10.2675 10.7325 10.6875 11.25 10.6875C11.7675 10.6875 12.1875 10.2675 12.1875 9.75C12.1875 9.2325 11.7675 8.8125 11.25 8.8125ZM9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 8.7825 3.015 8.565 3.0375 8.355C4.8075 7.5675 6.21 6.12 6.945 4.3275C8.3025 6.2475 10.5375 7.5 13.065 7.5C13.65 7.5 14.2125 7.4325 14.7525 7.305C14.91 7.8375 15 8.4075 15 9C15 12.3075 12.3075 15 9 15Z" fill="black" />
                        </svg>
                      </Link>
                      <Link className={classes.imageButton} onClick={handleOpenSearch}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.6667 18.6667H19.6133L19.24 18.3067C20.5467 16.7867 21.3333 14.8133 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.34667 18.6667 6.66667 15.9867 6.66667 12.6667C6.66667 9.34667 9.34667 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z" fill="#828588" />
                        </svg>
                      </Link>
                    </React.Fragment>)
                }
              </Toolbar>
            </AppBar>
          </HideOnScroll>)
          : (<HeaderSearch
            inputSearch={inputSearch}
            handleCloseSearch={handleCloseSearch}
            setInputSearch={setInputSearch}
          />)
      }
    </React.Fragment>
  );
};

export default Header;
