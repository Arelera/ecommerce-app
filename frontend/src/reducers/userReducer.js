import userService from '../services/userService';

// actions
export const initUser = () => {
  const userJson = localStorage.getItem('user');
  if (userJson) {
    return {
      type: 'INIT',
      user: JSON.parse(userJson),
    };
  }
};

export const signupUser = (user) => {
  return async (dispatch) => {
    const signedUser = await userService.signupUser(user);
    localStorage.setItem('user', JSON.stringify(signedUser));
    dispatch({
      type: 'SIGNUP',
      user: signedUser,
    });
  };
};

export const signinUser = (user) => {
  return async (dispatch) => {
    const signedUser = await userService.signinUser(user);
    if ('error' in signedUser) {
      return dispatch({
        type: 'ERROR',
        error: signedUser.error,
      });
    }
    localStorage.setItem('user', JSON.stringify(signedUser));
    dispatch({
      type: 'SIGNIN',
      user: signedUser,
    });
  };
};

export const signoutUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('cart');
  return {
    type: 'SIGNOUT',
  };
};

// reducer
const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT':
      return action.user;
    case 'SIGNIN':
      return action.user;
    case 'SIGNUP':
      return action.user;
    case 'SIGNOUT':
      return null;
    case 'ERROR':
      return { error: action.error };
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};
export default reducer;
