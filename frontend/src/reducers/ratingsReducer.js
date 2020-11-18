import ratingsService from '../services/ratingsService';

// actions
export const setRatings = (ratings) => {
  // ratings get fetched with the product
  return { type: 'SET_RATINGS', ratings };
};

export const rateProduct = (id, rating) => {
  return async (dispatch) => {
    const res = await ratingsService.rateProduct(id, rating);
    dispatch({
      type: 'RATE_PRODUCT',
      rating: res,
    });
  };
};

export const deleteRating = (id) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const token = JSON.parse(userJson).token;
      await ratingsService.deleteRating(id, token);
      dispatch({ type: 'DELETE_RATING', id });
    }
  };
};

export const editRating = (id, rating) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const token = JSON.parse(userJson).token;
      const newRating = await ratingsService.editRating(id, rating, token);
      dispatch({
        type: 'EDIT_RATING',
        rating: newRating,
      });
    }
  };
};

// reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RATINGS':
      return action.ratings;
    case 'RATE_PRODUCT':
      return [...state, action.rating];
    case 'DELETE_RATING':
      return state.filter((r) => r.id !== action.id);
    case 'EDIT_RATING':
      const newRating = action.rating;
      return state.map((r) => (r.id === newRating.id ? newRating : r));
    default:
      return state;
  }
};
export default reducer;
