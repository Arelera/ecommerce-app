import productService from '../services/productService';
import { storageRef } from '../firebase/storage';
// actions
export const getAll = () => {
  return async (dispatch) => {
    const prods = await productService.getAll().then((res) => res);
    dispatch({
      type: 'GET_PRODUCTS',
      prods,
    });
    dispatch({ type: 'STOP_LOADING' });
  };
};
export const getByQuery = (query) => {
  return async (dispatch) => {
    const prods = await productService.getByQuery(query);
    dispatch({
      type: 'GET_PRODUCTS',
      prods,
    });
    dispatch({ type: 'STOP_LOADING' });
  };
};
export const getByCategory = (cat) => {
  return async (dispatch) => {
    const prods = await productService.getByCategory(cat);
    dispatch({
      type: 'GET_PRODUCTS',
      prods,
    });
    dispatch({ type: 'STOP_LOADING' });
  };
};
export const getBySubcategory = (cat, subcat) => {
  return async (dispatch) => {
    const prods = await productService.getBySubcategory(cat, subcat);
    dispatch({ type: 'GET_PRODUCTS', prods });
    dispatch({ type: 'STOP_LOADING' });
  };
};
export const getByUser = (creator) => {
  return async (dispatch) => {
    const prods = await productService.getByUser(creator);
    dispatch({ type: 'GET_PRODUCTS', prods });
    dispatch({ type: 'STOP_LOADING' });
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
    dispatch({ type: 'ADD_PRODUCT', prods });
  };
};
export const deleteOne = (product) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const token = JSON.parse(userJson).token;
      try {
        await productService.deleteOne(product.id, token);
        product.images.forEach(([url, path]) => {
          const imgRef = storageRef.child(path);
          imgRef
            .delete()
            .then((res) => {
              console.log('RES: ', res);
            })
            .catch((error) => {
              return console.log(error);
            });
        });
        dispatch({ type: 'DELETE' });
      } catch (error) {
        console.log(error);
      }
    }
  };
};
export const editOne = (id, newProduct) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const token = JSON.parse(userJson).token;
      const product = await productService.editOne(id, newProduct, token);
      dispatch({ type: 'EDIT_PRODUCT', product });
    }
  };
};

// reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return action.prods;
    default:
      return state;
  }
};

export default reducer;
