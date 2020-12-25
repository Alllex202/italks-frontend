import React from 'react';

import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core';

import { Link as RLink, Switch, Route, useHistory } from 'react-router-dom';

import LogoSvg from '../../assets/img/Logo.svg';
import HelloSvg from '../../assets/img/Hello.svg';
import ItsOKSvg from '../../assets/img/ItsOK.svg';
import DoitSvg from '../../assets/img/Doit.svg';

import Login from './Login';
import Register from './Register';
import Restore from './Restore';
import RestoreConfirm from './RestoreConfirm';

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
})

const LogRegRes = ({ loginFor }) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.bigTextBlock}>
        <RLink className={classes.logo} to='/overview'>
          <img src={LogoSvg} alt="logo icon" />
        </RLink>
        <div className={classes.bigText}>
          <Switch>
            <Route exact path={[
              '/login/for/:loginFor',
              '/login'
            ]}>
              <img className={classes.bigTextImg} src={HelloSvg} alt={'Hello!'} />
              {/* {'Hello! (^０^)ノ'} */}
            </Route>
            <Route exact path='/register'>
              <img className={classes.bigTextImg} src={DoitSvg} alt={'Do it!'} />
              {/* {'Do it! (^_−)☆'} */}
            </Route>
            <Route exact path={[
              '/password/reset/confirm/:uid/:token',
              '/restore'
            ]}>
              <img className={classes.bigTextImg} src={ItsOKSvg} alt={'It’s OK'} />
              {/* {'It’s OK (ノ_<、)'} */}
            </Route>
          </Switch>
        </div>
      </div>
      <div className={classes.actionBlock}>
        <Switch>
          <Route exact path={[
            '/login/for/:loginFor',
            '/login'
          ]}>
            <Login
              loginFor={loginFor}
            />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/restore'>
            <Restore />
          </Route>
          <Route exact path='/password/reset/confirm/:uid/:token'>
            <RestoreConfirm />
          </Route>
        </Switch>
      </div>
    </div>
  )
};

export default LogRegRes;
