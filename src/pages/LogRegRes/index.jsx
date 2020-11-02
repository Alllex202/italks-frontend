import React from 'react';

import { makeStyles } from '@material-ui/core';

import { Link as RLink, Switch, Route, useHistory } from 'react-router-dom';

import LogoSvg from '../../assets/img/Logo.svg';
import HelloSvg from '../../assets/img/Hello.svg';
import ItsOKSvg from '../../assets/img/ItsOK.svg';
import DoitSvg from '../../assets/img/Doit.svg';

import Login from './Login';
import Register from './Register';
import Restore from './Restore';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  bigTextBlock: {
    position: 'relative',
    width: 846,
    backgroundColor: '#EE6002',
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
    fontFamily: 'Jetbrains Mono',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '192px',
    lineHeight: '238px',
    color: '#C6F68D',
  },
  bigTextImg: {
    fontFamily: 'Jetbrains Mono',
    margin: 'auto',
    marginLeft: 18,
  },
  actionBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 434,
    backgroundColor: '#fff',
  }
})

const LogRegRes = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.bigTextBlock}>
        <RLink className={classes.logo} to='/'>
          <img src={LogoSvg} alt="logo icon" />
        </RLink>
        <div className={classes.bigText}>
          <Switch>
            <Route exact path='/login'>
              <img className={classes.bigTextImg} src={HelloSvg} alt={'Hello!'} />
              {/* {'Hello! (^０^)ノ'} */}
            </Route>
            <Route exact path='/register'>
              <img className={classes.bigTextImg} src={DoitSvg} alt={'Do it!'} />
              {/* {'Do it! (^_−)☆'} */}
            </Route>
            <Route exact path='/restore'>
              <img className={classes.bigTextImg} src={ItsOKSvg} alt={'It’s OK'} />
              {/* {'It’s OK (ノ_<、)'} */}
            </Route>
          </Switch>
        </div>
      </div>
      <div className={classes.actionBlock}>
        <Switch>
          <Route exact path='/login'>
            <Login
              auth={props.auth}
              setAuth={props.setAuth}
            />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/restore'>
            <Restore />
          </Route>
        </Switch>
      </div>
    </div>
  )
};

export default LogRegRes;
