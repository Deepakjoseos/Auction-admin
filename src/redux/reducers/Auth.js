import {
  AUTHENTICATED,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  SET_ROLES,
} from '../constants/Auth'

const initState = {
  loading: true,
  message: '',
  showMessage: false,
  redirect: '',
  user: null,
  authorized: null,
  token: null,
  roles: [],
}

const auth = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: '/',
        authorized: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case SHOW_AUTH_MESSAGE:
      return {
        ...state,
        message: action.message,
        showMessage: true,
        loading: false,
      }
    case HIDE_AUTH_MESSAGE:
      return {
        ...state,
        message: '',
        showMessage: false,
      }
    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        user: null,
        authorized: null,
        redirect: '/',
        loading: false,
      }
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.token,
      }
    }
    case SHOW_LOADING: {
      return {
        ...state,
        loading: action.loading === null ? true : action.loading,
      }
    }
    case SET_ROLES: {
      return {
        ...state,
        roles: action.payload,
      }
    }

    default:
      return state
  }
}

export default auth
