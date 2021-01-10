import React from 'react';

import { stylesDictionary as SD } from '../../settings/styles';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LogoSvg from '../../assets/img/Logo.svg';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    width: '100%',
    height: '100vh',
  },
  bigTextBlock: {
    position: 'relative',
    width: 846,
    backgroundColor: SD.basic.colors.main.orange,
  },
  logo: {
    margin: '24px 0 0 18px',
    width: 59,
    height: 17,
    display: 'inline-block',
    '& img': {
      width: 59,
      height: 17,
    },
  },
  bigText: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '192px',
    lineHeight: '238px',
    // color: '#C6F68D',
  },
  bigTextImg: {
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    margin: 'auto',
    marginLeft: 18,
  },
  actionBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // width: 434,
    backgroundColor: SD.basic.colors.main.white,
    margin: 'auto',
  }
});

const WrapperPromo = ({ image, alt, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.bigTextBlock}>
        <Link className={classes.logo} to='/overview'>
          <img src={LogoSvg} alt="logo icon" />
        </Link>
        <div className={classes.bigText}>
          <img className={classes.bigTextImg} src={image} alt={alt} />
        </div>
      </div>
      <div className={classes.actionBlock}>
        {children}
      </div>
    </div>
  )
};

export default WrapperPromo;
