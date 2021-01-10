import React from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { RoundedButton } from '../../components';

import { stylesDictionary as SD } from '../../settings/styles';

const useStyles = makeStyles({
  favouritesPromo: {
    paddingTop: 'calc(50vh - 90px - 100px)'
  },
  favouritesPromoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 555,
    margin: 'auto',
  },
  promoImg: {
    height: 89,
    width: 440,
    marginBottom: 24,
  },
  promoTitle: {
    display: 'inline-block',
    marginBottom: 12,
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: SD.basic.colors.main.pink,
  },
  promoSubtitle: {
    display: 'inline-block',
    marginBottom: 24,
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '17px',
    color: SD.basic.colors.main.grey,
  },
  promoBigBtn: {
    height: 48,
    width: '100%',
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const PageFavouriteNotAuth = () => {
  const classes = useStyles();
  let history = useHistory();

  const handlerButtonClick = () => {
    history.push('/login');
  };

  return (
    <div className={classes.favouritesPromo}>
      <div className={classes.favouritesPromoContainer}>
        <svg className={classes.promoImg} width="436" height="77" viewBox="0 0 436 77" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.448 9.248L65.392 74.192L67.552 72.032L2.608 7.088L0.448 9.248ZM104.92 77C98.248 75.32 93.112 72.104 89.512 67.352C85.96 62.6 84.184 56.6 84.184 49.352V34.808C84.184 27.608 85.984 21.632 89.584 16.88C93.184 12.08 98.296 8.84 104.92 7.16V11.768C99.928 13.016 96.04 15.656 93.256 19.688C90.52 23.72 89.152 28.76 89.152 34.808V49.352C89.152 55.304 90.544 60.32 93.328 64.4C96.112 68.432 99.976 71.048 104.92 72.248V77ZM155.292 10.184H161.196L151.98 0.391995H147.228L138.444 10.184H143.988L149.532 3.992H149.748L155.292 10.184ZM217.86 68L188.844 17.816H246.804L217.86 68ZM217.86 62.312L241.836 20.696H193.812L217.86 62.312ZM292.612 10.184H298.516L289.3 0.391995H284.548L275.764 10.184H281.308L286.852 3.992H287.068L292.612 10.184ZM330.772 72.248C335.716 71.048 339.58 68.432 342.364 64.4C345.148 60.32 346.54 55.304 346.54 49.352V34.808C346.54 28.76 345.148 23.72 342.364 19.688C339.628 15.656 335.764 13.016 330.772 11.768V7.16C337.396 8.84 342.508 12.08 346.108 16.88C349.708 21.632 351.508 27.608 351.508 34.808V49.352C351.508 56.648 349.732 62.672 346.18 67.424C342.628 72.176 337.492 75.368 330.772 77V72.248ZM435.216 9.248L433.056 7.088L368.112 72.032L370.272 74.192L435.216 9.248Z" fill="#828588" />
        </svg>
        <span className={classes.promoTitle}>Все конференции из мира IT в одном месте</span>
        <span className={classes.promoSubtitle}>Войдите, чтобы отслеживать категории и добавлять видео в избранное</span>
        <RoundedButton
          className={classes.promoBigBtn}
          onClick={handlerButtonClick}
          endIcon={(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 17L9.6 15.6L12.2 13H2L2 11L12.2 11L9.6 8.4L11 7L16 12L11 17ZM20 5H12V3L20 3C21.1 3 22 3.9 22 5L22 19C22 20.1 21.1 21 20 21L12 21V19L20 19L20 5Z" fill="#828588" />
            </svg>
          )}
        >
          Вход
      </RoundedButton>
      </div>
    </div>
  )
};

export default PageFavouriteNotAuth;
