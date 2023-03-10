import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Views from './views';
import { Route, Switch } from 'react-router-dom';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { THEME_CONFIG } from './configs/AppConfig';
import authAdminService from 'services/auth/admin';
import {
  authenticated,
  setDashBoardNavTree,
  showLoading,
  signOutSuccess
} from 'redux/actions/Auth';
import { AUTH_TOKEN } from 'redux/constants/Auth';
import authSubAdminService from 'services/auth/subAdmin';
import navigationConfig, { sellerDashboard } from 'configs/NavigationConfig';
import Utils from 'utils';
import sellerService from 'services/auth/seller';

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const getProfile = async () => {
    console.log(localStorage.getItem('auth_type'), 'AUTH TYPE');
    if (localStorage.getItem('auth_type') === 'Admin') {
      const data = await authAdminService.getProfile();
      if (data) {
        dispatch(authenticated({ user: data }));
        dispatch(setDashBoardNavTree(navigationConfig));
        dispatch(showLoading(false));
      }
      dispatch(showLoading(false));
    } else if (localStorage.getItem('auth_type') === 'SubAdmin') {
      const data = await authSubAdminService.getProfile();
      if (data) {
        dispatch(authenticated({ user: data }));

        const subAdminNavigation = Utils.getSubAdminNavs(data?.roles);

        dispatch(setDashBoardNavTree(subAdminNavigation));

        dispatch(showLoading(false));
      }
      dispatch(showLoading(false));
    } else if (localStorage.getItem('auth_type') === 'Participant') {
      const data = await sellerService.getProfile();
      if (data) {
        dispatch(authenticated({ user: data }));

        dispatch(setDashBoardNavTree(sellerDashboard));

        dispatch(showLoading(false));
      }
      dispatch(showLoading(false));
    }
  };

  // Auth check
  useEffect(() => {
    dispatch(showLoading(true));
    const token = window.localStorage.getItem(AUTH_TOKEN);
    const auth_type = window.localStorage.getItem('auth_type');
    if (token && auth_type) {
      getProfile();
    } else {
      dispatch(signOutSuccess());
      dispatch(showLoading(false));
    }
  }, []);
  return (
    <div className="App">
      <ThemeSwitcherProvider
        themeMap={themes}
        defaultTheme={THEME_CONFIG.currentTheme}
        insertionPoint="styles-insertion-point"
      >
        <Router>
          <Switch>
            <Route path="/" component={Views} />
          </Switch>
        </Router>
      </ThemeSwitcherProvider>
    </div>
  );
}

export default App;
