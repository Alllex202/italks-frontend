import React, { useContext } from 'react';
import { stylesDictionary as SD, stylesDictionary } from '../../settings/styles'

import { Link as RLink } from 'react-router-dom';

import { Scrollbars } from 'react-custom-scrollbars';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, Typography, ClickAwayListener, Divider } from '@material-ui/core';
import { HideOnScroll } from '..';
import HeaderSearch from '../HeaderSearch';

import LogoSvg from '../../assets/img/Logo.svg';
import { Context } from '../Context';
import RoundedButton from '../RoundedButton';

import classNames from 'classnames';
import axios from 'axios';
import { Settings } from '../../settings/settings';

import continueWatchingImage from '../../assets/img/continueWatchingImage.png';
import { useEffect } from 'react';
import { lockScroll as _ls } from '../../constF/lockScroll';
import { getAuthToken, removeAuthToken } from '../../auth/Auth';

const useStyles = makeStyles({
  header: {
    transition: 'all .3s',
    backgroundColor: SD.basic.colors.main.orange,
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
    color: SD.basic.colors.main.black,
    height: 16,
    textDecoration: 'none',
    cursor: 'pointer',
    textAlign: 'medium',
    display: 'inline-flex',
    transition: 'color .3s',
    '&:hover, &:focus': {
      textDecoration: 'none',
      color: SD.basic.colors.main.violetDark,
      '& svg': {
        '& path': {
          fill: SD.basic.colors.main.violetDark,
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
        fill: SD.basic.colors.main.black,
        transition: 'fill .3s',
      }
    },
  },
  imageButton: {
    padding: 0,
    margin: 0,
    marginLeft: 18,
    cursor: 'pointer',
    display: 'inline-flex',
    transition: 'transform .3s',
    '&:hover, &:focus': {
      textDecoration: 'none',
      '& svg': {
        '& path': {
          fill: SD.basic.colors.main.violetDark,
        }
      }
    },
    '& svg': {
      marginTop: 'auto',
      marginBottom: 'auto',
      width: 18,
      height: 18,
      '& path': {
        fill: SD.basic.colors.main.black,
        transition: 'fill .3s',
      }
    },
  },
  imageButtonActive: {
    '& svg': {
      '& path': {
        fill: SD.basic.colors.main.violetDark,
      }
    }
  },
  imageButtonActiveNotifications: {
    transform: 'rotate(33deg)',
  },
  imageButtonActiveMenu: {
    transform: 'rotate(360deg)',
  },

  containerBlock: {
    display: 'flex',
    position: 'relative',
  },
  smallContainerWrapper: {
    display: 'none',
    position: 'absolute',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.12)',
    '&::before': {
      content: '""',
      display: 'block',
      width: 0,
      height: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      border: 'solid 10px transparent',
      // borderBottom: 'solid 10px transparent'
    },
    '&::after': {
      content: '""',
      display: 'block',
      width: 0,
      height: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      border: 'solid 10px transparent',
      borderBottom: 'solid 10px #FFFFFF',
    }
  },
  smallContainer: {
    display: 'flex',
    // position: 'absolute',
    position: 'relative',
    padding: '18px',
    background: SD.basic.colors.main.white,
    // boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
  },
  imageButtonBlock: {
    margin: 0,
    marginLeft: 18,
    '& > a': {
      margin: 0,
    },
  },

  continueWatchingBlock: {
    display: 'inline-block',
    position: 'relative',
    borderRadius: '32px',
    zIndex: 100,
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
      backgroundColor: SD.basic.colors.main.violetDark,
      borderColor: SD.basic.colors.main.violetDark,
      '& span': {
        color: SD.basic.colors.main.white,
      },
    },
  },
  continueWatchingLabel: {
    color: SD.basic.colors.main.black,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    textTransform: 'none',
  },
  continueWatchingInfoWrapper: {
    display: 'none',
    // display: 'flex',
    top: '48px',
    left: '50%',
    transform: 'translateX(-50%)',
    '&::after': {
      top: '-18px',
      left: '50%',
      transform: 'translateX(-50%)',
    }
  },
  continueWatchingInfo: {
    justifyContent: 'space-between',
    width: '267px',
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
    color: SD.basic.colors.main.black,
  },
  continueWatchingTime: {
    display: 'inline-block',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: SD.basic.colors.main.grey,
  },


  notificationsWrapper: {
    top: 42,
    left: '-213px',
    '&::before': {

    },
    '&::after': {
      top: -19,
      left: 212,
    }
  },
  notificationsBlock: {
    // overflowX: 'hidden',
    padding: '18px 0',
  },
  notifications: {
    flexDirection: 'column',
    maxHeight: 340,
    minHeight: 50,
    width: 267,
    overflow: 'auto',
    overflowX: 'hidden',
    padding: 0,
    '& ::-webkit-scrollbar': {
      width: '0px',
    }
  },
  notificationsEmpty: {
    display: 'inline-block',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    textAlign: 'center',
    color: SD.basic.colors.main.grey,
    height: 48,
    lineHeight: '48px',
  },
  dFlex: {
    display: 'flex',
  },
  dBlock: {
    display: 'block',
  },
  notification: {
    display: 'flex',
    width: 267,
    height: 'auto',
    justifyContent: 'flex-start',
    // marginBottom: 12,
    padding: '6px 18px 4px 18px',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: SD.basic.colors.translucent.violet,
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
    color: SD.basic.colors.main.black,
  },
  notificatioDate: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: SD.basic.colors.main.grey,
  },

  menuWrapper: {
    top: 42,
    left: -173,
    '&::after': {
      top: -20,
      left: 172,
    },
  },
  menu: {
    padding: '18px 0',
    flexDirection: 'column',
  },
  menuItem: {
    display: 'flex',
    backgroundColor: SD.basic.colors.main.white,
    transition: 'background-color .3s',
    '& svg path, & span': {
      transition: 'fill .3s, color .3s',
    },
    '&:not(:last-of-type) svg path': {
      fill: SD.basic.colors.main.black,
    },
    '&:not(:last-of-type) span': {
      color: SD.basic.colors.main.black,
    },
    '&:not(:last-of-type):hover, &:not(:last-of-type):focus': {
      backgroundColor: SD.basic.colors.translucent.violet,
    },
    '&:not(:last-of-type):active': {
      '& svg path': {
        fill: SD.basic.colors.main.violetDark,
      },
      '& span': {
        color: SD.basic.colors.main.violetDark,
      },
      backgroundColor: SD.basic.colors.translucent.violet,
    },
    '&:last-of-type': {
      '& svg': {
        transform: 'rotate(180deg)',
        '& path': {
          fill: SD.basic.colors.main.pink,
        },
      },
      '& span': {
        color: SD.basic.colors.main.pink,
      },
      '&:hover, &:focus': {
        backgroundColor: SD.basic.colors.translucent.pink,
      }
    }
  },
  menuItemActive: {
    '& svg path': {
      fill: SD.basic.colors.main.violetDark,
    },
    '& span': {
      color: SD.basic.colors.main.violetDark,
    },
    backgroundColor: SD.basic.colors.translucent.violet,
  },
  itemLink: {
    display: 'flex',
    alignItems: 'center',
    width: 226,
    height: 48,
    cursor: 'pointer',
    // backgroundColor: '#ffffff',
    '& > svg': {
      marginLeft: 18,
      width: 18,
      height: 18,
      '& path': {
        // fill: '#000000',
      },
    },
    '& > span': {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '16px',
      // color: '#000000',
      marginLeft: 12,
    },
    // '&:hover': {
    //   backgroundColor: 'rgba(109, 30, 255, 0.1)',
    // },
  },
  menuUser: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    display: 'flex',
    height: 48,
    alignItems: 'center',
    color: SD.basic.colors.main.grey,
    marginLeft: 18,
  },
  menuDivider: {
    width: 190,
    margin: 'auto',
  },
  '@media (max-width: 1599px)': {
    
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
  const [currentScroll, setScroll] = React.useState(0);
  const { auth, infoUser } = React.useContext(Context);

  const handleOpenSearch = () => {
    openNotifications(false);
    openMenu(false);
    openSearch(true);
  }

  const handleCloseSearch = () => {
    openSearch(false);
    setInputSearch('');
  }

  // const actionScroll = () => window.scrollTo({ top: currentScroll });
  const lockScroll = () => _ls(currentScroll);

  return (
    <React.Fragment>
      {
        !searchOpened
          ? (<HideOnScroll
            {...props}
            notificationsOpened={notificationsOpened}
            menuOpened={menuOpened}
          >
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
                          onClick={() => console.log('Продолжить просмотр')}
                          className={classes.continueWatchingButton}
                          classes={{
                            root: classes.continueWatchingRoot,
                            label: classes.continueWatchingLabel,
                          }}
                        >
                          Продолжить просмотр
                        </RoundedButton>
                        <div className={classNames(classes.smallContainerWrapper, classes.continueWatchingInfoWrapper)}>
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
                      </div>
                      <ClickAwayListener onClickAway={() => openNotifications(false)}>
                        <div className={classNames(classes.containerBlock, classes.imageButtonBlock)}>
                          <Link
                            className={classNames(classes.imageButton, notificationsOpened && classes.imageButtonActive, notificationsOpened && classes.imageButtonActiveNotifications)}
                            onClick={() => openNotifications(!notificationsOpened)}
                          >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 16.5C9.825 16.5 10.5 15.825 10.5 15H7.5C7.5 15.825 8.1675 16.5 9 16.5ZM13.5 12V8.25C13.5 5.9475 12.27 4.02 10.125 3.51V3C10.125 2.3775 9.6225 1.875 9 1.875C8.3775 1.875 7.875 2.3775 7.875 3V3.51C5.7225 4.02 4.5 5.94 4.5 8.25V12L3 13.5V14.25H15V13.5L13.5 12Z" fill="black" />
                            </svg>
                          </Link>
                          {
                            notificationsOpened && (<Notifications
                              infoUser={infoUser}
                              openNotifications={openNotifications}
                              notificationsOpened={notificationsOpened}
                              lockScroll={lockScroll}
                              setScroll={setScroll}
                              currentScroll={currentScroll}
                            />)
                          }
                        </div>
                      </ClickAwayListener>

                      <ClickAwayListener onClickAway={() => openMenu(false)}>
                        <div className={classNames(classes.containerBlock, classes.imageButtonBlock)}>
                          <Link
                            className={classNames(classes.imageButton, menuOpened && classes.imageButtonActive, menuOpened && classes.imageButtonActiveMenu)}
                            onClick={() => openMenu(!menuOpened)}
                          >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.75 8.8125C6.2325 8.8125 5.8125 9.2325 5.8125 9.75C5.8125 10.2675 6.2325 10.6875 6.75 10.6875C7.2675 10.6875 7.6875 10.2675 7.6875 9.75C7.6875 9.2325 7.2675 8.8125 6.75 8.8125ZM11.25 8.8125C10.7325 8.8125 10.3125 9.2325 10.3125 9.75C10.3125 10.2675 10.7325 10.6875 11.25 10.6875C11.7675 10.6875 12.1875 10.2675 12.1875 9.75C12.1875 9.2325 11.7675 8.8125 11.25 8.8125ZM9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 8.7825 3.015 8.565 3.0375 8.355C4.8075 7.5675 6.21 6.12 6.945 4.3275C8.3025 6.2475 10.5375 7.5 13.065 7.5C13.65 7.5 14.2125 7.4325 14.7525 7.305C14.91 7.8375 15 8.4075 15 9C15 12.3075 12.3075 15 9 15Z" fill="black" />
                            </svg>
                          </Link>
                          {
                            menuOpened && (<HeaderMenu
                              menuOpened={menuOpened}
                              openMenu={openMenu}
                              lockScroll={lockScroll}
                              setScroll={setScroll}
                              currentScroll={currentScroll}
                            />)
                          }
                        </div>
                      </ClickAwayListener>

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


const Notifications = ({ infoUser, openNotifications, notificationsOpened,
  lockScroll, setScroll }) => {
  const classes = useStyles();

  useEffect(() => {
    const scroll = parseInt(window.pageYOffset);
    setScroll(scroll);
    document.addEventListener('scroll', lockScroll);

    return () => {
      document.removeEventListener('scroll', lockScroll);
    }
  });

  return (
    <div className={classNames(classes.smallContainerWrapper, classes.notificationsWrapper, notificationsOpened && classes.dFlex)}>
      <div
        className={classNames(classes.notificationsBlock)}
      >
        <div
          className={classNames(classes.smallContainer, classes.notifications)}
        >
          {
            infoUser && infoUser.notifications.length === 0
              ? (<span className={classes.notificationsEmpty}>'Сейчас уведомлений нет'</span>)
              : (
                infoUser.notifications.map(notif => (
                  <a
                    // key={ind}
                    href='#w'
                    className={classes.notification}
                    onClick={() => openNotifications(false)}
                  >
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
        </div>
      </div>
    </div>
  )
};

const HeaderMenu = ({ menuOpened, openMenu, lockScroll, setScroll }) => {
  const classes = useStyles();
  const { setAuth } = useContext(Context);
  const [logoutClicked, clickLogout] = React.useState(false);

  const handlerLogoutButtonClick = () => {
    // openMenu(false);
    if (!logoutClicked) {
      clickLogout(true);
      const token = getAuthToken();
      axios
        .post(`${Settings.serverUrl}/auth/token/logout/`, null, {
          headers: {
            'Authorization': `Token ${token}`,
          }
        })
        .then((response) => {
          clickLogout(false);
          setAuth(false);
          removeAuthToken();
        })
    }
  };

  useEffect(() => {
    const scroll = parseInt(window.pageYOffset);
    setScroll(scroll);
    document.addEventListener('scroll', lockScroll);

    return () => {
      document.removeEventListener('scroll', lockScroll);
    }
  });

  return (
    <div className={classNames(classes.smallContainerWrapper, classes.menuWrapper, menuOpened && classes.dFlex)}>
      <ul
        className={classNames(classes.smallContainer, classes.menu)}
      >
        <span className={classes.menuUser}>Александр Петухов</span>
        <li className={classes.menuItem}>
          <a
            href="#qwe"
            className={classes.itemLink}
            onClick={() => openMenu(false)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.3548 9.70529C14.3848 9.48029 14.3998 9.24779 14.3998 9.00029C14.3998 8.76029 14.3848 8.52029 14.3473 8.29529L15.8698 7.11029C16.0048 7.00529 16.0423 6.80279 15.9598 6.65279L14.5198 4.16279C14.4298 3.99779 14.2423 3.94529 14.0773 3.99779L12.2848 4.71779C11.9098 4.43279 11.5123 4.19279 11.0698 4.01279L10.7998 2.10779C10.7698 1.92779 10.6198 1.80029 10.4398 1.80029H7.55984C7.37984 1.80029 7.23734 1.92779 7.20734 2.10779L6.93734 4.01279C6.49484 4.19279 6.08984 4.44029 5.72234 4.71779L3.92984 3.99779C3.76484 3.93779 3.57734 3.99779 3.48734 4.16279L2.05484 6.65279C1.96484 6.81029 1.99484 7.00529 2.14484 7.11029L3.66734 8.29529C3.62984 8.52029 3.59984 8.76779 3.59984 9.00029C3.59984 9.23279 3.61484 9.48029 3.65234 9.70529L2.12984 10.8903C1.99484 10.9953 1.95734 11.1978 2.03984 11.3478L3.47984 13.8378C3.56984 14.0028 3.75734 14.0553 3.92234 14.0028L5.71484 13.2828C6.08984 13.5678 6.48734 13.8078 6.92984 13.9878L7.19984 15.8928C7.23734 16.0728 7.37984 16.2003 7.55984 16.2003H10.4398C10.6198 16.2003 10.7698 16.0728 10.7923 15.8928L11.0623 13.9878C11.5048 13.8078 11.9098 13.5678 12.2773 13.2828L14.0698 14.0028C14.2348 14.0628 14.4223 14.0028 14.5123 13.8378L15.9523 11.3478C16.0423 11.1828 16.0048 10.9953 15.8623 10.8903L14.3548 9.70529ZM8.99984 11.7003C7.51484 11.7003 6.29984 10.4853 6.29984 9.00029C6.29984 7.51529 7.51484 6.30029 8.99984 6.30029C10.4848 6.30029 11.6998 7.51529 11.6998 9.00029C11.6998 10.4853 10.4848 11.7003 8.99984 11.7003Z" fill="black" />
            </svg>
            <span>Настройки</span>
          </a>
        </li>
        <li className={classes.menuItem}>
          <a
            href="#qwe"
            className={classes.itemLink}
            onClick={() => openMenu(false)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6H3V4.5H15V6ZM13.5 1.5H4.5V3H13.5V1.5ZM16.5 9V15C16.5 15.825 15.825 16.5 15 16.5H3C2.175 16.5 1.5 15.825 1.5 15V9C1.5 8.175 2.175 7.5 3 7.5H15C15.825 7.5 16.5 8.175 16.5 9ZM12 12L7.5 9.5475V14.445L12 12Z" fill="black" />
            </svg>
            <span>Подписка</span>
          </a>
        </li>
        <Divider className={classes.menuDivider} />
        <li className={classes.menuItem}>
          <span
            className={classes.itemLink}
            onClick={() => {
              handlerLogoutButtonClick();
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 17L9.6 15.6L12.2 13H2L2 11L12.2 11L9.6 8.4L11 7L16 12L11 17ZM20 5H12V3L20 3C21.1 3 22 3.9 22 5L22 19C22 20.1 21.1 21 20 21L12 21V19L20 19L20 5Z" fill="#828588" />
            </svg>
            <span>Выйти</span>
          </span>
        </li>
      </ul>
    </div>
  )
};
