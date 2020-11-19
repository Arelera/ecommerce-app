import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';
import productsReducer from './reducers/productsReducer';
import ratingsReducer from './reducers/ratingsReducer';
import loadingReducer from './reducers/loadingReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  combineReducers({
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
    ratings: ratingsReducer,
    loading: loadingReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
