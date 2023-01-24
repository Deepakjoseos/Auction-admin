import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { AUTH_TOKEN, SIGNIN, SIGNOUT } from '../constants/Auth';
import {
  showAuthMessage,
  authenticated,
  signOutSuccess,
  setDashBoardNavTree
} from '../actions/Auth';

import authAdminService from 'services/auth/admin';
import { notification } from 'antd';
import authSubAdminService from 'services/auth/subAdmin';
import navigationConfig, { sellerDashboard } from 'configs/NavigationConfig';
import Utils from 'utils';
import sellerService from 'services/auth/seller';

export function* signIn() {
  yield takeEvery(SIGNIN, function* ({ payload }) {
    const { email, password } = payload;
    try {
      // const user = yield call(
      //   FirebaseService.signInEmailRequest,
      //   email,
      //   password
      // )

      const user = yield call(authAdminService.login, { username: email, password });

      if (user?.sessionToken) {
        notification.success({ message: 'Login success' });

        window.localStorage.setItem(AUTH_TOKEN, user.sessionToken);

        if (user.AuthType === 'Admin') {
          const getAdminProfile = yield call(authAdminService.getProfile);
          window.localStorage.setItem('auth_type', user.AuthType);

          yield put(authenticated({ user: getAdminProfile }));
          yield put(setDashBoardNavTree(navigationConfig));
        } else if (user.AuthType === 'SubAdmin') {
          const getSubAdminProfile = yield call(authSubAdminService.getProfile);

          // Setting the submenu for the subadmin
          const subAdminNavigation = Utils.getSubAdminNavs(
            getSubAdminProfile?.roles
          );

          window.localStorage.setItem('auth_type', user.AuthType);
          window.localStorage.setItem(AUTH_TOKEN, user.sessionToken);
          yield put(authenticated({ user: getSubAdminProfile }));
          yield put(setDashBoardNavTree(subAdminNavigation));
        } else if (
          user.AuthType === 'Participant' &&
          user.user.participantType === 'Seller'
        ) {
          const getSellerProfile = yield call(sellerService.getProfile);
          window.localStorage.setItem('auth_type', user.AuthType);
          window.localStorage.setItem(AUTH_TOKEN, user.sessionToken);
          yield put(authenticated({ user: getSellerProfile }));
          yield put(setDashBoardNavTree(sellerDashboard));
        }
      }
    } catch (err) {
      yield put(showAuthMessage(err));
    }
  });
}

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
    try {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem('auth_type');
      yield put(signOutSuccess());
    } catch (err) {
      yield put(showAuthMessage(err));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(signIn), fork(signOut)]);
}
