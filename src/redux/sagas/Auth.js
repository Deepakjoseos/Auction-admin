import { all, takeEvery, put, fork, call } from 'redux-saga/effects'
import { AUTH_TOKEN, SIGNIN, SIGNOUT } from '../constants/Auth'
import {
  showAuthMessage,
  authenticated,
  signOutSuccess,
  setDashBoardNavTree,
} from '../actions/Auth'

import authAdminService from 'services/auth/admin'
import { notification } from 'antd'
import authSubAdminService from 'services/auth/subAdmin'
import navigationConfig from 'configs/NavigationConfig'
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import Utils from 'utils'

// const dashBoardNavTree = [
//   {
//     key: 'dashboards',
//     path: `${APP_PREFIX_PATH}/dashboards`,
//     title: 'sidenav.dashboard',
//     icon: DashboardOutlined,
//     breadcrumb: false,
//     submenu: [
//       {
//         key: 'dashboards-user',
//         path: `${APP_PREFIX_PATH}/dashboards/user`,
//         title: 'User',
//         icon: AppstoreOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: 'dashboards-information',
//         path: `${APP_PREFIX_PATH}/dashboards/information`,
//         title: 'Information',
//         icon: AppstoreOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: 'dashboards-car',
//         path: `${APP_PREFIX_PATH}/dashboards/car`,
//         title: 'Car',
//         icon: AppstoreOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: 'dashboards-settings',
//         path: `${APP_PREFIX_PATH}/dashboards/settings`,
//         title: 'Settings',
//         icon: AppstoreOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: 'dashboards-banner',
//         path: `${APP_PREFIX_PATH}/dashboards/banner`,
//         title: 'Banner',
//         icon: AppstoreOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: 'dashboards-brand',
//         path: `${APP_PREFIX_PATH}/dashboards/brand`,
//         title: 'Brand',
//         icon: AppstoreOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: 'dashboards-vehicle-type',
//         path: `${APP_PREFIX_PATH}/dashboards/vehicle-type`,
//         title: 'VehicleTypes',
//         icon: AppstoreOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: 'dashboards-fee-type',
//         path: `${APP_PREFIX_PATH}/dashboards/fee-type`,
//         title: 'FeeType',
//         icon: AppstoreOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: 'dashboards-participant',
//         path: `${APP_PREFIX_PATH}/dashboards/participant`,
//         title: 'Participant',
//         icon: AppstoreOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: 'dashboards-states',
//         path: `${APP_PREFIX_PATH}/dashboards/state`,
//         title: 'States',
//         icon: AppstoreOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: 'dashboards-roles',
//         path: `${APP_PREFIX_PATH}/dashboards/role`,
//         title: 'Roles',
//         icon: AppstoreOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//     ],
//   },
// ]

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
        console.log('user-nklnk', user.sessionToken)

        if (user.AuthType === 'Admin') {
          const getAdminProfile = yield call(authAdminService.getProfile)
          window.localStorage.setItem('auth_type', user.AuthType)
          console.log('sahjkbsdbvhjksqdavfhjklfewdcghj', getAdminProfile)

          yield put(authenticated({ user: getAdminProfile }))
          yield put(setDashBoardNavTree(navigationConfig))
        } else if (user.AuthType === 'SubAdmin') {
          const getSubAdminProfile = yield call(authSubAdminService.getProfile)
          console.log('getSubAdmindProfile', getSubAdminProfile)

          // Setting the submenu for the subadmin
          const subAdminNavigation = Utils.getSubAdminNavs(
            getSubAdminProfile?.roles
          )

          window.localStorage.setItem('auth_type', user.AuthType)
          window.localStorage.setItem(AUTH_TOKEN, user.sessionToken)
          yield put(authenticated({ user: getSubAdminProfile }))
          yield put(setDashBoardNavTree(subAdminNavigation))

          // navItems[0].submenu.push({

          // })
        }
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
      localStorage.removeItem('auth_type')
      yield put(signOutSuccess())
    } catch (err) {
      yield put(showAuthMessage(err))
    }
  })
}

export default function* rootSaga() {
  yield all([fork(signIn), fork(signOut)])
}
