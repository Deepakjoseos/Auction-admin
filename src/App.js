import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Views from "./views";
import { Route, Switch } from "react-router-dom";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { THEME_CONFIG } from "./configs/AppConfig";
import authAdminService from "services/auth/admin";
import { authenticated, showLoading } from "redux/actions/Auth";
import { AUTH_TOKEN } from "redux/constants/Auth";

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

function App() {
  const dispatch = useDispatch();

  const getProfile = async () => {
    const data = await authAdminService.getProfile();
    if (data) {
      dispatch(authenticated({ user: data }));
      dispatch(showLoading(false));
    }
    dispatch(showLoading(false));
  };

  // Auth check
  useEffect(() => {
    dispatch(showLoading(true));
    const token = window.localStorage.getItem(AUTH_TOKEN);
    if (token) {
      getProfile();
    } else {
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
