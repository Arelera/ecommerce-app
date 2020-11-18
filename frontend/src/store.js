import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';
import productsReducer from './reducers/productsReducer';
import ratingsReducer from './reducers/ratingsReducer';

const store = createStore(
  combineReducers({
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
    ratings: ratingsReducer,
  }),
  applyMiddleware(thunk)
);
export default store;
