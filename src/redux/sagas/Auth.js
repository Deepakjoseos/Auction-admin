import { all, takeEvery, put, fork, call } from 'redux-saga/effects'
import { AUTH_TOKEN, SIGNIN, SIGNOUT } from '../constants/Auth'
import { showAuthMessage, authenticated, signOutSuccess } from '../actions/Auth'

import authAdminService from 'services/auth/admin'
import { notification } from 'antd'

export function* signIn() {
  yield takeEvery(SIGNIN, function* ({ payload }) {
    const { email, password } = payload
    try {
      // const user = yield call(
      //   FirebaseService.signInEmailRequest,
      //   email,
      //   password
      // )

      const user = yield call(authAdminService.login, { email, password })

      if (user?.sessionToken) {
        console.log('useweer', user)
        notification.success({ message: 'Login success' })
        window.localStorage.setItem(AUTH_TOKEN, user.sessionToken)
        const getAdminProfile = yield call(authAdminService.getProfile)
        yield put(authenticated(user, getAdminProfile))
      }
    } catch (err) {
      yield put(showAuthMessage(err))
    }
  })
}

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
    try {
      localStorage.removeItem(AUTH_TOKEN)
      yield put(signOutSuccess())
    } catch (err) {
      yield put(showAuthMessage(err))
    }
  })
}

export default function* rootSaga() {
  yield all([fork(signIn), fork(signOut)])
}
