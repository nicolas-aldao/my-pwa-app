import createDataContext from './createDataContext';
import trackApi from '../services/trackApi';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin-or-signup':
      return { errorMessage: '', token: action.payload };
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const signUp = dispatch => {
  return async ({ email, password }, callback) => {
    try {
      const response = await trackApi.post('/signup', { email, password });
      window.localStorage.setItem('token', response.data.token);
      dispatch({ type: 'signin-or-signup', payload: response.data.token });
      if (callback) {
        callback();
      }
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up',
      });
    }
  };
};

const signIn = dispatch => {
  return async ({ email, password }, callback) => {
    try {
      const response = await trackApi.post('/signin', { email, password });
      window.localStorage.setItem('token', response.data.token);
      dispatch({ type: 'signin-or-signup', payload: response.data.token });
      if (callback) {
        callback();
      }
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign in',
      });
    }
  };
};

const signOut = dispatch => async callback => {
  try {
    window.localStorage.removeItem('token');
    dispatch({ type: 'signout' });
    callback();
  } catch (err) {
    console.log('🚀 ~ file: AuthContext.js:73 ~ signOut ~ err', err);
  }
};

const clearErrorMessages = dispatch => {
  return () => {
    dispatch({
      type: 'clear_error_message',
    });
  };
};

const tryLocalSignIn = dispatch => {
  return async (firstNavigate, secondNavigate) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        dispatch({ type: 'signin-or-signup', payload: token });
        firstNavigate();
      } else {
        secondNavigate();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signUp, signIn, signOut, clearErrorMessages, tryLocalSignIn },
  { token: null, errorMessage: '' },
);
