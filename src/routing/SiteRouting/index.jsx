import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';
import { Header, Sidebar } from '../../components';
import { Context } from '../../components/Context';
import { PageActivateProfile, PageError, PageLogin, PageRegister, PageRestore, PageRestoreConfirm } from '../../pages';
// import { ActivateProfile, LogRegRes } from '../../pages';
import ContentRouting from './ContentRouting';

const SiteRouting = () => {
  const { auth } = React.useContext(Context);
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/overview' />
      </Route>

      <Route path={[
        '/login',
        '/register',
        '/activate/:uid/:token',
        '/restore',
        '/password/reset/confirm/:uid/:token',
      ]}>
        {
          !auth
            ? <>
              {/* Вход */}
              <Route path='/login'>
                <Switch>
                  <Route exact path='/login'>
                    <PageLogin />
                  </Route>
                  <Route exact path='/login/for/like'>
                    <PageLogin title='Войдите, чтобы отслеживать категории' />
                  </Route>
                  <Route exact path='/login/for/star'>
                    <PageLogin title='Войдите, чтобы добавлять видео в избранное' />
                  </Route>
                  <Route>
                    <Redirect to='/login' />
                  </Route>
                </Switch>
              </Route>

              {/* Регистрации */}
              <Route path='/register'>
                <Switch>
                  <Route exact path='/register'>
                    <PageRegister />
                  </Route>
                  <Route>
                    <Redirect to='/register' />
                  </Route>
                </Switch>
              </Route>

              {/* Восстановления пароля */}
              <Route path='/restore'>
                <Switch>
                  <Route exact path='/restore'>
                    <PageRestore />
                  </Route>
                  <Route>
                    <Redirect to='/restore' />
                  </Route>
                </Switch>
              </Route>


              {/* Восстановление пароля - создание нового пароля */}
              <Route exact path='/password/reset/confirm/:uid/:token'>
                <PageRestoreConfirm />
              </Route>

              {/* Активация профиля */}
              <Route exact path='/activate/:uid/:token'>
                <PageActivateProfile />
              </Route>

              <Route>
                <PageError statusError={404} />
              </Route>
            </>
            : <Redirect to='/overview' />
        }
      </Route>

      <Route exact path={[
        '/overview',
        '/favourites'
      ]}>
        <Header />
        <Sidebar />
        <ContentRouting />
      </Route>
      <Route>
        <PageError statusError={404} />
      </Route>
    </Switch>
  )
};

export default SiteRouting;

// const _SiteRouting = () => {
//   const { auth } = React.useContext(Context);
//   return (
//     <Switch>
//       <Route exact path='/activate/:uid/:token'>
//         <ActivateProfile />
//       </Route>
//       <Route exact path='/test'>
//         <Test />
//       </Route>
//       <Route exact path={[
//         '/password/reset/confirm/:uid/:token',
//         '/#/password/reset/confirm/:uid/:token',
//         '/login/for/:loginFor',
//         '/login',
//         '/register',
//         '/restore'
//       ]}>
//         <PagesLogRegRes
//           auth={auth}
//         />
//       </Route>
//       <Route path={['/login']}>
//         <Redirect to={'/login'} />
//       </Route>
//       <Route path={['/register']}>
//         <Redirect to={'/register'} />
//       </Route>
//       <Route path={['/restore']}>
//         <Redirect to={'/restore'} />
//       </Route>
//       <Route exact path={'/'}>
//         <Redirect to='/overview' />
//       </Route>
//       <Route>
//         <Header />
//         <Sidebar />
//         <Main />
//       </Route>
//     </Switch>
//   )
// };

// const PagesLogRegRes = ({ auth }) => {
//   const { loginFor } = useParams();
//   return (
//     !auth
//       ? loginFor === undefined
//         ? <LogRegRes />
//         : loginFor === 'like'
//           || loginFor === 'star'
//           ? <LogRegRes loginFor={loginFor} />
//           : <Redirect to='/login' />
//       : <Redirect to='/overview' />
//   )
// };