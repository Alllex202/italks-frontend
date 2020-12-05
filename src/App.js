import React, { useState } from 'react';
import { Route, Redirect, useLocation, Switch, useHistory } from 'react-router-dom';
import { Header, Main, Sidebar, Test } from './components';
import { LogRegRes } from './pages';
import axios from 'axios';

import { Settings } from './settings/settings';

import { Context } from './components/Context/index';
import { checkAuth } from './auth/checkAuth';

const App = (props) => {
  const [auth, setAuth] = useState(false);
  const [categories, setCategories] = useState(null);
  const [infoUser, setInfoUser] = useState({
    notifications: [1, 2, 3, 1, 1, 1, 1, 1,],
  });
  let location = useLocation();
  const [secondLevelMenuShow, setSecondLevelMenuShow] = useState(true);

  React.useEffect(() => {
    checkAuth(setAuth);
  }, []);

  React.useEffect(() => {
    if (!categories) {
      getCategories();
    }
  });

  const getCategories = () => {
    axios
      .get(`${Settings.serverUrl}/categories_and_subcategories/`)
      .then((response) => {
        setCategories(response.data.map(category => {
          return {
            subcategories: [{
              id: 0,
              categoryId: category.id,
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1.5L4.875 8.25H13.125L9 1.5ZM9 4.38L10.4475 6.75H7.545L9 4.38ZM13.125 9.75C11.2575 9.75 9.75 11.2575 9.75 13.125C9.75 14.9925 11.2575 16.5 13.125 16.5C14.9925 16.5 16.5 14.9925 16.5 13.125C16.5 11.2575 14.9925 9.75 13.125 9.75ZM13.125 15C12.09 15 11.25 14.16 11.25 13.125C11.25 12.09 12.09 11.25 13.125 11.25C14.16 11.25 15 12.09 15 13.125C15 14.16 14.16 15 13.125 15ZM2.25 16.125H8.25V10.125H2.25V16.125ZM3.75 11.625H6.75V14.625H3.75V11.625Z" fill="#333333" />
                </svg>
              ),
              name: 'Все',
              href: `/category/${category.id}`,
            }, ...category.subcategory.map(subcategory => {
              return {
                id: subcategory.id,
                categoryId: category.id,
                iconBase64: subcategory.icon_base_64,
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1.5L4.875 8.25H13.125L9 1.5ZM9 4.38L10.4475 6.75H7.545L9 4.38ZM13.125 9.75C11.2575 9.75 9.75 11.2575 9.75 13.125C9.75 14.9925 11.2575 16.5 13.125 16.5C14.9925 16.5 16.5 14.9925 16.5 13.125C16.5 11.2575 14.9925 9.75 13.125 9.75ZM13.125 15C12.09 15 11.25 14.16 11.25 13.125C11.25 12.09 12.09 11.25 13.125 11.25C14.16 11.25 15 12.09 15 13.125C15 14.16 14.16 15 13.125 15ZM2.25 16.125H8.25V10.125H2.25V16.125ZM3.75 11.625H6.75V14.625H3.75V11.625Z" fill="#333333" />
                  </svg>
                ),
                name: subcategory.name,
                href: `/category/${category.id}/subcategory/${subcategory.id}`,
              }
            })],
            id: category.id,
            iconBase64: category.icon_base_64,
            name: category.name,
            href: `/category/${category.id}`,
          }
        }));
        // console.log(response.data)
      });
  };

  return (
    <React.Fragment>
      <Context.Provider value={{
        auth, 
        setAuth, 
        infoUser, 
        setInfoUser, 
        categories, 
        secondLevelMenuShow, 
        setSecondLevelMenuShow
      }}>
        <Switch>
          <Route exact path='/test'>
            <Test />
          </Route>
          <Route exact path={['/login', '/register', '/restore']}>
            {
              !auth
                ? (
                  <LogRegRes
                  />
                )
                : <Redirect to='/' />
            }
          </Route>
          <Route exact path={'/overview'}>
            <Redirect to='/' />
          </Route>
          <Route>
            <Header
            />
            <Sidebar
            />
            <Main
              text={location.pathname}
            />
          </Route>
        </Switch>
        {/* <Header />
      <Sidebar />
      <Main
        text={location.pathname}
      /> */}
      </Context.Provider>
    </React.Fragment>
  );
}

export default App;
