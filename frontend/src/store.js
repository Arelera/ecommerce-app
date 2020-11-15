import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';
import productsReducer from './reducers/productsReducer';

const store = createStore(
  combineReducers({
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
  }),
  applyMiddleware(thunk)
);
export default store;
