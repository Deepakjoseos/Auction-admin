import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AppLayout from 'layouts/app-layout'
import AuthLayout from 'layouts/auth-layout'
import AppLocale from 'lang'
import { IntlProvider } from 'react-intl'
import { ConfigProvider } from 'antd'
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import useBodyClass from 'hooks/useBodyClass'
import Loading from 'components/shared-components/Loading'

function RouteInterceptor({ children, isAuthenticated, loading, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loading && !isAuthenticated ? (
          <Loading cover="content" />
        ) : isAuthenticated ? (
          children
        ) : (
          !loading &&
          !isAuthenticated && (
            <Redirect
              to={{
                pathname: AUTH_PREFIX_PATH,
                state: { from: location },
              }}
            />
          )
        )
      }
    />
  )
}

export const Views = (props) => {
  const { locale, authorized, token, location, direction, loading } = props
  console.log('auth', authorized)
  const currentAppLocale = AppLocale[locale]
  useBodyClass(`dir-${direction}`)
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <RouteInterceptor
            path={APP_PREFIX_PATH}
            isAuthenticated={authorized}
            loading={loading}
          >
            <AppLayout direction={direction} location={location} />
          </RouteInterceptor>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  )
}

const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } = theme
  const { token, authorized, loading } = auth
  return { locale, direction, token, authorized, loading }
}

export default withRouter(connect(mapStateToProps)(Views))
