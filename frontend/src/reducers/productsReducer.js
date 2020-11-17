import productService from '../services/productService';

// actions
// well, it looks like i really don't need all of these action creators since they are all pretty much the same
// but i've already written them soo yeah
export const getAll = () => {
  return async (dispatch) => {
    const prods = await productService.getAll().then((res) => res);
    dispatch({
      type: 'GET_ALL',
      prods,
    });
  };
};
export const getByQuery = (query) => {
  return async (dispatch) => {
    const prods = await productService.getByQuery(query);
    dispatch({
      type: 'GET_BYQUERY',
      prods,
    });
  };
};
export const getByCategory = (cat) => {
  return async (dispatch) => {
    const prods = await productService.getByCategory(cat);
    dispatch({
      type: 'GET_BYCATEGORY',
      prods,
    });
  };
};
export const getBySubcategory = (cat, subcat) => {
  return async (dispatch) => {
    const prods = await productService.getBySubcategory(cat, subcat);
    dispatch({
      type: 'GET_BYSUBCATEGORY',
      prods,
    });
  };
};
export const addProduct = (product) => {
  return async (dispatch) => {
    const prods = await productService.addProduct(product);

    // adding new product to users products in localstorage
    const localUser = JSON.parse(localStorage.getItem('user'));
    if ('products' in localUser) {
      const prods = localUser.products;
      prods.push(prods.id);
      localStorage.setItem(
        'user',
        JSON.stringify({ ...localUser, products: prods })
      );
    }
    dispatch({
      type: 'ADD_PRODUCT',
      prods,
    });
  };
};
export const rateProduct = (id, obj) => {
  return async (dispatch) => {
    const res = await productService.rateProduct(id, obj);
    dispatch({
      type: 'RATE_PRODUCT',
    });
  };
};
export const deleteOne = (id) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const token = JSON.parse(userJson).token;
      productService.deleteOne(id, token);
      dispatch({ type: 'DELETE' });
    }
  };
};

export const deleteRating = (id) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const token = JSON.parse(userJson).token;
      productService.deleteRating(id, token);
      dispatch({ type: 'DELETE_RATING' });
    }
  };
};

// reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.prods;
    case 'GET_BYQUERY':
      return action.prods;
    case 'GET_BYCATEGORY':
      return action.prods;
    case 'GET_BYSUBCATEGORY':
      return action.prods;
    // case 'ADD_PRODUCT':
    //   return state;
    // case 'RATE_PRODUCT':
    //   return state;
    default:
      return state;
  }
};

export default reducer;
